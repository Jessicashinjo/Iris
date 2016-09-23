import datetime
from django.utils import timezone

class UtilityFunctions:
    '''
    Functions for next version which will have a drop down box that allows
    users to select how far back in the sensor history they want to see.
    '''
    @staticmethod
    def was_published_within_one_day():
        ''' Returns sensor readings published within the last day '''
        published_date = timezone.now()
        return published_date >= timezone.now() - datetime.timedelta(days=1)

    @staticmethod
    def was_published_within_one_week():
        ''' Returns sensor readings published within the last week '''
        published_date = timezone.now()
        return published_date >= timezone.now() - datetime.timedelta(days=7)

    @staticmethod
    def was_published_within_one_month():
        ''' Returns sensor readings published within the last month '''
        published_date = timezone.now()
        return published_date >= timezone.now() - datetime.timedelta(days=30)

    @staticmethod
    def was_published_within_all_time():
        ''' Returns all sensor readings ever published'''
        published_date = timezone.now()
        return published_date > timezone.now()
