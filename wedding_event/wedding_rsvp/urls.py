from django.urls import path
from . import views

app_name = "wedding_rsvp"

urlpatterns = [
    path("", views.index, name="index"),
    path("rsvp_form", views.rsvp, name="rsvp"),
    path("confirm_guest_form", views.confirm_guest, name="confirm_guest"),
]