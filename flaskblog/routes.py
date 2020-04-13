from flaskblog.utils import get_player_attributes, get_team, get_csv, get_player_list, get_player_pattern, set_img
from flask_login import login_user, current_user, logout_user, login_required
from flaskblog.models import User
import os
import secrets
from PIL import Image
from flask import render_template, url_for, flash, redirect, request, session
from flaskblog import app, db, bcrypt
from flaskblog.form import RegistrationForm, LoginForm, PlayerForm, UpdateAccountForm


@app.route('/', methods=['GET', 'POST'])
def home():
    player_form = PlayerForm(request.form)
    players_list = get_player_list()
    players_pattern = get_player_pattern()
    data = get_csv()
    if player_form.validate():
        session['playername'] = request.form['player']
        if (get_player_attributes(request.form["player"]) == 0):
            flash('enter a valid name', 'danger')
            return render_template('home.html', data=data, form=player_form, players_pattern=players_pattern)
        else:
            return redirect(url_for('player', name=request.form["player"]))

    return render_template('home.html', data=data, form=player_form, players_pattern=players_pattern)


@app.route('/<name>', methods=['GET', 'POST'])
def player(name):
    players_pattern = get_player_pattern()
    if (request.method == 'POST'):
        name = request.form["player"]
    if (get_player_attributes(name) == 0):
        flash('enter a valid name', 'danger')
        return redirect(url_for('home'))

    attributes = get_team(playername=name)
    num = get_player_attributes(name)['#']
    p = get_player_attributes(name)
    img_f = get_player_attributes(name)['img']

    g = get_player_attributes(name)['G']
    pts = get_player_attributes(name)['PTS']
    a = get_player_attributes(name)['A']
    pims = get_player_attributes(name)['PIMS']
    gp = get_player_attributes(name)['GP']
    ptspg = round(get_player_attributes(name)['PTS']/gp, 2)
    apg = round(get_player_attributes(name)['A']/gp, 2)
    gpg = round(get_player_attributes(name)['G']/gp, 2)
    pimspg = round(get_player_attributes(name)['PIMS']/gp, 2)
    ppg = get_player_attributes(name)['PPG']
    shg = get_player_attributes(name)['SHG']

    data = get_csv()
    return render_template('player.html', ppg=ppg, shg=shg, pimspg=pimspg, apg=apg, ptspg=ptspg, gp=gp, gpg=gpg, g=g, a=a, pts=pts, pims=pims, attributes=attributes, num=num, name=name, data=data, players_pattern=players_pattern, img_f=img_f)


@app.route("/about")
def about():
    return render_template('about.html', title='About')


@app.route("/register", methods=['GET', 'POST'])
def register():
    players_pattern = get_player_pattern()
    player_form = PlayerForm(request.form)
    if player_form.validate():
        session['playername'] = request.form['player']
        return redirect(url_for('player', name=request.form["player"]))
    players_pattern = get_player_pattern()
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RegistrationForm()
    player_form = PlayerForm(request.form)

    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(
            form.password.data).decode('utf-8')
        user = User(username=form.username.data,
                    email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form, players_pattern=players_pattern)


@app.route("/login", methods=['GET', 'POST'])
def login():
    player_form = PlayerForm(request.form)
    if player_form.validate():
        session['playername'] = request.form['player']
        return redirect(url_for('player', name=request.form["player"]))

    players_pattern = get_player_pattern()
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = LoginForm()

    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get('next')
            flash('You are logged in!', 'success')
            return redirect(next_page) if next_page else redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html', title='Login', form=form, players_pattern=players_pattern)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('home'))


def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(
        app.root_path, 'static/profile_pics', picture_fn)

    output_size = (125, 125)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)

    return picture_fn


@app.route("/account", methods=['GET', 'POST'])
@login_required
def account():
    players_pattern = get_player_pattern()
    form = UpdateAccountForm()
    player_form = PlayerForm(request.form)
    if player_form.validate():
        session['playername'] = request.form['player']
        return redirect(url_for('player', name=request.form["player"]))

    if form.validate_on_submit():
        if form.picture.data:
            picture_file = save_picture(form.picture.data)
            current_user.image_file = picture_file
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash('Your account has been updated!', 'success')
        return redirect(url_for('account'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.email.data = current_user.email
    image_file = url_for(
        'static', filename='profile_pics/' + current_user.image_file)
    set_img(image_file, current_user.username)
    return render_template('account.html', title='Account',
                           image_file=image_file, form=form, players_pattern=players_pattern)
