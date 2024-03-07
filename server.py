from flask import render_template, session
from flask_app import app
from flask_app.Controllers import game_controllers
from flask_app.Config.modifyJSON import get_data

@app.route('/')
def index():
    
    return render_template('index.html', data=get_data())


if __name__ == '__main__':
    app.run(debug=True)