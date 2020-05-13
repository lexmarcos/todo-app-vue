import uuid

import bcrypt
from flask import session

from common.database import Database
from models.notes import Notes


class User(object):
    def __init__(self, email, name, password, todos=[], _id=None):
        self.email = email
        self.name = name
        self.password = password
        self.todos = todos
        self._id = uuid.uuid4().hex if _id is None else _id

    @classmethod
    def get_by_email(cls, email):
        data = Database.find_one("users", {"email": email})
        if data is not None:
            return cls(**data)

    @classmethod
    def get_by_id(cls, _id):
        data = Database.find_one("users", {"_id": _id})
        if data is not None:
            return cls(**data)

    @staticmethod
    def login_valid(email, password):
        user = User.get_by_email(email)

        if user is not None:
            return bcrypt.hashpw(password.encode('UTF_8'), user.password).decode() == user.password.decode()
        return False

    @classmethod
    def register(cls, email, name, password):
        user = cls.get_by_email(email)
        hashed = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
        if user is None:
            new_user = cls(email, name, hashed)
            new_user.save_to_mongo()
            session['email'] = email
            session['name'] = name
            return True
        else:
            return False

    @staticmethod
    def login(user_email):
        session['email'] = user_email

    @staticmethod
    def logout():
        session['email'] = None

    def get_todos(self):
        return Notes.find_by_user_id(self._id)[0]['todos']

    def new_todos(self, is_finished, text):
        todo = Notes(author=self.name, is_finished=is_finished, text=text, user_id=self._id)
        todo.save_to_mongo()

    def json(self):
        return {
            "email": self.email,
            "name": self.name,
            "_id": self._id,
            "password": self.password
        }

    def save_to_mongo(self):
        Database.insert("users", self.json())