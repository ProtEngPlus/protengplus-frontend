import { Icon } from "@iconify/react";

export function LabInputTable({
  isExample,
  data,
  inputProtein,
  setProteinVisible,
  isForConclusion,
}: {
  isExample: boolean;
  data: { sequence: string; score: number }[];
  inputProtein?: string;
  setProteinVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  isForConclusion?: boolean;
}) {
  return (
    <div
      id={`${isExample ? "table-example" : "lab-input-table"}`}
      className="w-full place-items-center"
    >
      <div className="max-w-[759px] max-h-[536px] w-[759px] h-[536px] overflow-y-auto relative rounded-xl border border-[#DFE4EA] shadow-table  bg-white">
        <table className="table-fixed max-w-[759px] w-full place-content-center place-items-center text-left rtl:text-right">
          <thead className="leading-6 text-black w-fit place-content-center bg-pep-gray-light text-center border-b">
            <tr className="h-[60px]">
              <th scope="col" className="font-normal text-base ">
                Protein Sequence
              </th>

              <th scope="col" className="font-normal text-base">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="font-light text-sm leading-7 text-pep-dark-gray text-center bg-white">
            <tr className=" text-pep-blue h-[46px]  ">
              <td className="truncate px-5">
                {isExample ? "BSIQHFHW" : inputProtein}
              </td>
              <td className="truncate px-5 place-items-center">
                {isExample ? (
                  "Wildtype = 1.0"
                ) : !isForConclusion ? (
                  <button
                    className="flex w-fit cursor-pointer items-center space-x-1"
                    type="button"
                    onClick={() => setProteinVisible && setProteinVisible(true)}
                  >
                    <span className="text-pep-blue underline">
                      View Sequence
                    </span>

                    <Icon icon="carbon:view" className="size-5 text-pep-blue" />
                  </button>
                ) : (
                  ""
                )}
              </td>
            </tr>

            {data?.map((value, index) => (
              <tr key={index} className="border-t h-[46px]">
                <td className="truncate px-5">{value.sequence}</td>
                <td className="truncate px-5">{value.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function LabManualInputTable({
  inputProtein,
  data,
  setData,
  setProteinVisible,
}: {
  inputProtein: string;
  data: { sequence: string; score: number }[];
  setData: React.Dispatch<
    React.SetStateAction<{ sequence: string; score: number }[]>
  >;
  setProteinVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleDelete = (indexToRemove: number) => {
    setData(data.filter((_, index) => index !== indexToRemove));
  };
  return (
    <div
      data-testid="manual-input"
      className="max-w-[759px] w-[759px] max-h-[428px] h-full overflow-y-auto relative rounded-xl border border-[#DFE4EA] shadow-table  bg-white"
    >
      <table className="table-fixed max-w-[759px] w-full place-content-center place-items-center text-left rtl:text-right">
        <thead className="leading-6 text-black w-fit place-content-center bg-pep-gray-light text-center border-b">
          <tr className="h-[60px]">
            <th scope="col" className="font-normal text-base" colSpan={2}>
              Protein Sequence
            </th>

            <th scope="col" className="font-normal text-base">
              Score
            </th>
            <th scope="col" className="font-normal text-base"></th>
          </tr>
        </thead>
        <tbody className="font-light text-sm leading-7 text-pep-dark-gray text-center bg-white">
          <tr className=" text-pep-blue h-[46px]">
            <td className="truncate px-5" colSpan={2}>
              {inputProtein}
            </td>

            <td className="px-5 place-items-center">
              <button
                className="flex  cursor-pointer items-center space-x-1"
                type="button"
                onClick={() => setProteinVisible(true)}
              >
                <span className="text-pep-blue underline">View Sequence</span>

                <Icon icon="carbon:view" className="size-5 text-pep-blue" />
              </button>
            </td>
          </tr>

          {data?.map((value, index) => (
            <tr key={index} className="border-t h-[46px]">
              <td className="truncate px-5" colSpan={2}>
                {value.sequence}
              </td>
              <td className="truncate px-5">{value.score}</td>
              <td className="truncate px-5">
                <Icon
                  data-testid="delete-button"
                  icon="streamline:delete-1-solid"
                  className="size-[15px] text-error cursor-pointer"
                  onClick={() => handleDelete(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
