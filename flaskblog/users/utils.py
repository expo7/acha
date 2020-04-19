
import os
import secrets
from PIL import Image
from flask import (url_for, current_app, request, session, redirect, flash,
                   render_template)
from flask_mail import Message
from flaskblog import mail
from flaskblog.main.forms import PlayerForm
from flaskblog.main.utils import get_player_pattern, get_player_attributes
from flaskblog.models import Post


def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(
        current_app.root_path, 'static/profile_pics', picture_fn)

    output_size = (125, 125)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)

    return picture_fn


def send_reset_email(user):
    token = user.get_reset_token()
    msg = Message('Password Reset Request',
                  sender='noreply@demo.com',
                  recipients=[user.email])
    msg.body = f'''To reset your password, visit the following link:
{url_for('users.reset_token', token=token, _external=True)}

If you did not make this request then simply ignore this email and no changes
will be made.
'''
    mail.send(msg)


def nav_search():
    player_form = PlayerForm(request.form)
    players_pattern = get_player_pattern()
    session['playername'] = request.form['player']
    if player_form.validate():

        if (get_player_attributes(request.form["player"]) == 0):
            flash('enter a valid name', 'danger')
            page = request.args.get('page', 1, type=int)
            posts = Post.query.order_by(
                Post.date_posted.desc()).paginate(page=page, per_page=5)
            return render_template('home.html', posts=posts,
                                   players_pattern=players_pattern)
        else:
            return redirect(url_for('stats.player',
                                    name=request.form["player"]))
    else:
        flash('enter a valid name', 'danger')
        page = request.args.get('page', 1, type=int)
        posts = Post.query.order_by(
            Post.date_posted.desc()).paginate(page=page, per_page=5)
        return render_template('home.html', posts=posts,
                               players_pattern=players_pattern)
