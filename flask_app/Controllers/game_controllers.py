from flask_app import app
from flask import render_template, request, redirect
from flask_app.Config.modifyJSON import change_values, clear_json, get_data

@app.route('/game_over', methods=['POST'])
def score():
    lines = request.form['lines']
    level = request.form['level']
    score = request.form['score']
    
    return render_template('score.html', lines=lines, level=level, score=score, data=get_data())

@app.route('/the_end')
def the_end():
    return render_template('the_end.html')

@app.route('/new_values', methods=['POST'])
def new_values():
    player = request.form['player']
    score = request.form['score']
    level = request.form['level']
    
    if (player == ""):
        player = "XXXX"
    
    change_values(player, int(score))
    
    if int(level) == 9:
        return redirect('/the_end')
    else:
        return redirect('/')

@app.route("/clear_json")
def clear_data():
    clear_json()

    return redirect("/")