from django import forms

class GuestInfoForm(forms.Form):
    
    guest_reply_choices = [
        (True,"Accept With Pleasure"),
        (False,"Decline with Regret"),
    ]
    
    guest_reply = forms.ChoiceField(
        choices=guest_reply_choices,
        widget = forms.RadioSelect(
            attrs={
                "class":"rsvp-info",
            }
        ),
        label='Select your Reply',
        initial = True,
    )
    
    reason_msg = forms.CharField(
        widget=forms.Textarea(attrs={
            "rows": 4,
            "cols": 40,
            "placeholder": "Enter your message here",
            "class": "reason-textArea",
        }),
        label="Tell us the reason:",
    )
 

class ConfirmGuestForm(forms.Form):
    c_guest_code = forms.CharField(
        label="",
        max_length=100,
        widget=forms.TextInput(
            attrs={
                "id":"confirm-guest-input",
                "class":"confirm_guest-info",
                "placeholder": "Enter Code Here"
            }
        )
    )
    