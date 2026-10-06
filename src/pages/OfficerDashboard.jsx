import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function OfficerDashboard() {
  const { users, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("pending");

  const pendingBuyers = users.filter((u) => u.role === "buyer" && u.status === "pending");
  const verifiedBuyers = users.filter((u) => u.role === "buyer" && u.status === "verified");
  const allBuyers = users.filter((u) => u.role === "buyer");

  const handleApprove = (id, name) => {
    updateUser(id, { status: "verified", verifiedAt: new Date().toLocaleDateString() });
    alert(`Buyer ${name} approved and granted verified access!`);
  };

  const handleReject = (id, name) => {
    updateUser(id, { status: "rejected", rejectedAt: new Date().toLocaleDateString() });
    alert(`Buyer ${name}'s license verification was rejected.`);
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4 pb-3 border-bottom">
        <div>
          <div className="eyebrow">Statutory Audit Portal</div>
          <h2 className="fw-bold text-dark mb-0">Compliance Officer Dashboard</h2>
          <p className="text-muted-pb mb-0">Review international buyer wholesale drug licenses and audit compliance logs.</p>
        </div>
        <div className="d-flex gap-2">
          <span className="badge bg-warning-subtle text-dark border border-warning px-3 py-2 rounded-pill">
            <i className="bi bi-clock-history me-1"></i>{pendingBuyers.length} Pending Reviews
          </span>
          <span className="badge bg-success-subtle text-success border border-success px-3 py-2 rounded-pill">
            <i className="bi bi-shield-check me-1"></i>{verifiedBuyers.length} Verified Buyers
          </span>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="pb-card p-3 border-start border-warning border-4">
            <div className="text-muted-pb small">Pending Verifications</div>
            <div className="display-6 fw-bold text-warning-emphasis">{pendingBuyers.length}</div>
            <small className="text-muted">Awaiting statutory audit</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="pb-card p-3 border-start border-success border-4">
            <div className="text-muted-pb small">Verified Active Importers</div>
            <div className="display-6 fw-bold text-success">{verifiedBuyers.length}</div>
            <small className="text-muted">Cleared for regulatory downloads</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="pb-card p-3 border-start border-primary border-4">
            <div className="text-muted-pb small">Total Registered Buyers</div>
            <div className="display-6 fw-bold text-primary">{allBuyers.length}</div>
            <small className="text-muted">Across global jurisdictions</small>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-pills mb-3 gap-2">
        <li className="nav-item">
          <button
            className={`btn btn-sm ${activeTab === "pending" ? "btn-pb" : "btn-outline-pb"}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Reviews ({pendingBuyers.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`btn btn-sm ${activeTab === "all" ? "btn-pb" : "btn-outline-pb"}`}
            onClick={() => setActiveTab("all")}
          >
            All Buyer Records ({allBuyers.length})
          </button>
        </li>
      </ul>

      {/* Table Content */}
      <div className="pb-card p-4">
        {activeTab === "pending" ? (
          <div>
            <h5 className="fw-bold text-dark mb-3">
              <i className="bi bi-file-earmark-medical text-warning me-2"></i>
              Pending License Applications
            </h5>
            {pendingBuyers.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <i className="bi bi-check-circle-fill text-success fs-1 d-block mb-2"></i>
                <h6 className="fw-bold">No Pending Applications</h6>
                <p className="small mb-0">All uploaded wholesale drug licenses have been audited.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Buyer / Organization</th>
                      <th>Email</th>
                      <th>License Number</th>
                      <th>Country</th>
                      <th>Document Attached</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingBuyers.map((b) => (
                      <tr key={b.id}>
                        <td><strong>{b.name}</strong></td>
                        <td>{b.email}</td>
                        <td><code>{b.licenseNumber || "LIC-2026-X"}</code></td>
                        <td>{b.country || "International"}</td>
                        <td>
                          <span className="badge bg-light text-dark border">
                            <i className="bi bi-file-earmark-pdf text-danger me-1"></i>
                            {b.licenseName || "Drug_License.pdf"}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-success"
                              onClick={() => handleApprove(b.id, b.name)}
                            >
                              <i className="bi bi-check-lg me-1"></i>Approve
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleReject(b.id, b.name)}
                            >
                              <i className="bi bi-x-lg me-1"></i>Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h5 className="fw-bold text-dark mb-3">All Registered Buyers Master List</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Buyer Name</th>
                    <th>Email</th>
                    <th>License Status</th>
                    <th>Document</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allBuyers.map((b) => (
                    <tr key={b.id}>
                      <td><strong>{b.name}</strong></td>
                      <td>{b.email}</td>
                      <td>
                        <span
                          className={`badge text-capitalize ${
                            b.status === "verified"
                              ? "bg-success"
                              : b.status === "pending"
                              ? "bg-warning text-dark"
                              : b.status === "rejected"
                              ? "bg-danger"
                              : "bg-secondary"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td>{b.licenseName || "Not uploaded"}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          {b.status !== "verified" && (
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() => handleApprove(b.id, b.name)}
                            >
                              Set Verified
                            </button>
                          )}
                          {b.status !== "rejected" && (
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleReject(b.id, b.name)}
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OfficerDashboard;
