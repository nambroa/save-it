from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, status
from rest_framework import filters as rest_framework_filters
from django_filters import rest_framework as django_filters
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from .filters.task import TaskFilter
from .models.tag import Tag
from .models.task import Task
from .serializers import TaskSerializer, TagSerializer


# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    filter_backends = [django_filters.DjangoFilterBackend, rest_framework_filters.OrderingFilter]
    filterset_class = TaskFilter
    ordering_fields = ['title', 'completed', 'creation_date', 'deadline']
    ordering = ['deadline']


class TagView(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()
    filter_backends = [rest_framework_filters.OrderingFilter]
    ordering_fields = ['name', 'color']
    ordering = ['name']

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.validate_tag_name(serializer.data)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.validate_tag_name(serializer.data)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def validate_tag_name(self, serializer_tag_data):
        try:
            Tag.objects.get(name=serializer_tag_data.get('name'))
        except ObjectDoesNotExist:
            return
        finally:
            raise ValidationError("The Tag name {} already exists.".format(serializer_tag_data.get('name')))
