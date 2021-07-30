# Generated by Django 3.2.4 on 2021-07-23 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notesAPI', '0003_alter_note_body'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='body',
        ),
        migrations.AddField(
            model_name='note',
            name='description',
            field=models.TextField(max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='note',
            name='title',
            field=models.TextField(max_length=100, null=True),
        ),
    ]
