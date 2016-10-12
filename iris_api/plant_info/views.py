from datetime import datetime, timedelta, time
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from plant_info.models import Sensor, CalendarNote
from plant_info.serializers import SensorSerializer, CalendarNoteSerializer


class SensorView(viewsets.ModelViewSet):
    model = Sensor
    serializer_class = SensorSerializer

    def get_queryset(self):
        '''
        Designed for v2. User can type a day as an int (ex. 7) and the User
        will receive all history for the sensor since that day.
        '''
        queryset = Sensor.objects.all()
        sensor_type = self.request.query_params.get('sensor_type')
        if sensor_type is not None:
            queryset = queryset.filter(event_type=sensor_type)
        since_date = self.request.query_params.get('since_day', None)
        if since_date is not None:
            compare_date = timezone.now() - timedelta(days=int(since_date))
            queryset = queryset.filter(published_date__gt=compare_date)
        return queryset


class CalendarNoteView(viewsets.ModelViewSet):
    ''' Model for notes which populate the user's calendar '''
    model = CalendarNote
    serializer_class = CalendarNoteSerializer
    queryset = CalendarNote.objects.all()
