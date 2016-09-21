from datetime import datetime, timedelta, time
import json
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from plant_info.models import MoistureSensor, TemperatureSensor, LightSensor, Notes
from plant_info.serializers import MoistureSensorSerializer, TemperatureSensorSerializer, LightSensorSerializer, NotesSerializer

class MoistureSensorView(viewsets.ModelViewSet):
    model = MoistureSensor
    serializer_class = MoistureSensorSerializer

    def get_queryset(self):
        queryset = MoistureSensor.objects.all()
        since_date = self.request.query_params.get('since_day', None)
        if since_date is not None:
            compare_date = timezone.now() - timedelta(days=int(since_date))
            queryset = queryset.filter(published_date__gt=compare_date)
        return queryset

class TemperatureSensorView(viewsets.ModelViewSet):
    model = TemperatureSensor
    serializer_class = TemperatureSensorSerializer

    def get_queryset(self):
        queryset = TemperatureSensor.objects.all()
        since_date = self.request.query_params.get('since_day', None)
        if since_date is not None:
            compare_date = timezone.now() - timedelta(days=int(since_date))
            queryset = queryset.filter(published_date__gt=compare_date)
        return queryset

class LightSensorView(viewsets.ModelViewSet):
    model = LightSensor
    serializer_class = LightSensorSerializer

    def get_queryset(self):
        queryset = LightSensor.objects.all()
        since_date = self.request.query_params.get('since_day', None)
        if since_date is not None:
            compare_date = timezone.now() - timedelta(days=int(since_date))
            queryset = queryset.filter(published_date__gt=compare_date)
        return queryset

class NotesView(viewsets.ModelViewSet):
    model = Notes
    serializer_class = NotesSerializer
    queryset = Notes.objects.all()
