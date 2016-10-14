from rest_framework import serializers

from plant_info.models import Sensor, CalendarNote


class SensorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Sensor
        fields = (
            'id',
            'device_id',
            'event_type',
            'published_date',
            'sensor_value')


class CalendarNoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CalendarNote
        fields = ('id', 'note_content', 'note_date')
