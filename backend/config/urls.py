from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from rest_framework import routers
from apps.procurement.views import ProcurementViewSet

# API Router
router = routers.DefaultRouter()
router.register(r'procurement', ProcurementViewSet, basename='procurement')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', include('apps.authentication.urls')),
    path('api/health/', lambda request: JsonResponse({'status': 'healthy'})),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)