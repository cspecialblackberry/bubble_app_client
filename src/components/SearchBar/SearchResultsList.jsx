import "./style.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results && results.length == 0 && <p className="no-users">No users found</p>}
      {results.map((result) => {
        return <SearchResult result={result.username} id={result._id} key={result._id} />;
      })}
    </div>
  );
};