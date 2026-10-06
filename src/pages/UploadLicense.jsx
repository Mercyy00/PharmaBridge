import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function UploadLicense() {
  const { currentUser, updateUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [country, setCountry] = useState("United States");
  const [successMsg, setSuccessMsg] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a pharmaceutical or wholesale drug license file (PDF/PNG).");
      return;
    }

    updateUser(currentUser.id, {
      licenseName: selectedFile.name,
      licenseNumber: licenseNumber || "LIC-REG-" + Math.floor(100000 + Math.random() * 900000),
      country: country,
      status: "pending",
      submittedAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    });

    setSuccessMsg("License document uploaded successfully! Submitted for Compliance Officer review.");
  };

  const renderStatusCard = () => {
    switch (currentUser.status) {
      case "verified":
        return (
          <div className="alert alert-success p-4 rounded-4 shadow-sm border border-success">
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-patch-check-fill fs-1 text-success"></i>
              <div>
                <h5 className="fw-bold mb-1 text-success">Account Verified & Cleared!</h5>
                <p className="mb-2">Your drug importation credentials ({currentUser.licenseName || "Wholesale License"}) have been officially verified by our Compliance Officer.</p>
                <div className="d-flex gap-2">
                  <Link to="/downloads" className="btn btn-sm btn-success">
                    <i className="bi bi-file-earmark-arrow-down me-1"></i>Access Restricted Downloads
                  </Link>
                  <Link to="/products" className="btn btn-sm btn-outline-success">
                    Explore Catalog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      case "pending":
        return (
          <div className="alert alert-warning p-4 rounded-4 shadow-sm border border-warning">
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-hourglass-split fs-1 text-warning"></i>
              <div>
                <h5 className="fw-bold mb-1 text-warning-emphasis">Verification Review Pending</h5>
                <p className="mb-0">
                  Your license file <strong>"{currentUser.licenseName || "License_Doc.pdf"}"</strong> is currently undergoing statutory audit by a designated Compliance Officer. Decisions are typically delivered within 1 to 2 business hours.
                </p>
              </div>
            </div>
          </div>
        );
      case "rejected":
        return (
          <div className="alert alert-danger p-4 rounded-4 shadow-sm border border-danger">
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-exclamation-triangle-fill fs-1 text-danger"></i>
              <div>
                <h5 className="fw-bold mb-1 text-danger">Verification Rejected</h5>
                <p className="mb-0">
                  The uploaded license document could not be validated (e.g., expired permit or missing regulatory seals). Please re-upload a valid license document below.
                </p>
              </div>
            </div>
          </div>
        );
      case "no-license":
      default:
        return (
          <div className="alert alert-info p-4 rounded-4 shadow-sm border border-info">
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-shield-exclamation fs-1 text-info"></i>
              <div>
                <h5 className="fw-bold mb-1 text-info-emphasis">Action Required: Upload Drug License</h5>
                <p className="mb-0">
                  To comply with international pharmaceutical trade laws and gain full access to restricted batch records and product dossiers, please upload your wholesale drug or import permit.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mt-4 mb-5" style={{ maxWidth: "800px" }}>
      <div className="pb-card p-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4 pb-3 border-bottom">
          <div>
            <div className="eyebrow">Regulatory Compliance</div>
            <h3 className="fw-bold text-dark mb-0">Buyer License Verification</h3>
          </div>
          <div>
            <span className="text-muted-pb me-2">Account Status:</span>
            <span
              className={`badge fs-6 px-3 py-2 text-capitalize ${
                currentUser.status === "verified"
                  ? "bg-success"
                  : currentUser.status === "pending"
                  ? "bg-warning text-dark"
                  : currentUser.status === "rejected"
                  ? "bg-danger"
                  : "bg-secondary"
              }`}
            >
              {currentUser.status}
            </span>
          </div>
        </div>

        {renderStatusCard()}

        {successMsg && <div className="alert alert-success mt-3">{successMsg}</div>}

        <div className="mt-4 p-4 bg-light rounded-4 border">
          <h5 className="fw-bold text-dark mb-3">
            <i className="bi bi-upload text-primary me-2"></i>
            {currentUser.status === "verified" ? "Update License Information" : "Upload Regulatory Permit"}
          </h5>

          <form onSubmit={handleUpload}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">License / Permit Registration Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. WDL-2026-98102"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Jurisdiction / Destination Country</label>
                <select
                  className="form-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="United States">United States (FDA Registered)</option>
                  <option value="United Kingdom">United Kingdom (MHRA Approved)</option>
                  <option value="Germany">Germany (BfArM Certified)</option>
                  <option value="India">India (CDSCO / State FDA)</option>
                  <option value="Australia">Australia (TGA Compliance)</option>
                  <option value="UAE">UAE (MOHAP Approved)</option>
                  <option value="Kenya">Kenya (PPB Accredited)</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Attach Official License Document (PDF, PNG, JPG)</label>
                <input
                  type="file"
                  className="form-control"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  required
                />
                <small className="text-muted-pb">Supported formats: PDF, PNG, JPG. Max size: 10MB.</small>
              </div>

              <div className="col-12 mt-4">
                <button type="submit" className="btn btn-pb w-100 py-2">
                  <i className="bi bi-cloud-arrow-up-fill me-2"></i>Submit License for Compliance Review
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadLicense;
