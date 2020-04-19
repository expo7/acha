from wtforms import Form, StringField, validators
from wtforms import StringField, PasswordField, SubmitField, BooleanField, Form, TextAreaField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Email, EqualTo, Length, ValidationError
from flaskblog.models import User
from flask_wtf.file import FileField, FileAllowed
from flask_login import current_user
from flask import  Blueprint


stats = Blueprint('main', __name__)



class PlayerForm(Form):
    player = StringField(validators=[validators.required()])
