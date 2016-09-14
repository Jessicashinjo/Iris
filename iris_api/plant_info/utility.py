import datetime
from django.utils import timezone

class UtilityFunctions:
    @staticmethod
    def was_published_within_one_day():
        published_date = timezone.now()
        return published_date >= timezone.now() - datetime.timedelta(days=1)

    @staticmethod
    def was_published_within_one_week():
        published_date = timezone.now()
        return published_date >= timezone.now() - datetime.timedelta(days=7)

    @staticmethod
    def was_published_within_one_month():
        published_date = timezone.now()
        return published_date >= timezone.now() - datetime.timedelta(days=30)

    @staticmethod
    def was_published_within_all_time():
        published_date = timezone.now()
        return published_date > timezone.now()
