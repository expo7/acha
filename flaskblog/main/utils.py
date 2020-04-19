import pandas as pd
from flask import render_template, request, Blueprint, session, redirect, url_for, flash
from flaskblog.main.forms import PlayerForm
from flaskblog.models import Post

main = Blueprint('main', __name__)
'''
df=pd.read_csv('flaskblog/data.csv')
df['img']='/static/img/backup.png'
print(df.head())
df.to_csv('flaskblog/data.csv',index=False)
'''
f = '../acha/flaskblog/data.csv'
# /home/brendan/Desktop/acha/flaskblog/data.csv


def get_player_attributes(playername):

    df = pd.read_csv(f)
    df.drop('Unnamed: 0', axis=1, inplace=True)
    # print(len(df))
    df = df.drop(df[(df['GP'] == 0)].index)
    df = df.drop(df[(df['PTS'] <= 1)].index)
    # print(len(df))
    df['G/Game'] = df['G'] / df['GP']
    df['A/Game'] = df['A'] / df['GP']
    df['PTS/Game'] = df['PTS'] / df['GP']
    df['PIMS/Game'] = df['PIMS'] / df['GP']
    df['PPG/Game'] = df['PPG'] / df['GP']
    df['SHG/Game'] = df['SHG'] / df['GP']
    try:
        return df.loc[df['Name'] == playername].to_dict('r')[0]
    except:
        return 0


def get_team(playername):
    df = pd.read_csv(f)
    df.drop('Unnamed: 0', axis=1, inplace=True)
    # print(len(df))
    df = df.drop(df[(df['GP'] == 0)].index)
    df = df.drop(df[(df['PTS'] <= 1)].index)

    # print(len(df))
    df['G/Game'] = df['G'] / df['GP']
    df['A/Game'] = df['A'] / df['GP']
    df['PTS/Game'] = df['PTS'] / df['GP']
    df['PIMS/Game'] = df['PIMS'] / df['GP']
    df['PPG/Game'] = df['PPG'] / df['GP']
    df['SHG/Game'] = df['SHG'] / df['GP']

    player = df.loc[df.Name == playername]
    team = player.Team

    # print(df)
    df2 = df.set_index('Team')
    team_players = df2.loc[team]
    team_players = team_players.reset_index()
    # print(team)
    return team_players.to_json()


def get_csv():
    df = pd.read_csv(f)
    df = df.drop(df[(df['GP'] == 0)].index)
    df = df.drop(df[(df['PTS'] <= 1)].index)
    df['G/Game'] = df['G'] / df['GP']
    df['A/Game'] = df['A'] / df['GP']
    df['P/Game'] = df['PTS'] / df['GP']
    df['PIMS/Game'] = df['PIMS'] / df['GP']
    df['PPG/Game'] = df['PPG'] / df['GP']
    df['SHG/Game'] = df['SHG'] / df['GP']
    df.drop('Unnamed: 0', axis=1, inplace=True)
    return df.to_dict('r')
# x=json.loads(get_csv())
# print(x['G'])


def get_player_list():
    df = pd.read_csv(f)
    df['Flag'] = 'https://cdn.sofifa.org/players/4/19/158023.png'
    print(df.head())
    df = df.fillna('no name')

    record = df[['Name', 'Flag']].to_dict('record')
    return [list(r.values()) for r in record]


def get_player_pattern():
    df = pd.read_csv(f)
    option = []

    for i in range(len(df.Name)):
        option.append("<option>{}</option>".format(df.Name[i]))
    listToStr = ' '.join([str(elem) for elem in option])

    return listToStr
# print(get_player_pattern())


def set_img(img_file, name):
    df = pd.read_csv(f)
    df['img'].loc[df.Name == name] = img_file
    df.to_csv(f, index=False)


def nav_search():
    player_form = PlayerForm(request.form)
    players_pattern = get_player_pattern()
    session['playername'] = request.form['player']
    if player_form.validate():
        if (get_player_attributes(request.form["player"]) == 0):
            flash('enter a valid name', 'danger')
            page = request.args.get('page', 1, type=int)
            posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page,
                                                                          per_page=5)
            return render_template('home.html', posts=posts,
                                   players_pattern=players_pattern)
        else:
            return redirect(url_for('stats.player', name=request.form["player"]))
    else:
        flash('enter a valid name', 'danger')
        page = request.args.get('page', 1, type=int)
        posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page,
                                                                      per_page=5)
        return render_template('home.html', posts=posts, players_pattern=players_pattern)
