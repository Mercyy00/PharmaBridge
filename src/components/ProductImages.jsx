import { useState } from "react";

// Which drawing belongs to which product id
const artById = {
  1: "pillbox",
  2: "bpmonitor",
  3: "gloves",
  4: "pen",
  5: "ventilator",
  6: "dressing",
  7: "vial",
  8: "instrument",
  9: "ivbag",
  10: "capsules",
  11: "inhaler",
  12: "tablets",
};

// If a new product has no drawing, use one by category
const artByCategory = {
  Medicines: "capsules",
  "Medical Devices": "bpmonitor",
  Consumables: "gloves",
};

const arts = {
  pillbox: (
    <g>
      <rect x="55" y="30" width="90" height="80" rx="8" fill="#fff" stroke="#0b2a5b" strokeWidth="3" />
      <rect x="55" y="30" width="90" height="24" rx="8" fill="#1370e8" />
      <text x="100" y="47" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Rx</text>
      <rect x="72" y="68" width="56" height="8" rx="4" fill="#cfe3fb" />
      <rect x="72" y="84" width="38" height="8" rx="4" fill="#cfe3fb" />
      <circle cx="150" cy="106" r="12" fill="#fff" stroke="#0b2a5b" strokeWidth="3" />
      <line x1="141" y1="106" x2="159" y2="106" stroke="#0b2a5b" strokeWidth="2" />
    </g>
  ),
  bpmonitor: (
    <g>
      <rect x="45" y="35" width="75" height="70" rx="10" fill="#fff" stroke="#0b2a5b" strokeWidth="3" />
      <rect x="55" y="45" width="55" height="26" rx="4" fill="#cfe3fb" />
      <text x="82" y="64" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0b2a5b">120/80</text>
      <circle cx="82" cy="88" r="7" fill="#1370e8" />
      <rect x="125" y="50" width="42" height="50" rx="12" fill="#1370e8" />
      <path d="M120 75 H125" stroke="#0b2a5b" strokeWidth="4" />
    </g>
  ),
  gloves: (
    <g fill="#5aa9f7" stroke="#1370e8" strokeWidth="2.5">
      <rect x="72" y="60" width="58" height="48" rx="14" />
      <rect x="73" y="25" width="11" height="45" rx="5.5" />
      <rect x="87" y="17" width="11" height="53" rx="5.5" />
      <rect x="101" y="21" width="11" height="49" rx="5.5" />
      <rect x="115" y="29" width="11" height="41" rx="5.5" />
      <rect x="54" y="66" width="11" height="34" rx="5.5" transform="rotate(-28 59 83)" />
      <rect x="76" y="104" width="50" height="14" rx="3" fill="#cfe3fb" stroke="#1370e8" />
    </g>
  ),
  pen: (
    <g transform="rotate(-20 100 70)">
      <rect x="40" y="57" width="115" height="26" rx="9" fill="#fff" stroke="#0b2a5b" strokeWidth="3" />
      <rect x="40" y="57" width="38" height="26" rx="9" fill="#1370e8" />
      <rect x="84" y="64" width="52" height="12" rx="3" fill="#cfe3fb" />
      <rect x="155" y="66" width="24" height="8" rx="2" fill="#0b2a5b" />
      <line x1="179" y1="70" x2="190" y2="70" stroke="#0b2a5b" strokeWidth="2" />
    </g>
  ),
  ventilator: (
    <g>
      <rect x="50" y="22" width="90" height="62" rx="9" fill="#fff" stroke="#0b2a5b" strokeWidth="3" />
      <rect x="60" y="32" width="70" height="38" rx="4" fill="#0b2a5b" />
      <polyline points="65,56 77,56 83,42 91,64 99,49 107,56 125,56" fill="none" stroke="#2fe39a" strokeWidth="2.5" />
      <rect x="90" y="84" width="10" height="22" fill="#0b2a5b" />
      <rect x="65" y="106" width="60" height="8" rx="4" fill="#0b2a5b" />
      <circle cx="72" cy="122" r="6" fill="#1370e8" />
      <circle cx="118" cy="122" r="6" fill="#1370e8" />
      <path d="M140 55 C172 55 172 100 150 108" stroke="#1370e8" strokeWidth="5" fill="none" strokeLinecap="round" />
    </g>
  ),
  dressing: (
    <g>
      <rect x="58" y="30" width="84" height="84" rx="18" fill="#f6dfcf" stroke="#d9a98a" strokeWidth="3" />
      <rect x="76" y="48" width="48" height="48" rx="9" fill="#fff" />
      <circle cx="150" cy="38" r="3" fill="#d9a98a" />
      <circle cx="52" cy="108" r="3" fill="#d9a98a" />
    </g>
  ),
  vial: (
    <g>
      <rect x="85" y="20" width="30" height="14" rx="3" fill="#1370e8" />
      <rect x="80" y="34" width="40" height="9" rx="2" fill="#0b2a5b" />
      <rect x="78" y="43" width="44" height="74" rx="9" fill="#e8f3ff" stroke="#0b2a5b" strokeWidth="3" />
      <rect x="80" y="82" width="40" height="33" rx="7" fill="#9ccbfa" />
      <rect x="84" y="58" width="32" height="24" rx="3" fill="#fff" />
      <text x="100" y="74" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1370e8">HPV</text>
    </g>
  ),
  instrument: (
    <g strokeLinecap="round">
      <line x1="62" y1="108" x2="150" y2="36" stroke="#0b2a5b" strokeWidth="7" />
      <line x1="62" y1="108" x2="150" y2="36" stroke="#cfe3fb" strokeWidth="2" />
      <circle cx="52" cy="106" r="12" fill="none" stroke="#1370e8" strokeWidth="5" />
      <circle cx="70" cy="122" r="10" fill="none" stroke="#1370e8" strokeWidth="5" />
      <path d="M150 36 L168 26 M150 36 L162 50" stroke="#0b2a5b" strokeWidth="5" fill="none" />
    </g>
  ),
  ivbag: (
    <g>
      <path d="M70 32 H130 V95 Q130 114 100 114 Q70 114 70 95 Z" fill="#e8f3ff" stroke="#0b2a5b" strokeWidth="3" />
      <rect x="70" y="32" width="60" height="8" fill="#0b2a5b" />
      <rect x="80" y="55" width="40" height="28" rx="3" fill="#fff" />
      <text x="100" y="73" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1370e8">NaCl 0.9%</text>
      <path d="M100 114 V132" stroke="#0b2a5b" strokeWidth="4" />
      <path d="M100 20 V32" stroke="#0b2a5b" strokeWidth="4" />
      <circle cx="100" cy="18" r="4" fill="none" stroke="#0b2a5b" strokeWidth="3" />
    </g>
  ),
  capsules: (
    <g>
      <g transform="rotate(-30 100 55)">
        <rect x="55" y="42" width="90" height="28" rx="14" fill="#fff" stroke="#0b2a5b" strokeWidth="3" />
        <path d="M100 42 h31 a14 14 0 0 1 0 28 h-31 z" fill="#1370e8" />
      </g>
      <g transform="rotate(20 100 95)">
        <rect x="55" y="82" width="90" height="28" rx="14" fill="#fff" stroke="#0b2a5b" strokeWidth="3" />
        <path d="M100 82 h31 a14 14 0 0 1 0 28 h-31 z" fill="#2fb67c" />
      </g>
    </g>
  ),
  inhaler: (
    <g>
      <rect x="72" y="70" width="48" height="48" rx="9" fill="#fff" stroke="#0b2a5b" strokeWidth="3" />
      <rect x="120" y="94" width="42" height="22" rx="7" fill="#0b2a5b" />
      <rect x="78" y="18" width="36" height="60" rx="7" fill="#1370e8" />
      <text x="96" y="52" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Rx</text>
    </g>
  ),
  tablets: (
    <g>
      <rect x="42" y="32" width="116" height="76" rx="9" fill="#e8f3ff" stroke="#0b2a5b" strokeWidth="3" />
      {[0, 1, 2, 3].map((i) =>
        [0, 1].map((j) => (
          <circle key={`${i}-${j}`} cx={64 + i * 24} cy={58 + j * 30} r="9" fill="#fff" stroke="#1370e8" strokeWidth="3" />
        ))
      )}
    </g>
  ),
};

function ProductImage({ product, height = 170 }) {
  const [failed, setFailed] = useState(false);
  const boxStyle = { height, background: "linear-gradient(135deg, #eaf3fd, #d4e7fb)" };

  // 1) A real photo, if you wrote a full address in the "image" field
  if (product.image && !failed) {
    return (
      <div className="rounded-3 overflow-hidden" style={boxStyle}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  // 2) Otherwise the drawing
  const key = artById[product.id] || artByCategory[product.category] || "pillbox";
  return (
    <div
      className="rounded-3 overflow-hidden d-flex align-items-center justify-content-center"
      style={boxStyle}
    >
      <svg
        viewBox="0 0 200 140"
        role="img"
        aria-label={product.name}
        style={{ height: "100%", maxWidth: "100%" }}
      >
        {arts[key]}
      </svg>
    </div>
  );
}

export default ProductImage;