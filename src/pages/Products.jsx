import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import FilterGroup from "../components/FilterGroup";
import PageHero from "../components/PageHero";

const tabs = [
  { name: "All", label: "All Products", icon: "bi-grid" },
  { name: "Medicines", label: "Medicines", icon: "bi-capsule" },
  { name: "Medical Devices", label: "Medical Devices", icon: "bi-heart-pulse" },
  { name: "Consumables", label: "Consumables", icon: "bi-box-seam" },
];

const allRegions = ["North America", "Europe", "Asia", "Middle East", "Africa"];

function Products() {
  // 1. State: what the user has chosen
  const [category, setCategory] = useState("All");
  const [areas, setAreas] = useState([]);
  const [makers, setMakers] = useState([]);
  const [regions, setRegions] = useState([]);
  const [sortBy, setSortBy] = useState("popularity");

  // 2. Build the filter options (with counts) from the product data
  const areaNames = [...new Set(products.map((p) => p.therapeuticArea).filter(Boolean))];
  const makerNames = [...new Set(products.map((p) => p.manufacturer))];

  const areaOptions = areaNames.map((a) => ({
    label: a,
    count: products.filter((p) => p.therapeuticArea === a).length,
  }));
  const makerOptions = makerNames.map((m) => ({
    label: m,
    count: products.filter((p) => p.manufacturer === m).length,
  }));
  const regionOptions = allRegions.map((r) => ({
    label: r,
    count: products.filter((p) => p.regions.includes(r)).length,
  }));

  // 3. Tick or untick a checkbox
  const toggle = (list, setList, value) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  // 4. Apply all the filters
  const result = products.filter((p) => {
    const okCategory = category === "All" || p.category === category;
    const okArea = areas.length === 0 || areas.includes(p.therapeuticArea);
    const okMaker = makers.length === 0 || makers.includes(p.manufacturer);
    const okRegion = regions.length === 0 || p.regions.some((r) => regions.includes(r));
    return okCategory && okArea && okMaker && okRegion;
  });

  // 5. Sort
  if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
  if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));

  // 6. Reset everything
  const resetAll = () => {
    setCategory("All");
    setAreas([]);
    setMakers([]);
    setRegions([]);
    setSortBy("popularity");
  };

  return (
    <>
      <PageHero
        eyebrow="Our product catalog"
        title="Pharmaceutical & Medical Supplies for a Healthier World"
        text="High-quality medicines, advanced medical devices and essential consumables, trusted by healthcare providers globally."
      />

      <div className="container mt-4">
        {/* Category tabs */}
        <div className="row g-3 mb-4">
          {tabs.map((t) => (
            <div className="col-6 col-md-3" key={t.name}>
              <button
                className={
                  category === t.name
                    ? "btn btn-pb w-100 py-3"
                    : "btn btn-outline-pb w-100 py-3"
                }
                onClick={() => setCategory(t.name)}
              >
                <i className={`bi ${t.icon} me-2`}></i>
                {t.label}
              </button>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-lg-3">
            <div className="pb-card">
              <h5 className="fw-bold mb-3">Filter Products</h5>

              <FilterGroup
                title="Therapeutic Area"
                options={areaOptions}
                selected={areas}
                onToggle={(v) => toggle(areas, setAreas, v)}
              />
              <FilterGroup
                title="Manufacturer"
                options={makerOptions}
                selected={makers}
                onToggle={(v) => toggle(makers, setMakers, v)}
              />
              <FilterGroup
                title="Region"
                options={regionOptions}
                selected={regions}
                onToggle={(v) => toggle(regions, setRegions, v)}
              />

              <button className="btn btn-outline-pb w-100" onClick={resetAll}>
                Reset
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <small className="text-muted-pb">
                Showing {result.length} of {products.length} products
              </small>
              <select
                className="form-select w-auto"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {result.length === 0 ? (
              <div className="pb-card text-center">
                <p className="mb-2">No products match your filters.</p>
                <button className="btn btn-pb" onClick={resetAll}>Clear filters</button>
              </div>
            ) : (
              <div className="row g-4">
                {result.map((product) => (
                  <div className="col-12 col-md-6 col-xl-4" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;