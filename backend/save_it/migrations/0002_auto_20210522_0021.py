# Generated by Django 3.2.3 on 2021-05-22 00:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('save_it', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('color', models.CharField(max_length=128)),
                ('creation_date', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.AlterField(
            model_name='task',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AddField(
            model_name='task',
            name='tags',
            field=models.ManyToManyField(to='save_it.Tag'),
        ),
    ]
