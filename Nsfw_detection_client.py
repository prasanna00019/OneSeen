import requests


url = "https://Nsfw_detection_api_host.py-ngrok-free.app/classify"

files = {'file': open('test_image1.jpg', 'rb')}  # Replace with your image path

response = requests.post(url, files=files)

#  Debugging: Print status and response text
print(f"Status Code: {response.status_code}")
print(f"Raw Response Text: {response.text}")

#  Check if response is empty or not valid JSON before parsing
if response.status_code == 200 and response.text.strip():
    try:
        data = response.json()
        print("\n *Classification Results*\n" + "="*30)
        for result in data.get("results", []):  # Use .get() to avoid KeyError
            print(f" {result['label'].capitalize()}: {result['score']:.4f}")
        print("\n *Content Status:*", data["status"])
    except requests.exceptions.JSONDecodeError:
        print(" Error: API response is not valid JSON.")
else:
    print(" API returned an empty response or error.")
