import { useState } from "react";
import PageHero from "../components/PageHero";

function Contact() {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "India",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="We're Here to Support Your Global Healthcare Sourcing"
        text="Have a query about international export regulations, bulk pricing, or specialized formulations? Our dedicated pharmaceutical export desks are available 24/7."
      />

      <div className="container mt-5 mb-5">
        <div className="row g-4">
          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="pb-card p-4">
              <h4 className="fw-bold text-dark mb-1">Send Us a Direct Message</h4>
              <p className="text-muted-pb small mb-4">
                Fill in the details below and our regional export manager will get in touch with you promptly.
              </p>

              {formSent ? (
                <div className="alert alert-success p-4 rounded-4 text-center">
                  <i className="bi bi-check-circle-fill fs-2 text-success d-block mb-2"></i>
                  <h5 className="fw-bold">Message Sent Successfully!</h5>
                  <p className="small mb-0">Thank you for reaching out. A representative from our pharmaceutical desk will contact you within 2-4 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Work Email</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@hospital.org"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Company / Hospital</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Organization name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="Country"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Product inquiry / Bulk distribution agreement"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">Message</label>
                      <textarea
                        rows="4"
                        className="form-control"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe your procurement requirements or inquiry..."
                      ></textarea>
                    </div>
                    <div className="col-12 mt-4">
                      <button type="submit" className="btn btn-pb w-100 py-2">
                        <i className="bi bi-send-check-fill me-2"></i>Send Message
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-lg-5">
            <div className="d-flex flex-column gap-4">
              <div className="pb-card p-4">
                <h5 className="fw-bold text-dark mb-3">Global Export Headquarters</h5>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex gap-3 align-items-start">
                    <div className="icon-circle"><i className="bi bi-geo-alt-fill"></i></div>
                    <div>
                      <strong>Registered Corporate Address:</strong>
                      <p className="text-muted-pb small mb-0">
                        PharmaBridge Global Logistics Hub, Sector 18, MIDC Industrial Area, Pune – 411019, Maharashtra, India.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-3 align-items-start">
                    <div className="icon-circle"><i className="bi bi-telephone-fill"></i></div>
                    <div>
                      <strong>Direct Phone Support:</strong>
                      <p className="text-muted-pb small mb-0">+91 (20) 8872-9100 / +1 (800) 492-7201</p>
                    </div>
                  </div>

                  <div className="d-flex gap-3 align-items-start">
                    <div className="icon-circle"><i className="bi bi-envelope-fill"></i></div>
                    <div>
                      <strong>Official Communications:</strong>
                      <p className="text-muted-pb small mb-0">
                        export@pharmabridge.com<br />regulatory@pharmabridge.com
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-3 align-items-start">
                    <div className="icon-circle"><i className="bi bi-clock-fill"></i></div>
                    <div>
                      <strong>Hours of Operation:</strong>
                      <p className="text-muted-pb small mb-0">Mon – Fri: 08:30 AM – 06:30 PM IST (Emergency Desk: 24/7)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="band p-4">
                <div className="eyebrow">Support Helpdesk</div>
                <h6 className="fw-bold text-dark mt-1">Need Urgent Assistance?</h6>
                <p className="text-muted-pb small mb-3">
                  For active shipment tracking, temperature excursions, or urgent hospital tenders, contact our round-the-clock emergency desk directly.
                </p>
                <div className="badge bg-primary fs-6 px-3 py-2">
                  <i className="bi bi-headset me-2"></i>24/7 Emergency Hotline
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <section className="mt-5">
          <div className="text-center mb-4">
            <div className="eyebrow">Frequently Asked Questions</div>
            <h3 className="fw-bold">Frequently Asked Questions</h3>
            <p className="text-muted-pb">Common questions regarding orders, compliance, and international shipping.</p>
          </div>

          <div className="accordion pb-card p-2" id="faqAccordion">
            <div className="accordion-item border-0 mb-2">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                  <strong>What documents are mandatory to import pharmaceuticals through PharmaBridge?</strong>
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-muted-pb small">
                  Buyers must possess a valid Wholesale Drug License or Import Authorization issued by their national drug authority (e.g., FDA, MHRA, CDSCO). For every export consignment, PharmaBridge furnishes a Certificate of Analysis (COA), Commercial Invoice, Packing List, Certificate of Origin, and Free Sale Certificate (FSC).
                </div>
              </div>
            </div>

            <div className="accordion-item border-0 mb-2">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                  <strong>How is temperature control guaranteed during international shipping?</strong>
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-muted-pb small">
                  All temperature-sensitive pharmaceuticals and vaccines are shipped using validated active or passive cold chain packaging equipped with USB/cellular temperature data loggers to ensure uncompromised cold chain integrity (2°C to 8°C or -20°C).
                </div>
              </div>
            </div>

            <div className="accordion-item border-0 mb-2">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                  <strong>How long does compliance officer verification take?</strong>
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-muted-pb small">
                  Once you upload your drug wholesale/import permit via the buyer portal, our compliance officers audit the credentials within 1-2 business hours. Upon approval, immediate access to full CTD dossiers and batch release certificates is unlocked.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contact;
