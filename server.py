from flask import Flask, render_template, request, url_for, redirect, flash, session
from werkzeug.security import generate_password_hash, check_password_hash

import data_manager

app = Flask(__name__)
app.secret_key = 'ghbdtn93vbh65bdctv407yfv'

MIN_USER_LOGIN_LENGTH = 4
MIN_USER_PASSWORD_LENGTH = 3
def get_logged_user():
    if 'user_name' in session:
        return {'user_name': session['user_name'], 'id': session['id']}
    else:
        return None

@app.route('/')
def main():
    if 'id' in session:
        return render_template('main.html', logged_user=get_logged_user())
    return render_template('main.html')

@app.route('/registration', methods=['GET'])
def get_register_page():
    if 'id' in session:
        return render_template('registration.html', logged_user=get_logged_user())
    else:
        return render_template('registration.html')

@app.route('/registration', methods=['POST'])
def register_user():
    new_user = {}
    user_name = request.form.get('register_username')
    password = request.form.get('register_password')
    check_username = data_manager.get_user_name(user_name)
    if check_username['count'] == 0:
        if len(user_name) >= MIN_USER_LOGIN_LENGTH and len(password) >= MIN_USER_PASSWORD_LENGTH:
            hashed_password = generate_password_hash(password)
            new_user['user_name'] = user_name
            new_user['password'] = hashed_password
            data_manager.add_user(new_user)
            if new_user:
                flash("Successful registration. Log in to continue.", category="success")
                return redirect(url_for('get_login_page'))
        else:
            flash("Please, fill in both fields.", category="error")
    else:
        flash('Username already exists, please choose another one!', category="error")
    return render_template('registration.html')

@app.route('/login', methods=['GET'])
def get_login_page():
    if 'id' in session:
        return render_template('login.html', logged_user=get_logged_user())
    else:
        return render_template('login.html')

@app.route('/user/login', methods=['POST'])
def login_user():
    user_name = request.form.get('login_username')
    password = request.form.get('login_password')
    user_data = data_manager.get_user_password(user_name)
    if user_data and check_password_hash(user_data['password'], password):
        session['id'] = user_data['id']
        session['user_name'] = user_name
        return redirect(url_for('main'))
    else:
        flash("Wrong username or password.", category="error")
        return render_template('login.html')

@app.route("/logout")
def logout():
    session.pop('id', None)
    session.pop('user_name', None)
    return redirect(url_for("main"))




if __name__ == "__main__":
    app.run(
        debug=True,
    )