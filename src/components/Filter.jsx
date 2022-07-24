const Filter = ({ filter_items, setFilter }) => {
  return (
    <div className="select">
      <select
        onChange={(e) => setFilter(e.target.value)}
        className="custom-select"
        aria-label="Filter Countries By Region"
      >
        <option value="" disabled>
          Filter By Region
        </option>
        {filter_items.map((item) => (
          <option key={item} value={item}>
            Filter By {item}
          </option>
        ))}
      </select>
      <span className="focus"></span>
    </div>
  );
};

export default Filter;
