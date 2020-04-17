from flask import render_template, request, Blueprint,session,redirect,url_for,flash
from flaskblog.models import Post
from flaskblog.main.utils import get_player_pattern,get_player_attributes,nav_search
from flaskblog.main.forms import PlayerForm
main = Blueprint('main', __name__)



@main.route("/",methods=['GET', 'POST'])
def home():
    players_pattern = get_player_pattern()
    if (request.method == 'POST'):
        return nav_search()

    page = request.args.get('page', 1, type=int)
    posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page, per_page=5)
    return render_template('home.html', posts=posts,players_pattern=players_pattern)


@main.route("/about")
def about():
    players_pattern = get_player_pattern()
    print(players_pattern)

    if (request.method == 'POST'):
        name = request.form["player"]
        if (get_player_attributes(name) == 0):
            flash('enter a valid name', 'danger')
            return redirect(url_for('main.home'))
    return render_template('about.html', title='About')
