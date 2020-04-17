
import os
import secrets
from PIL import Image
from flask import url_for, current_app,request,session,redirect,flash,render_template
from flask_mail import Message
from flaskblog import mail
from flaskblog.main.forms import PlayerForm
from flaskblog.main.utils import get_player_pattern,get_player_attributes
from flaskblog.models import Post
def nav_search():
    player_form = PlayerForm(request.form)
    players_pattern = get_player_pattern()
    session['playername'] = request.form['player']
    if player_form.validate():
        if (get_player_attributes(request.form["player"]) == 0):
            flash('enter a valid name', 'danger')
            page = request.args.get('page', 1, type=int)
            posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page, per_page=5)
            return render_template('home.html', posts=posts,players_pattern=players_pattern)
        else:
            return redirect(url_for('stats.player', name=request.form["player"]))
