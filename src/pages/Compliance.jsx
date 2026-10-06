import PageHero from "../components/PageHero";
import { Link } from "react-router-dom";

const licences = [
  {
    title: "Export License",
    number: "EXP-PB-2026-9842",
    authority: "Directorate General of Foreign Trade (DGFT)",
    validity: "Valid until Dec 2028",
    description: "Authorizes the cross-border distribution and export of pharmaceutical formulations and medical consumables.",
  },
  {
    title: "Drug Manufacturing License",
    number: "MFG-FDA-MAH-5512",
    authority: "Food and Drug Administration (FDA)",
    validity: "Valid until Mar 2029",
    description: "Certifies that allied manufacturing units adhere to Schedule M and Good Manufacturing Practices (GMP).",
  },
  {
    title: "Wholesale Drug License",
    number: "WDL-20B-21B-4091",
    authority: "State Licensing Authority",
    validity: "Valid until Aug 2027",
    description: "Permits storage, wholesale distribution, and bulk dispatch of scheduled drugs and injectables.",
  },
  {
    title: "Free Sale Certificate (FSC)",
    number: "FSC-GLOBAL-7719",
    authority: "Central Drugs Standard Control Organisation",
    validity: "Valid until Jan 2028",
    description: "Confirms products are freely sold in domestic markets and eligible for international trade across import countries.",
  },
];

const certifications = [
  { short: "GMP", name: "Good Manufacturing Practice", desc: "Rigorous standards for production and quality control." },
  { short: "ISO 9001", name: "ISO 9001:2015 QMS", desc: "Internationally certified quality management framework." },
  { short: "CE Mark", name: "European Conformity", desc: "Full compliance with EU Medical Devices Directive." },
  { short: "WHO PQ", name: "WHO Prequalification", desc: "Pre-qualified for international agency health procurement." },
];

const qualityDocs = [
  {
    title: "Certificate of Analysis (COA)",
    badge: "Batch Specific",
    desc: "Analytical laboratory report validating purity, active ingredients, potency, and dissolution parameters for every production lot.",
    icon: "bi-file-earmark-medical",
  },
  {
    title: "Material Safety Data Sheet (MSDS)",
    badge: "Standardized",
    desc: "Comprehensive safety guide detailing physical/chemical hazards, safe handling, accidental exposure, and storage conditions.",
    icon: "bi-shield-check",
  },
  {
    title: "Product Specifications (CTD)",
    badge: "Regulatory Dossier",
    desc: "Detailed technical specifications, stability testing records, assay criteria, and excipient declarations according to ICH guidelines.",
    icon: "bi-file-text",
  },
  {
    title: "Batch Release Certificate",
    badge: "Quality Assurance",
    desc: "Official release sign-off by Qualified Persons (QP) confirming compliance with pharmacopeial monographs (USP/BP/EP).",
    icon: "bi-patch-check",
  },
];

function Compliance() {
  return (
    <>
      <PageHero
        eyebrow="Global compliance"
        title="Ensuring Trust Through Rigorous Compliance"
        text="We meet international standards and regulatory requirements to ensure safe, high-quality and compliant pharmaceutical and medical supplies."
      />

      {/* Regulatory Licences */}
      <section className="container mt-5">
        <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">
          <div>
            <div className="eyebrow">Accredited Licences</div>
            <h2 className="fw-bold">Statutory Licenses & Authorizations</h2>
            <p className="text-muted-pb mb-0">Active government and international regulatory export credentials.</p>
          </div>
          <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill">
            <i className="bi bi-shield-fill-check me-1"></i>All Licenses Active & Monitored
          </span>
        </div>

        <div className="row g-4">
          {licences.map((lic) => (
            <div className="col-md-6" key={lic.title}>
              <div className="pb-card p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="fw-bold text-dark mb-1">{lic.title}</h5>
                    <small className="text-muted-pb">Reg No: <strong>{lic.number}</strong></small>
                  </div>
                  <span className="badge bg-success text-white px-3 py-1 rounded-pill">
                    <i className="bi bi-check-circle-fill me-1"></i>Valid
                  </span>
                </div>
                <p className="text-muted-pb small mb-3">{lic.description}</p>
                <div className="d-flex justify-content-between align-items-center pt-3 border-top small">
                  <span className="text-muted"><i className="bi bi-building me-1"></i>{lic.authority}</span>
                  <span className="text-success fw-semibold"><i className="bi bi-calendar-check me-1"></i>{lic.validity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Band */}
      <section className="container mt-5">
        <div className="band">
          <div className="row align-items-center g-4">
            <div className="col-lg-4">
              <div className="eyebrow">Certifications</div>
              <h2 className="fw-bold">Global Quality Standards</h2>
              <p className="text-muted-pb">
                Manufacturing facilities adhere strictly to Good Manufacturing Practices (GMP) and international ISO benchmarks.
              </p>
              <Link to="/downloads" className="btn btn-pb">
                Access Audit Certificates
              </Link>
            </div>
            <div className="col-lg-8">
              <div className="row g-3">
                {certifications.map((c) => (
                  <div className="col-6 col-md-6" key={c.short}>
                    <div className="pb-card text-center p-3">
                      <div className="fs-3 fw-bold" style={{ color: "var(--pb-blue)" }}>{c.short}</div>
                      <div className="fw-semibold text-dark small">{c.name}</div>
                      <small className="text-muted-pb">{c.desc}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Documents */}
      <section className="container mt-5 mb-5">
        <div className="mb-4">
          <div className="eyebrow">Batch Verification</div>
          <h2 className="fw-bold">Technical & Quality Dossiers</h2>
          <p className="text-muted-pb">Standardized quality documentation dispatched with every export consignment.</p>
        </div>

        <div className="row g-4">
          {qualityDocs.map((docItem) => (
            <div className="col-md-6 col-lg-3" key={docItem.title}>
              <div className="pb-card h-100 p-4 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="icon-circle"><i className={`bi ${docItem.icon}`}></i></div>
                    <span className="badge bg-info-subtle text-primary border small">{docItem.badge}</span>
                  </div>
                  <h6 className="fw-bold text-dark">{docItem.title}</h6>
                  <p className="text-muted-pb small mb-3">{docItem.desc}</p>
                </div>
                <Link to="/downloads" className="btn btn-outline-pb btn-sm w-100">
                  <i className="bi bi-file-earmark-arrow-down me-1"></i>Sample Document
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Compliance;
