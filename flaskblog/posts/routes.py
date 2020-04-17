from flask import (render_template, url_for, flash,
                   redirect, request, abort, Blueprint,session)
from flask_login import current_user, login_required
from flaskblog import db
from flaskblog.models import Post
from flaskblog.posts.forms import PostForm
from flaskblog.posts.utils import nav_search
from flaskblog.main.forms import PlayerForm
from flaskblog.main.utils import get_player_pattern,get_player_attributes

posts = Blueprint('posts', __name__)


@posts.route("/post/new", methods=['GET', 'POST'])
@login_required
def new_post():
    player_form = PlayerForm(request.form)
    players_pattern = get_player_pattern()
    form = PostForm()
    if form.validate_on_submit():
        post = Post(title=form.title.data, content=form.content.data, author=current_user)
        db.session.add(post)
        db.session.commit()
        flash('Your post has been created!', 'success')
        return redirect(url_for('main.home'))
    if (request.method == 'POST'):
        return nav_search()
    return render_template('create_post.html', title='New Post',
                           form=form, legend='New Post',players_pattern=players_pattern)


@posts.route("/post/<int:post_id>",methods=['POST','GET'])
def post(post_id):
    players_pattern = get_player_pattern()
    print(players_pattern)

    if (request.method == 'POST'):
        name = request.form["player"]
        if (get_player_attributes(name) == 0):
            flash('enter a valid name', 'danger')
            return redirect(url_for('main.home'))
    post = Post.query.get_or_404(post_id)
    if (request.method == 'POST'):
        return nav_search()
    return render_template('post.html', title=post.title, post=post,players_pattern=players_pattern)


@posts.route("/post/<int:post_id>/update", methods=['GET', 'POST'])
@login_required
def update_post(post_id):
    players_pattern = get_player_pattern()
    print(players_pattern)
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    form = PostForm()
    if form.validate_on_submit():
        post.title = form.title.data
        post.content = form.content.data
        db.session.commit()
        flash('Your post has been updated!', 'success')
        return redirect(url_for('posts.post', post_id=post.id))
    elif request.method == 'GET':
        form.title.data = post.title
        form.content.data = post.content
    if (request.method == 'POST'):
        return nav_search()
    return render_template('create_post.html', title='Update Post',
                           form=form, legend='Update Post',players_pattern=players_pattern)


@posts.route("/post/<int:post_id>/delete", methods=['POST'])
@login_required
def delete_post(post_id):
    players_pattern = get_player_pattern()
    print(players_pattern)

    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    db.session.delete(post)
    db.session.commit()
    flash('Your post has been deleted!', 'success')
    if (request.method == 'POST'):
        return nav_search()
    return redirect(url_for('main.home'))
