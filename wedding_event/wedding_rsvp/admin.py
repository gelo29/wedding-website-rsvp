from django.contrib import admin
from .models import Guest

class WeddingAdmin(admin.ModelAdmin):
    list_display = ("first_name","last_name","nick_name","reply","message")
    
    def changelist_view(self, request, extra_context = None):
        qs = self.get_queryset(request)
        attending = qs.filter(reply=True).count()
        total = qs.count()
        
        if total > 0:
            pct = round((total/100) * 100)
        else:
            pct = 0
        
        extra_context = extra_context or {}
        
        extra_context["attending_count"] = attending
        extra_context["total_count"] = total
        extra_context["attendance_pct"] = pct
        
        return super().changelist_view(request, extra_context)

admin.site.register(Guest, WeddingAdmin)
admin.site.site_header = "Angelo & Celly Wedding Admin"
admin.site.site_title = "A&C Admin"
admin.site.index_title = "Welcome to the RSVP Dashboard"