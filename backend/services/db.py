import os
import json
import uuid

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
os.makedirs(DATA_DIR, exist_ok=True)

class Collection:
    def __init__(self, name):
        self.filepath = os.path.join(DATA_DIR, f'{name}.json')
        if not os.path.exists(self.filepath):
            with open(self.filepath, 'w') as f:
                json.dump([], f)

    def _read(self):
        try:
            with open(self.filepath, 'r') as f:
                return json.load(f)
        except json.JSONDecodeError:
            return []
            
    def _write(self, data):
        with open(self.filepath, 'w') as f:
            json.dump(data, f, indent=4)

    def _match(self, item, query):
        if not query:
            return True
        for k, v in query.items():
            if item.get(k) != v:
                return False
        return True

    def _apply_projection(self, item, projection):
        res = item.copy()
        if projection:
            if projection.get('_id') == 0:
                res.pop('_id', None)
        return res

    def find_one(self, query, projection=None):
        data = self._read()
        for item in data:
            if self._match(item, query):
                return self._apply_projection(item, projection)
        return None

    def find(self, query=None, projection=None):
        query = query or {}
        data = self._read()
        results = []
        for item in data:
            if self._match(item, query):
                results.append(self._apply_projection(item, projection))
        return results

    def insert_one(self, document):
        data = self._read()
        if '_id' not in document:
            document['_id'] = str(uuid.uuid4())
        data.append(document)
        self._write(data)
        class Result: pass
        res = Result()
        res.inserted_id = document['_id']
        return res

    def update_one(self, filter, update):
        data = self._read()
        modified = 0
        for item in data:
            if self._match(item, filter):
                if '$set' in update:
                    for k, v in update['$set'].items():
                        item[k] = v
                modified = 1
                break
        if modified:
            self._write(data)

    def find_one_and_update(self, filter, update, return_document=False):
        data = self._read()
        item_to_return = None
        modified = False
        for item in data:
            if self._match(item, filter):
                original_item = item.copy()
                if '$set' in update:
                    for k, v in update['$set'].items():
                        item[k] = v
                modified = True
                item_to_return = item.copy() if return_document else original_item
                break
        if modified:
            self._write(data)
        return item_to_return

    def delete_one(self, filter):
        data = self._read()
        initial_len = len(data)
        data = [item for item in data if not self._match(item, filter)]
        deleted_count = initial_len - len(data)
        if deleted_count > 0:
            self._write(data)
        class Result: pass
        res = Result()
        res.deleted_count = deleted_count
        return res

    def count_documents(self, filter):
        data = self._read()
        count = 0
        for item in data:
            if self._match(item, filter):
                count += 1
        return count

class DB:
    users = Collection('users')
    admins = Collection('admins')
    quizzes = Collection('quizzes')
    questions = Collection('questions')
    attempts = Collection('attempts')
    results = Collection('results')
