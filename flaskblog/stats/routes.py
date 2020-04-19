from flaskblog.stats.utils import (get_player_attributes, get_team, get_csv,
                                   get_player_pattern)
from flask import render_template, url_for, flash, redirect, request, Blueprint

stats = Blueprint('stats', __name__)


@stats.route('/<name>', methods=['GET', 'POST'])
def player(name):
    players_pattern = get_player_pattern()
    if (request.method == 'POST'):
        name = request.form["player"]
    if (get_player_attributes(name) == 0):
        flash('enter a valid name', 'danger')
        return redirect(url_for('main.home'))

    attributes = get_team(playername=name)
    num = get_player_attributes(name)['#']
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
    return render_template('player.html', ppg=ppg, shg=shg, pimspg=pimspg, apg=apg,
                           ptspg=ptspg, gp=gp, gpg=gpg, g=g, a=a, pts=pts, pims=pims,
                           attributes=attributes, num=num, name=name, data=data,
                           players_pattern=players_pattern, img_f=img_f)
