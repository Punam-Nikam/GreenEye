from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ✅ Sample Database for Plant Info
plant_data = {
    "Rice": {
        "description": "Rice is a major cereal crop affected by blast, bacterial leaf blight, etc.",
        "recommendations": [
            {"name": "Use resistant varieties"},
            {"name": "Apply Tricyclazole for blast control"}
        ]
    },
    "Wheat": {
        "description": "Wheat diseases include rust, smut, and powdery mildew.",
        "recommendations": [
            {"name": "Use fungicides such as Mancozeb"},
            {"name": "Avoid waterlogging and use crop rotation"}
        ]
    },
    "Tomato": {
        "description": "Tomato is commonly affected by early blight, late blight, and leaf curl virus.",
        "recommendations": [
            {"name": "Apply Copper Oxychloride"},
            {"name": "Use virus-free seedlings"}
        ]
    },
    "Potato": {
        "description": "Potato suffers from late blight, black scurf, and viral diseases.",
        "recommendations": [
            {"name": "Spray Metalaxyl for late blight"},
            {"name": "Use certified seed potatoes"}
        ]
    }
}

# ✅ API to get plant info
@app.route('/plant-info', methods=['GET'])
def plant_info():
    plant_name = request.args.get('plant')
    if not plant_name:
        return jsonify({"error": "No plant specified"}), 400

    info = plant_data.get(plant_name)
    if not info:
        return jsonify({"error": f"No data available for {plant_name}"}), 404

    return jsonify(info)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
