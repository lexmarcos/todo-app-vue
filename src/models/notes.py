import uuid
import datetime
from common.database import Database


class Notes(object):
    def __init__(self, email, todos, user_id):
        self.email = email
        self.todos = todos
        self.user_id = user_id

    @staticmethod
    def remove_empty_todos(todos):
        not_empty_todos = []
        for todo in todos:
            if todo['text'] != "":
                not_empty_todos.append(todo)
        return not_empty_todos

    def save_to_mongo(self):
        return Database.update_one(collection='users', user_id=self.user_id, new_query={"$set": self.json()})

    def json(self):
        return {
            'todos': self.remove_empty_todos(self.todos),
        }

    @classmethod
    def from_mongo(cls, id):
        todo_data = Database.find_one(collection='todos',
                                      query={'_id': id})
        return cls(**todo_data)

    @classmethod
    def find_by_user_id(cls, user_id):
        todos = Database.find(collection='users',
                              query={'_id': user_id})
        todo_list = []
        for todo in todos:
            todo_list.append(todo)
        return todo_list