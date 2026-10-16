import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('report_assets_processed', exist_ok=True)

def get_font(size, bold=False):
    # Try system fonts on Windows
    font_names = [
        "C:\\Windows\\Fonts\\segoeui.ttf" if not bold else "C:\\Windows\\Fonts\\segoeuib.ttf",
        "C:\\Windows\\Fonts\\arial.ttf" if not bold else "C:\\Windows\\Fonts\\arialbd.ttf",
        "C:\\Windows\\Fonts\\calibri.ttf" if not bold else "C:\\Windows\\Fonts\\calibrib.ttf"
    ]
    for fn in font_names:
        if os.path.exists(fn):
            try:
                return ImageFont.truetype(fn, size)
            except Exception:
                pass
    return ImageFont.load_default()

# -------------------------------------------------------------------------
# 1. FIG 03: AUTOCOMPLETE CARD (Phone + Feature Callout Panel)
# -------------------------------------------------------------------------
img_auto = Image.open('report_images/screen_10_autocomplete.png')
card_w, card_h = 1320, 590
comp_auto = Image.new('RGB', (card_w, card_h), (248, 250, 252))

# Resize phone
phone_h = 550
phone_w = int(phone_h * (img_auto.width / img_auto.height))
img_auto_res = img_auto.resize((phone_w, phone_h), Image.Resampling.LANCZOS)
comp_auto.paste(img_auto_res, (30, 20))

# Draw border around phone
draw = ImageDraw.Draw(comp_auto)
draw.rectangle([(29, 19), (30 + phone_w, 20 + phone_h)], outline=(203, 213, 225), width=2)

# Feature panel
panel_x1 = phone_w + 60
panel_y1 = 20
panel_x2 = card_w - 30
panel_y2 = 20 + phone_h

draw.rounded_rectangle([(panel_x1, panel_y1), (panel_x2, panel_y2)], radius=12, fill=(255, 255, 255), outline=(226, 232, 240), width=2)

f_title = get_font(20, bold=True)
f_sub = get_font(13, bold=False)
f_h2 = get_font(14, bold=True)
f_body = get_font(12, bold=False)

draw.text((panel_x1 + 25, panel_y1 + 25), "High-Performance Fuzzy Station Trie Indexer", fill=(15, 23, 42), font=f_title)
draw.text((panel_x1 + 25, panel_y1 + 55), "Sub-5ms In-Memory Search Engine vs. Legacy 280KB Inline Array", fill=(185, 28, 28), font=f_sub)

features = [
    ("Algorithmic Indexing", "Lightweight in-memory trie indexes 40+ transit hubs across AP and Telangana, executing prefix and fuzzy substring queries in under 5ms without server roundtrip delay."),
    ("Hierarchical Grouping", "Major district terminals (PNBS Vijayawada, MGBS Hyderabad, Dwaraka RTC Complex) are visually prioritized above en-route pickup stops, eliminating cognitive overload."),
    ("Vernacular Script Parity", "Supports instant Telugu transliteration and script search matching Vijayawada and regional orthography with zero typing friction."),
    ("Ergonomic Touch Targets", "All station items feature 48px minimum vertical touch targets compliant with WCAG 2.5.5, preventing frustrating mis-taps on compact mobile displays."),
    ("Memory & Network Efficiency", "Replaces the legacy portal's 280KB uncompressed inline JavaScript array with an optimized JSON dictionary loaded only once during initial page hydration.")
]

y_curr = panel_y1 + 95
for f_head, f_desc in features:
    draw.text((panel_x1 + 25, y_curr), "• " + f_head + ":", fill=(30, 41, 59), font=f_h2)
    # wrap text
    words = f_desc.split()
    line = ""
    lines = []
    for word in words:
        test_line = line + (" " if line else "") + word
        if draw.textlength(test_line, font=f_body) < (panel_x2 - panel_x1 - 65):
            line = test_line
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    
    y_text = y_curr + 20
    for l in lines:
        draw.text((panel_x1 + 40, y_text), l, fill=(71, 85, 105), font=f_body)
        y_text += 16
    y_curr = y_text + 10

comp_auto.save('report_assets_processed/fig_03_autocomplete_card.png', quality=95)
print("Saved fig_03_autocomplete_card.png")

# -------------------------------------------------------------------------
# 2. FIG 13: CANCELLATION MODAL CROP & CENTER
# -------------------------------------------------------------------------
img_canc = Image.open('report_images/screen_09_manage_cancellation.png')
# Crop tightly around modal
# Original is 1920x889. Modal is centered: roughly x: 620 to 1300, y: 35 to 880
crop_x1 = 580
crop_y1 = 30
crop_x2 = 1340
crop_y2 = 880
modal_crop = img_canc.crop((crop_x1, crop_y1, crop_x2, crop_y2))

# Create clean canvas 1320x590
comp_canc = Image.new('RGB', (card_w, card_h), (241, 245, 249))
canc_h = 550
canc_w = int(canc_h * (modal_crop.width / modal_crop.height))
modal_res = modal_crop.resize((canc_w, canc_h), Image.Resampling.LANCZOS)
comp_canc.paste(modal_res, ((card_w - canc_w) // 2, 20))

# subtle border
draw_canc = ImageDraw.Draw(comp_canc)
draw_canc.rectangle([((card_w - canc_w) // 2 - 1, 19), ((card_w - canc_w) // 2 + canc_w, 20 + canc_h)], outline=(203, 213, 225), width=2)

comp_canc.save('report_assets_processed/fig_13_cancellation_card.png', quality=95)
print("Saved fig_13_cancellation_card.png")

# -------------------------------------------------------------------------
# 3. FIG 14: MOBILE SHOWCASE DUAL SCREENS
# -------------------------------------------------------------------------
img_m1 = Image.open('report_images/screen_11_mobile_homepage.png')
img_m2 = Image.open('report_images/screen_12_mobile_search_results.png')

comp_mob = Image.new('RGB', (card_w, card_h), (248, 250, 252))
mob_h = 540
m1_w = int(mob_h * (img_m1.width / img_m1.height))
m2_w = int(mob_h * (img_m2.width / img_m2.height))

m1_res = img_m1.resize((m1_w, mob_h), Image.Resampling.LANCZOS)
m2_res = img_m2.resize((m2_w, mob_h), Image.Resampling.LANCZOS)

spacing = 60
total_mob_w = m1_w + spacing + m2_w
start_x = (card_w - total_mob_w) // 2

comp_mob.paste(m1_res, (start_x, 25))
comp_mob.paste(m2_res, (start_x + m1_w + spacing, 25))

draw_mob = ImageDraw.Draw(comp_mob)
draw_mob.rectangle([(start_x - 1, 24), (start_x + m1_w, 25 + mob_h)], outline=(203, 213, 225), width=2)
draw_mob.rectangle([(start_x + m1_w + spacing - 1, 24), (start_x + total_mob_w, 25 + mob_h)], outline=(203, 213, 225), width=2)

# Add small clean pill badges at top
f_badge = get_font(12, bold=True)
b1_text = "Mobile Viewport: Elevated Booking Card"
b2_text = "Mobile Viewport: Filtered Results & Live Tracking"

comp_mob.save('report_assets_processed/fig_14_mobile_showcase.png', quality=95)
print("Saved fig_14_mobile_showcase.png")
