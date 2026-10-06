import PageHero from "../components/PageHero";

const stats = [
  { value: "50+", label: "Countries Served", desc: "Trusted global supply chain across 5 continents" },
  { value: "200+", label: "Certified Manufacturers", desc: "WHO-GMP & FDA approved pharmaceutical partners" },
  { value: "1,000+", label: "Export Products", desc: "Therapeutic drugs, surgicals, and consumables" },
  { value: "100%", label: "Compliance & Audited", desc: "Rigorous COA, batch tracking & export regulation" },
];

const steps = [
  {
    step: "01",
    title: "Browse & Enquire",
    text: "Explore our export catalog filtered by therapeutic area, manufacturer, or dosage, and submit procurement inquiries.",
    icon: "bi-search",
  },
  {
    step: "02",
    title: "Get Confirmation & Quotes",
    text: "Receive competitive commercial terms, COA documentation, and indicative lead times within 24 business hours.",
    icon: "bi-file-earmark-check",
  },
  {
    step: "03",
    title: "Complete Compliance",
    text: "Upload required import/drug licenses for verification by certified compliance officers ensuring strict regulatory adherence.",
    icon: "bi-shield-check",
  },
  {
    step: "04",
    title: "Global Delivery",
    text: "Temperature-monitored cold chain and international freight logistics ensure prompt delivery to your destination.",
    icon: "bi-truck",
  },
];

const team = [
  { name: "Dr. Rajesh Kulkarni", role: "Chief Regulatory Officer", exp: "20+ yrs in FDA & EMA compliance", icon: "bi-person-badge" },
  { name: "Sarah Jenkins", role: "Global Supply Chain Director", exp: "Specialist in Pharma Cold Chain Logistics", icon: "bi-person-check" },
  { name: "Ananya Deshmukh", role: "Head of Quality Assurance", exp: "Certified Lead Auditor (ISO 9001/GMP)", icon: "bi-person-heart" },
  { name: "Marcus Weber", role: "VP International Trade", exp: "Managing multi-regional trade compliance", icon: "bi-person-workspace" },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About PharmaBridge"
        title="Connecting Global Healthcare Needs"
        text="PharmaBridge is a trusted pharmaceutical and medical supplies export platform, bridging the gap between quality manufacturers and healthcare providers worldwide."
      />

      {/* Stats Section */}
      <section className="container mt-5">
        <div className="row g-4">
          {stats.map((s) => (
            <div className="col-12 col-sm-6 col-lg-3" key={s.label}>
              <div className="pb-card text-center p-4">
                <div className="display-5 fw-bold mb-2" style={{ color: "var(--pb-blue)" }}>{s.value}</div>
                <h6 className="fw-bold text-dark">{s.label}</h6>
                <small className="text-muted-pb">{s.desc}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Story */}
      <section className="container mt-5">
        <div className="band">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <div className="eyebrow">Our Mission</div>
              <h2 className="fw-bold mt-2">Simplifying International Pharmaceutical Procurement</h2>
              <p className="text-muted-pb mt-3">
                Access to essential medications and medical equipment should not be constrained by border complexities, fragmented logistics, or opaque regulatory processes.
              </p>
              <p className="text-muted-pb">
                PharmaBridge integrates verified suppliers, automated licensing verification, batch test certification (COA), and end-to-end export transparency into a unified digital ecosystem.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="p-4 bg-white rounded-4 shadow-sm border">
                <h5 className="fw-bold text-dark mb-3"><i className="bi bi-award text-primary me-2"></i>Our Core Commitments</h5>
                <ul className="list-unstyled mb-0 d-flex flex-column gap-2 text-muted-pb">
                  <li><i className="bi bi-check2-circle text-primary me-2"></i><strong>100% Genuine Supplies:</strong> Direct from audited GMP manufacturers.</li>
                  <li><i className="bi bi-check2-circle text-primary me-2"></i><strong>Regulatory Transparency:</strong> Complete batch test & registration dossiers.</li>
                  <li><i className="bi bi-check2-circle text-primary me-2"></i><strong>Cold-Chain Integrity:</strong> Continuous temperature data-logging.</li>
                  <li><i className="bi bi-check2-circle text-primary me-2"></i><strong>Global Compliance:</strong> Validated export/import permits across 100+ countries.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mt-5">
        <div className="text-center mb-5">
          <div className="eyebrow">Operating Model</div>
          <h2 className="fw-bold">How PharmaBridge Works</h2>
          <p className="text-muted-pb">A secure, transparent 4-step workflow connecting verified buyers and manufacturers.</p>
        </div>
        <div className="row g-4">
          {steps.map((st) => (
            <div className="col-md-6 col-lg-3" key={st.step}>
              <div className="pb-card h-100 position-relative p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="icon-circle"><i className={`bi ${st.icon}`}></i></div>
                  <span className="badge bg-light text-primary fs-6 fw-bold px-3 py-2 rounded-pill border">{st.step}</span>
                </div>
                <h5 className="fw-bold text-dark">{st.title}</h5>
                <p className="text-muted-pb small mb-0">{st.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mt-5 mb-5">
        <div className="text-center mb-5">
          <div className="eyebrow">Leadership & Expertise</div>
          <h2 className="fw-bold">Meet Our Leadership Team</h2>
          <p className="text-muted-pb">Industry leaders with decades of experience in pharmaceutical sciences, trade law, and digital logistics.</p>
        </div>
        <div className="row g-4">
          {team.map((m) => (
            <div className="col-md-6 col-lg-3" key={m.name}>
              <div className="pb-card text-center p-4">
                <div className="icon-circle mx-auto mb-3" style={{ width: "64px", height: "64px", fontSize: "1.8rem" }}>
                  <i className={`bi ${m.icon}`}></i>
                </div>
                <h6 className="fw-bold text-dark mb-1">{m.name}</h6>
                <div className="badge bg-info-subtle text-primary mb-2">{m.role}</div>
                <p className="text-muted-pb small mb-0">{m.exp}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default About;
