import { useState, useRef, useEffect } from "react";
import { State } from "../../../../commons/interfaces/Job.interface";

export default function FilterDropdown({
  state,
  setState,
}: {
  state: State[];
  setState: (state: State[]) => void;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const dropdownItems: { text: string; color: string; value: State }[] = [
    { text: "Created", color: "text-pep-blue", value: "CREATED" },
    { text: "Ongoing", color: "text-pep-pink", value: "ONGOING" },
    { text: "Pending", color: "text-pep-orange", value: "PENDING" },
    { text: "Complete", color: "text-pep-green", value: "COMPLETED" },
    { text: "Failed", color: "text-error", value: "FAILED" },
  ];

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

  const handleCheckboxChange = (value: State) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id="dropdownRadioButton"
        onClick={toggleDropdown}
        className={`inline-flex items-center font-light text-pep-gray border bg-white px-3 py-1.5 rounded-lg h-[40px] border-${
          isDropdownOpen ? "pep-blue" : "pep-gray-border"
        }`}
        type="button"
      >
        Status
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
        <div className="absolute z-10 w-[10%] min-w-fit max-w-[165px] bg-white divide-y divide-gray-100 rounded-lg shadow-dropDown">
          <ul className="py-3 space-y-1 text-sm text-placeholder">
            {/* Checkbox Options */}
            {dropdownItems.map((value) => (
              <li key={value.value}>
                <div
                  className="flex items-center px-4 py-2 rounded space-x-4 hover:bg-pep-gray-light cursor-pointer"
                  onClick={() => handleCheckboxChange(value.value)}
                >
                  <input
                    type="checkbox"
                    checked={state.includes(value.value)}
                    className="size-5 checked:bg-pep-blue border border-pep-gray-border rounded"
                    readOnly
                  />
                  <label
                    className={`w-full text-sm ${value.color} cursor-pointer`}
                  >
                    {value.text}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
