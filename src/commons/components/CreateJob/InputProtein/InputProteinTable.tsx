import { useState } from "react";
import SelectInput, { Option } from "../../Input/SelectInput";
import { Icon } from "@iconify/react/dist/iconify.js";

export interface ResultProps {
  description: string;
  scientificName: string;
  maxScore: number;
  totalScore: number;
  queryCover: string;
  eValue: number;
  percIdent: string;
  accLen: number;
  accession: string;
}

const sortByOption: Option[] = [
  { label: "Max Score", value: "max-score" },
  { label: "Total Score", value: "total-score" },
  { label: "Query Cover", value: "query-cover" },
  { label: "E value", value: "e-value" },
  { label: "Perc. Ident", value: "perc-ident" },
  { label: "Acc. len", value: "acc-len" },
  { label: "Accession", value: "accession" },
];

const showOption: Option[] = [{ label: "10", value: "10" }];

export default function InputProteinTable({
  isOverlay = false,
  setFilterVisible,
  onEdit,
  result,
}: {
  isOverlay?: boolean;
  setFilterVisible: (isFilterVisible: boolean) => void;
  onEdit: boolean;
  result: ResultProps[];
}) {
  //for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(result.length / itemsPerPage);

  // Get the paginated data for the current page
  const paginatedResults = result.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const headers = [
    "Description",
    "Scientific Name",
    "Max Score",
    "Total Score",
    "Query Cover",
    "E Value",
    "Perc. Ident",
    "Acc. len",
    "Accession",
  ];
  console.log(isOverlay);
  return (
    <div className="space-y-[10px]">
      <div
        className={`${
          isOverlay
            ? "place-items-end justify-end place-content-end place-self-end"
            : "flex justify-between"
        } items-center font-light text-sm text-pep-gray`}
      >
        {!isOverlay && (
          <div className="flex items-center space-x-[10px]">
            <input
              type="checkbox"
              readOnly
              className="size-5 border border-pep-gray-border rounded checked:bg-selected cursor-pointer"
            />
            <label className="font-normal text-base cursor-pointer">
              Select all
            </label>
            <span className="text-pep-blue">100 sequences selected</span>
          </div>
        )}
        <div className="flex items-center space-x-[10px] text-nowrap">
          <div
            className="flex flex-row bg-white border font-light rounded-md py-3 px-4 cursor-pointer gap-1 disabled:cursor-not-allowed disabled:bg-disabled disabled:border-disabled disabled:text-label"
            onClick={() => setFilterVisible(true)}
          >
            <div className="">Filter</div>
            <Icon
              icon="quill:chevron-down"
              className="text-pep-dark-gray size-4 my-auto"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Icon icon="ic:baseline-sort" className="size-5 min-w-5 min-h-5" />
            <label>Sort By:</label>
            <SelectInput
              id="sort-by"
              defaultValue="e-value"
              options={sortByOption}
              className="min-w-fit w-[120px]"
              onEdit={onEdit}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label>Show:</label>
            <SelectInput
              id="show"
              defaultValue="10"
              options={showOption}
              onEdit={onEdit}
            />
          </div>
        </div>
      </div>
      <div className="space-y-5">
        {/* Job Table */}
        <div className="relative overflow-auto rounded-xl border border-pep-gray-border shadow-table">
          <table className="w-full text-xs text-left rtl:text-right">
            <thead className="leading-6 bg-pep-gray-light text-center border-b">
              <tr>
                <th className="font-normal px-6 py-2 text-base"></th>
                {headers.map((header, index) => (
                  <th key={index} className="font-normal px-6 py-3 text-base">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-light leading-7">
              {paginatedResults.map((protein, index) => (
                <tr
                  key={index}
                  className="font-light text-pep-dark-gray bg-white border-b h-[45px] text-center"
                >
                  <td className="px-3 py-3">
                    <input
                      id={`select-input-protein-${index}`}
                      type="checkbox"
                      // checked={currentValue.includes(option)}
                      className="size-5 checked:bg-selected border border-pep-gray-border rounded cursor-pointer"
                    />
                  </td>
                  <td className="px-3 py-3">{protein.description}</td>
                  <td className="px-3 py-3">{protein.scientificName}</td>
                  <td className="px-3 py-3">{protein.maxScore}</td>
                  <td className="px-3 py-3">{protein.totalScore}</td>
                  <td className="px-3 py-3">{protein.queryCover}</td>
                  <td className="px-3 py-3">{protein.eValue}</td>
                  <td className="px-3 py-3">{protein.percIdent}</td>
                  <td className="px-3 py-3">{protein.accLen}</td>
                  <td className="px-3 py-3">{protein.accession}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav className="px-3 py-2 w-fit rounded-[45px] bg-white">
          <ul className="flex items-center space-x-2 h-8 text-sm">
            <li>
              <button
                className="flex items-center justify-center size-[35px] text-label border border-pep-gray-border transition-colors duration-150 rounded-full focus:border-none focus:text-white focus:bg-pep-gray hover:bg-pep-light-gray disabled:cursor-not-allowed"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <svg
                  className="w-3.5 h-3.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M13 5H1m0 0 4 4M1 5l4-4"
                  />
                </svg>
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  className={`size-[35px] text-pep-dark-gray border border-pep-gray-border transition-colors duration-150 rounded-full focus:border-none focus:text-white focus:bg-pep-gray ${
                    currentPage === index + 1
                      ? "bg-pep-gray border-none text-white"
                      : "hover:bg-pep-light-gray"
                  }`}
                  onClick={() => handlePageClick(index + 1)}
                  type="button"
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className="flex items-center justify-center size-[35px] text-label border border-pep-gray-border transition-colors duration-150 rounded-full focus:border-none focus:text-white focus:bg-pep-gray hover:bg-pep-light-gray disabled:cursor-not-allowed"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <svg
                  className="w-3.5 h-3.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
