from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.urls import reverse
from .forms import GuestInfoForm,ConfirmGuestForm
from .models import Guest
from .utils import check_rsvp_code
from django.views.decorators.cache import cache_control

def index(request):
    get_first_name = Guest.objects.order_by("first_name")
    context = {"get_first_name":get_first_name}
    
    return render(request,"wedding_rsvp/index.html", context)

@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def confirm_guest(request):
    error = False
    
    if request.session.get("rsvp_done",False):
        # request.session.flush()
        request.session["rsvp_done"] = False
        return redirect("wedding_rsvp:index")
    
    if request.method == "POST":
        request.session["rsvp_done"] = True
        form = ConfirmGuestForm(request.POST)
        code = request.POST.get("c_guest_code")
        if code:
            request.session["c_guest_code"] = code
            confirmation_info = check_rsvp_code(code)
            
            if list(confirmation_info.keys())[0] == "matched":
                #if guests try to register again to avoid double registration.
                error_already_reg = False
                if Guest.objects.filter(first_name=confirmation_info["matched"][0].upper()).exists() and \
                Guest.objects.filter(last_name=confirmation_info["matched"][1].upper()).exists() and \
                Guest.objects.filter(nick_name=confirmation_info["matched"][2].upper()).exists():
                    
                    error_already_reg = True
                    return render(request,"wedding_rsvp/confirm_guest.html",{"form":form, "error_already_reg":error_already_reg})
                
                names = confirmation_info["matched"][0].upper() +","+confirmation_info["matched"][1].upper()+","+confirmation_info["matched"][2].upper()
                 
                # return render(
                #     request,
                #     "wedding_rsvp/rsvp.html",
                #     {
                #         "names": names.split(","),
                #         "form": GuestInfoForm(),
                #     }
                # )
                names = names.split(",")
                request.session["names_list"] = names
                
                return redirect(reverse("wedding_rsvp:rsvp", kwargs={"names":names}))
                   
            else:
                error = True
    else:
        form = ConfirmGuestForm()
        
    return render(request,"wedding_rsvp/confirm_guest.html",{"form":form, "error":error})

@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def rsvp(request,names):
  
    if not request.session.get("rsvp_done",False):
        return redirect("wedding_rsvp:confirm_guest")
    
    names = request.session.get('names_list', [])
    if request.method == "POST":
        #request.session["rsvp_done"] = True
        form = GuestInfoForm(request.POST)
        
        #get all the guest info to store in the database
        guest_fname = request.POST.get("guest_first_name")
        guest_lname = request.POST.get("guest_last_name")
        guest_nname = request.POST.get("guest_nick_name")
        guest_reply = request.POST.get("guest_reply")
        guest_reason_msg = request.POST.get("reason_msg")
        guests = Guest.objects.all()
        
        g = None
        
        if guest_reply == "True":
            #if true the message will default to "will attend"
            g = Guest.objects.create(first_name=guest_fname,last_name=guest_lname,nick_name=guest_nname,reply=guest_reply)
            request.session["rsvp_done"] = False
            return redirect("wedding_rsvp:rsvp_accept")#render(request, "wedding_rsvp/rsvp_accepted.html", {"names": names})
        else:
            #if false the message will be the guests message.
            g = Guest.objects.create(first_name=guest_fname,last_name=guest_lname,nick_name=guest_nname,reply=guest_reply,message=guest_reason_msg)
            request.session["rsvp_done"] = False
            return redirect("wedding_rsvp:rsvp_decline")#render(request, "wedding_rsvp/rsvp_declined.html", {"names": names})   
    else:
        
        form = GuestInfoForm()
        #request.session.flush()
        
    return render(request, "wedding_rsvp/rsvp.html", {"names":names,"form":form})

def entourage(request):
    return render(request, "wedding_rsvp/entourage.html")

@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def rsvp_accept(request):
    return render(request, "wedding_rsvp/rsvp_accepted.html")

@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def rsvp_decline(request):
    return render(request, "wedding_rsvp/rsvp_declined.html")