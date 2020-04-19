from wtforms import Form, StringField, validators
from flask import Blueprint


stats = Blueprint('main', __name__)


class PlayerForm(Form):
    player = StringField(validators=[validators.required()])
