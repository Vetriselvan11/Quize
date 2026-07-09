def hash_password(password: str) -> str:
    # Storing plaintext password directly as requested
    return password

def check_password(password: str, stored_password: str) -> bool:
    return password == stored_password
