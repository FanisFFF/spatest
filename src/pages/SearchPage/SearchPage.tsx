import { useState } from "react";
import { DataType } from "../../types/DataType";
import { CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/search-bar.component";
import SearchResult from "../../components/SearchResult/search-result.component";
import "./search-page.styles.scss";

function SearchPage() {
  const [data, setData] = useState([] as DataType[]);
  const [error, setError] = useState("");
  const params = useParams();

  return (
    <>
      <div
        className="main-user-page"
        style={{
          marginTop: "3rem",
          borderTop: "1px solid rgba(185, 202, 211, 0.281)",
        }}
      >
        <div className="main__col-2">
          <SearchBar onSetData={setData} onSetError={setError}></SearchBar>
        </div>
        <div className="search-results">
          {data.length > 0 ? (
            data.map((row: DataType) => (
              <SearchResult key={row._id} data={row} />
            ))
          ) : (
            <Typography style={{ marginTop: "2rem" }} color="primary">
              Not found
            </Typography>
          )}
        </div>

        {error && <Typography color="error">{error}</Typography>}
      </div>
    </>
  );
}
export default SearchPage;
