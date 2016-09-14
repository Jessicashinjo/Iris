import datetime
from django.utils import timezone
from django.test import TestCase

from .models import MoistureSensor, TemperatureSensor, LightSensor
from .utility import UtilityFunctions

class MoistureSensorMethodTests(TestCase):
    def test_was_published_within_one_day(self):
        time = timezone.now() - datetime.timedelta(hours=20)
        moisture_reading = MoistureSensor(published_date=time)
        self.assertIs(moisture_reading.was_published_within_one_day(), True)

    def test_was_published_within_one_week(self):
        time = timezone.now() - datetime.timedelta(days=7)
        moisture_reading = MoistureSensor(published_date=time)
        self.assertIs(moisture_reading.was_published_within_one_week(), True)

    def test_was_published_within_one_month(self):
        time = timezone.now() - datetime.timedelta(days=30)
        moisture_reading = MoistureSensor(published_date=time)
        self.assertIs(moisture_reading.was_published_within_one_month(), True)

    def test_was_not_published_in_the_future(self):
        time = timezone.now() + datetime.timedelta(days=10)
        future_moisture_reading = MoistureSensor(published_date=time)
        self.assertIs(future_moisture_reading.was_published_within_all_time(), False)

class TemperatureSensorMethodTests(TestCase):
    def test_was_published_within_one_day(self):
        time = timezone.now() - datetime.timedelta(hours=20)
        temperature_reading = TemperatureSensor(published_date=time)
        self.assertIs(temperature_reading.was_published_within_one_day(), True)

    def test_was_published_within_one_week(self):
        time = timezone.now() - datetime.timedelta(days=7)
        temperature_reading = TemperatureSensor(published_date=time)
        self.assertIs(temperature_reading.was_published_within_one_week(), True)

    def test_was_published_within_one_month(self):
        time = timezone.now() - datetime.timedelta(days=30)
        temperature_reading = TemperatureSensor(published_date=time)
        self.assertIs(temperature_reading.was_published_within_one_month(), True)

    def test_was_not_published_in_the_future(self):
        time = timezone.now() + datetime.timedelta(days=10)
        future_temperature_reading = TemperatureSensor(published_date=time)
        self.assertIs(future_temperature_reading.was_published_within_all_time(), False)

class LightSensorMethodTests(TestCase):
    def test_was_published_within_one_day(self):
        time = timezone.now() - datetime.timedelta(hours=20)
        light_reading = LightSensor(published_date=time)
        self.assertIs(light_reading.was_published_within_one_day(), True)

    def test_was_published_within_one_week(self):
        time = timezone.now() - datetime.timedelta(days=7)
        light_reading = LightSensor(published_date=time)
        self.assertIs(light_reading.was_published_within_one_week(), True)

    def test_was_published_within_one_month(self):
        time = timezone.now() - datetime.timedelta(days=30)
        light_reading = LightSensor(published_date=time)
        self.assertIs(light_reading.was_published_within_one_month(), True)

    def test_was_not_published_in_the_future(self):
        time = timezone.now() + datetime.timedelta(days=10)
        future_light_reading = LightSensor(published_date=time)
        self.assertIs(future_light_reading.was_published_within_all_time(), False)
