from flask import render_template, url_for, flash, redirect, request, Blueprint
from flask_login import login_user, current_user, logout_user, login_required
from flaskblog import db, bcrypt
from flaskblog.models import User, Post
from flaskblog.users.forms import (RegistrationForm, LoginForm, UpdateAccountForm,
                                   RequestResetForm, ResetPasswordForm)
from flaskblog.users.utils import save_picture, send_reset_email, nav_search
from flaskblog.main.utils import get_player_pattern
users = Blueprint('users', __name__)


@users.route("/register", methods=['GET', 'POST'])
def register():
    flag = 0
    players_pattern = get_player_pattern()
    form = RegistrationForm()
    if (form.validate_on_submit and request.method == 'POST' and form.password.data):
        flag = 1
        hashed_password = bcrypt.generate_password_hash(
            form.password.data).decode('utf-8')
        user = User(username=form.username.data,
                    email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('users.login'))
    if (request.method == 'POST' and flag == 0):
        return nav_search()
    return render_template('register.html', title='Register', form=form,
                           players_pattern=players_pattern)


@users.route("/login", methods=['GET', 'POST'])
def login():
    flag = 0
    players_pattern = get_player_pattern()
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('main.home'))
        else:
            flag = 1
            flash('Login Unsuccessful. Please check email and password', 'danger')
    if (request.method == 'POST' and flag == 0):
        return nav_search()
    return render_template('login.html', title='Login', form=form,
                           players_pattern=players_pattern)


@users.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('main.home'))


@users.route("/account", methods=['GET', 'POST'])
@login_required
def account():
    players_pattern = get_player_pattern()
    form = UpdateAccountForm()
    if form.validate_on_submit():
        if form.picture.data:
            picture_file = save_picture(form.picture.data)
            current_user.image_file = picture_file
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash('Your account has been updated!', 'success')
        return redirect(url_for('users.account'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.email.data = current_user.email
    image_file = url_for(
        'static', filename='profile_pics/' + current_user.image_file)
    if (request.method == 'POST'):
        return nav_search()
    return render_template('account.html', title='Account',
                           image_file=image_file, form=form,
                           players_pattern=players_pattern)


@users.route("/user/<string:username>", methods=['POST', 'GET'])
def user_posts(username):
    players_pattern = get_player_pattern()
    page = request.args.get('page', 1, type=int)
    user = User.query.filter_by(username=username).first_or_404()
    posts = Post.query.filter_by(author=user)\
        .order_by(Post.date_posted.desc())\
        .paginate(page=page, per_page=5)
    if (request.method == 'POST'):
        return nav_search()
    return render_template('user_posts.html', posts=posts, user=user,
                           players_pattern=players_pattern)


@users.route("/reset_password", methods=['GET', 'POST'])
def reset_request():
    players_pattern = get_player_pattern()
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = RequestResetForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        send_reset_email(user)
        flash('An email has been sent with instructions to reset your password.', 'info')
        return redirect(url_for('users.login'))
    if (request.method == 'POST'):
        return nav_search()
    return render_template('reset_request.html', title='Reset Password', form=form,
                           players_pattern=players_pattern)


@users.route("/reset_password/<token>", methods=['GET', 'POST'])
def reset_token(token):
    players_pattern = get_player_pattern()
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    user = User.verify_reset_token(token)
    if user is None:
        flash('That is an invalid or expired token', 'warning')
        return redirect(url_for('users.reset_request'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(
            form.password.data).decode('utf-8')
        user.password = hashed_password
        db.session.commit()
        flash('Your password has been updated! You are now able to log in', 'success')
        return redirect(url_for('users.login'))
    if (request.method == 'POST'):
        return nav_search()
    return render_template('reset_token.html', title='Reset Password', form=form,
                           players_pattern=players_pattern)
