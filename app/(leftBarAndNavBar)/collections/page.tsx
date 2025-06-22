import { SearchForm } from "@/components/search-form";
import React from "react";

const collections = () => {
  return (
    <div>
      <SearchForm
        type="search"
        placeholder="Search for Collection Here..."
        className="w-[300px]"
      />
    </div>
  );
};

export default collections;
