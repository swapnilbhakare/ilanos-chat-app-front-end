import { useState } from "react";
import { searchUser } from "../http/index";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

const useSearch = ({ handleUserSelect }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (phone) => {
    try {
      const { data } = await searchUser({ phone });
      const user = data?.data?.user;
      setSearchResult(user);
      setShowSearch(true);

      dispatch(setUser(user));
    } catch (error) {
      console.log("Error searching user", error);
    }
  };

  const handleOpenSearch = () => {
    setShowSearch(true);
  };
  const handleBackButtonClick = () => {
    setShowSearch(false);
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResult,
    showSearch,
    setShowSearch,
    handleSearchInputChange,
    handleSearchSubmit,
    handleOpenSearch,
    handleBackButtonClick,
  };
};

export default useSearch;
