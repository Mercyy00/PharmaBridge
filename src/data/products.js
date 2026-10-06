export const categories = ["Medicines", "Medical Devices", "Consumables"];

// Paste only the photo id, for example unsplash("photo-1584308666744-24d5c474f2ae")
// Empty "" = the built-in illustration for that product is shown (always works, no internet needed).
// If a photo URL fails to load, the illustration is shown automatically.
const unsplash = (id) =>
  id ? `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70` : "";

export const products = [
  {
    id: 1, name: "Atorvastatin 20 mg Tablets", category: "Medicines",
    manufacturer: "Pfizer", therapeuticArea: "Cardiovascular",
    description: "Used to lower cholesterol and reduce the risk of heart attack and stroke.",
    price: 45, unit: "per box (30 tablets)",
    regions: ["North America", "Europe", "Asia", "Middle East"],
    composition: "Atorvastatin Calcium 20 mg", dosage: "As directed by a physician",
    packaging: "Box of 30 tablets",
    // search: https://unsplash.com/s/photos/medicine-tablets
    image: unsplash(""),
  },
  {
    id: 2, name: "Omron Blood Pressure Monitor", category: "Medical Devices",
    manufacturer: "Omron", therapeuticArea: null,
    description: "Accurate and easy-to-use digital BP monitor for home and clinical use.",
    price: 78, unit: "per unit",
    regions: ["North America", "Europe", "Asia", "Africa"],
    composition: "Upper-arm automatic digital monitor", dosage: "Not applicable",
    packaging: "1 unit per box",
    // search: https://unsplash.com/s/photos/blood-pressure-monitor
    image: unsplash(""),
  },
  {
    id: 3, name: "Nitrile Examination Gloves", category: "Consumables",
    manufacturer: "Ansell", therapeuticArea: null,
    description: "Powder-free, latex-free gloves for medical and laboratory use.",
    price: 12.5, unit: "per box (100 pcs)",
    regions: ["North America", "Europe", "Asia", "Middle East", "Africa"],
    composition: "Powder-free nitrile", dosage: "Not applicable",
    packaging: "100 pieces per box",
    // search: https://unsplash.com/s/photos/blue-medical-gloves
    image: unsplash(""),
  },
  {
    id: 4, name: "Insulin Glargine Injection", category: "Medicines",
    manufacturer: "Sanofi", therapeuticArea: "Diabetes",
    description: "Long-acting insulin for better glycemic control in diabetes management.",
    price: 62, unit: "per pen (3 mL)",
    regions: ["North America", "Europe", "Middle East"],
    composition: "Insulin Glargine 100 units/mL", dosage: "As directed by a physician",
    packaging: "Pre-filled pen, 3 mL",
    // search: https://unsplash.com/s/photos/insulin-pen
    image: unsplash(""),
  },
  {
    id: 5, name: "ICU Ventilator", category: "Medical Devices",
    manufacturer: "Dräger", therapeuticArea: null,
    description: "Advanced ventilator with multiple modes for critical care support.",
    price: 4500, unit: "per unit",
    regions: ["Europe", "Asia", "Middle East"],
    composition: "Multi-mode critical care ventilator", dosage: "Not applicable",
    packaging: "1 unit with accessories",
    // search: https://unsplash.com/s/photos/hospital-ventilator
    image: unsplash(""),
  },
  {
    id: 6, name: "Mepilex Border Dressing", category: "Consumables",
    manufacturer: "Mölnlycke", therapeuticArea: null,
    description: "Advanced wound dressing for faster healing and better comfort.",
    price: 28, unit: "per pack (5 pcs)",
    regions: ["North America", "Europe", "Africa"],
    composition: "Soft silicone foam dressing", dosage: "Not applicable",
    packaging: "Pack of 5 dressings",
    // search: https://unsplash.com/s/photos/wound-dressing
    image: unsplash(""),
  },
  {
    id: 7, name: "HPV Vaccine (9-valent)", category: "Medicines",
    manufacturer: "Merck", therapeuticArea: "Anti-infectives",
    description: "Provides protection against 9 types of HPV-related diseases.",
    price: 120, unit: "per dose",
    regions: ["North America", "Europe", "Asia"],
    composition: "9-valent HPV recombinant vaccine", dosage: "As directed by a physician",
    packaging: "Single-dose vial",
    // search: https://unsplash.com/s/photos/vaccine-vial
    image: unsplash(""),
  },
  {
    id: 8, name: "Laparoscopic Surgical Instrument", category: "Medical Devices",
    manufacturer: "Medtronic", therapeuticArea: null,
    description: "Precision instruments for minimally invasive surgery.",
    price: 1250, unit: "per unit",
    regions: ["North America", "Europe", "Asia", "Middle East"],
    composition: "Stainless steel surgical instrument", dosage: "Not applicable",
    packaging: "1 sterile unit per pack",
    // search: https://unsplash.com/s/photos/surgical-instruments
    image: unsplash(""),
  },
  {
    id: 9, name: "Sodium Chloride 0.9% IV Fluid", category: "Consumables",
    manufacturer: "Baxter", therapeuticArea: null,
    description: "Sterile isotonic solution for fluid and electrolyte balance.",
    price: 8.5, unit: "per bag (1000 mL)",
    regions: ["North America", "Europe", "Asia", "Middle East", "Africa"],
    composition: "Sodium Chloride 0.9% w/v", dosage: "As directed by a physician",
    packaging: "1000 mL bag",
    // search: https://unsplash.com/s/photos/iv-drip-bag
    image: unsplash(""),
  },
  {
    id: 10, name: "Amoxicillin 250 mg Capsules", category: "Medicines",
    manufacturer: "Cipla", therapeuticArea: "Anti-infectives",
    description: "Antibiotic used to treat a wide range of bacterial infections.",
    price: 18, unit: "per box (100 capsules)",
    regions: ["Asia", "Middle East", "Africa"],
    composition: "Amoxicillin Trihydrate 250 mg", dosage: "As directed by a physician",
    packaging: "10 x 10 blister pack",
    // search: https://unsplash.com/s/photos/capsules-pills
    image: unsplash(""),
  },
  {
    id: 11, name: "Salbutamol Inhaler", category: "Medicines",
    manufacturer: "GSK", therapeuticArea: "Respiratory",
    description: "Quick-relief inhaler for asthma and other breathing problems.",
    price: 9.5, unit: "per inhaler (200 doses)",
    regions: ["North America", "Europe", "Asia", "Africa"],
    composition: "Salbutamol 100 mcg per dose", dosage: "As directed by a physician",
    packaging: "1 inhaler per box",
    // search: https://unsplash.com/s/photos/asthma-inhaler
    image: unsplash(""),
  },
  {
    id: 12, name: "Imatinib 400 mg Tablets", category: "Medicines",
    manufacturer: "Novartis", therapeuticArea: "Oncology",
    description: "Targeted therapy used in certain types of cancer.",
    price: 310, unit: "per box (30 tablets)",
    regions: ["North America", "Europe", "Asia"],
    composition: "Imatinib Mesylate 400 mg", dosage: "As directed by a physician",
    packaging: "Box of 30 tablets",
    // search: https://unsplash.com/s/photos/white-pills
    image: unsplash(""),
  },
];