import jsonData from "@/data.json";
import { useLocation } from "react-router-dom";
import useProductStore from "../store/store";

function Header() {
  const location = useLocation();
  const {handleSelectText} = useProductStore()
  const selectText = useProductStore((state) => state.selectText);
  const handleSearch = (val) =>  handleSelectText(val)

  const date = new Date();

  return (
    <div className="flex justify-between items-center flex-wrap gap-[1.5rem]">
      <div>
        <span className="text-lg text-white">{jsonData.title[location.pathname]}</span>
        {jsonData.seenDate[location.pathname] && (
          <span className="mt-[0.5rem] font-[400] text-[1rem] text-white">
            {date.toDateString()}
          </span>
        )}
      </div>
      {["/", "/settings"].includes(location.pathname) && (
        <div className="search-input">
          <i className="fa-solid fa-magnifying-glass text-white"></i>
          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            value={selectText}
            placeholder="Search for food, coffe, etc.."
          />
        </div>
      )}
    </div>
  );
}

export default Header;
