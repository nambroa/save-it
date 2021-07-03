import django_filters


class TaskFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr='icontains', field_name='title')
    description = django_filters.CharFilter(lookup_expr='icontains', field_name='description')
    completed = django_filters.BooleanFilter(field_name='completed')
