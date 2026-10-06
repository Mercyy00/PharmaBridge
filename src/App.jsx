import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Enquiry from "./pages/Enquiry";
import Compliance from "./pages/Compliance";
import Downloads from "./pages/Downloads";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadLicense from "./pages/UploadLicense";
import OfficerDashboard from "./pages/OfficerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          {/* Public pages (Guest) */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Restricted documents: verified buyers, officers and admins only */}
          <Route
            path="/downloads"
            element={
              <ProtectedRoute roles={["buyer", "officer", "admin"]} requireVerified>
                <Downloads />
              </ProtectedRoute>
            }
          />

          {/* Buyer only */}
          <Route
            path="/upload-license"
            element={
              <ProtectedRoute roles={["buyer"]}>
                <UploadLicense />
              </ProtectedRoute>
            }
          />

          {/* Compliance Officer only */}
          <Route
            path="/officer"
            element={
              <ProtectedRoute roles={["officer"]}>
                <OfficerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin only */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
