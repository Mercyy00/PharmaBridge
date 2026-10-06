import subprocess
import os
import time

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUTPUT_DIR = r"d:\engineers\JAY\pharmabridge-fixed\screenshots"
BASE_URL = "http://localhost:5173"

pages = [
    ("01_Home_Landing_Hero.png", f"{BASE_URL}/", (1280, 850)),
    ("02_Products_Catalog_Directory.png", f"{BASE_URL}/products", (1280, 950)),
    ("03_Product_Details_Specifications.png", f"{BASE_URL}/products/1", (1280, 850)),
    ("04_Compliance_Accredited_Licenses.png", f"{BASE_URL}/compliance", (1280, 950)),
    ("05_Procurement_Enquiry_Form.png", f"{BASE_URL}/enquiry", (1280, 950)),
    ("06_Buyer_License_Verification_Portal.png", f"{BASE_URL}/upload-license?demoUser=pending", (1280, 880)),
    ("07_Compliance_Officer_Audit_Dashboard.png", f"{BASE_URL}/officer?demoUser=officer", (1280, 900)),
    ("08_Restricted_Technical_Downloads.png", f"{BASE_URL}/downloads?demoUser=buyer", (1280, 900)),
    ("09_Admin_Control_Panel_and_Analytics.png", f"{BASE_URL}/admin?demoUser=admin", (1280, 950)),
    ("10_User_Authentication_Login.png", f"{BASE_URL}/login", (1280, 850)),
    ("11_Buyer_Registration_Portal.png", f"{BASE_URL}/register", (1280, 850)),
    ("12_About_Story_Mission_and_Team.png", f"{BASE_URL}/about", (1280, 950)),
    ("13_Contact_Support_and_FAQ.png", f"{BASE_URL}/contact", (1280, 950)),
]

os.makedirs(OUTPUT_DIR, exist_ok=True)

for fname, url, (w, h) in pages:
    out_file = os.path.join(OUTPUT_DIR, fname)
    cmd = [
        CHROME_PATH,
        "--headless=new",
        f"--screenshot={out_file}",
        f"--window-size={w},{h}",
        "--hide-scrollbars",
        url
    ]
    print(f"Capturing {fname} from {url}...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(out_file):
        size = os.path.getsize(out_file)
        print(f" -> Success! File size: {size} bytes")
    else:
        print(f" -> Error! Stdout: {res.stdout}, Stderr: {res.stderr}")
    time.sleep(0.5)

print("\nAll screenshots captured successfully!")
