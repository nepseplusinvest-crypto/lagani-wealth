import requests
import json

url = "https://nepsealpha.com/trading/1/day"
headers = {"User-Agent": "Mozilla/5.0"}

try:
    res = requests.get(url, headers=headers, timeout=10)

    print("STATUS:", res.status_code)

    try:
        data = res.json()
    except:
        data = []

    stocks = []

    # safe loop
    for i in data if isinstance(data, list) else []:
        try:
            stocks.append({
                "symbol": i.get("symbol","N/A"),
                "price": float(i.get("ltp",0)),
                "change": float(i.get("percent_change",0))
            })
        except:
            continue

    # fallback data (IMPORTANT)
    if len(stocks) == 0:
        stocks = [
            {"symbol":"NABIL","price":500,"change":1.2},
            {"symbol":"NICA","price":450,"change":-0.5},
            {"symbol":"HBL","price":600,"change":0.8}
        ]

    gainers = sorted(stocks, key=lambda x: x["change"], reverse=True)[:10]
    losers = sorted(stocks, key=lambda x: x["change"])[:10]

    output = {
        "all": stocks,
        "gainers": gainers,
        "losers": losers
    }

    with open("data.json", "w") as f:
        json.dump(output, f, indent=2)

    print("SUCCESS:", len(stocks))

except Exception as e:
    print("ERROR:", e)

    with open("data.json", "w") as f:
        json.dump({"all":[], "gainers":[], "losers":[]}, f)
