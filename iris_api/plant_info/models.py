from django.db import models


class Sensor(models.Model):
    ''' Moisture Sensor

    Arguments:
    device_id(string) = The id of the Particle Photon Device sending the data
    event_type(string) = Type of event the sensor is publishing (Ex. Moisture)
    published_date(datetime) = Date and time the event reading occured
    sensor_value(string) = The value of the event reading
    '''

    device_id = models.CharField(max_length=100)
    event_type = models.CharField(max_length=50)
    published_date = models.DateTimeField()
    sensor_value = models.CharField(max_length=50)

    def __str__(self):
        return '{}: {}'.format(self.event_type, self.sensor_value)


class CalendarNote(models.Model):
    ''' A note or event created by a User

    Arguments:
    note_content(string) = The text contained to describe the note or event
    note_date(datetime) = The date that the specified note/event happened or
                          will happen
    '''
    note_content = models.CharField(max_length=500)
    note_date = models.DateTimeField()

    def __str__(self):
        return '{}: {}'.format(self.note_date, self.note_content)
