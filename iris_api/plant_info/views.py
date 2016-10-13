''' Very descriptive string statement '''
from datetime import timedelta
from django.utils import timezone
from rest_framework import viewsets

from plant_info.models import Sensor, CalendarNote
from plant_info.serializers import SensorSerializer, CalendarNoteSerializer


class SensorView(viewsets.ModelViewSet):
    ''' Allows CRUD operations for sensors.

    query_params:
    sensor_type (string) = the type of sensor event. Ex. temperature
    since_day (int) = V2 all history for the sensor from int day until present
    '''
    model = Sensor
    serializer_class = SensorSerializer

    def get_queryset(self):
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
    ''' Allows CRUD operations to calendar notes '''
    model = CalendarNote
    serializer_class = CalendarNoteSerializer
    queryset = CalendarNote.objects.all()
