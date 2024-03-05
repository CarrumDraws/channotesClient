import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [getQuery, setQuery] = useSearchParams();

  return (
    <div>
      <button onClick={() => setQuery({ query: "New Query" })}>
        Set Query
      </button>
      <button
        onClick={() =>
          setQuery((params) => {
            params.delete("query");
            return params;
          })
        }
      >
        Delete Query
      </button>
      Search {getQuery.get("query")}
    </div>
  );
}

export default Search;
