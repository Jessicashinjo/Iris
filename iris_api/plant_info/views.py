from datetime import datetime, timedelta, time
import json
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from plant_info.models import MoistureSensor, TemperatureSensor, LightSensor
from plant_info.serializers import MoistureSensorSerializer, TemperatureSensorSerializer, LightSensorSerializer

class MoistureSensorView(viewsets.ModelViewSet):
    model = MoistureSensor
    serializer_class = MoistureSensorSerializer

    def get_queryset(self):
        queryset = MoistureSensor.objects.all()
        since_date = self.request.query_params.get('current_date', None)
        if since_date is not None:
            compare_date = timezone.now() - timedelta(days=int(since_date))
            queryset = queryset.filter(published_date__gt=compare_date)
        return queryset
            # MoistureSensor.objects.order_by('-published_date').filter(
            #     published_date__gte=timezone.now()
            # )

    # query params since = date

class TemperatureSensorView(viewsets.ModelViewSet):
    model = TemperatureSensor
    serializer_class = TemperatureSensorSerializer
    queryset = TemperatureSensor.objects.all()

class LightSensorView(viewsets.ModelViewSet):
    model = LightSensor
    serializer_class = LightSensorSerializer
    queryset = LightSensor.objects.all()
