from PIL import Image

def get_bg_color(img_path):
    img = Image.open(img_path).convert('RGB')
    # Sample top-left corner
    color = img.getpixel((5, 5))
    return '#{:02x}{:02x}{:02x}'.format(*color)

if __name__ == "__main__":
    path = r'C:\Users\scmej\.gemini\antigravity\playground\pulsing-omega\public\upgoing.png'
    print(get_bg_color(path))
