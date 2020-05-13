from flask import Flask, render_template, request, session, redirect, make_response, jsonify

from common.database import Database
from models.notes import Notes
from models.user import User

app = Flask(__name__)
app.secret_key = "marcola"
app.debug = True


@app.route('/')
def index_template():
    return render_template('index.html')


@app.route('/logout')
def logout_user():
    print(session['email'])
    session['email'] = None
    return redirect("/#/login")


@app.route('/auth/login', methods=['POST'])
def login_user():
    email = request.json['email']
    password = request.json['password']
    user = ""
    if User.login_valid(email, password):
        User.login(email)
        user = User.get_by_email(email)
    else:
        session['email'] = None
    return jsonify({"response": "works", "user_id": user._id})


@app.route('/auth/register', methods=['POST'])
def register_user():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']

    User.register(email, name, password)
    return redirect("/#/todos")


@app.route('/todos/<string:user_id>', methods=['GET'])
def user_todos(user_id=None):
    if user_id is not None:
        user = User.get_by_id(user_id)
    else:
        user = User.get_by_email(session['email'])
    todos = user.get_todos()
    return jsonify(todos)


@app.route('/todos/new', methods=['POST'])
def create_new_blog():
    todos = request.json['todos']
    user = User.get_by_email(session['email'])
    new_todo = Notes(email=user.email, todos=todos, user_id=user._id)
    new_todo.save_to_mongo()
    return redirect("/#/todos")


@app.route('/user/<string:user_id>', methods=['GET'])
def user_information(user_id=None):
    if user_id is not None:
        user = User.get_by_id(user_id)
    else:
        user = User.get_by_email(session['email'])
    return jsonify({
        "name": user.name,
        "email": user.email
    })


@app.before_first_request
def initialize_database():
    Database.initialize()


if __name__ == "__main__":
    app.run(port=5000)