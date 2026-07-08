import json
import os
import threading

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')

class JsonStorage:
    _lock = threading.Lock()

    @staticmethod
    def _get_filepath(filename: str) -> str:
        if not os.path.exists(DATA_DIR):
            os.makedirs(DATA_DIR)
        return os.path.join(DATA_DIR, filename)

    @staticmethod
    def read(filename: str) -> list:
        filepath = JsonStorage._get_filepath(filename)
        with JsonStorage._lock:
            if not os.path.exists(filepath):
                return []
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except (json.JSONDecodeError, IOError):
                return []

    @staticmethod
    def write(filename: str, data: list) -> bool:
        filepath = JsonStorage._get_filepath(filename)
        with JsonStorage._lock:
            try:
                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=4)
                return True
            except IOError:
                return False
