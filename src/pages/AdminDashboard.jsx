import { useState } from "react";
import { products as initialProducts } from "../data/products";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { users } = useAuth();
  const [productList, setProductList] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("products");

  const filteredProducts = productList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to remove this export item from the catalog?")) {
      setProductList(productList.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4 pb-3 border-bottom">
        <div>
          <div className="eyebrow">Enterprise Management</div>
          <h2 className="fw-bold text-dark mb-0">PharmaBridge Administrator Control Panel</h2>
          <p className="text-muted-pb mb-0">System administration, catalog management, role management & export oversight.</p>
        </div>
        <span className="badge bg-primary px-3 py-2 rounded-pill fs-6">
          <i className="bi bi-shield-lock-fill me-1"></i>Super Admin
        </span>
      </div>

      {/* Analytics KPI Row */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="pb-card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted-pb small">Catalog Products</span>
                <div className="fs-3 fw-bold text-dark">{productList.length}</div>
              </div>
              <div className="icon-circle"><i className="bi bi-capsule"></i></div>
            </div>
            <small className="text-success fw-semibold"><i className="bi bi-arrow-up-short"></i>Active Formulary</small>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="pb-card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted-pb small">Registered Users</span>
                <div className="fs-3 fw-bold text-dark">{users.length}</div>
              </div>
              <div className="icon-circle"><i className="bi bi-people"></i></div>
            </div>
            <small className="text-primary fw-semibold">Buyers, Officers, Admins</small>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="pb-card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted-pb small">Export Regions</span>
                <div className="fs-3 fw-bold text-dark">5 Continents</div>
              </div>
              <div className="icon-circle"><i className="bi bi-globe"></i></div>
            </div>
            <small className="text-info fw-semibold">100+ Destination Ports</small>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="pb-card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted-pb small">Compliance Status</span>
                <div className="fs-3 fw-bold text-success">100% OK</div>
              </div>
              <div className="icon-circle"><i className="bi bi-patch-check"></i></div>
            </div>
            <small className="text-success fw-semibold">GMP/ISO Audited</small>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-pills mb-3 gap-2">
        <li className="nav-item">
          <button
            className={`btn btn-sm ${activeTab === "products" ? "btn-pb" : "btn-outline-pb"}`}
            onClick={() => setActiveTab("products")}
          >
            <i className="bi bi-boxes me-1"></i>Manage Products ({productList.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`btn btn-sm ${activeTab === "users" ? "btn-pb" : "btn-outline-pb"}`}
            onClick={() => setActiveTab("users")}
          >
            <i className="bi bi-people me-1"></i>User & Role Directory ({users.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`btn btn-sm ${activeTab === "tenders" ? "btn-pb" : "btn-outline-pb"}`}
            onClick={() => setActiveTab("tenders")}
          >
            <i className="bi bi-file-earmark-spreadsheet me-1"></i>Institutional Enquiries & Tenders
          </button>
        </li>
      </ul>

      {/* Tab Panels */}
      {activeTab === "products" && (
        <div className="pb-card p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
            <h5 className="fw-bold text-dark mb-0">Active Product Formulary</h5>
            <div style={{ maxWidth: "300px", width: "100%" }}>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search products, manufacturers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Manufacturer</th>
                  <th>Price / Unit</th>
                  <th>Export Regions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id}>
                    <td>#{p.id}</td>
                    <td>
                      <strong>{p.name}</strong>
                      <div className="small text-muted">{p.composition}</div>
                    </td>
                    <td>
                      <span className="badge bg-info-subtle text-primary border">{p.category}</span>
                    </td>
                    <td>{p.manufacturer}</td>
                    <td>
                      <strong>${p.price}</strong> <span className="small text-muted">{p.unit}</span>
                    </td>
                    <td>
                      <small className="text-muted">{p.regions.join(", ")}</small>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteProduct(p.id)}
                        title="Delete product"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="pb-card p-4">
          <h5 className="fw-bold text-dark mb-3">System User Accounts & Authorization Levels</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Verification Status</th>
                  <th>License Document</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td><strong>{u.name}</strong></td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${u.role === "admin" ? "bg-dark" : u.role === "officer" ? "bg-primary" : "bg-info"}`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span className="badge text-capitalize bg-light text-dark border">
                        {u.status || "N/A (Staff)"}
                      </span>
                    </td>
                    <td>{u.licenseName || "None"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "tenders" && (
        <div className="pb-card p-4">
          <h5 className="fw-bold text-dark mb-3">Global Tender & Commercial Enquiries Inbox</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Tracking Ref</th>
                  <th>Institution / Buyer</th>
                  <th>Type</th>
                  <th>Product / Scope</th>
                  <th>Quantity / Volume</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>TND-2026-081</code></td>
                  <td>Ministry of Health, East Africa</td>
                  <td>Government Tender</td>
                  <td>Insulin Glargine & Atorvastatin</td>
                  <td>100,000 units</td>
                  <td><span className="badge bg-warning text-dark">Under Review</span></td>
                </tr>
                <tr>
                  <td><code>ENQ-2026-149</code></td>
                  <td>Apex Hospital Network, UAE</td>
                  <td>Commercial Quote</td>
                  <td>Nitrile Gloves & ICU Ventilators</td>
                  <td>5,000 boxes + 10 units</td>
                  <td><span className="badge bg-success">Quotation Dispatched</span></td>
                </tr>
                <tr>
                  <td><code>TND-2026-092</code></td>
                  <td>Red Cross Regional Warehouse</td>
                  <td>Emergency Supply</td>
                  <td>Sodium Chloride 0.9% IV & Dressings</td>
                  <td>25,000 packs</td>
                  <td><span className="badge bg-primary">Contract Finalized</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
