import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-pb mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h4 className="fw-bold">
              <i className="bi bi-plus-square-fill me-2"></i>PharmaBridge
            </h4>
            <small style={{ color: "#c9d8ee" }}>Global Access. Better Health.</small>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled d-grid gap-2">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled d-grid gap-2">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><Link to="/compliance">Regulatory Information</Link></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Follow Us</h6>
            <div className="d-flex gap-3 fs-5">
              <a href="#"><i className="bi bi-linkedin"></i></a>
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-youtube"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: "#2b4a7a" }} />
        <div className="d-flex flex-wrap justify-content-between small" style={{ color: "#c9d8ee" }}>
          <span>© 2026 PharmaBridge. All rights reserved.</span>
          <span>Pharmaceutical & Medical Supplies Export Catalog</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
