from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from save_it.models.tag import Tag
from save_it.models.task import Task


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ('id', 'name')


class TaskSerializer(WritableNestedModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'completed', 'creation_date', 'deadline', 'tags')
