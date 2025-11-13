from flask import Flask, request, jsonify
from flask_cors import CORS
import os, time
from db import get_db_connection  # ✅ import DB connection

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask server is running!"})

@app.route("/api/upload", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]
    user_id = 1  # ✅ Temporary user_id for now

    # Save file
    filename = f"{user_id}_{int(time.time())}.jpg"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    image.save(filepath)

    # ✅ Save upload info in MySQL
    conn = get_db_connection()
    cursor = conn.cursor()

    sql = "INSERT INTO uploads (user_id, image_url, status) VALUES (%s, %s, %s)"
    cursor.execute(sql, (user_id, filename, "pending"))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({
        "message": "Image uploaded successfully",
        "file_url": f"http://localhost:5000/{filepath}"
    })

@app.route("/detect", methods=["POST"])
def detect_disease():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image found"}), 400

        image = request.files["image"]

        result = {
            "disease": "Late Blight",
            "confidence": 92.5,
            "solution": "Use Mancozeb or Copper-based fungicide. Remove infected leaves."
        }

        # ✅ Store result in DB
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO analysis_results (user_id, plant_name, disease_detected, confidence, suggestion)
            VALUES (%s, %s, %s, %s, %s)
        """, (1, "Potato", result["disease"], result["confidence"], result["solution"]))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify(result)

    except Exception as e:
        print("🔥 Error in /detect:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
