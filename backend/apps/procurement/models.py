# backend/apps/procurement/models.py
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
import uuid

class Offer(models.Model):
    """Model for procurement offers"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='offers')
    supplier_name = models.CharField(max_length=255, blank=True)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Offer {self.id} - {self.supplier_name or 'Unknown Supplier'}"

class OfferDocument(models.Model):
    """Documents associated with an offer"""
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE, related_name='documents')
    file = models.FileField(
        upload_to='offers/%Y/%m/%d/',
        validators=[FileExtensionValidator(
            allowed_extensions=['pdf', 'docx', 'doc', 'xlsx', 'xls', 'csv', 'txt']
        )]
    )
    original_filename = models.CharField(max_length=255)
    file_size = models.IntegerField()  # in bytes
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['uploaded_at']

    def __str__(self):
        return f"{self.original_filename} ({self.offer.id})"

class Analysis(models.Model):
    """Analysis results for a set of offers"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='analyses')
    offers = models.ManyToManyField(Offer, related_name='analyses')

    # Analysis configuration
    eval_criteria = models.TextField(blank=True)
    weights = models.JSONField(default=dict)

    # Results
    analysis_data = models.JSONField(default=dict)
    comparison_summary = models.JSONField(default=dict)

    # Status
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    error_message = models.TextField(blank=True)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Analyses'

    def __str__(self):
        return f"Analysis {self.id} - {self.status}"

class ChatMessage(models.Model):
    """Chat messages related to an analysis"""
    analysis = models.ForeignKey(Analysis, on_delete=models.CASCADE, related_name='chat_messages')
    role = models.CharField(max_length=20)  # 'user' or 'assistant'
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.role}: {self.content[:50]}"