from rest_framework import viewsets, filters

from .models.tag import Tag
from .models.task import Task
from .serializers import TaskSerializer, TagSerializer


# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['title', 'completed', 'creation_date', 'deadline']
    ordering = ['deadline']


class TagView(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['name', 'color']
    ordering = ['name']
