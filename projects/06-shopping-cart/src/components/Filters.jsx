import { useId } from "react";
import { useFilter } from "../hooks/useFilters";
import "./Filters.css";

export function Filters() {
  const {filters, setFilters} = useFilter()
  const minPriceFilteredId = useId()
  const categoryFilteredId = useId()

  const handleChangeMinPrice = (event) => {
    setFilters(prevState => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };

  const handleCategoryChange = (event) =>{
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilteredId}>Price starting on:</label>
        <input
          type="range"
          id={minPriceFilteredId}
          min="0"
          max="1500"
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryFilteredId}>Category</label>
        <select id={categoryFilteredId} onChange={handleCategoryChange}>
          <option value="all">Todas</option>
          <option value="beauty">Belleza</option>
          <option value="fragrances">Fragancias</option>
          <option value="furniture">Muebles</option>
          <option value="groceries">Insumos</option>
        </select>
      </div>
    </section>
  );
}
