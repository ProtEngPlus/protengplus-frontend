import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

export default function ScoreDropDown({
    label,
    value,
    setValue
}: {
    label: string;
    value: number;
    setValue: (value: number) => void;
}) {
    const updateValue = (delta: number, e: React.MouseEvent) => {
        e.preventDefault();
        const newValue = Math.max(-2, Math.min(2, Math.round((value + delta) * 10) / 10));
        setValue(newValue);
        setInputValue(String(newValue));
    };

    const handleIncrease = (e: React.MouseEvent) => updateValue(0.1, e);
    const handleDecrease = (e: React.MouseEvent) => updateValue(-0.1, e);

    const [inputValue, setInputValue] = useState(String(value));

    useEffect(() => {
        setInputValue(String(value));
    }, [value]);

    return (
        <div className="relative flex space-x-2 items-center text-light">
            <div className="text-gray-500">{label}</div>
            <input
                id={label}
                type="text"
                className="h-[40px] w-24 p-2 bg-white border text-sm border-pep-gray-border font-light placeholder:text-placeholder rounded-md focus:ring-0 focus:border-pep-blue focus:outline-none disabled:cursor-not-allowed disabled:bg-disabled disabled:border-disabled disabled:text-label border-gray-border"
                aria-label={`Number input for ${label}`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={() => {
                    const parsed = parseFloat(inputValue)
                    if (!isNaN(parsed)) {
                        const number = Math.max(-2, Math.min(2, parsed))
                        setInputValue(number.toString())
                        setValue(number)
                    }
                }}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-1">
                {/* Increase button */}
                <Icon
                    icon="mingcute:up-line"
                    className="text-pep-dark-gray size-[15px] hover:text-pep-gray cursor-pointer"
                    onClick={handleIncrease}
                />
                {/* Decrease button */}
                <Icon
                    icon="mingcute:down-line"
                    className="text-pep-dark-gray size-[15px] hover:text-pep-gray cursor-pointer"
                    onClick={handleDecrease}
                />
            </div>
        </div>
    );
}