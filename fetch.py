import requests
import json

url = "https://nepsealpha.com/trading/1/day"
headers = {"User-Agent": "Mozilla/5.0"}

res = requests.get(url, headers=headers)
data = res.json()

stocks = []

for i in data:
    stocks.append({
        "symbol": i.get("symbol",""),
        "price": float(i.get("ltp",0)),
        "change": float(i.get("percent_change",0))
    })

gainers = sorted(stocks, key=lambda x: x["change"], reverse=True)[:10]
losers = sorted(stocks, key=lambda x: x["change"])[:10]

output = {
    "all": stocks,
    "gainers": gainers,
    "losers": losers
}

with open("data.json", "w") as f:
    json.dump(output, f, indent=2)
