import { Icon } from "@iconify/react/dist/iconify.js";

export default function DownloadCSVButton({
  onClick,
}: {
  onClick?: () => void;
}) {
  return (
    <div className="flex items-center space-x-2 font-light" onClick={onClick}>
      <span className="text-nowrap">Download CSV</span>
      <div className="bg-pep-orange rounded-full p-[5px] cursor-pointer">
        <Icon
          icon="heroicons-outline:download"
          className="text-white size-[30px]"
        />
      </div>
    </div>
  );
}
