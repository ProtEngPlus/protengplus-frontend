import { Icon } from "@iconify/react/dist/iconify.js";
import searchIcon from "../../../../../assets/images/CreateJob/searchIcon.svg";
import { useEffect, useState } from "react";

export default function SearchBar({
  organismList,
  search,
  setSearch,
}: {
  organismList: string[];
  search: string;
  setSearch: (search: string) => void;
}) {
  const [filteredList, setFilteredList] = useState<string[]>(organismList);

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    const filtered = organismList.filter((organism) =>
      organism.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredList(filtered);
  };

  useEffect(() => {
    handleSearch(search);
  }, [organismList, search, setSearch]);

  return (
    <div
      id="modal-scrollable"
      className="relative w-full flex space-x-2 items-start"
    >
      <div className="flex text-center place-items-center space-x-2 h-[50px]">
        <Icon
          icon="eos-icons:organisms-outlined"
          className="size-6 text-pep-gray"
        />
        <label className="text-center text-nowrap font-light">Organism:</label>
      </div>
      <div className="flex flex-col grow">
        <div className="relative flex items-center grow">
          <input
            autoComplete="off"
            id="organism"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search organism"
            className="grow text-wrap h-[50px] w-full min-w-fit pl-10 pr-3 bg-white border font-light placeholder:text-placeholder rounded-md focus:border-pep-blue focus:outline-none disabled:cursor-not-allowed disabled:bg-disabled disabled:border-disabled disabled:text-label"
          />
          <img
            src={searchIcon}
            alt="search"
            className="absolute top-1/2 left-3 transform -translate-y-1/2 cursor-pointer"
          />
        </div>
        <ul
          data-testid="all-uniqiue-organisms"
          className="mt-2 bg-white rounded-md shadow-dropShadow max-h-[190px] z-10 py-2 right-0 overflow-y-scroll"
        >
          {filteredList.map((option, index) => (
            <li
              data-testid="organism"
              key={index}
              className="text-start px-5 py-2 font-light text-label hover:text-pep-blue hover:bg-blue-50 focus:bg-blue-100 cursor-pointer"
              onMouseDown={() => handleSearch(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
