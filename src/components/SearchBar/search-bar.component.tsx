import SearchIcon from "@mui/icons-material/Search";
import "./search-bar.styles.scss";
import axios from "axios";
import { BASE_URL } from "../../api/baseUrl";
import { FC, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { DataType } from "../../types/DataType";
type SearchBarProps = {
  onSetData: (data: DataType[]) => void;
  onSetError: (error: string) => void;
  onSetIsLoading: (boolean: boolean) => void;
};

const SearchBar: FC<SearchBarProps> = ({
  onSetData,
  onSetError,
  onSetIsLoading,
}) => {
  const [search, setSearch] = useState("");
  const { token } = useAuth();

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (search.length < 1) return;
    try {
      onSetIsLoading(true);
      const response = await axios.get(`${BASE_URL}/search/get/${search}`, {
        headers: {
          "x-auth": token,
        },
      });
      onSetData(response.data.data);
      onSetIsLoading(false);
    } catch (error) {
      onSetIsLoading(false);
      onSetError(error as string);
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSearch}>
      <div className="search-bar">
        <div className="search-bar__icon">
          <SearchIcon />
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
        />
      </div>
    </form>
  );
};
export default SearchBar;
