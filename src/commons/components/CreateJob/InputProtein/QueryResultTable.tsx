import { useEffect, useMemo, useState } from "react";
import SelectInput, { Option } from "../../Input/SelectInput";
import { Icon } from "@iconify/react";
import {
  QueryResult,
  QueryResultSearchParams,
  Result,
} from "../../../interfaces/QueryResult.interface";
import { useFormContext } from "react-hook-form";
import { Order } from "../../../interfaces/Job.interface";
import { getAllQueryResults } from "../../../api/queryResult";
import {
  FilterOverlay,
  FilterOverlayProps,
} from "./FilterOverlay/FilterOverlay";

const sortByOption: Option[] = [
  { label: "Scientific Name", value: "organisms" },
  { label: "Max Score", value: "max_score" },
  { label: "Total Score", value: "score" },
  { label: "Query Cover", value: "query_cover" },
  { label: "E value", value: "e_values" },
  { label: "Perc. Ident", value: "percent_identity" },
  { label: "Acc. len", value: "acc_len" },
  { label: "Accession", value: "accession" },
];

const showOption: Option[] = [{ label: "10", value: "10" }];

const headers: { value: string; name: string }[] = [
  { value: "description", name: "Description" },
  { value: "organisms", name: "Scientific Name" },
  { value: "max_score", name: "Max Score" },
  { value: "score", name: "Total Score" },
  { value: "query_cover", name: "Query Cover" },
  { value: "e_values", name: "E Value" },
  { value: "percent_identity", name: "Perc. Ident" },
  { value: "acc_len", name: "Acc. len" },
  { value: "accession", name: "Accession" },
];

export default function QueryResultTable({
  isJobDetail,
  jobId,
  disable = false,
  isOverlay = false,
  queryResult,
  setQueryResult,
}: {
  isJobDetail: boolean;
  jobId: string;
  disable?: boolean;
  isOverlay?: boolean;
  queryResult?: QueryResult;
  setQueryResult?: (queryResult: QueryResult) => void;
}) {
  const { getValues, watch, setValue } = useFormContext();
  const [queryResults, setQueryResults] = useState<Result[]>([]);
  const [organismList, setOrganismList] = useState<string[]>([]);

  // for page navigation
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = getValues("show") ?? 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQueries = queryResults.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = queryResults.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // get address that select query result option
  const queryResultOption = useMemo(() => {
    const key = isJobDetail
      ? "options.query_result"
      : "Protien Input.Query Result";
    return getValues(key) ?? undefined;
  }, []);

  const searchParams = [
    "organisms",
    "percentIdentityFrom",
    "percentIdentityTo",
    "eValuesFrom",
    "eValuesTo",
    "queryCoverFrom",
    "queryCoverTo",
  ];

  const watchedValues = searchParams.reduce((acc, param) => {
    acc[param] = watch(param) ?? undefined;
    return acc;
  }, {} as Record<string, any>);

  // reset value to default (use in first time & click reset button from filter modal)
  const resetQueryOption = () => {
    const parameters = [
      "organism",
      "percent_identity_result_low",
      "percent_identity_result_high",
      "e_values_result_low",
      "e_values_result_high",
      "query_cover_result_low",
      "query_cover_result_high",
    ];

    parameters.forEach((param, index) => {
      setValue(
        searchParams[index],
        queryResultOption
          ? getValues(`${queryResultOption}.${param}`) ?? undefined
          : undefined
      );
    });
  };

  // set value for first time
  useEffect(() => {
    resetQueryOption();
  }, []);

  // query result option
  const [isSelected, setIsSelected] = useState(false);
  const sort = watch("sort-by");
  const [order, setOrder] = useState<Order>("asc");

  // get all query result
  useEffect(() => {
    const params: QueryResultSearchParams = {
      job_id: jobId,
      is_selected: disable ? true : undefined,
      ...Object.fromEntries(
        Object.entries(watchedValues).map(([key, value]) => [key, value])
      ),
      sort,
      order,
    };

    getAllQueryResults(params)
      .then((response) => {
        const results: Result[] = (
          response.data ? response.data[0].result : []
        ) as Result[];
        if (setQueryResult)
          setQueryResult(response.data ? response.data[0] : []);
        setQueryResults(results);

        const allOrganisms: string[] = [
          ...new Set(results.map((item) => item.organisms)),
        ];

        setOrganismList(allOrganisms);
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error("Error fetching query results:", error);
      });
  }, [...Object.values(watchedValues), sort, order]);

  // query result filter
  const [isFilterVisible, setFilterVisible] = useState(false);
  const filterOverlayProps: FilterOverlayProps = {
    organismList,
    organisms: watchedValues["organisms"],
    percentIdentityFrom: watchedValues["percentIdentityFrom"],
    percentIdentityTo: watchedValues["percentIdentityTo"],
    eValuesFrom: watchedValues["eValuesFrom"],
    eValuesTo: watchedValues["eValuesTo"],
    queryCoverFrom: watchedValues["queryCoverFrom"],
    queryCoverTo: watchedValues["queryCoverTo"],
    onConfirm: () => setFilterVisible(false),
    onClose: () => setFilterVisible(false),
    onReset: () => {
      resetQueryOption();
      setFilterVisible(false);
    },
  };

  // pagination
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

  // handle select all
  useEffect(() => {
    if (isSelected) {
      setQueryResults((prevResults) =>
        prevResults.map((item) => ({ ...item, is_selected: true }))
      );
    }
  }, [isSelected]);

  // handle select checkbox in table
  const handleCheckboxChange = (id: string) => {
    setQueryResults((prevResults) =>
      prevResults.map((protein) =>
        id === protein.id
          ? { ...protein, is_selected: !protein.is_selected }
          : protein
      )
    );
  };

  // count selected query result
  const selectedCount =
    queryResults?.filter((item) => item.is_selected).length || 0;

  // set queryresult for adding to create job page
  useEffect(() => {
    if (setQueryResult && queryResult) {
      setQueryResult({
        complete_at: queryResult.complete_at,
        created_at: queryResult.created_at,
        id: queryResult.id,
        job_id: queryResult.job_id,
        input_protein: queryResult.input_protein,
        run_id: queryResult.run_id,
        state: queryResult.state,
        result: queryResults.filter((item) => item.is_selected),
      });
    }
  }, [queryResults, selectedCount]);

  return (
    <div data-testid="protein-query-result">
      <FilterOverlay
        isVisible={isFilterVisible}
        filterOverlayProps={filterOverlayProps}
      />
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
                data-testid="selected-all-checkbox"
                type="checkbox"
                checked={isSelected}
                onChange={() => !disable && setIsSelected(!isSelected)}
                className={`size-5 border border-pep-gray-border rounded checked:bg-selected ${
                  disable ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              />
              <label
                className={`font-normal text-base ${
                  disable ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                Select all
              </label>
              <span className="text-pep-blue">
                {selectedCount} sequences selected
              </span>
            </div>
          )}
          <div className="flex items-center space-x-[10px] text-nowrap w-fit">
            <div
              data-testid="filter"
              className={`flex flex-row bg-white border font-light rounded-md py-3 px-4 gap-1 disabled:cursor-not-allowed disabled:bg-disabled disabled:border-disabled disabled:text-label ${
                disable ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => !disable && setFilterVisible(true)}
            >
              <div className="">Filter</div>
              <Icon
                icon="quill:chevron-down"
                className="text-pep-dark-gray size-4 my-auto"
              />
            </div>

            <div className="flex items-center space-x-2 w-fit">
              <Icon
                icon="ic:baseline-sort"
                className="size-5 min-w-5 min-h-5"
              />
              <label>Sort By:</label>
              <SelectInput
                id="sort-by"
                defaultValue="e_values"
                options={sortByOption}
                className="w-[160px]"
                disabled={disable}
              />
            </div>
            <div className="flex items-center space-x-2">
              <label>Show:</label>
              <SelectInput
                data-testid="show"
                id="show"
                defaultValue="10"
                options={showOption}
                disabled={disable}
              />
            </div>
          </div>
        </div>

        {/* Query Result Table */}
        {currentQueries.length == 0 ? (
          <div className="text-center">
            <div className="text-label text-xl">No query result was found</div>
            <div className="font-light text-pep-gray">Change the filter</div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="relative overflow-auto rounded-xl border border-pep-gray-border shadow-table">
              <table className="w-full text-xs text-left rtl:text-right">
                <thead className="leading-6 bg-pep-gray-light text-center border-b">
                  <tr>
                    <th className="font-normal px-6 py-2 text-base"></th>
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className={`font-normal px-6 py-3 text-base ${
                          !disable && header.value === sort
                            ? "text-pep-orange cursor-pointer"
                            : ""
                        }`}
                        onClick={() =>
                          !disable &&
                          header.value === sort &&
                          setOrder(order === "asc" ? "desc" : "asc")
                        }
                      >
                        {header.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody
                  data-testid="table-body"
                  className="font-light leading-7"
                >
                  {currentQueries &&
                    currentQueries.map((query, index) => (
                      <tr
                        key={query.id}
                        className="font-light text-pep-dark-gray bg-white border-b h-[45px] text-center"
                      >
                        <td className="px-3 py-3">
                          <input
                            disabled={disable || isSelected}
                            data-testid={`checkbox-${index}`}
                            id={`select-input-protein-${query.id}`}
                            type="checkbox"
                            checked={query.is_selected}
                            onChange={() =>
                              !disable &&
                              !isSelected &&
                              handleCheckboxChange(query.id)
                            }
                            className={`size-5 checked:bg-selected border border-pep-gray-border rounded ${
                              isSelected || disable
                                ? "disable cursor-not-allowed checked:bg-pep-gray"
                                : "cursor-pointer"
                            }`}
                          />
                        </td>
                        <td className="px-3 py-3 text-start">
                          {query.description}
                        </td>
                        <td
                          data-testid="organism"
                          className="px-3 py-3 text-start"
                        >
                          {query.organisms}
                        </td>
                        <td data-testid="max-score" className="px-3 py-3">
                          {query.max_score}
                        </td>
                        <td data-testid="score" className="px-3 py-3">
                          {query.score}
                        </td>
                        <td data-testid="query-cover" className="px-3 py-3">
                          {query.query_cover}
                        </td>
                        <td data-testid="e-value" className="px-3 py-3">
                          {query.e_values}
                        </td>
                        <td data-testid="perc-ident" className="px-3 py-3">
                          {query.percent_identity}
                        </td>
                        <td data-testid="acc-len" className="px-3 py-3">
                          {query.acc_len}
                        </td>
                        <td data-testid="accession" className="px-3 py-3">
                          {query.accession}
                        </td>
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
        )}
      </div>
    </div>
  );
}
