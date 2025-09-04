from flask import Flask, request, jsonify
from db import get_db_connection
from config import FLUTTERWAVE_SECRET
from datetime import datetime, timedelta

app = Flask(__name__)

@app.route("/api/plans", methods=["GET"])
def get_plans():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM plans")
    plans = cursor.fetchall()
    conn.close()
    return jsonify(plans)

@app.route("/api/subscribe", methods=["POST"])
def subscribe():
    data = request.json
    user_id = data.get("user_id")
    plan_id = data.get("plan_id")
    auto_renew = data.get("auto_renew", True)

    conn = get_db_connection()
    cursor = conn.cursor()

    start_date = datetime.now().date()
    end_date = start_date + timedelta(days=30)

    cursor.execute("""
        INSERT INTO subscriptions (user_id, plan_id, status, start_date, end_date, auto_renew)
        VALUES (%s, %s, 'active', %s, %s, %s)
    """, (user_id, plan_id, start_date, end_date, auto_renew))
    conn.commit()
    conn.close()

    return jsonify({"message": "Subscription created"}), 201

@app.route("/api/subscription/status", methods=["GET"])
def subscription_status():
    user_id = request.args.get("user_id")
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT s.*, p.name AS plan_name, p.price
        FROM subscriptions s
        JOIN plans p ON s.plan_id = p.id
        WHERE s.user_id = %s AND s.status = 'active'
    """, (user_id,))
    sub = cursor.fetchone()
    conn.close()

    if sub:
        return jsonify(sub)
    return jsonify({"status": "inactive"})

@app.route("/api/billing/history", methods=["GET"])
def billing_history():
    user_id = request.args.get("user_id")
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT b.*, p.name AS plan_name
        FROM billing b
        JOIN plans p ON b.plan_id = p.id
        WHERE b.user_id = %s
        ORDER BY b.payment_date DESC
    """, (user_id,))
    history = cursor.fetchall()
    conn.close()
    return jsonify(history)

@app.route("/api/payment/webhook", methods=["POST"])
def flutterwave_webhook():
    data = request.json
    secret = request.headers.get("verif-hash")

    if secret != FLUTTERWAVE_SECRET:
        return "Invalid secret", 403

    event = data.get("event")

    if event == "charge.completed":
        payment = data.get("data", {})
        tx_id = payment.get("id")
        email = payment.get("customer", {}).get("email")
        amount = payment.get("amount")
        status = payment.get("status")

        user_id = get_user_id_by_email(email)
        plan_id = get_plan_id_by_amount(amount)

        if user_id and plan_id and status == "successful":
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO billing (user_id, plan_id, amount_paid, payment_status, transaction_id)
                VALUES (%s, %s, %s, %s, %s)
            """, (user_id, plan_id, amount, status, tx_id))
            conn.commit()
            conn.close()
            return "OK", 200

    return "No action", 200

def get_user_id_by_email(email):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None

def get_plan_id_by_amount(amount):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM plans WHERE price = %s", (amount,))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None

if __name__ == "__main__":
    app.run(debug=True)
