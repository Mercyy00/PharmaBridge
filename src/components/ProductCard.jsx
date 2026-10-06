import { Link } from "react-router-dom";
import ProductImage from "./ProductImages";

const badgeColors = {
  Medicines: "bg-primary-subtle text-primary",
  "Medical Devices": "bg-primary-subtle text-primary",
  Consumables: "bg-success-subtle text-success",
};

function ProductCard({ product }) {
  return (
    <div className="pb-card d-flex flex-column p-3">
      <div className="mb-3">
        <ProductImage product={product} height={170} />
      </div>

      <span className={`badge align-self-start mb-2 ${badgeColors[product.category]}`}>
        {product.category}
      </span>
      <h6 className="fw-bold mb-0">{product.name}</h6>
      <small className="text-muted-pb mb-2">{product.manufacturer}</small>
      <small className="text-muted-pb mb-3">{product.description}</small>

      <div className="mt-auto">
        <div className="fw-bold fs-5">
          ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </div>
        <small className="text-muted-pb d-block mb-3">{product.unit}</small>

        <div className="d-flex gap-2">
          <Link to={`/products/${product.id}`} className="btn btn-pb flex-grow-1">
            View Details
          </Link>
          <Link to="/enquiry" className="btn btn-outline-pb" title="Send enquiry">
            <i className="bi bi-cart"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;