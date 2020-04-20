from flask import render_template, request, Blueprint
from flaskblog.main.utils import (get_player_pattern, nav_search)
from flaskblog.models import Post
main = Blueprint('main', __name__)


@main.route("/", methods=['GET', 'POST'])
def home():
    players_pattern = get_player_pattern()
    if (request.method == 'POST'):
        return nav_search()

    page = request.args.get('page', 1, type=int)
    posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page,
                                                                  per_page=5)
    return render_template('home.html', posts=posts,
                           players_pattern=players_pattern)


@main.route("/message")
def message():
    players_pattern = get_player_pattern()
    if (request.method == 'POST'):
        return nav_search()

    page = request.args.get('page', 1, type=int)
    posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page,
                                                                  per_page=5)
    return render_template('message_board.html', posts=posts,
                           players_pattern=players_pattern)
