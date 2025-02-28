import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

export type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

export default function DateRangePicker({
  date,
  setDate,
}: {
  date: DateRange;
  setDate: (date: DateRange) => void;
}) {
  const handleChange = (newValue: DateValueType) => {
    if (newValue && typeof newValue === "object") {
      setDate(newValue);
    } else {
      setDate({ startDate: null, endDate: null });
    }
  };
  return (
    <div className="flex flex-row space-x-4 items-center">
      <Datepicker
        separator="-"
        displayFormat="DD/MM/YYYY"
        popoverDirection="down"
        placeholder="DD/MM/YYYY - DD/MM/YYYY"
        inputClassName="w-[260px] rounded-md h-[40px] p-2 bg-white border border-[#DFE4EA] font-light text-sm placeholder:text-placeholder rounded-md  focus:border-selected focus:ring-0 focus:outline-none"
        primaryColor="amber"
        value={date}
        onChange={handleChange}
        showShortcuts={false}
      />
    </div>
  );
}
