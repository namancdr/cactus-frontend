import { useState, useEffect } from "react";
import { useUser } from "../context/user/userContext";
import UserCard from "./UserCard";
import searchIcon from "../assets/search.png";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const { searchUser, searchResult } = useUser();

  const searchUserCall = async (searchInput) => {
    try {
      await searchUser(searchInput);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchUserCall(searchInput);
  }, [searchInput]); // eslint-disable-line

  const handleChange = async (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="component-style container-fluid search d-flex flex-column justify-content-center">
      <div className="text-center search-form">
        <input
          type="text"
          name="searchInput"
          placeholder="Search for a user..."
          className="form-control-sm commentInput"
          onChange={handleChange}
          value={searchInput}
          autoComplete="off"
        />
      </div>

      {/* Results */}
      <div className="">
        {searchInput.length > 0 ? (
          searchResult.map((user) => {
            return <UserCard key={user._id} user={user} />;
          })
        ) : (
          <div className="mt-3">
            <h5>
              <strong>Popular</strong>
            </h5>
            <span>
              <img
                src={searchIcon}
                className="result-search-icon"
                alt="search"
              />
            </span>
            <span>
              {searchResult
                ? searchResult[Math.floor(Math.random() * 10)]?.name
                : "Naman"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
