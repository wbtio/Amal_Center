import os
import urllib.request
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from PIL import Image
import arabic_reshaper
from bidi.algorithm import get_display

def download_fonts():
    font_dir = os.path.join(os.path.dirname(__file__), "fonts")
    os.makedirs(font_dir, exist_ok=True)
    
    # Raw TTF URLs from GitHub (Google Fonts repository)
    reg_url = "https://github.com/google/fonts/raw/main/ofl/tajawal/Tajawal-Regular.ttf"
    bold_url = "https://github.com/google/fonts/raw/main/ofl/tajawal/Tajawal-Bold.ttf"
    
    reg_path = os.path.join(font_dir, "Tajawal-Regular.ttf")
    bold_path = os.path.join(font_dir, "Tajawal-Bold.ttf")
    
    print("Downloading Tajawal fonts...")
    if not os.path.exists(reg_path):
        urllib.request.urlretrieve(reg_url, reg_path)
    if not os.path.exists(bold_path):
        urllib.request.urlretrieve(bold_url, bold_path)
    
    return reg_path, bold_path

def reshape_text(text):
    reshaped = arabic_reshaper.reshape(text)
    return get_display(reshaped)

def wrap_and_reshape_arabic(text, width_chars=65):
    paragraphs = text.split('\n')
    reshaped_lines = []
    
    for para in paragraphs:
        if not para.strip():
            reshaped_lines.append("")
            continue
            
        words = para.split()
        lines = []
        current_line = []
        current_length = 0
        
        for word in words:
            # Rough estimate of character length including word
            word_len = len(word)
            if current_length + word_len + 1 <= width_chars:
                current_line.append(word)
                current_length += word_len + 1
            else:
                lines.append(" ".join(current_line))
                current_line = [word]
                current_length = word_len
        if current_line:
            lines.append(" ".join(current_line))
            
        for line in lines:
            reshaped_lines.append(reshape_text(line))
            
    return reshaped_lines

def draw_section_header(c, title, y, right_x):
    # Background strip for section header
    c.setFillColor(HexColor("#f1f5f9"))
    c.rect(50, y - 6, 495, 24, fill=1, stroke=0)
    
    # Border line on the right side of the section (accent)
    c.setFillColor(HexColor("#0f766e")) # Teal
    c.rect(right_x - 4, y - 6, 4, 24, fill=1, stroke=0)
    
    # Title Text
    c.setFillColor(HexColor("#0f172a")) # Slate 900
    c.setFont("Tajawal-Bold", 12)
    c.drawRightString(right_x - 12, y, reshape_text(title))
    return y - 25

def draw_header(c, page_num):
    # Top banner color line
    c.setFillColor(HexColor("#0f172a")) # Slate 900
    c.rect(50, 800, 495, 3, fill=1, stroke=0)
    
    c.setFont("Tajawal", 9)
    c.setFillColor(HexColor("#64748b")) # Slate 500
    # Left aligned app name
    c.drawString(50, 808, reshape_text("الأمل هايبر ماركت — دليل الإدارة"))
    # Right aligned page name
    c.drawRightString(545, 808, reshape_text("دليل موظف إدخال البيانات والمنتجات"))
    
    # Footer
    c.setFont("Tajawal", 9)
    c.setFillColor(HexColor("#94a3b8")) # Slate 400
    c.drawCentredString(297, 30, reshape_text(f"صفحة {page_num} من 5"))
    # Decorative line above footer
    c.setStrokeColor(HexColor("#e2e8f0"))
    c.setLineWidth(0.5)
    c.line(50, 45, 545, 45)

def draw_stage(c, stage_num, title, desc_text, image_name, y, right_x):
    # Draw stage title
    c.setFont("Tajawal-Bold", 11)
    c.setFillColor(HexColor("#0f766e")) # Teal 700
    c.drawRightString(right_x, y, reshape_text(f"المرحلة {stage_num}: {title}"))
    y -= 16
    
    # Draw stage description
    c.setFont("Tajawal", 9.5)
    c.setFillColor(HexColor("#334155")) # Slate 700
    desc_lines = wrap_and_reshape_arabic(desc_text, width_chars=80)
    for line in desc_lines:
        c.drawRightString(right_x, y, line)
        y -= 15
        
    y -= 8
    
    # Draw image
    image_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", image_name))
    if os.path.exists(image_path):
        try:
            im = Image.open(image_path)
            w, h = im.size
            aspect = h / w
            img_w = 320
            img_h = img_w * aspect
            img_x = 50 + (495 - img_w) / 2 # Center it
            
            # Draw border around the screenshot to look neat
            c.setStrokeColor(HexColor("#cbd5e1")) # Slate 300
            c.setLineWidth(0.5)
            c.rect(img_x - 1, y - img_h - 1, img_w + 2, img_h + 2, fill=0, stroke=1)
            
            c.drawImage(image_path, img_x, y - img_h, width=img_w, height=img_h)
            y -= (img_h + 20)
        except Exception as e:
            print(f"Error drawing {image_name}: {e}")
            y -= 10
    else:
        print(f"File not found: {image_path}")
        y -= 10
        
    return y

def main():
    reg_path, bold_path = download_fonts()
    pdfmetrics.registerFont(TTFont('Tajawal', reg_path))
    pdfmetrics.registerFont(TTFont('Tajawal-Bold', bold_path))
    
    pdf_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "AlAmal_Center_Management_Guide.pdf"))
    c = canvas.Canvas(pdf_path, pagesize=A4)
    
    width, height = A4 # 595 x 842
    margin_left = 50
    margin_right = 545
    print_width = 495
    
    # ---------------- PAGE 1: INTRODUCTION ----------------
    draw_header(c, 1)
    
    # Title Block
    c.setFillColor(HexColor("#0f766e")) # Teal 700
    c.setFont("Tajawal-Bold", 20)
    c.drawCentredString(297, 740, reshape_text("دليل موظف إدخال البيانات والمنتجات"))
    
    c.setFillColor(HexColor("#0f172a")) # Slate 900
    c.setFont("Tajawal-Bold", 14)
    c.drawCentredString(297, 710, reshape_text("تطبيق الأمل هايبر ماركت ولوحة التحكم"))
    
    # Divider
    c.setStrokeColor(HexColor("#0f766e"))
    c.setLineWidth(1.5)
    c.line(150, 695, 445, 695)
    
    y = 660
    
    # Section 1: معلومات أساسية عن التطبيق
    y = draw_section_header(c, "1. معلومات أساسية عن التطبيق", y, margin_right)
    
    info_text = (
        "تطبيق الأمل سنتر هو التطبيق الرسمي لـ (الأمل هايبر ماركت) المخصص لخدمة العملاء وتسهيل "
        "عملية تسوق المنتجات والاطلاع على أحدث العروض والأسعار مباشرة من هواتفهم. "
        "يتوفر التطبيق رسمياً على منصتي (جوجل بلاي) و(آبل ستور) لضمان تغطية كاملة لجميع الأجهزة."
    )
    
    c.setFont("Tajawal", 10)
    c.setFillColor(HexColor("#334155")) # Slate 700
    lines = wrap_and_reshape_arabic(info_text, width_chars=75)
    for line in lines:
        c.drawRightString(margin_right, y, line)
        y -= 18
        
    y -= 15
    
    # Embed App Store & Google Play Logos/Screenshots side-by-side
    img_apple = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "image apple store.png"))
    img_google = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "image google play.png"))
    
    img_width = 190
    
    # Apple Store screenshot
    if os.path.exists(img_apple):
        try:
            im = Image.open(img_apple)
            w, h = im.size
            ratio = h / w
            adjusted_height = img_width * ratio
            c.drawImage(img_apple, margin_left + 15, y - adjusted_height, width=img_width, height=adjusted_height)
            
            # Draw label under it
            c.setFont("Tajawal-Bold", 9)
            c.setFillColor(HexColor("#0f172a"))
            c.drawCentredString(margin_left + 15 + (img_width / 2), y - adjusted_height - 18, reshape_text("نسخة تطبيق آبل ستور (Apple Store)"))
        except Exception as e:
            print(f"Error drawing apple image: {e}")
            
    # Google Play screenshot
    if os.path.exists(img_google):
        try:
            im = Image.open(img_google)
            w, h = im.size
            ratio = h / w
            adjusted_height = img_width * ratio
            c.drawImage(img_google, margin_right - img_width - 15, y - adjusted_height, width=img_width, height=adjusted_height)
            
            # Draw label under it
            c.setFont("Tajawal-Bold", 9)
            c.setFillColor(HexColor("#0f172a"))
            c.drawCentredString(margin_right - 15 - (img_width / 2), y - adjusted_height - 18, reshape_text("نسخة تطبيق جوجل بلاي (Google Play)"))
        except Exception as e:
            print(f"Error drawing google image: {e}")
            
    # Move to page 2: Stages 1 & 2
    c.showPage()
    
    # ---------------- PAGE 2: STAGES 1 & 2 ----------------
    draw_header(c, 2)
    y = 750
    y = draw_section_header(c, "2. خطوات رفع المنتجات بالتفصيل (المراحل 1 - 2)", y, margin_right)
    
    # Stage 1: Login
    stage1_desc = (
        "تبدأ العملية بفتح صفحة تسجيل الدخول بلوحة التحكم (Admin Panel) وإدخال البريد الإلكتروني "
        "المخصص للموظف المسؤول (مثل pm_manager@alamal.com) وكلمة المرور لضمان الدخول الآمن."
    )
    y = draw_stage(c, "1", "تسجيل الدخول إلى النظام", stage1_desc, "image00.png", y, margin_right)
    
    # Stage 2: Navigation
    stage2_desc = (
        "بعد تسجيل الدخول بنجاح، يتم التوجه لقائمة (المنتجات) في الشريط الجانبي لعرض قائمة المنتجات الحالية، "
        "ثم الضغط على زر (إضافة منتج) باللون الأخضر لبدء إضافة منتج جديد."
    )
    y = draw_stage(c, "2", "الانتقال لصفحة المنتجات وبدء الإضافة", stage2_desc, "image01.png", y, margin_right)
    
    # Move to page 3: Stages 3 & 4
    c.showPage()
    
    # ---------------- PAGE 3: STAGES 3 & 4 ----------------
    draw_header(c, 3)
    y = 750
    y = draw_section_header(c, "2. خطوات رفع المنتجات بالتفصيل (المراحل 3 - 4)", y, margin_right)
    
    # Stage 3: Choose Method
    stage3_desc = (
        "يعرض النظام طريقتين للإضافة لتسهيل العمل: الإضافة اليدوية التقليدية لمن يريد تعبئة كل التفاصيل "
        "بنفسه، أو الإضافة السريعة التي تستخدم الذكاء الاصطناعي لقراءة الصور وملء البيانات تلقائياً."
    )
    y = draw_stage(c, "3", "اختيار طريقة إضافة المنتج", stage3_desc, "image02.png", y, margin_right)
    
    # Stage 4: Empty Manual Form
    stage4_desc = (
        "في حال اختيار (الإضافة اليدوية)، ستفتح لك واجهة نموذج إضافة منتج يدوياً فارغة، تحتوي على "
        "حقول الاسم بالعربية والإنجليزية، السعر بالدينار، الكمية، اختيار القسم، والوصف."
    )
    y = draw_stage(c, "4", "نموذج الإضافة اليدوية الفارغ", stage4_desc, "image03.png", y, margin_right)
    
    # Move to page 4: Stages 5 & 6
    c.showPage()
    
    # ---------------- PAGE 4: STAGES 5 & 6 ----------------
    draw_header(c, 4)
    y = 750
    y = draw_section_header(c, "2. خطوات رفع المنتجات بالتفصيل (المراحل 5 - 6)", y, margin_right)
    
    # Stage 5: Manual Form Filled
    stage5_desc = (
        "يقوم الموظف بملء كامل الحقول وتحديد القسم ورفع صورة المنتج الواضحة (مثل بيبسي)، "
        "ثم يتم الضغط على زر (حفظ المنتج) الأخضر في الأسفل ليتم نشر المنتج فوراً."
    )
    y = draw_stage(c, "5", "تعبئة وحفظ النموذج اليدوي", stage5_desc, "image04.png", y, margin_right)
    
    # Stage 6: Quick Add Form
    stage6_desc = (
        "عند اختيار (الإضافة السريعة بالذكاء الاصطناعي)، تفتح لك صفحة تطلب منك رفع صورتين للمنتج: "
        "الصورة الأمامية (واجهة المنتج مع الاسم) والصورة الخلفية (التي تحتوي المكونات والتفاصيل)."
    )
    y = draw_stage(c, "6", "بدء الإضافة السريعة بالذكاء الاصطناعي", stage6_desc, "image05.png", y, margin_right)
    
    # Move to page 5: Stages 7 & 8 + Warning
    c.showPage()
    
    # ---------------- PAGE 5: STAGES 7 & 8 + WARNING ----------------
    draw_header(c, 5)
    y = 750
    y = draw_section_header(c, "2. خطوات رفع المنتجات بالتفصيل (المراحل 7 - 8)", y, margin_right)
    
    # Stage 7: Upload Images for Quick Add
    stage7_desc = (
        "يتم رفع الصورتين (مثال: عبوة منظف الأرضيات The Pink Stuff)، ثم الضغط على زر "
        "(معالجة بالذكاء الاصطناعي) باللون البنفسجي لتبدأ معالجة وقراءة محتويات الصور."
    )
    y = draw_stage(c, "7", "رفع صور المنتج ومعالجتها", stage7_desc, "image06.png", y, margin_right)
    
    # Stage 8: Review & Save Extracted Data
    stage8_desc = (
        "يقوم النظام بملء الاسم والوصف والقسم تلقائياً بناءً على تحليل الصور. "
        "يقوم الموظف بمراجعة البيانات وتعديلها إن لزم، ثم إدخال السعر والكمية وحفظ المنتج."
    )
    y = draw_stage(c, "8", "مراجعة البيانات المستخرجة وتأكيد الحفظ", stage8_desc, "image07.png", y, margin_right)
    
    # Important Notice Warning Box
    if y > 100:
        c.setFillColor(HexColor("#fffbeb")) # Amber 50 (light yellow background)
        c.rect(50, y - 50, 495, 60, fill=1, stroke=1)
        c.setStrokeColor(HexColor("#f59e0b")) # Amber 500 border
        c.setLineWidth(1)
        c.rect(50, y - 50, 495, 60, fill=0, stroke=1)
        
        # Red/Orange bar on the right of warning box
        c.setFillColor(HexColor("#d97706")) # Amber 600
        c.rect(541, y - 50, 4, 60, fill=1, stroke=0)
        
        # Text inside warning box
        warning_title = "⚠️ تنبيه هام لموظف البيانات:"
        warning_body = "يرجى مراجعة الأسعار والأقسام بدقة قبل الحفظ. أي خطأ في السعر سيظهر مباشرة للمستهلكين في التطبيق وقد يؤدي إلى إشكاليات في البيع."
        
        c.setFont("Tajawal-Bold", 9)
        c.setFillColor(HexColor("#78350f")) # Amber 900
        c.drawRightString(530, y - 10, reshape_text(warning_title))
        
        c.setFont("Tajawal", 9)
        c.setFillColor(HexColor("#78350f"))
        warning_body_lines = wrap_and_reshape_arabic(warning_body, width_chars=75)
        current_warning_y = y - 26
        for line in warning_body_lines:
            c.drawRightString(530, current_warning_y, line)
            current_warning_y -= 14
            
    c.save()
    print(f"PDF saved successfully at: {pdf_path}")

if __name__ == "__main__":
    main()
