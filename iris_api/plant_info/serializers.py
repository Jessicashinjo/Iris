from rest_framework import serializers

from plant_info.models import MoistureSensor, TemperatureSensor, LightSensor, Notes

class MoistureSensorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MoistureSensor
        fields = ('id', 'device_id', 'event_type', 'published_date', 'moisture_value')

class TemperatureSensorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TemperatureSensor
        fields = ('id', 'device_id', 'event_type', 'published_date', 'temperature_value')

class LightSensorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LightSensor
        fields = ('id', 'device_id', 'event_type', 'published_date', 'light_value')

class NotesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Notes
        fields = ('id', 'note_content', 'note_date')
