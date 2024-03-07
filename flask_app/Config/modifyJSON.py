import json

def get_data():
    with open('flask_app/Models/topTen.json', 'r') as f:
        data = json.load(f)
    
    return data

def save_json(data):
    with open('flask_app/Models/topTen.json', 'w') as f:
        json.dump(data, f, indent=4)

def change_values(player, score):
    with open('flask_app/Models/topTen.json', 'r') as f:
        data = json.load(f)
    
    if data["players"][0]["name"] == "":
        data["players"][0]["name"] = player
        data["players"][0]["score"] = score
    else:
        for i in range(len(data["players"])):
            if data["players"][i]["score"] < score:
                data["players"].insert(i, {"name": player, "score": score})
                data["players"].pop()
                break

    save_json(data)

    print(len(data["players"]))

def clear_json():
    with open('flask_app/Models/topTen.json', 'r') as f:
        data = json.load(f)

    for i in range(len(data["players"])):
        if data["players"][i]["score"] != 0:
            data["players"][i]["score"] = 0
        
        if data["players"][i]["name"] != "":
            data["players"][i]["name"] = ""

    save_json(data)