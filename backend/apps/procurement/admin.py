from django.contrib import admin
from .models import Offer, OfferDocument, Analysis, ChatMessage

@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    list_display = ['id', 'supplier_name', 'user', 'created_at']
    list_filter = ['created_at']
    search_fields = ['supplier_name', 'user__email']

@admin.register(Analysis)
class AnalysisAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'status', 'created_at', 'completed_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__email']