from rest_framework import routers
from django.conf.urls import url, include
from plant_info import views

router = routers.DefaultRouter()
router.register(r'moisture', views.MoistureSensorView, base_name='moisture-list')
router.register(r'temperature', views.TemperatureSensorView, base_name='temperature-list')
router.register(r'light', views.LightSensorView, base_name='light-list')
router.register(r'notes', views.NotesView)

urlpatterns = [
    url(r'^', include(router.urls)),
]
