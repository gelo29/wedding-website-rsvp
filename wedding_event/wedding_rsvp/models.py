#user: gelo_celly
#email: g.samson.to@gmail.com
#pword: december262025
#topic: Tutorial 3: Write views that actually do something
from django.db import models
from django.conf import settings
from pathlib import Path
import os

class Guest(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    reply = models.BooleanField(default=True)
    
    def __str__(self):
        return self.first_name
    
    def get_guest_list(self):
        excel_path = os.path.dirname(str(Path(__file__))) + "/" + str(settings.STATIC_URL) + "/wedding_rsvp/data"
        return os.listdir(excel_path)

class Attendee(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    guest = models.ForeignKey(Guest, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.first_name