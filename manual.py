import json
import os
import csv

# ==========================================
# 設定
# ==========================================
PASSWORD_SET = "sanixskg393290"
TEMPLATE_FILE = "template.html"
OUTPUT_FILE = "index.html"
CSV_FILE = "directory_map.csv"

def build_html():
    file_data = []
    detected_categories = set() # 検出したカテゴリーを記録
    
    if not os.path.exists(CSV_FILE):
        print(f"エラー: {CSV_FILE} が見つかりません。")
        return

    try:
        with open(CSV_FILE, "r", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            for row in reader:
                full_path = row.get('フルパス', '')
                sub1 = row.get('サブフォルダ1', '') # ここで 08_作業要領書 を拾う

                # 1. ファイルがある場合
                if full_path and 'docs' in full_path:
                    normalized_path = full_path.replace('\\', '/')
                    parts = normalized_path.split('/')
                    docs_idx = parts.index('docs')
                    if len(parts) > docs_idx + 1:
                        cat = parts[docs_idx + 1]
                        detected_categories.add(cat)
                        file_data.append({
                            "cat1": cat,
                            "name": parts[-1],
                            "path": normalized_path
                        })
                
                # 2. ファイルはないが、カテゴリー名（サブフォルダ1）だけある場合（準備中用）
                elif sub1 and sub1 not in detected_categories:
                    detected_categories.add(sub1)
                    file_data.append({
                        "cat1": sub1,
                        "name": "（準備中）", # 画面に表示する文字
                        "path": "javascript:void(0)" # クリックしてもどこにも飛ばない
                    })

    except Exception as e:
        print(f"CSV読み込みエラー: {e}")
        return

    # テンプレート読み込みと出力処理
    if not os.path.exists(TEMPLATE_FILE):
        print(f"エラー: {TEMPLATE_FILE} が見つかりません。")
        return
    
    with open(TEMPLATE_FILE, "r", encoding="utf-8") as f:
        html_template = f.read()

    file_data.sort(key=lambda x: x['cat1'])
    json_data = json.dumps(file_data, ensure_ascii=False)
    
    output_html = html_template.replace("{{JSON_DATA}}", json_data)
    output_html = output_html.replace("{{PASSWORD}}", PASSWORD_SET)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(output_html)
    
    print("-" * 30)
    print(f"【更新成功】")
    print(f"検出されたカテゴリー: {sorted(list(detected_categories))}")
    print("-" * 30)

if __name__ == "__main__":
    build_html()