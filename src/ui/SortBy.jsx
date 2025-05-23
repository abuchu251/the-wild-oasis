import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSortValue = searchParams.get("sortBy");
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={selectedSortValue}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
