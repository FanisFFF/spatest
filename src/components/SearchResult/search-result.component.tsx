import { Link } from "react-router-dom";
import "./search-result.styles.scss";
import { DataType } from "../../types/DataType";
import { FC } from "react";
type SearchResultProps = {
  data: DataType;
};
const SearchResult: FC<SearchResultProps> = ({ data }) => {
  const { username } = data;
  return (
    <div className="search-result__user">
      <div className="search-result__avatar">
        <img src="/avatar.png" alt="user-avatar" />
      </div>
      <div className="search-result__text">
        <Link to={`/${username}`}>
          <h2>{username}</h2>
        </Link>
        <p>Lorem ipsum</p>
      </div>
    </div>
  );
};
export default SearchResult;
