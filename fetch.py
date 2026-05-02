from datetime import datetime
import json

today = datetime.now().strftime("%Y-%m-%d")

output = {
    "all": [{"symbol":"TEST","price":100,"change":1}],
    "gainers": [],
    "losers": []
}

with open("data.json", "w") as f:
    json.dump(output, f, indent=2)

with open(f"history-{today}.json", "w") as f:
    json.dump(output, f, indent=2)

print("saved history:", today)
