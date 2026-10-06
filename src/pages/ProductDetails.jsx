import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import ProductImage from "../components/ProductImages";

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mt-4">
        <p>Product not found.</p>
        <Link to="/products">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Link to="/products" className="btn btn-link px-0">← Back to products</Link>

      <div className="row g-4 align-items-start">
        <div className="col-md-5">
          <ProductImage product={product} height={380} />
        </div>

        <div className="col">
          <h2 className="fw-bold">{product.name}</h2>
          <span className="badge bg-info-subtle text-primary mb-3">{product.category}</span>

          <table className="table table-bordered w-auto">
            <tbody>
              <tr><th>Manufacturer</th><td>{product.manufacturer}</td></tr>
              <tr><th>Composition</th><td>{product.composition}</td></tr>
              <tr><th>Dosage</th><td>{product.dosage}</td></tr>
              <tr><th>Packaging</th><td>{product.packaging}</td></tr>
              <tr>
                <th>Indicative price</th>
                <td>${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })} {product.unit}</td>
              </tr>
              <tr><th>Available in</th><td>{product.regions.join(", ")}</td></tr>
            </tbody>
          </table>

          <div>
            <Link to="/enquiry" className="btn btn-pb">Send Enquiry</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;