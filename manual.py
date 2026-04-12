import csv
import json

PASSWORD_SET = "sanixskg393290"
CSV_PATH = r"\\dcfs01\77拠点共有\工場別共有\506ひびき工場\技術\有機性脱水汚泥燃料施設\◆第1期\★完成図書\plant-docs\directory_map.csv"

def generate_web_system():
    file_data = []
    exclude_files = ["16_機器仕様書.csv", "17_その他機器仕様書.csv"]
    try:
        with open(CSV_PATH, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            l_c1, l_c2 = "", ""
            for row in reader:
                name = row.get('ファイル名', '').strip()
                if not name or name in exclude_files: continue
                fp = row.get('フルパス', '').strip()
                path = "docs" + fp.split("docs")[-1].replace("\\", "/") if "docs" in fp else fp
                c1 = row.get('サブフォルダ1', '').strip() or l_c1
                l_c1 = c1
                c2 = row.get('サブフォルダ2', '').strip() or l_c2
                l_c2 = c2
                file_data.append({"name": name, "path": path, "cat1": c1, "cat2": c2, "is_new": "2026" in name})
    except Exception as e:
        print(f"エラー: {e}"); return

    if "08_作業要領書" not in [f['cat1'] for f in file_data]:
        file_data.append({"name": "", "path": "", "cat1": "08_作業要領書", "cat2": "", "is_new": False})

    json_files = json.dumps(file_data, ensure_ascii=False)

    try:
        # template.htmlを読み込んで、データを流し込む
        with open("template.html", "r", encoding="utf-8") as f:
            temp = f.read()
        
        output = temp.replace("{{JSON_DATA}}", json_files).replace("{{PASSWORD}}", PASSWORD_SET)
        
        with open("index.html", "w", encoding="utf-8") as f:
            f.write(output)
        print("完了：スマホ対応版 index.html を作成しました")
    except FileNotFoundError:
        print("エラー：template.html が同じフォルダに見当たりません")

if __name__ == "__main__":
    generate_web_system()
