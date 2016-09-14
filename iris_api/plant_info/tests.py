import datetime
from django.utils import timezone
from django.test import TestCase
from .models import MoistureSensor, TemperatureSensor, LightSensor

class MoistureSensorMethodTests(TestCase):
    def test_type_is_moisture(self):
        MoistureSensor(event_type=???)
        self.assertEqual("Moisture")

    def test_was_published_within_one_day(self):
        time = timezone.now() + datetime.timedelta(hours=20)
        moisture_reading = MoistureSensor(recorded_date=time)
        self.assertIs(moisture_reading.was_published_within_one_day(), True)

    def test_was_published_within_one_week(self):
        time = timezone.now() + datetime.timedelta(hours=20)
        moisture_reading = MoistureSensor(recorded_date=time)
        self.assertIs(moisture_reading.was_published_within_one_day(), True)

    def test_was_published_within_one_month(self):
        time = timezone.now() + datetime.timedelta(hours=20)
        moisture_reading = MoistureSensor(recorded_date=time)
        self.assertIs(moisture_reading.was_published_within_one_day(), True)

    def test_was_published_within_all_time(self):
        time = timezone.now() + datetime.timedelta(hours=20)
        moisture_reading = MoistureSensor(recorded_date=time)
        self.assertIs(moisture_reading.was_published_within_one_day(), True)

class TemperatureSensorMethodTests(TestCase):
    pass

class LightSensorMethodTests(TestCase):
    pass
