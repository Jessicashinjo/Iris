from rest_framework import routers
from django.conf.urls import url, include
from plant_info.views import SensorView, CalendarNoteView

router = routers.DefaultRouter()
router.register(r'sensors', SensorView, base_name="sensor")
router.register(r'notes', CalendarNoteView)

urlpatterns = [
    url(r'^', include(router.urls)),
]
