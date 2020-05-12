import pymongo

class Database(object):
    URI = 'localhost:27017'
    DATABASE = None

    @staticmethod
    def initialize():
        client = pymongo.MongoClient(Database.URI)
        Database.DATABASE = client['todos']

    @staticmethod
    def insert(collection, data):
        Database.DATABASE[collection].insert(data)

    @staticmethod
    def find(collection, query):
        return Database.DATABASE[collection].find(query)

    @staticmethod
    def update_one(collection, user_id, new_query):
        document_one = {'_id': user_id}
        return Database.DATABASE[collection].update(document_one, new_query)

    @staticmethod
    def find_one(collection, query):
        return Database.DATABASE[collection].find_one(query)