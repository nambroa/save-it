# Generated by Django 3.2.3 on 2021-08-12 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, unique=True)),
                ('creation_date', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('description', models.TextField()),
                ('completed', models.BooleanField(default=False)),
                ('creation_date', models.DateField(auto_now_add=True)),
                ('deadline', models.DateField()),
                ('user', models.EmailField(max_length=300)),
                ('tags', models.ManyToManyField(blank=True, related_name='tasks', to='save_it.Tag')),
            ],
        ),
    ]
