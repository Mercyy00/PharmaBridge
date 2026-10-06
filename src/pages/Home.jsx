import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

const categories = [
  { icon: "bi-capsule", name: "Pharmaceuticals", text: "Tablets, capsules, injectables, syrups and more." },
  { icon: "bi-heart-pulse", name: "Medical Devices", text: "Diagnostic, monitoring and surgical equipment." },
  { icon: "bi-eyedropper", name: "Injectables & Biologics", text: "Vaccines, biosimilars, therapeutics." },
  { icon: "bi-bandaid", name: "Wound Care & Consumables", text: "Dressings, gloves, masks and disposables." },
  { icon: "bi-droplet", name: "Nutritional Supplements", text: "Vitamins, minerals and wellness products." },
  { icon: "bi-bag-heart", name: "OTC & Healthcare Products", text: "Personal care, first aid and everyday health." },
  { icon: "bi-beaker", name: "Laboratory Supplies", text: "Reagents, kits and lab consumables." },
  { icon: "bi-star", name: "Specialty Products", text: "Rare diseases, oncology and critical care." },
];

const certifications = [
  { short: "GMP", name: "Good Manufacturing Practice" },
  { short: "ISO", name: "ISO 9001:2015 Quality Management" },
  { short: "CE", name: "European Conformity" },
  { short: "WHO", name: "WHO Prequalification" },
];

const approvals = [
  { short: "FDA", name: "U.S. Food & Drug Administration" },
  { short: "EMA", name: "European Medicines Agency" },
  { short: "TGA", name: "Therapeutic Goods Administration (Australia)" },
  { short: "PMDA", name: "Pharmaceuticals and Medical Devices Agency (Japan)" },
  { short: "ANVISA", name: "Brazilian Health Regulatory Agency" },
  { short: "Health Canada", name: "Health Products and Food Branch" },
];

function Home() {
  return (
    <>
      {/* TODO: add image="/images/hero-home.png" after putting a picture in public/images */}
      <PageHero
        eyebrow="Your global partner in healthcare"
        title="Pharmaceutical & Medical Supplies Export Catalog"
        text="Quality medicines. Trusted manufacturers. Global distribution."
        buttonText="Explore Products"
        buttonLink="/products"
      />

      <div className="container mt-4">
        <div className="row g-3 text-center text-md-start">
          <div className="col-md-4 d-flex align-items-center gap-2">
            <i className="bi bi-globe2 fs-3 text-primary"></i>
            <div><strong>Global Reach</strong><br /><small className="text-muted-pb">Serving 100+ countries</small></div>
          </div>
          <div className="col-md-4 d-flex align-items-center gap-2">
            <i className="bi bi-shield-check fs-3 text-primary"></i>
            <div><strong>Trusted Quality</strong><br /><small className="text-muted-pb">GMP & ISO certified</small></div>
          </div>
          <div className="col-md-4 d-flex align-items-center gap-2">
            <i className="bi bi-truck fs-3 text-primary"></i>
            <div><strong>Reliable Shipping</strong><br /><small className="text-muted-pb">On-time worldwide</small></div>
          </div>
        </div>
      </div>

      <section className="container mt-5">
        <div className="eyebrow">Product Categories</div>
        <h2 className="fw-bold">Explore Our Product Categories</h2>
        <p className="text-muted-pb">A comprehensive range of pharmaceutical and medical supplies for global markets.</p>

        <div className="row g-4">
          {categories.map((c) => (
            <div className="col-12 col-sm-6 col-lg-3" key={c.name}>
              <Link to="/products" className="text-decoration-none">
                <div className="pb-card">
                  <div className="icon-circle mb-3"><i className={`bi ${c.icon}`}></i></div>
                  <h6 className="fw-bold text-dark">{c.name}</h6>
                  <small className="text-muted-pb">{c.text}</small>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container mt-5">
        <div className="band">
          <div className="row align-items-center g-4">
            <div className="col-lg-4">
              <div className="eyebrow">Certifications</div>
              <h2 className="fw-bold">Quality You Can Trust</h2>
              <p className="text-muted-pb">
                Our products are manufactured in facilities that meet international quality standards.
              </p>
              <Link to="/compliance" className="btn btn-pb">Learn More</Link>
            </div>
            <div className="col-lg-8">
              <div className="row g-3">
                {certifications.map((c) => (
                  <div className="col-6 col-md-3" key={c.short}>
                    <div className="pb-card text-center">
                      <div className="fs-3 fw-bold" style={{ color: "var(--pb-blue)" }}>{c.short}</div>
                      <small className="text-muted-pb">{c.name}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-4">
            <div className="eyebrow">Regulatory Approvals</div>
            <h2 className="fw-bold">Compliant. Approved. Global.</h2>
            <p className="text-muted-pb">
              We work with products that meet stringent regulatory requirements across key markets.
            </p>
            <Link to="/compliance" className="btn btn-pb">View All Approvals</Link>
          </div>
          <div className="col-lg-8">
            <div className="row g-3">
              {approvals.map((a) => (
                <div className="col-12 col-sm-6 col-md-4" key={a.short}>
                  <div className="pb-card">
                    <div className="fw-bold fs-5" style={{ color: "var(--pb-blue)" }}>{a.short}</div>
                    <small className="text-muted-pb d-block">{a.name}</small>
                    <small className="text-success mt-2 d-block">
                      <i className="bi bi-check-circle-fill me-1"></i>Approved
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
