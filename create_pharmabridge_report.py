import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, color_hex):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def add_styled_heading(doc, text, level=1):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = 'Arial'
    run.bold = True
    if level == 1:
        run.font.size = Pt(15)
        run.font.color.rgb = RGBColor(11, 42, 91) # Pharma Navy
    elif level == 2:
        run.font.size = Pt(13)
        run.font.color.rgb = RGBColor(19, 112, 232) # Pharma Blue
    else:
        run.font.size = Pt(11.5)
        run.font.color.rgb = RGBColor(50, 70, 95)
    return p

def add_body_p(doc, text="", bold_prefix="", space_after=6, line_spacing=1.15):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = line_spacing
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = 'Arial'
        r_pre.font.size = Pt(11)
        r_pre.bold = True
        r_pre.font.color.rgb = RGBColor(15, 23, 42)
    if text:
        r_txt = p.add_run(text)
        r_txt.font.name = 'Arial'
        r_txt.font.size = Pt(11)
        r_txt.font.color.rgb = RGBColor(30, 41, 59)
    return p

def add_bullet_p(doc, bold_prefix="", text=""):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = 'Arial'
        r_pre.font.size = Pt(11)
        r_pre.bold = True
        r_pre.font.color.rgb = RGBColor(15, 23, 42)
    if text:
        r_txt = p.add_run(text)
        r_txt.font.name = 'Arial'
        r_txt.font.size = Pt(11)
        r_txt.font.color.rgb = RGBColor(30, 41, 59)
    return p

def create_report():
    doc = docx.Document()
    
    # Page Setup: Standard Letter, margins
    section = doc.sections[0]
    section.top_margin = Inches(0.8)
    section.bottom_margin = Inches(0.8)
    section.left_margin = Inches(0.85)
    section.right_margin = Inches(0.85)
    section.page_width = Inches(8.5)
    section.page_height = Inches(11.0)
    
    # ============================================================
    # 1. COVER PAGE
    # ============================================================
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(20)
    p_title.paragraph_format.space_after = Pt(12)
    r = p_title.add_run("ON-THE-JOB TRAINING REPORT")
    r.font.name = 'Arial'
    r.font.size = Pt(18)
    r.bold = True
    r.font.color.rgb = RGBColor(11, 42, 91)

    p_proj = doc.add_paragraph()
    p_proj.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_proj.paragraph_format.space_after = Pt(20)
    r = p_proj.add_run("ON\n\"PharmaBridge – B2B Pharmaceutical Compliance & Supply Marketplace Platform\"")
    r.font.name = 'Arial'
    r.font.size = Pt(14)
    r.bold = True
    r.font.color.rgb = RGBColor(19, 112, 232) # Medical Blue

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_after = Pt(8)
    r = p_sub.add_run("SUBMITTED TO")
    r.font.name = 'Arial'
    r.font.size = Pt(12)
    r.bold = True

    p_uni = doc.add_paragraph()
    p_uni.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_uni.paragraph_format.space_after = Pt(12)
    r = p_uni.add_run("SHIVAJI UNIVERSITY, KOLHAPUR")
    r.font.name = 'Arial'
    r.font.size = Pt(16)
    r.bold = True
    r.font.color.rgb = RGBColor(11, 42, 91)

    p_deg = doc.add_paragraph()
    p_deg.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_deg.paragraph_format.space_after = Pt(6)
    r = p_deg.add_run("FOR THE PARTIAL FULFILLMENT OF THE DEGREE OF\nBACHELOR OF SCIENCE IN COMPUTER SCIENCE (ENTIRE)")
    r.font.name = 'Arial'
    r.font.size = Pt(12)
    r.bold = True

    p_sem = doc.add_paragraph()
    p_sem.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sem.paragraph_format.space_after = Pt(28)
    r = p_sem.add_run("B.Sc. Computer Science (Entire) - III (Semester - V)\n(Academic Year: 2026-2027)")
    r.font.name = 'Arial'
    r.font.size = Pt(12)

    p_subby = doc.add_paragraph()
    p_subby.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_subby.paragraph_format.space_after = Pt(6)
    r = p_subby.add_run("SUBMITTED BY")
    r.font.name = 'Arial'
    r.font.size = Pt(11)
    r.bold = True

    p_stud = doc.add_paragraph()
    p_stud.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_stud.paragraph_format.space_after = Pt(26)
    r = p_stud.add_run("Yash Chandrakant Pisal\nRoll No.: 586\nPRN No.: [PRN No]")
    r.font.name = 'Arial'
    r.font.size = Pt(13)
    r.bold = True

    p_dept = doc.add_paragraph()
    p_dept.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_dept.paragraph_format.space_after = Pt(4)
    r = p_dept.add_run("DEPARTMENT OF COMPUTER SCIENCE")
    r.font.name = 'Arial'
    r.font.size = Pt(13)
    r.bold = True

    p_col = doc.add_paragraph()
    p_col.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_col.paragraph_format.space_after = Pt(20)
    r = p_col.add_run("Balwant College, Vita\nVita, Dist. Sangli, Maharashtra - 415311\nAcademic Year: 2026-2027")
    r.font.name = 'Arial'
    r.font.size = Pt(12)

    doc.add_page_break()

    # ============================================================
    # JOINING LETTER & COMPLETION CERTIFICATE PLACEHOLDERS
    # ============================================================
    p_j = doc.add_paragraph()
    p_j.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_j.paragraph_format.space_before = Pt(80)
    r = p_j.add_run("JOINING LETTER\n\n[Attach Official Joining Letter Issued by Axelyne LLP / College Here]")
    r.font.name = 'Arial'
    r.font.size = Pt(14)
    r.bold = True
    r.font.color.rgb = RGBColor(120, 120, 120)

    doc.add_page_break()

    p_c = doc.add_paragraph()
    p_c.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_c.paragraph_format.space_before = Pt(80)
    r = p_c.add_run("ON-THE-JOB TRAINING COMPLETION CERTIFICATE\n\n[Attach Official OJT Completion Certificate Issued by Axelyne LLP Here]")
    r.font.name = 'Arial'
    r.font.size = Pt(14)
    r.bold = True
    r.font.color.rgb = RGBColor(120, 120, 120)

    doc.add_page_break()

    # ============================================================
    # COLLEGE CERTIFICATE
    # ============================================================
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(20)
    p.paragraph_format.space_after = Pt(24)
    r = p.add_run("CERTIFICATE")
    r.font.name = 'Arial'
    r.font.size = Pt(16)
    r.bold = True

    add_body_p(doc, 
        "This is to certify that the On-the-Job Training report entitled \"PharmaBridge – B2B Pharmaceutical Compliance & Supply Marketplace Platform\" submitted herewith for partial fulfillment of the B.Sc. Computer Science (Entire) degree as laid down by Shivaji University, Kolhapur, is the original work completed by Yash Chandrakant Pisal (Roll No.: 586, PRN: [PRN No]) of Balwant College, Vita, under our supervision and guidance, and, to the best of our knowledge, has not been submitted to any other university or examining body for the award of any degree or diploma.",
        space_after=40, line_spacing=1.3)

    p_place = doc.add_paragraph()
    p_place.paragraph_format.space_after = Pt(6)
    r = p_place.add_run("Place : Vita / Kolhapur\nDate  : ______________")
    r.font.name = 'Arial'
    r.font.size = Pt(11)

    p_signs = doc.add_paragraph()
    p_signs.paragraph_format.space_before = Pt(80)
    r = p_signs.add_run("_____________________\t\t_____________________\t\t_____________________\n   Internal Examiner\t\t   External Examiner\t\t   Dr. A.A. Kalgonda\n\t\t\t\t\t\t\t\t     Co-ordinator")
    r.font.name = 'Arial'
    r.font.size = Pt(11)
    r.bold = True

    doc.add_page_break()

    # ============================================================
    # DECLARATION
    # ============================================================
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(20)
    p.paragraph_format.space_after = Pt(20)
    r = p.add_run("DECLARATION")
    r.font.name = 'Arial'
    r.font.size = Pt(16)
    r.bold = True

    add_body_p(doc,
        "I hereby declare that the On-the-Job Training (OJT) report entitled \"PharmaBridge – B2B Pharmaceutical Compliance & Supply Marketplace Platform\" is an authentic record of the training completed by me at Axelyne LLP, Pune during the period from [Start Date] to [End Date].",
        space_after=14, line_spacing=1.25)

    add_body_p(doc,
        "The work presented in this report is based on my practical learning, industry experience, system design, and software implementation activities carried out during the training period. This report has been prepared by me as a part of the academic curriculum for the partial fulfillment of the degree of Bachelor of Science in Computer Science (Entire) Part III affiliated with Shivaji University, Kolhapur.",
        space_after=14, line_spacing=1.25)

    add_body_p(doc,
        "I further declare that the information, system design, program code, screenshots, and findings presented in this report are authentic, true, and correct to the best of my knowledge.",
        space_after=30, line_spacing=1.25)

    p_sig = doc.add_paragraph()
    p_sig.paragraph_format.space_before = Pt(20)
    p_sig.paragraph_format.line_spacing = 1.3
    r = p_sig.add_run("Place : Vita / Kolhapur\nDate  : _______________\n\n\n\n_________________________________\nName of Student : Yash Chandrakant Pisal\nRoll No.         : 586\nPRN No.         : [PRN No]\nSignature of Student")
    r.font.name = 'Arial'
    r.font.size = Pt(11)

    doc.add_page_break()

    # ============================================================
    # ACKNOWLEDGEMENT
    # ============================================================
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(20)
    p.paragraph_format.space_after = Pt(20)
    r = p.add_run("ACKNOWLEDGEMENT")
    r.font.name = 'Arial'
    r.font.size = Pt(16)
    r.bold = True

    add_body_p(doc,
        "I would like to express my sincere gratitude to Axelyne LLP, Pune for providing me with the opportunity, professional facilities, and technical resources to complete my On-the-Job Training (OJT) in enterprise web development and digital compliance systems.",
        space_after=12, line_spacing=1.25)

    add_body_p(doc,
        "I am deeply thankful to my industry supervisor, [Mr./Ms. Supervisor Name], at Axelyne LLP, for valuable guidance, technical mentorship, and constant encouragement throughout the 60 hours of training. The practical knowledge and professional experience gained during this training have helped me enhance my programming skills, understand role-based access architectures, and master modern frontend engineering standards.",
        space_after=12, line_spacing=1.25)

    add_body_p(doc,
        "I express my heartfelt thanks to the Principal, Head of the Department of Computer Science, OJT Coordinator Dr. A.A. Kalgonda, and all faculty members of Balwant College, Vita for their academic support, guidance, and continuous encouragement in successfully completing this training.",
        space_after=12, line_spacing=1.25)

    add_body_p(doc,
        "Finally, I would like to thank everyone who directly or indirectly contributed to the successful completion and documentation of my On-the-Job Training.",
        space_after=30, line_spacing=1.25)

    p_ack_sig = doc.add_paragraph()
    p_ack_sig.paragraph_format.space_before = Pt(20)
    p_ack_sig.paragraph_format.line_spacing = 1.3
    r = p_ack_sig.add_run("Name of Student : Yash Chandrakant Pisal\nRoll No.         : 586\nPRN No.         : [PRN No]\nClass           : B.Sc. Computer Science (Entire) Part III\nSemester        : V\nAcademic Year   : 2026–2027")
    r.font.name = 'Arial'
    r.font.size = Pt(11)

    doc.add_page_break()

    # ============================================================
    # INDEX (TABLE OF CONTENTS)
    # ============================================================
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(16)
    r = p.add_run("INDEX")
    r.font.name = 'Arial'
    r.font.size = Pt(16)
    r.bold = True

    index_table = doc.add_table(rows=12, cols=3)
    index_table.style = 'Table Grid'
    index_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    
    headers = ["Sr. No.", "Contents", "Page No."]
    for c_idx, h in enumerate(headers):
        cell = index_table.cell(0, c_idx)
        cell.text = h
        set_cell_background(cell, "EAF3FD")
        set_cell_margins(cell, top=120, bottom=120, left=150, right=150)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER if c_idx != 1 else WD_ALIGN_PARAGRAPH.LEFT
        p.runs[0].font.name = 'Arial'
        p.runs[0].font.size = Pt(11)
        p.runs[0].bold = True

    index_data = [
        ("1", "Student Information", "1"),
        ("2", "Introduction", "2"),
        ("3", "Objectives of Training", "4"),
        ("4", "Company Profile (Axelyne LLP)", "5"),
        ("5", "Training Details and Activities (Modules 1 to 4)", "7"),
        ("6", "Technologies and Tools Used", "11"),
        ("7", "Task Undertaken (PharmaBridge Platform)", "14"),
        ("8", "Results & Snapshots", "18"),
        ("9", "Skills and Knowledge Acquired", "26"),
        ("10", "Learning Experience", "28"),
        ("11", "Conclusion", "29"),
    ]

    for r_idx, (sr, title, pg) in enumerate(index_data, start=1):
        row = index_table.rows[r_idx]
        for c_idx, val in enumerate([sr, title, pg]):
            cell = row.cells[c_idx]
            cell.text = val
            set_cell_margins(cell, top=90, bottom=90, left=140, right=140)
            p = cell.paragraphs[0]
            if c_idx in [0, 2]:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.runs[0].font.name = 'Arial'
            p.runs[0].font.size = Pt(10.5)

    doc.add_page_break()

    # ============================================================
    # SECTION 1: STUDENT INFORMATION
    # ============================================================
    add_styled_heading(doc, "1. Student Information", level=1)
    
    t_info = doc.add_table(rows=12, cols=2)
    t_info.style = 'Table Grid'
    t_info.alignment = WD_TABLE_ALIGNMENT.CENTER

    info_headers = ["Particulars", "Details"]
    for c_idx, h in enumerate(info_headers):
        cell = t_info.cell(0, c_idx)
        cell.text = h
        set_cell_background(cell, "EAF3FD")
        set_cell_margins(cell, top=100, bottom=100, left=150, right=150)
        p = cell.paragraphs[0]
        p.runs[0].font.name = 'Arial'
        p.runs[0].font.size = Pt(11)
        p.runs[0].bold = True

    info_data = [
        ("Name of Student", "Yash Chandrakant Pisal"),
        ("Roll No.", "586"),
        ("Class", "B.Sc. Computer Science (Entire) Part III"),
        ("PRN No.", "[PRN No]"),
        ("College Name", "Balwant College, Vita, Dist. Sangli, Maharashtra"),
        ("Affiliated University", "Shivaji University, Kolhapur"),
        ("Name of Company", "Axelyne LLP, Pune"),
        ("Company Address", "Office No. B/317, 3rd Floor, Rajdhani Complex, Pune–Satara Road, Dhankawadi, Pune – 411043"),
        ("Training Domain", "Modern Web Development (React & Enterprise Frontend Track)"),
        ("Training Duration", "60 Hours"),
        ("Assigned Project Title", "PharmaBridge – B2B Pharmaceutical Compliance & Supply Marketplace Platform"),
    ]

    for r_idx, (k, v) in enumerate(info_data, start=1):
        row = t_info.rows[r_idx]
        for c_idx, val in enumerate([k, v]):
            cell = row.cells[c_idx]
            cell.text = val
            set_cell_margins(cell, top=80, bottom=80, left=140, right=140)
            p = cell.paragraphs[0]
            p.runs[0].font.name = 'Arial'
            p.runs[0].font.size = Pt(10.5)
            if c_idx == 0:
                p.runs[0].bold = True

    add_body_p(doc, "", space_after=14)

    # ============================================================
    # SECTION 2: INTRODUCTION
    # ============================================================
    add_styled_heading(doc, "2. Introduction", level=1)
    add_body_p(doc,
        "On-the-Job Training (OJT) is an integral, mandatory component of the Bachelor of Science in Computer Science (Entire) curriculum prescribed by Shivaji University, Kolhapur. The objective of OJT is to bridge the gap between classroom theoretical foundations and real-world industrial software engineering practices. It provides students with an authentic immersion into professional corporate software workflows, modern frameworks, agile project cycles, team collaboration, and client requirements.",
        space_after=10)

    add_body_p(doc,
        "I completed my 60-hour On-the-Job Training at Axelyne LLP, Pune, specializing in the modern Web Development and React Engineering track. During this training period, I was assigned to research, design, develop, test, and document \"PharmaBridge\", a comprehensive B2B pharmaceutical compliance and international medical supplies export marketplace platform.",
        space_after=10)

    add_styled_heading(doc, "Industrial Background & Context:", level=2)
    add_body_p(doc,
        "The pharmaceutical export and wholesale distribution sector is one of the most critical and highly regulated global industries. Unlike standard consumer e-commerce, international trade of pharmaceuticals and medical consumables requires strict adherence to statutory drug controls, Good Manufacturing Practices (GMP), ISO certifications, and verified wholesale drug licenses. Unregulated distribution poses severe risks including counterfeit drugs, regulatory penalties, and compromised public health.",
        space_after=10)

    add_body_p(doc,
        "Currently, cross-border pharmaceutical procurement suffers from significant operational friction. Hospitals, government health ministries, and overseas distributors struggle with fragmented product catalogs, opaque pricing, delayed tender quotations, and cumbersome offline verification of drug import licenses. Furthermore, access to critical batch documentation—such as Certificates of Analysis (COA) and Common Technical Document (CTD) Module 3 dossiers—must be strictly restricted to verified, legally compliant institutional buyers.",
        space_after=10)

    add_styled_heading(doc, "Project Vision & Solution (PharmaBridge):", level=2)
    add_body_p(doc,
        "To solve these systemic challenges, PharmaBridge was conceived as an end-to-end digital marketplace and compliance gatekeeper. Built with modern React 19, Vite, React Router v7, and Bootstrap 5, PharmaBridge features an interactive multi-faceted product catalog across Medicines, Medical Devices, and Consumables, alongside an automated buyer licensing verification state machine, a Compliance Officer audit portal, an institutional tender management system, and an enterprise administrator panel.",
        space_after=14)

    # ============================================================
    # SECTION 3: OBJECTIVES OF TRAINING
    # ============================================================
    add_styled_heading(doc, "3. Objectives of Training", level=1)
    add_body_p(doc,
        "The On-the-Job Training programme was structured with clear technical, professional, and domain objectives:")

    add_bullet_p(doc, "Practical Mastery of Modern Web Technologies: ",
        "To acquire hands-on proficiency in HTML5, CSS3, JavaScript (ES6+), React 19, and the Vite build tool, replacing outdated web paradigms with modern component-driven engineering.")

    add_bullet_p(doc, "Understanding Industry Software Workflows: ",
        "To experience how IT companies such as Axelyne LLP execute software projects through structured phases: requirements analysis, UI component design, state architecture, code reviews, and quality testing.")

    add_bullet_p(doc, "Implementation of Role-Based Access Control (RBAC): ",
        "To architect and implement secure client-side role guards and protected routing mechanisms distinguishing Guest, Buyer, Compliance Officer, and Super Administrator personas.")

    add_bullet_p(doc, "Developing Finite State Verification Workflows: ",
        "To design and build an asynchronous buyer verification state machine (transitioning from 'no-license' to 'pending', 'verified', or 'rejected') and connecting it with live compliance auditing controls.")

    add_bullet_p(doc, "State Management & Client-Side Persistence: ",
        "To master React Context API and browser LocalStorage serialization for persisting authenticated user sessions, license document metadata, and procurement inquiries without external dependencies.")

    add_bullet_p(doc, "Cultivating Professional Competence & Ethics: ",
        "To develop workplace discipline, effective technical documentation, systematic bug diagnosis, responsive web design principles, and timely project delivery.")

    add_body_p(doc, "", space_after=12)

    # ============================================================
    # SECTION 4: COMPANY PROFILE (Axelyne LLP)
    # ============================================================
    add_styled_heading(doc, "4. Company Profile", level=1)
    add_body_p(doc, "Axelyne LLP", bold_prefix="Name of the Company: ")
    add_body_p(doc, "Office No. B/317, 3rd Floor, Rajdhani Complex, Near Shankar Maharaj Math, Pune–Satara Road, Dhankawadi, Pune – 411043, Maharashtra, India", bold_prefix="Corporate Address: ")
    add_body_p(doc, "https://axelyne.com", bold_prefix="Official Website: ")

    add_styled_heading(doc, "About Axelyne LLP:", level=2)
    add_body_p(doc,
        "Axelyne LLP is a premier technology-driven software development, product engineering, and digital transformation company headquartered in Pune, Maharashtra. The company specializes in architecting scalable, business-focused solutions across custom software development, modern web applications, mobile app development, enterprise cloud architectures, AI-integrated workflows, and UI/UX engineering.")

    add_body_p(doc,
        "Axelyne maintains an elite engineering workforce of 22+ software professionals, comprising full-stack engineers, frontend specialists, mobile developers, cloud architects, quality assurance engineers, and technical mentors. Over its operational tenure, Axelyne has designed, deployed, and supported over 40+ production software solutions across diverse sectors including healthcare, education, agriculture, governance, fintech, logistics, and retail.")

    add_styled_heading(doc, "Core Services Offered:", level=2)
    add_bullet_p(doc, "Custom Web & Enterprise Applications: ", "Scalable single-page applications (SPAs) and multi-tenant platforms using React.js, Angular, Node.js, and Spring Boot.")
    add_bullet_p(doc, "Mobile Application Development: ", "High-performance cross-platform applications built with Flutter and native technologies for iOS and Android.")
    add_bullet_p(doc, "Cloud Architecture & DevOps: ", "Continuous integration/deployment (CI/CD) pipelines, containerization with Docker, and cloud infrastructure on AWS and GCP.")
    add_bullet_p(doc, "API & Systems Integration: ", "Enterprise RESTful microservices, database design (PostgreSQL, MySQL, MongoDB), and legacy system modernization.")
    add_bullet_p(doc, "UI/UX & Product Design: ", "Human-centric design systems, wireframing, responsive layouts, and accessibility auditing.")

    add_styled_heading(doc, "On-the-Job Training (OJT) Initiatives:", level=2)
    add_body_p(doc,
        "Under its academic and industrial training division, Axelyne LLP conducts structured OJT and internship programs for computer science undergraduates. Students are paired with senior engineering mentors, participate in agile standups, adhere to strict coding standards, and build real-world software modules simulating live enterprise engagements.",
        space_after=14)

    # ============================================================
    # SECTION 5: TRAINING DETAILS AND ACTIVITIES (60 Hours)
    # ============================================================
    add_styled_heading(doc, "5. Training Details and Activities", level=1)
    add_body_p(doc,
        "The 60-hour On-the-Job Training was systematically organized into four intensive progressive work modules under the direct supervision of my industry mentor at Axelyne LLP.")

    # Module 1 Table
    add_styled_heading(doc, "Work Module 1 (01 Hours To 15 Hours): HTML5, CSS3 & Responsive Bootstrap Architecture", level=2)
    t_mod1 = doc.add_table(rows=2, cols=1)
    t_mod1.style = 'Table Grid'
    t_mod1.alignment = WD_TABLE_ALIGNMENT.CENTER
    c_h = t_mod1.cell(0, 0)
    c_h.text = "Work Module 1 (01 Hours To 15 Hours): HTML5, CSS3, Modern Tokens & Bootstrap 5"
    set_cell_background(c_h, "EAF3FD")
    c_h.paragraphs[0].runs[0].bold = True
    
    c_b = t_mod1.cell(1, 0)
    c_b.text = (
        "• Semantic HTML5 & Modern Layout Semantics:\n"
        "   - Comprehensive mastery of structural tags (<main>, <section>, <nav>, <header>, <footer>, <article>).\n"
        "   - Accessible form controls, text inputs, radio selections, dropdown menus, and validation attributes.\n"
        "   - Embedded SVG vector graphics, icons, and multimedia integration.\n"
        "• Advanced CSS3 & Healthcare Design System Tokens:\n"
        "   - CSS Box Model, CSS Grid layouts, and Flexbox alignment matrices for responsive cards.\n"
        "   - Implementation of centralized CSS Custom Properties (--pb-blue: #1370e8, --pb-navy: #0b2a5b, --pb-light: #eaf3fd, --pb-border: #e1ebf7).\n"
        "   - Plus Jakarta Sans typography scaling, drop shadows, and pill button hover transitions.\n"
        "• Bootstrap 5.3 Responsive Framework Integration:\n"
        "   - Responsive 12-column grid layout across breakpoints (xs, sm, md, lg, xl, xxl).\n"
        "   - Pre-built Bootstrap utilities (d-flex, gap-3, align-items-center, rounded-4, shadow-sm).\n"
        "   - Integration of Bootstrap Icons 1.13 for healthcare visual metaphors (capsule, shield, truck, activity)."
    )
    set_cell_margins(c_b, top=100, bottom=100, left=150, right=150)

    add_body_p(doc, "", space_after=8)

    # Module 2 Table
    add_styled_heading(doc, "Work Module 2 (16 Hours To 25 Hours): Modern JavaScript ES6+ & Client-Side Data Handling", level=2)
    t_mod2 = doc.add_table(rows=2, cols=1)
    t_mod2.style = 'Table Grid'
    t_mod2.alignment = WD_TABLE_ALIGNMENT.CENTER
    c_h = t_mod2.cell(0, 0)
    c_h.text = "Work Module 2 (16 Hours To 25 Hours): JavaScript ES6+, Functional Methods & LocalStorage"
    set_cell_background(c_h, "EAF3FD")
    c_h.paragraphs[0].runs[0].bold = True

    c_b = t_mod2.cell(1, 0)
    c_b.text = (
        "• Modern ES6+ Syntactic Foundations:\n"
        "   - Block scoping (let, const), lexical `this`, arrow functions, and template literals.\n"
        "   - Destructuring assignment for arrays and complex nested objects; spread and rest operators (...).\n"
        "   - ES Modules (import/export syntax) for modular, clean architectural separation.\n"
        "• Functional Array Transformations & Data Modeling:\n"
        "   - Advanced utilization of map(), filter(), reduce(), some(), and find() for real-time querying.\n"
        "   - Normalizing multi-attribute datasets: categories, therapeutic areas, dosage forms, and export destinations.\n"
        "   - Set-based deduplication algorithms for dynamic filter generation: [...new Set(products.map(...))].\n"
        "• Asynchronous Execution & Browser Storage APIs:\n"
        "   - Promises, async/await patterns, and error handling with try/catch blocks.\n"
        "   - Web Storage API: JSON serialization, storage synchronization, and retrieval using window.localStorage."
    )
    set_cell_margins(c_b, top=100, bottom=100, left=150, right=150)

    add_body_p(doc, "", space_after=8)

    # Module 3 Table
    add_styled_heading(doc, "Work Module 3 (26 Hours To 45 Hours): React 19 Architecture, Hooks & Declarative Routing", level=2)
    t_mod3 = doc.add_table(rows=2, cols=1)
    t_mod3.style = 'Table Grid'
    t_mod3.alignment = WD_TABLE_ALIGNMENT.CENTER
    c_h = t_mod3.cell(0, 0)
    c_h.text = "Work Module 3 (26 Hours To 45 Hours): React 19, Context API, Hooks & React Router v7"
    set_cell_background(c_h, "EAF3FD")
    c_h.paragraphs[0].runs[0].bold = True

    c_b = t_mod3.cell(1, 0)
    c_b.text = (
        "• React 19 Core Architecture & Tooling:\n"
        "   - Modern frontend project initialization utilizing Vite 8 for sub-second Hot Module Replacement (HMR).\n"
        "   - Declarative JSX syntax, unidirectional data flow, component hierarchies, and prop drilling mitigation.\n"
        "• React Hooks Mastery:\n"
        "   - useState: Local reactive state management for multi-faceted filters, dynamic inputs, and active UI tabs.\n"
        "   - useEffect: Side-effect management, URL synchronization, and local storage state hydration.\n"
        "   - useContext & createContext: Centralizing global authentication and authorization via AuthContext.\n"
        "   - useParams & useNavigate: Programmatic navigation and dynamic routing parameters (/products/:id).\n"
        "• Declarative Routing Shell (React Router v7):\n"
        "   - Defining application routing trees using Routes, Route, Link, and NavLink components.\n"
        "   - Higher-Order Component (HOC) protected route guards enforcing Role-Based Access Control (RBAC).\n"
        "   - Dynamic status checking redirecting unverified buyers to mandatory license upload screens."
    )
    set_cell_margins(c_b, top=100, bottom=100, left=150, right=150)

    add_body_p(doc, "", space_after=8)

    # Module 4 Table
    add_styled_heading(doc, "Work Module 4 (46 Hours To 60 Hours): PharmaBridge Enterprise Implementation & Deployment", level=2)
    t_mod4 = doc.add_table(rows=2, cols=1)
    t_mod4.style = 'Table Grid'
    t_mod4.alignment = WD_TABLE_ALIGNMENT.CENTER
    c_h = t_mod4.cell(0, 0)
    c_h.text = "Work Module 4 (46 Hours To 60 Hours): PharmaBridge Platform Development, Testing & Review"
    set_cell_background(c_h, "EAF3FD")
    c_h.paragraphs[0].runs[0].bold = True

    c_b = t_mod4.cell(1, 0)
    c_b.text = (
        "• PharmaBridge System Implementation:\n"
        "   - Building the Global Products Catalog with real-time multi-criteria filtering and sorting.\n"
        "   - Developing the Buyer Regulatory License verification portal with state transitions (no-license -> pending -> verified / rejected).\n"
        "   - Implementing the Compliance Officer Audit Portal with instant approval, rejection, and audit log tracking.\n"
        "   - Designing the Super Administrator Control Panel with live KPI analytics and catalog management.\n"
        "   - Creating the Restricted Technical Dossier Download Center (accessible only by verified buyers).\n"
        "   - Implementing the Commercial & Institutional Tender Enquiry engine with real-time reference tracking.\n"
        "• Testing, Quality Assurance & Technical Documentation:\n"
        "   - Code linting and quality inspection with Oxlint.\n"
        "   - Cross-browser responsive audits across desktop, tablet, and mobile viewport breakpoints.\n"
        "   - Capturing high-resolution output snapshots, assembling comprehensive OJT documentation, and final supervisor review."
    )
    set_cell_margins(c_b, top=100, bottom=100, left=150, right=150)

    add_body_p(doc, "", space_after=14)

    # ============================================================
    # SECTION 6: TECHNOLOGIES AND TOOLS USED
    # ============================================================
    add_styled_heading(doc, "6. Technologies and Tools Used", level=1)
    add_body_p(doc,
        "The PharmaBridge platform was engineered using a modern, lightweight, industry-standard technology stack:")

    add_styled_heading(doc, "Frontend Frameworks & Libraries:", level=2)
    add_bullet_p(doc, "React 19.2: ", "Modern component-based declarative library utilizing the latest concurrent rendering features, hooks, and clean state primitives.")
    add_bullet_p(doc, "Vite 8.3: ", "Next-generation frontend tooling providing lightning-fast development servers with Hot Module Replacement (HMR) and optimized Rollup production builds.")
    add_bullet_p(doc, "React Router DOM v7.18: ", "Declarative client-side routing library supporting nested routes, dynamic parameters, programmatic redirects, and RBAC route wrappers.")
    add_bullet_p(doc, "Bootstrap 5.3 & Bootstrap Icons 1.13: ", "Comprehensive CSS framework and SVG icon repository providing responsive grid layouts, cards, modals, and healthcare icons.")

    add_styled_heading(doc, "Core Programming Languages & Standards:", level=2)
    add_bullet_p(doc, "JavaScript (ECMAScript 2023+): ", "Core programming language featuring arrow functions, destructuring, promises, array methods, and module exports.")
    add_bullet_p(doc, "HTML5: ", "Semantic web markup providing accessible page structures, forms, audio/video containers, and meta definitions.")
    add_bullet_p(doc, "CSS3: ", "Custom styling utilizing CSS custom properties (design tokens), flexbox, grid, transitions, and responsive media queries.")

    add_styled_heading(doc, "State Architecture & Storage:", level=2)
    add_bullet_p(doc, "React Context API: ", "Centralized application state management handling user sessions, authentication status, and multi-user demo switching.")
    add_bullet_p(doc, "Web Storage (LocalStorage API): ", "Synchronous client-side persistence for user lists, uploaded license records, and active procurement enquiries.")

    add_styled_heading(doc, "Development & Quality Assurance Tools:", level=2)
    add_bullet_p(doc, "Visual Studio Code (VS Code): ", "Primary IDE equipped with ES7+ React/Redux/React-Native snippets, Prettier code formatter, and ESLint extensions.")
    add_bullet_p(doc, "Google Chrome & DevTools: ", "Browser inspection, responsive viewport emulation, network performance analysis, and headless screenshot automation.")
    add_bullet_p(doc, "Git & GitHub: ", "Distributed version control system for tracking commits, branches, and code revisions.")
    add_bullet_p(doc, "Oxlint: ", "High-performance Rust-based JavaScript and React linter ensuring rigorous code quality and best practices.")

    add_body_p(doc, "", space_after=14)

    # ============================================================
    # SECTION 7: TASK UNDERTAKEN (PharmaBridge Platform)
    # ============================================================
    add_styled_heading(doc, "7. Task Undertaken", level=1)
    add_body_p(doc, "PharmaBridge – B2B Pharmaceutical Compliance & Supply Marketplace Platform", bold_prefix="Project Title: ")
    add_body_p(doc,
        "The primary task undertaken during the training was the end-to-end design, implementation, and testing of PharmaBridge, an enterprise-grade web application tailored for international pharmaceutical trade.",
        space_after=10)

    add_styled_heading(doc, "Problem Statement & Solution Scope:", level=2)
    add_body_p(doc,
        "Cross-border pharmaceutical procurement is strictly governed by global and national regulatory bodies (such as the US FDA, European Medicines Agency, and WHO). Buyers must demonstrate verifiable legal licensing before accessing sensitive chemical monographs or purchasing scheduled medicines. Traditional procurement relies on disconnected emails, manual paper verification, and unorganized PDF exchanges.",
        space_after=10)

    add_body_p(doc,
        "PharmaBridge addresses this by consolidating global product catalogs, multi-tiered licensing verification, and regulatory document access into a single, intuitive digital portal. It provides separate, specialized interfaces for overseas buyers, statutory compliance officers, and system administrators.",
        space_after=10)

    add_styled_heading(doc, "Core Functional Modules Developed:", level=2)

    add_bullet_p(doc, "1. Global Product Formulary & Multi-Faceted Filter: ",
        "A catalog containing medicines, medical devices, and consumables. Features category tab switching (All, Medicines, Medical Devices, Consumables), multi-attribute checkbox filters (Therapeutic Area, Manufacturer, Export Region), and sorting algorithms (Price Low-to-High, Price High-to-Low, Alphabetical, and Popularity).")

    add_bullet_p(doc, "2. Detailed Product Specification Monographs: ",
        "Individual dynamic product specification views (/products/:id) displaying high-resolution medical illustrations, compositions, dosage directions, packaging types, indicative bulk pricing, and export territory availability, linked with a 1-click 'Send Enquiry' action.")

    add_bullet_p(doc, "3. Buyer Regulatory License Verification Portal: ",
        "A dedicated verification workflow for registered buyers. Implements a finite state machine: new buyers start with status 'no-license', transition to 'pending' upon uploading their wholesale drug permit, and become 'verified' or 'rejected' based on Compliance Officer auditing.")

    add_bullet_p(doc, "4. Compliance Officer Statutory Audit Portal: ",
        "A secure compliance management console (/officer) restricted to the 'officer' role. Displays KPI badges (Pending Reviews, Verified Buyers), pending license applications with buyer details, attached document tags, and one-click 'Approve' and 'Reject' actions that immediately update buyer permissions.")

    add_bullet_p(doc, "5. Restricted Technical Dossier Download Center: ",
        "A secure repository (/downloads) protected by the ProtectedRoute higher-order component. Only users with role 'buyer' who have achieved status 'verified', or administrative staff ('officer'/'admin'), are permitted access. Unverified buyers are automatically redirected to the license upload portal.")

    add_bullet_p(doc, "6. Commercial & Institutional Tender Enquiry Engine: ",
        "A multi-purpose procurement interface (/enquiry) enabling institutional buyers to submit either commercial product inquiries or bulk governmental supply tenders. Generates unique tracking reference IDs (e.g., ENQ-901, TND-442) and includes a real-time status tracker.")

    add_bullet_p(doc, "7. Super Administrator Control Panel: ",
        "An enterprise management dashboard (/admin) featuring executive KPI metrics (Catalog Products, Registered Users, Export Regions, Compliance Status), active catalog inventory management with search and item removal, user role directories, and a tender inbox.")

    add_bullet_p(doc, "8. Multi-Role Authentication Shell: ",
        "A unified authentication and authorization system with pre-configured demo quick-login buttons for Admin, Compliance Officer, and Verified Buyer personas, ensuring seamless testing and demonstration.")

    add_styled_heading(doc, "Role-Based Access Control (RBAC) Architecture:", level=2)
    add_body_p(doc,
        "PharmaBridge enforces strict access matrices using the ProtectedRoute component. The access hierarchy is summarized below:")

    t_rbac = doc.add_table(rows=5, cols=4)
    t_rbac.style = 'Table Grid'
    t_rbac.alignment = WD_TABLE_ALIGNMENT.CENTER

    rbac_headers = ["User Role", "Permitted Routes", "Restricted Routes", "Verification Required"]
    for c_idx, h in enumerate(rbac_headers):
        cell = t_rbac.cell(0, c_idx)
        cell.text = h
        set_cell_background(cell, "EAF3FD")
        set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.runs[0].bold = True

    rbac_data = [
        ("Guest (Public)", "Home, Products, Details, Compliance, About, Contact, Login, Register, Enquiry", "Downloads, License Upload, Officer, Admin", "No Access"),
        ("Buyer (Unverified)", "Public Pages + License Upload (/upload-license)", "Downloads (redirects to upload), Officer, Admin", "Status = Pending / Rejected"),
        ("Buyer (Verified)", "Public Pages + License Upload + Technical Downloads (/downloads)", "Officer Dashboard, Admin Panel", "Status = Verified"),
        ("Compliance Officer", "Public Pages + Officer Portal (/officer) + Downloads", "Admin Panel", "N/A (Authorized Staff)"),
    ]

    for r_idx, (r, p_r, r_r, v_r) in enumerate(rbac_data, start=1):
        row = t_rbac.rows[r_idx]
        for c_idx, val in enumerate([r, p_r, r_r, v_r]):
            cell = row.cells[c_idx]
            cell.text = val
            set_cell_margins(cell, top=80, bottom=80, left=110, right=110)
            p = cell.paragraphs[0]
            if c_idx == 0:
                p.runs[0].bold = True
            elif c_idx == 3:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    add_body_p(doc, "", space_after=14)

    # ============================================================
    # SECTION 8: RESULTS & SNAPSHOTS
    # ============================================================
    add_styled_heading(doc, "8. Results & Snapshots", level=1)
    add_body_p(doc,
        "This section documents the live output screens, key architectural features implemented, and visual user interfaces of the PharmaBridge platform. All snapshots represent the production build captured at high resolution.")

    screenshots_info = [
        ("01_Home_Landing_Hero.png",
         "Figure 8.1: PharmaBridge Landing Page – Hero Section & Global Trust Pillars",
         "The landing page introduces the platform with a clean healthcare headline, call-to-action button, core trust badges (Serving 100+ countries, GMP & ISO certified, On-time shipping), and primary product category navigation cards."),

        ("02_Products_Catalog_Directory.png",
         "Figure 8.2: Products Catalog Directory with Multi-Faceted Filters & Dynamic Sorting",
         "The central catalog interface allows buyers to filter across categories (All, Medicines, Medical Devices, Consumables), filter by therapeutic areas and manufacturers, and sort dynamically by popularity, price, or name."),

        ("03_Product_Details_Specifications.png",
         "Figure 8.3: Detailed Product Specification Monograph (Atorvastatin 20mg Tablets)",
         "The individual product detail view renders high-resolution illustrative graphics, manufacturer details (Pfizer), chemical composition, dosage guidelines, packaging specifications, indicative pricing, and a direct inquiry button."),

        ("04_Compliance_Accredited_Licenses.png",
         "Figure 8.4: Statutory Export Licenses & Quality Accreditation Monograph",
         "Showcases statutory regulatory export credentials including Export License, Drug Manufacturing License, Wholesale License, and Free Sale Certificates, along with international GMP, ISO 9001:2015, CE, and WHO quality marks."),

        ("05_Procurement_Enquiry_Form.png",
         "Figure 8.5: Commercial Procurement & Institutional Tender Enquiry Engine",
         "An interactive procurement console enabling overseas buyers to request quotes for specific formulations or submit institutional tenders, complete with an inquiry reference generator and real-time tracking tracker."),

        ("06_Buyer_License_Verification_Portal.png",
         "Figure 8.6: Buyer Regulatory Drug License Upload & State Verification Portal",
         "The buyer license interface displaying active verification status ('pending'/'verified'), registration number input, issuing country selector, and drag-and-drop license file upload trigger."),

        ("07_Compliance_Officer_Audit_Dashboard.png",
         "Figure 8.7: Compliance Officer Statutory Audit Dashboard & Pending Review Queue",
         "The dedicated Compliance Officer console displaying live review statistics, pending buyer license applications, attached PDF permits, and one-click 'Approve' and 'Reject' auditing action buttons."),

        ("08_Restricted_Technical_Downloads.png",
         "Figure 8.8: Restricted Technical Dossier & Batch Release Download Center",
         "The secured document portal accessible strictly to verified buyers and compliance officers, providing one-click access to the Global Export Formulary, Certificate of Analysis (COA) batch packages, and CTD Module 3 dossiers."),

        ("09_Admin_Control_Panel_and_Analytics.png",
         "Figure 8.9: Super Administrator Control Panel, Analytics KPIs & Product Inventory",
         "The executive administrator dashboard displaying system KPIs (Catalog Products, Registered Users, Export Regions, Compliance Status), active product formulary with deletion controls, and user authorization tables."),

        ("10_User_Authentication_Login.png",
         "Figure 8.10: Role-Based Authentication & Demo Quick-Login Portal",
         "The secure sign-in portal featuring client-side credential handling and 1-click demo role buttons allowing instant switching between Administrator, Compliance Officer, and Verified Buyer accounts."),

        ("11_Buyer_Registration_Portal.png",
         "Figure 8.11: Institutional Buyer Registration Interface",
         "The buyer onboarding form capturing organization name, official corporate email, and password, creating a buyer account in the initial 'no-license' state."),

        ("12_About_Story_Mission_and_Team.png",
         "Figure 8.12: About PharmaBridge – Mission, Operational Steps & Leadership Team",
         "Documents the corporate vision, global reach statistics (50+ countries, 200+ manufacturers), a 4-step procurement workflow, and the pharmaceutical and regulatory leadership team."),

        ("13_Contact_Support_and_FAQ.png",
         "Figure 8.13: Global Export Desks, Emergency Support & Interactive FAQ Accordion",
         "Provides direct contact channels to regional logistics hubs, 24/7 cold-chain emergency hotlines, and an accessible expandable FAQ accordion for international pharmaceutical trade questions.")
    ]

    screenshot_dir = r"d:\engineers\JAY\pharmabridge-fixed\screenshots"

    for img_name, fig_title, fig_desc in screenshots_info:
        img_path = os.path.join(screenshot_dir, img_name)
        if os.path.exists(img_path):
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_img.paragraph_format.space_before = Pt(14)
            p_img.paragraph_format.space_after = Pt(4)
            p_img.paragraph_format.keep_with_next = True
            
            run_img = p_img.add_run()
            run_img.add_picture(img_path, width=Inches(5.8))
            
            p_cap = doc.add_paragraph()
            p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_cap.paragraph_format.space_before = Pt(2)
            p_cap.paragraph_format.space_after = Pt(4)
            p_cap.paragraph_format.keep_with_next = True
            r_cap = p_cap.add_run(fig_title)
            r_cap.font.name = 'Arial'
            r_cap.font.size = Pt(10)
            r_cap.bold = True
            r_cap.font.color.rgb = RGBColor(11, 42, 91)

            p_desc = doc.add_paragraph()
            p_desc.paragraph_format.space_before = Pt(0)
            p_desc.paragraph_format.space_after = Pt(14)
            r_desc = p_desc.add_run(fig_desc)
            r_desc.font.name = 'Arial'
            r_desc.font.size = Pt(10)

    # ============================================================
    # SECTION 9: SKILLS AND KNOWLEDGE ACQUIRED
    # ============================================================
    add_styled_heading(doc, "9. Skills and Knowledge Acquired", level=1)
    add_body_p(doc,
        "The On-the-Job Training programme at Axelyne LLP enabled me to acquire comprehensive technical skills, architectural insights, and professional workplace competencies:")

    add_styled_heading(doc, "Technical & Engineering Competencies:", level=2)
    add_bullet_p(doc, "Component-Driven UI Engineering: ", "Mastery of React 19 functional components, JSX patterns, atomic component design (Navbar, PageHero, ProductCard, FilterGroup), and props validation.")
    add_bullet_p(doc, "Reactive State Management: ", "Deep understanding of useState for local controls and useContext for centralized global authentication and user permission state.")
    add_bullet_p(doc, "Role-Based Protected Routing: ", "Implementation of client-side security wrappers (ProtectedRoute) preventing unauthorized access and executing programmatic route redirects.")
    add_bullet_p(doc, "Data Filtering & Algorithmic Sorting: ", "Writing optimized JavaScript algorithms for multi-criteria filtering across categories, manufacturers, and regions without performance lags.")
    add_bullet_p(doc, "Modern CSS & Responsive Systems: ", "Applying custom design tokens, CSS variables, flexbox, and Bootstrap 5 grid systems for seamless multi-device responsiveness.")

    add_styled_heading(doc, "Professional & Industrial Competencies:", level=2)
    add_bullet_p(doc, "Industry SDLC & Agile Methodology: ", "Hands-on experience with the complete Software Development Life Cycle: requirement gathering, system architecture, prototyping, coding, and code reviews.")
    add_bullet_p(doc, "Code Quality & Modern Tooling: ", "Adherence to clean code principles, modular file structures, Vite build configuration, and fast static linting with Oxlint.")
    add_bullet_p(doc, "Time Management & Sprint Milestones: ", "Completing assigned project modules punctually within allocated 60-hour timelines under supervisory guidance.")
    add_bullet_p(doc, "Regulatory Domain Knowledge: ", "Gaining an authentic understanding of pharmaceutical trade requirements, GMP/ISO standards, batch Certificates of Analysis (COA), and drug import licensing.")

    add_body_p(doc, "", space_after=14)

    # ============================================================
    # SECTION 10: LEARNING EXPERIENCE
    # ============================================================
    add_styled_heading(doc, "10. Learning Experience", level=1)
    add_body_p(doc,
        "The OJT experience at Axelyne LLP proved to be an invaluable transformative milestone in my academic and professional journey. Prior to the training, my knowledge was primarily theoretical and focused on foundational programming concepts. Working on a real-world enterprise project like PharmaBridge exposed me to the practical complexities and quality standards demanded by the IT industry.",
        space_after=10)

    add_body_p(doc,
        "Under the mentorship of my industry supervisor, I learned that professional software engineering is not merely about writing code that works, but about designing code that is scalable, maintainable, secure, and user-centric. Overcoming real development challenges—such as preventing infinite re-rendering loops in React hooks, managing asynchronous state hydration, and implementing clean RBAC navigation guards—substantially elevated my problem-solving confidence.",
        space_after=10)

    add_body_p(doc,
        "The collaborative corporate environment at Axelyne LLP fostered a disciplined engineering mindset. I learned how to receive constructive feedback during code reviews, document technical features systematically, and communicate progress effectively. This training has solidified my ambition to pursue a professional career as a full-stack web engineer.",
        space_after=14)

    # ============================================================
    # SECTION 11: CONCLUSION
    # ============================================================
    add_styled_heading(doc, "11. Conclusion", level=1)
    add_body_p(doc,
        "The On-the-Job Training programme at Axelyne LLP has been an exceptionally enriching and productive experience. Through the successful design, implementation, and verification of the PharmaBridge platform, I demonstrated the practical application of computer science principles to solve real-world industrial challenges in international healthcare logistics.",
        space_after=10)

    add_body_p(doc,
        "The resulting application successfully delivers a modern, responsive, and secure platform featuring multi-faceted pharmaceutical filtering, automated buyer license auditing, role-restricted technical dossier downloads, institutional tender submissions, and administrator analytics. The project fulfills all curriculum guidelines prescribed by Shivaji University, Kolhapur for the B.Sc. Computer Science (Entire) degree.",
        space_after=10)

    add_body_p(doc,
        "In the future, the platform can be further enhanced by connecting to a dedicated Spring Boot or Node.js backend with PostgreSQL, integrating cloud object storage (AWS S3) for PDF document uploads, and incorporating AI-powered optical character recognition (OCR) for automated verification of drug licenses.",
        space_after=10)

    add_body_p(doc,
        "I express my deepest gratitude to Axelyne LLP, my industry mentor, and the faculty members of the Department of Computer Science at Balwant College, Vita, for their guidance, support, and encouragement throughout this training.",
        space_after=30)

    p_end = doc.add_paragraph()
    p_end.paragraph_format.space_before = Pt(30)
    p_end.paragraph_format.line_spacing = 1.3
    r = p_end.add_run("Place : Vita / Kolhapur\nDate  : _______________\n\n\n\n_________________________________\nSignature of Student\n(Yash Chandrakant Pisal)\nRoll No.: 586")
    r.font.name = 'Arial'
    r.font.size = Pt(11)

    # Save final report to both locations
    out_ojt = r"D:\engineers\JAY\OJT\BSc_CS_OJT_Report_PharmaBridge.docx"
    out_proj = r"d:\engineers\JAY\pharmabridge-fixed\BSc_CS_OJT_Report_PharmaBridge.docx"
    
    doc.save(out_ojt)
    print(f"SUCCESS: Report saved to {out_ojt}")
    doc.save(out_proj)
    print(f"SUCCESS: Report saved to {out_proj}")

if __name__ == '__main__':
    create_report()
