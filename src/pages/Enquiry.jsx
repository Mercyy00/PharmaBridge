import { useState } from "react";
import PageHero from "../components/PageHero";
import { useAuth } from "../context/AuthContext";

const initialEnquiries = [
  { id: "ENQ-901", type: "Product Enquiry", name: "Global Med Corp", product: "Atorvastatin 20mg", qty: "500 Boxes", status: "In Review", date: "Oct 02, 2026" },
  { id: "TND-442", type: "Tender Bid", name: "St. Jude Hospital", product: "ICU Ventilator", qty: "8 Units", status: "Quotation Sent", date: "Sep 28, 2026" },
];

function Enquiry() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("product"); // "product", "tender", "status"
  const [enquiries, setEnquiries] = useState(() => {
    const saved = localStorage.getItem("enquiries");
    return saved ? JSON.parse(saved) : initialEnquiries;
  });

  // Form State
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    company: "",
    country: "India",
    product: "",
    quantity: "",
    notes: "",
  });
  const [submittedRef, setSubmittedRef] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRef = (activeTab === "tender" ? "TND-" : "ENQ-") + Math.floor(100 + Math.random() * 900);
    const newEnquiry = {
      id: newRef,
      type: activeTab === "tender" ? "Tender Enquiry" : "Product Enquiry",
      name: formData.name || "Commercial Buyer",
      product: formData.product || "Multiple Formulations",
      qty: formData.quantity || "Commercial Batch",
      status: "In Review",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    const updated = [newEnquiry, ...enquiries];
    setEnquiries(updated);
    localStorage.setItem("enquiries", JSON.stringify(updated));
    setSubmittedRef(newRef);
  };

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Enquiries & Global Procurement Made Simple"
        text="Whether you are sourcing specific active pharmaceuticals, submitting national tenders, or tracking your order status, our export desk is ready to support you."
      />

      <div className="container mt-5 mb-5">
        {/* Three Option Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div
              className={`pb-card p-4 cursor-pointer text-center ${activeTab === "product" ? "border-primary border-2 shadow" : ""}`}
              onClick={() => { setActiveTab("product"); setSubmittedRef(""); }}
              style={{ cursor: "pointer" }}
            >
              <div className="icon-circle mx-auto mb-3"><i className="bi bi-capsule"></i></div>
              <h5 className="fw-bold text-dark">Product Enquiry</h5>
              <p className="text-muted-pb small mb-0">Inquire for pricing, specifications, minimum order quantities (MOQ), and lead times.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className={`pb-card p-4 cursor-pointer text-center ${activeTab === "tender" ? "border-primary border-2 shadow" : ""}`}
              onClick={() => { setActiveTab("tender"); setSubmittedRef(""); }}
              style={{ cursor: "pointer" }}
            >
              <div className="icon-circle mx-auto mb-3"><i className="bi bi-file-earmark-spreadsheet"></i></div>
              <h5 className="fw-bold text-dark">Tender Enquiry</h5>
              <p className="text-muted-pb small mb-0">Submit bulk institutional procurement tenders and government supply contracts.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className={`pb-card p-4 cursor-pointer text-center ${activeTab === "status" ? "border-primary border-2 shadow" : ""}`}
              onClick={() => { setActiveTab("status"); setSubmittedRef(""); }}
              style={{ cursor: "pointer" }}
            >
              <div className="icon-circle mx-auto mb-3"><i className="bi bi-clock-history"></i></div>
              <h5 className="fw-bold text-dark">Enquiry Status</h5>
              <p className="text-muted-pb small mb-0">Track the real-time review progress and official quotation updates for your inquiries.</p>
            </div>
          </div>
        </div>

        {/* Content based on tab */}
        {activeTab === "status" ? (
          <div className="pb-card p-4">
            <h4 className="fw-bold text-dark mb-3"><i className="bi bi-list-check text-primary me-2"></i>Active Enquiries Tracker</h4>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Reference No.</th>
                    <th>Enquiry Type</th>
                    <th>Organization</th>
                    <th>Product / Line</th>
                    <th>Volume / Qty</th>
                    <th>Date</th>
                    <th>Current Status</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq) => (
                    <tr key={enq.id}>
                      <td><code>{enq.id}</code></td>
                      <td>{enq.type}</td>
                      <td><strong>{enq.name}</strong></td>
                      <td>{enq.product}</td>
                      <td>{enq.qty}</td>
                      <td><small className="text-muted">{enq.date}</small></td>
                      <td>
                        <span className={`badge ${enq.status === "Quotation Sent" ? "bg-success" : "bg-warning text-dark"}`}>
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {/* Form */}
            <div className="col-lg-7">
              <div className="pb-card p-4">
                <h4 className="fw-bold text-dark mb-1">
                  {activeTab === "tender" ? "Submit Institutional Tender" : "Submit Product Procurement Enquiry"}
                </h4>
                <p className="text-muted-pb small mb-4">
                  Please provide details about your commercial procurement requirements. Our export department responds within 24 hours.
                </p>

                {submittedRef && (
                  <div className="alert alert-success p-3 rounded-4 mb-4">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Enquiry submitted successfully! Reference ID: <strong>{submittedRef}</strong>. You can monitor progress under the <strong>Enquiry Status</strong> tab.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Your Name / Organization</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Dr. A. Sharma / Apex Pharma"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Corporate Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="procurement@hospital.org"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Company / Hospital Name</label>
                      <input
                        type="text"
                        name="company"
                        className="form-control"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Target Country / Port</label>
                      <input
                        type="text"
                        name="country"
                        className="form-control"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Destination country"
                      />
                    </div>
                    <div className="col-md-8">
                      <label className="form-label fw-semibold">Desired Product / Formulations</label>
                      <input
                        type="text"
                        name="product"
                        className="form-control"
                        required
                        value={formData.product}
                        onChange={handleChange}
                        placeholder="e.g. Atorvastatin 20mg / Insulin Pens"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Estimated Quantity</label>
                      <input
                        type="text"
                        name="quantity"
                        className="form-control"
                        required
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="e.g. 10,000 Boxes"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">Additional Specifications / Special Notes</label>
                      <textarea
                        name="notes"
                        rows="3"
                        className="form-control"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Specify packaging requirements, cold-chain criteria, target delivery timeline..."
                      ></textarea>
                    </div>
                    <div className="col-12 mt-4">
                      <button type="submit" className="btn btn-pb w-100 py-2">
                        <i className="bi bi-send-fill me-2"></i>Submit Enquiry to Export Desk
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Why Enquire With PharmaBridge */}
            <div className="col-lg-5">
              <div className="band p-4 mb-4">
                <div className="eyebrow">Advantage</div>
                <h5 className="fw-bold text-dark mt-1">Why Enquire with PharmaBridge?</h5>
                <div className="d-flex flex-column gap-3 mt-3">
                  <div className="d-flex gap-3 align-items-start">
                    <i className="bi bi-clock-check-fill fs-4 text-primary"></i>
                    <div>
                      <strong>Guaranteed 24-Hour Turnaround:</strong>
                      <div className="text-muted-pb small">Fast pricing quotes, technical data sheets, and batch certificates.</div>
                    </div>
                  </div>
                  <div className="d-flex gap-3 align-items-start">
                    <i className="bi bi-shield-check fs-4 text-primary"></i>
                    <div>
                      <strong>Full Regulatory Compliance:</strong>
                      <div className="text-muted-pb small">Verified manufacturers with GMP, ISO, and CE certifications.</div>
                    </div>
                  </div>
                  <div className="d-flex gap-3 align-items-start">
                    <i className="bi bi-thermometer-half fs-4 text-primary"></i>
                    <div>
                      <strong>Validated Cold Chain:</strong>
                      <div className="text-muted-pb small">Temperature-regulated global shipping for vaccines and biologics.</div>
                    </div>
                  </div>
                  <div className="d-flex gap-3 align-items-start">
                    <i className="bi bi-currency-dollar fs-4 text-primary"></i>
                    <div>
                      <strong>Direct Manufacturer Pricing:</strong>
                      <div className="text-muted-pb small">Competitive bulk pricing without opaque intermediary markups.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Step Process */}
              <div className="pb-card p-4">
                <h6 className="fw-bold text-dark mb-3">Simple 3-Step Process</h6>
                <div className="d-flex flex-column gap-2 small">
                  <div><strong>1. Submit Requirements:</strong> Specify products, volumes, and destination.</div>
                  <div><strong>2. Commercial Quotation:</strong> Receive proforma invoice & COA dossiers.</div>
                  <div><strong>3. Compliance & Dispatch:</strong> License audit & insured global export dispatch.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Enquiry;
