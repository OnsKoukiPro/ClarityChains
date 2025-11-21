# -------------------
# backend/apps/procurement/serializers.py
# -------------------
from rest_framework import serializers
from .models import Offer, OfferDocument, Analysis, ChatMessage

class OfferDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfferDocument
        fields = ['id', 'file', 'original_filename', 'file_size', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']

class OfferSerializer(serializers.ModelSerializer):
    documents = OfferDocumentSerializer(many=True, read_only=True)

    class Meta:
        model = Offer
        fields = ['id', 'supplier_name', 'documents', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class AnalysisSerializer(serializers.ModelSerializer):
    offers = OfferSerializer(many=True, read_only=True)

    class Meta:
        model = Analysis
        fields = [
            'id', 'offers', 'eval_criteria', 'weights',
            'analysis_data', 'comparison_summary', 'status',
            'error_message', 'created_at', 'updated_at', 'completed_at'
        ]
        read_only_fields = ['id', 'status', 'created_at', 'updated_at', 'completed_at']

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'role', 'content', 'created_at']
        read_only_fields = ['id', 'created_at']