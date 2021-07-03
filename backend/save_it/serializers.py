from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from save_it.models.tag import Tag
from save_it.models.task import Task


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')
        # We drop the unique validation for the Tag's name, since without this we cannot append existing tags to a task.py
        # Inside of a PATCH Task request. Instead, we do the unique name validation in the update and create method
        # for a Task. If the Tag's name already exists, we grab it from the DB, otherwise we create them.
        extra_kwargs = {'name': {'validators': []}, }


class TaskSerializer(WritableNestedModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'completed', 'creation_date', 'deadline', 'tags')

    def create(self, validated_data):
        tags_data = validated_data.pop('tags')

        task = Task.objects.create(**validated_data)
        self.add_tags_to(tags_data, task)

        return task

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags')
        self.add_tags_to(tags_data, instance)
        return instance

    def add_tags_to(self, tags_data, task):
        for tag_data in tags_data:
            try:
                tag = Tag.objects.get(name=tag_data.get('name'))
            except ObjectDoesNotExist:
                tag = Tag.objects.create(**tag_data)
            task.tags.add(tag)
