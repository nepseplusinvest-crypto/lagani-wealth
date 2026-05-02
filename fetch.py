from datetime import datetime
import json

today = datetime.now().strftime("%Y-%m-%d")

# main file
with open("data.json", "w") as f:
    json.dump(output, f, indent=2)

# history file
with open(f"history-{today}.json", "w") as f:
    json.dump(output, f, indent=2)
