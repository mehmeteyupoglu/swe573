# Generated by Django 4.2.11 on 2024-04-06 14:01

from django.db import migrations

def add_default_template(apps, schema_editor):
    Template = apps.get_model('communiche', 'Template')
    DataFields = apps.get_model('communiche', 'DataFields')
    
    # Create a new template
    template = Template.objects.create(name='Default', description='This is a default template for each community.')
    
    # Relate existing data fields to the template
    template.datafields.add(DataFields.objects.get(label='Text Field'))
    template.datafields.add(DataFields.objects.get(label='Description'))
    template.datafields.add(DataFields.objects.get(label='Image'))


class Migration(migrations.Migration):

    dependencies = [
        ('communiche', '0014_alter_datafields_data_type'),
    ]

    operations = [
        migrations.RunPython(add_default_template),
    ]