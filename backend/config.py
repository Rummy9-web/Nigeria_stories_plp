import os
from dotenv import load_dotenv

load_dotenv()

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", ""),
    "database": os.getenv("DB_NAME", "subscription_app")
}

FLUTTERWAVE_SECRET = os.getenv("FLUTTERWAVE_SECRET", "your_flutterwave_secret")
