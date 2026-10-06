import { Link } from "react-router-dom";

function PageHero({ eyebrow, title, text, buttonText, buttonLink, image }) {
  return (
    <section className="container mt-3">
      <div className="hero">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="eyebrow mb-2">{eyebrow}</div>
            <h1 className="fw-bold display-5">{title}</h1>
            <p className="text-muted-pb">{text}</p>
            {buttonText && (
              <Link to={buttonLink} className="btn btn-pb">
                {buttonText} <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            )}
          </div>
          <div className="col-lg-6 text-center mt-4 mt-lg-0">
            {image && (
              <img src={image} alt="" className="img-fluid" style={{ maxHeight: "300px" }} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageHero;
