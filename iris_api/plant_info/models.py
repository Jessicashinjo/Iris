from django.db import models
from .utility import UtilityFunctions

class MoistureSensor(models.Model, UtilityFunctions):
    device_id = models.CharField(max_length=100)
    event_type = models.CharField(max_length=50)
    published_date = models.DateTimeField()
    moisture_value = models.CharField(max_length=50)

    def __str__(self):
        return '{}: {}'.format(self.event_type, self.moisture_value)

class TemperatureSensor(models.Model, UtilityFunctions):
    device_id = models.CharField(max_length=100)
    event_type = models.CharField(max_length=50)
    published_date = models.DateTimeField()
    temperature_value = models.CharField(max_length=50)

    def __str__(self):
        return '{}: {}'.format(self.event_type, self.temperature_value)

class LightSensor(models.Model, UtilityFunctions):
    device_id = models.CharField(max_length=100)
    event_type = models.CharField(max_length=50)
    published_date = models.DateTimeField()
    light_value = models.CharField(max_length=50)

    def __str__(self):
        return '{}: {}'.format(self.event_type, self.light_value)

class Notes(models.Model):
    note_content = models.CharField(max_length=500)
    note_date = models.DateTimeField()

    def __str__(self):
        return '{}: {}'.format(self.note_date, self.note_content)
