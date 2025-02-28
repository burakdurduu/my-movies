import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export const SearchContextProvider = ({ children }) => {
  const [query, setQuery] = useState("");

  const updateQuery = (query) => {
    setQuery(query);
  };

  return (
    <SearchContext.Provider value={{ query, updateQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
