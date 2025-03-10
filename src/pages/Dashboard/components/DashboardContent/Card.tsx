import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";

interface Props {
  isRecentJob?: boolean;
  icon: string;
  bgColor: string;
  dropdownText: string;
  labelText: string;
  onClick: () => void;
  children?: React.ReactNode;
}

export default function Card({
  isRecentJob = false,
  icon,
  bgColor,
  dropdownText,
  labelText,
  onClick,
  children,
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="bg-white rounded-md shadow-statistic p-3 h-fit w-full">
      <div className="relative flex justify-end" ref={dropdownRef}>
        <button
          id="dropdownButton"
          onClick={toggleDropdown}
          type="button"
          className="focus:outline-none"
        >
          <Icon icon="ri:more-line" className="text-pep-gray text-xl" />
        </button>
        {isDropdownOpen && (
          <div
            id="dropdown"
            aria-labelledby="dropdownButton"
            className="absolute right-0 mt-4 bg-white rounded-md shadow-dropDown z-10 font-light text-label"
          >
            <button
              className="block px-5 py-2.5 text-sm  w-full text-left hover:bg-pep-blue-light hover:text-pep-blue"
              onClick={onClick}
            >
              {dropdownText}
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-row space-x-5 place-items-center">
        <div
          className={`w-[50px] h-[50px] rounded-sm flex items-center justify-center ${bgColor}`}
        >
          {isRecentJob ? (
            <Icon
              icon={icon}
              className="text-selected w-[30px] h-[30px] object-contain"
            />
          ) : (
            <img
              src={icon}
              alt={dropdownText}
              className="w-[30px] h-[30px] object-contain"
            />
          )}
        </div>
        <div className="grow">
          <label className="font-light text-nowrap">{labelText}</label>
          {children}
        </div>
      </div>
    </div>
  );
}
