import django_filters


# Since BaseInFilter contains CSVFilter, we can use this mixin to allow filtering by several tag names via the UI.
# CSVFilter integration gives us the comma separated values support for tag names.
class CharInFilter(django_filters.BaseInFilter, django_filters.CharFilter):
    pass


class TaskFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr='icontains', field_name='title')
    description = django_filters.CharFilter(lookup_expr='icontains', field_name='description')
    completed = django_filters.BooleanFilter(field_name='completed')
    tags = CharInFilter(field_name='tags__name')
    deadline = django_filters.DateFilter(field_name='deadline')
    creation_date = django_filters.DateFilter(field_name='creation_date')
