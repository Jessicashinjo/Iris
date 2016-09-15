import json
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from plant_info.models import MoistureSensor, TemperatureSensor, LightSensor
from plant_info.serializers import MoistureSensorSerializer, TemperatureSensorSerializer, LightSensorSerializer

class MoistureSensorView(viewsets.ModelViewSet):
    model = MoistureSensor
    queryset = MoistureSensor.objects.all()
    serializer_class = MoistureSensorSerializer

class TemperatureSensorView(viewsets.ModelViewSet):
    model = TemperatureSensor
    queryset = TemperatureSensor.objects.all()
    serializer_class = TemperatureSensorSerializer

class LightSensorView(viewsets.ModelViewSet):
    model = LightSensor
    queryset = LightSensor.objects.all()
    serializer_class = LightSensorSerializer
