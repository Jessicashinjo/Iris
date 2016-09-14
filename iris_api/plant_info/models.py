from django.db import models

class MoistureSensor(models.Model):
    device_id = models.CharField(max_length=100)
    event_type = models.CharField(max_length=50)
    published_date = models.DateTimeField()
    moisture_value = models.CharField(max_length=50)

class TemperatureSensor(models.Model):
    device_id = models.CharField(max_length=100)
    event_type = models.CharField(max_length=50)
    published_date = models.DateTimeField()
    temperature_value = models.CharField(max_length=50)

class LightSensor(models.Model):
    device_id = models.CharField(max_length=100)
    event_type = models.CharField(max_length=50)
    published_date = models.DateTimeField()
    light_value = models.CharField(max_length=50)
