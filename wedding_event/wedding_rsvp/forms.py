from django import forms

class GuestInfoForm(forms.Form):
    guest_first_name = forms.CharField(
        label = "First Name",
        max_length=100,
        widget=forms.TextInput(
            attrs={
                "class":"rsvp-info",
                "placeholder": "Enter Your First Name"
            }
        )
    )
    guest_last_name = forms.CharField(
        label = "Last Name",
        max_length=100,
        widget=forms.TextInput(
            attrs={
                "class":"rsvp-info",
                "placeholder": "Enter Your Last Name"
            }
        )
    )
    
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
        initial = "accept",
    )
    
    attendee_first_name = forms.CharField(
        label = "First Name",
        max_length=100,
        widget=forms.TextInput(
            attrs={
                "class":"rsvp-info attendee-name",
                "placeholder": "Enter Your First Name"
            }
        )
    )
    attendee_last_name = forms.CharField(
        label = "Last Name",
        max_length=100,
        widget=forms.TextInput(
            attrs={
                "class":"rsvp-info attendee-name",
                "placeholder": "Enter Your Last Name"
            }
        )
    )
    
    has_companion = forms.BooleanField(
        label = "Do you have companion?",
        required=True,
        widget=forms.CheckboxInput(
            attrs={
                "class":"rsvp-info"
            }
        )
    )

class ConfirmGuestForm(forms.Form):
    c_guest_code = forms.CharField(
        label="",
        max_length=100,
        widget=forms.TextInput(
            attrs={
                "class":"confirm_guest-info",
                "placeholder": "Enter Code Here..."
            }
        )
    )
    