import { useSearchParams } from "react-router-dom";
import Select from "./Select.jsx";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortBy = searchParams.get("sortBy") || "";

  const handleClick = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      type={"white"}
      value={currentSortBy}
      onChange={handleClick}
    />
  );
};

export default SortBy;
