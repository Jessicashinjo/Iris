from rest_framework import routers, viewsets, generics
from django.conf.urls import url, include
from plant_info.views import SensorView, CalendarNoteView
from plant_info.models import Sensor, CalendarNote

router = routers.DefaultRouter()
router.register(r'sensors', SensorView, base_name="sensor")
router.register(r'notes', CalendarNoteView)

urlpatterns = [
    url(r'^', include(router.urls)),
]
