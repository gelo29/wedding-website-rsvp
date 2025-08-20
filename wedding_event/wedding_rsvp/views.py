from django.shortcuts import get_object_or_404, render, redirect
from django.http import HttpResponse
from .forms import GuestInfoForm,ConfirmGuestForm
from .models import Guest, Attendee
import numpy

def index(request):
    get_first_name = Guest.objects.order_by("first_name")
    context = {"get_first_name":get_first_name}
    
    return render(request,"wedding_rsvp/index.html", context)

def confirm_guest(request):
    if request.method == "POST":
        form = ConfirmGuestForm(request.POST)
        code = request.POST.get("c_guest_code")
        if code:
            request.session["c_guest_code"] = code
                
            return redirect("wedding_rsvp:rsvp")
            
    else:
        form = ConfirmGuestForm()
            
    return render(request,"wedding_rsvp/confirm_guest.html",{"form":form})

def rsvp(request):
    #create add button for multiple attendee
    print(request.session.get("c_guest_code"))
    if not request.session.get("c_guest_code"):
        
        return redirect("wedding_rsvp:confirm_guest")
    #else:
        #request.session.flush()
        
    if request.method == "POST":
        form = GuestInfoForm(request.POST)
        if form.is_valid():
            guest_fname = form.cleaned_data["guest_first_name"]
            guest_lname = form.cleaned_data["guest_last_name"]
            guest_reply = form.cleaned_data["guest_reply"]
            attendee_fname = form.cleaned_data["attendee_first_name"]
            attendee_lname = form.cleaned_data["attendee_last_name"]
            
            g = Guest.objects.create(first_name=guest_fname,last_name=guest_lname,reply=guest_reply)
            a = Attendee.objects.create(first_name=attendee_fname,last_name=attendee_lname,guest=g)
        
    else:
        form = GuestInfoForm()
        request.session.flush()
        
    return render(request, "wedding_rsvp/rsvp.html", {"form":form})


