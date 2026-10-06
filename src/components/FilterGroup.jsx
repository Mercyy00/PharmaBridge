function FilterGroup({ title, options, selected, onToggle }) {
  return (
    <div className="mb-4">
      <h6 className="fw-bold mb-2">{title}</h6>
      {options.map((opt) => (
        <div className="form-check" key={opt.label}>
          <input
            className="form-check-input"
            type="checkbox"
            id={`${title}-${opt.label}`}
            checked={selected.includes(opt.label)}
            onChange={() => onToggle(opt.label)}
          />
          <label className="form-check-label small" htmlFor={`${title}-${opt.label}`}>
            {opt.label} <span className="text-muted-pb">({opt.count})</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default FilterGroup;