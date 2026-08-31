import { useState, useRef, useEffect } from "react";

export default function PageNumberDropdown({
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
}: {
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
  setCurrentPage: (page: number) => void;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const dropdownItems: { text: string; value: number }[] = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "20", value: 20 },
    { text: "50", value: 50 },
  ];

  const handleSelectNumber = (value: number) => {
    setItemsPerPage(value);
    setIsDropdownOpen(false);
    setCurrentPage(1);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative flex space-x-2 items-center font-light text-pep-gray"
    >
      <div className="text-pep-gray">Show: </div>
      <button
        id="dropdown-mutation-page-number"
        onClick={toggleDropdown}
        className={`inline-flex items-center font-light border bg-white px-3 py-1.5 rounded-lg h-[30px] border-${
          isDropdownOpen ? "pep-blue" : "pep-gray-border"
        }`}
        type="button"
      >
        {itemsPerPage}
        <svg
          className="w-2.5 h-2.5 ms-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute mt-[180px] right-0 z-10 w-[50%] min-w-fit max-w-[165px] bg-white divide-y rounded-lg">
          <ul className="py-3 space-y-3 text-sm text-placeholder text-center">
            {/* Checkbox Options */}
            {dropdownItems.map((value, index) => (
              <li
                key={value.value}
                className="cursor-pointer"
                onClick={() => handleSelectNumber(value.value)}
              >
                <label className="w-full text-sm">{value.text}</label>
                {index < dropdownItems.length - 1 && <hr />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
