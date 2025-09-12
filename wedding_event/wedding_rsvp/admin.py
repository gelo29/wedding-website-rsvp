from django.contrib import admin
from .models import Guest

class WeddingAdmin(admin.ModelAdmin):
    list_display = ("first_name","last_name","nick_name","reply","message")

admin.site.register(Guest, WeddingAdmin)
admin.site.site_header = "Angelo & Celly Wedding Admin"
admin.site.site_title = "A&C Admin"
admin.site.index_title = "Welcome to the RSVP Dashboard"