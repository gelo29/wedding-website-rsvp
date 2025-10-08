#!/bin/bash
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn  wedding_proj.wsgi:application --bind 0.0.0.0:$PORT