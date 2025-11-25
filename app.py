from flask import Flask, request, jsonify, render_template
from google import genai   

app = Flask(__name__)

# Enter your api key here 
client = genai.Client(api_key="")



@app.route("/")
def home():
    return render_template("index.html")


@app.route("/get-response", methods=["POST"])
def get_response():
    user_msg = request.json.get("message", "")

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=user_msg
        )

        return jsonify({"reply": response.text})

    except Exception as e:
        return jsonify({"reply": f"Server Error: {str(e)}"})


if __name__ == "__main__":
    app.run(debug=True)

