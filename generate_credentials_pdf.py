from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, KeepTogether
from reportlab.lib.units import inch
from reportlab.lib.colors import Color
import os
import json

def create_pdf(json_file, pdf_filename):
    # Load data
    if not os.path.exists(json_file):
        print(f"Error: {json_file} not found.")
        return
    
    with open(json_file, 'r') as f:
        data_store = json.load(f)

    # Setup document
    doc = SimpleDocTemplate(pdf_filename, pagesize=A4, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
    story = []
    
    # MATCHED LOGO BACKGROUND COLOR
    COLOR_BG = colors.HexColor('#041e41') 
    COLOR_ACCENT = colors.HexColor('#A4A571') 
    COLOR_TEXT_MAIN = colors.white
    COLOR_TEXT_ACCENT = colors.HexColor('#A4A571')
    COLOR_GLASS = Color(1, 1, 1, alpha=0.08)

    # Custom Styles
    styles = getSampleStyleSheet()
    
    # Background and Border helper
    def add_background(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(COLOR_BG)
        canvas.rect(0, 0, A4[0], A4[1], fill=1)
        
        # BRUTAL FRAME (THE ONLY DECORATIVE LINE REMAINING)
        canvas.setStrokeColor(COLOR_ACCENT)
        canvas.setLineWidth(6) 
        canvas.rect(20, 20, A4[0] - 40, A4[1] - 40, fill=0)
        
        # Add Logo on Canvas for precision (only first page)
        # Positioned higher to avoid any overlap with content
        if doc.page == 1:
            logo_path = r'C:\Users\scmej\.gemini\antigravity\playground\pulsing-omega\public\upgoing.png'
            if os.path.exists(logo_path):
                try:
                    logo_w, logo_h = 1.4*inch, 1.4*inch
                    canvas.drawImage(logo_path, (A4[0]-logo_w)/2, A4[1] - 130, width=logo_w, height=logo_h, mask='auto')
                except:
                    pass
        
        canvas.restoreState()

    # Title Style
    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Heading1'],
        fontSize=26,
        textColor=COLOR_ACCENT,
        alignment=1,
        spaceAfter=35,
        fontName='Helvetica-Bold',
        textTransform='uppercase',
        letterSpacing=5
    )

    # Section Header Style
    section_style = ParagraphStyle(
        'SectionStyle',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=COLOR_ACCENT,
        alignment=0,
        spaceBefore=30,
        spaceAfter=15,
        fontName='Helvetica-Bold',
        textTransform='uppercase',
        letterSpacing=2
    )

    # Add spacing at the top to clear the logo drawn by canvas
    story.append(Spacer(1, 1.6*inch))

    # Header Title
    story.append(Paragraph("UPGOING • MASTER ACCESS DIRECTORY", title_style))

    # Common Table Style
    def get_table_style(header_bg):
        return TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), header_bg),
            ('TEXTCOLOR', (0, 0), (-1, 0), COLOR_BG),
            ('BACKGROUND', (0, 1), (-1, -1), COLOR_GLASS),
            ('TEXTCOLOR', (0, 1), (-1, -1), COLOR_TEXT_MAIN),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 9.5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
            ('TOPPADDING', (0, 0), (-1, -1), 12),
            ('GRID', (0, 0), (-1, -1), 1.2, COLOR_ACCENT),
            ('LEFTPADDING', (0, 0), (-1, -1), 14),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ])

    # 1. Hosting Section
    if data_store.get("hosting"):
        story.append(Paragraph("I. SERVER & HOSTING INFRASTRUCTURE", section_style))
        hosting_table_data = [["PROVIDER", "EMAIL / USERNAME", "ACCESS KEY / PASSWORD"]]
        for item in data_store["hosting"]:
            hosting_table_data.append([item.get("service", "").upper(), item.get("email", ""), item.get("password", "")])
        
        t = Table(hosting_table_data, colWidths=[1.5*inch, 2.6*inch, 3.0*inch], repeatRows=1)
        t.setStyle(get_table_style(COLOR_ACCENT))
        story.append(t)

    # 2. Domains Section
    if data_store.get("domains"):
        story.append(Paragraph("II. REGISTERED DOMAINS", section_style))
        domain_table_data = [["DOMAIN NAME", "REGISTRAR / PROVIDER"]]
        for domain in data_store["domains"]:
            domain_table_data.append([domain.get("name", "").upper(), domain.get("registrar", "").upper()])
        
        t2 = Table(domain_table_data, colWidths=[4.6*inch, 2.5*inch], repeatRows=1)
        t2.setStyle(get_table_style(colors.white))
        story.append(t2)

    # 3. Emails Section
    if data_store.get("emails"):
        story.append(Paragraph("III. CORPORATE EMAILS & ALIASES", section_style))
        email_data = [["ACCOUNT EMAIL", "ACCESS PASSWORD", "SERVICE TYPE"]]
        for email in data_store["emails"]:
            email_data.append([email.get("account", ""), email.get("password", ""), email.get("provider", "").upper()])
        
        t4 = Table(email_data, colWidths=[3.2*inch, 2.3*inch, 1.6*inch], repeatRows=1)
        t4.setStyle(get_table_style(COLOR_ACCENT))
        story.append(t4)

    # 4. Platforms Section
    if data_store.get("platforms"):
        for platform in data_store["platforms"]:
            p_name = platform.get('name', '').upper()
            sect = [Paragraph(f"IV. PLATFORM ACCESS: {p_name}", section_style)]
            if platform.get("accounts"):
                account_data = [["AUTHORIZED USER", "LOGIN IDENTIFIER", "PASSWORD"]]
                for acc in platform["accounts"]:
                    account_data.append([acc.get("user", "").upper(), acc.get("email", ""), acc.get("password", "")])
                
                t3 = Table(account_data, colWidths=[2.3*inch, 2.8*inch, 2.0*inch], repeatRows=1)
                t3.setStyle(get_table_style(COLOR_ACCENT))
                sect.append(t3)
            story.append(KeepTogether(sect))

    # Footer
    footer_style = ParagraphStyle('Footer', parent=styles['Normal'], fontSize=8, textColor=COLOR_ACCENT, alignment=1, letterSpacing=1.5)
    story.append(Spacer(1, 60))
    story.append(Paragraph("CONFIDENTIAL ACCESS DOCUMENT • UPGOING GLOBAL • INTERNAL USE ONLY", footer_style))

    # Build PDF
    doc.build(story, onFirstPage=add_background, onLaterPages=add_background)
    print(f"SUCCESS: Brutal PDF generated as {pdf_filename}")

if __name__ == "__main__":
    create_pdf("credentials_data.json", "Upgoing_Credentials_Brutal.pdf")
