import React from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

export default function SortBy({ options }) {
  const [serachParams, setSearchParams] = useSearchParams();
  const sortBy = serachParams.get("sortBy") || "";
  const handleChange = (e) => {
    serachParams.set("sortBy", e.target.value);
    setSearchParams(serachParams);
  };
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}
