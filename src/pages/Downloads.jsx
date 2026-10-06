import PageHero from "../components/PageHero";
import { useAuth } from "../context/AuthContext";

const downloadsList = [
  {
    category: "Product Catalog",
    title: "Global Export Formulary & Product Catalog 2026-2027",
    desc: "Complete listing of over 1,000 formulations, therapeutic indications, dosage forms, active pharmaceutical ingredients (APIs), packaging options, and shipping specifications.",
    format: "PDF Document",
    size: "14.2 MB",
    updated: "Updated October 2026",
    badge: "Public Formulary",
    icon: "bi-book",
    fileName: "PharmaBridge_Global_Catalog_2026.pdf",
  },
  {
    category: "Certificate of Analysis (COA) Samples",
    title: "Standardized COA Monograph & Quality Test Samples",
    desc: "Verified laboratory test reports displaying physicochemical parameters, microbial limits, HPLC assay assays, dissolution profiles, and stability benchmarks for cardiovascular, antibiotic, and oncology formulations.",
    format: "ZIP Archive (PDFs)",
    size: "8.6 MB",
    updated: "Updated September 2026",
    badge: "Batch Verified",
    icon: "bi-file-earmark-check",
    fileName: "PharmaBridge_COA_Batch_Samples.zip",
  },
  {
    category: "Regulatory Files & Technical Dossiers",
    title: "Common Technical Document (CTD) Module 3 Package",
    desc: "Module 3 Quality dossiers, DMF (Drug Master File) open parts, GMP declarations, TSE/BSE risk assessments, stability zone IVb reports, and FSC documentation required for import registration by international FDA/MOH authorities.",
    format: "Secure PDF Dossier",
    size: "24.8 MB",
    updated: "Updated October 2026",
    badge: "Restricted Access",
    icon: "bi-shield-lock",
    fileName: "PharmaBridge_Regulatory_CTD_Dossier.pdf",
  },
];

function Downloads() {
  const { currentUser } = useAuth();

  const handleDownload = (fileName) => {
    // Simulated download action
    alert(`Downloading verified resource: ${fileName}`);
  };

  return (
    <>
      <PageHero
        eyebrow="Resources & documents"
        title="Download Technical & Regulatory Resources"
        text="Access comprehensive product catalogs, validated certificates, regulatory CTD files, and quality dossiers to support your global procurement and registration needs."
      />

      <div className="container mt-4 mb-5">
        <div className="alert alert-success d-flex align-items-center gap-3 rounded-4 p-3 mb-4 shadow-sm">
          <i className="bi bi-shield-fill-check fs-3 text-success"></i>
          <div>
            <strong>Verified Authorization Confirmed:</strong> Logged in as{" "}
            <strong>{currentUser?.name || "Authorized Partner"}</strong> ({currentUser?.role} -{" "}
            <span className="text-uppercase">{currentUser?.status || "verified"}</span>). You have full clearance to access restricted technical and regulatory dossiers.
          </div>
        </div>

        <div className="d-flex flex-column gap-4">
          {downloadsList.map((item, idx) => (
            <div className="pb-card p-4 shadow-sm" key={idx}>
              <div className="row g-4 align-items-center">
                {/* Left Description */}
                <div className="col-lg-7">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge bg-primary-subtle text-primary border">{item.category}</span>
                    <span className="badge bg-info-subtle text-info border">{item.badge}</span>
                  </div>
                  <h4 className="fw-bold text-dark mb-2">{item.title}</h4>
                  <p className="text-muted-pb mb-0">{item.desc}</p>
                </div>

                {/* Right Details & Action */}
                <div className="col-lg-5">
                  <div className="p-3 bg-light rounded-4 border d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between text-muted-pb small">
                      <span><i className="bi bi-file-earmark me-1"></i>Format:</span>
                      <strong className="text-dark">{item.format}</strong>
                    </div>
                    <div className="d-flex justify-content-between text-muted-pb small">
                      <span><i className="bi bi-hdd me-1"></i>File Size:</span>
                      <strong className="text-dark">{item.size}</strong>
                    </div>
                    <div className="d-flex justify-content-between text-muted-pb small">
                      <span><i className="bi bi-clock-history me-1"></i>Last Updated:</span>
                      <strong className="text-dark">{item.updated}</strong>
                    </div>
                    <button
                      className="btn btn-pb w-100 mt-2"
                      onClick={() => handleDownload(item.fileName)}
                    >
                      <i className="bi bi-download me-2"></i>Download Resource
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Downloads;
