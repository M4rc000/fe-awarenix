import React from "react";
import Card from "./Card";
import CardContent from "./CardContent";
import { FiInfo } from "react-icons/fi";

interface SelectableCardProps {
  children: React.ReactNode;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
}

const SelectableCard: React.FC<SelectableCardProps> = ({
  children,
  selected = false,
  onSelect,
  className,
}) => {
  return (
    <Card
      className={`relative flex flex-col justify-between border ${
        selected
          ? "ring-2 ring-brand-500 border-brand-500"
          : "hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600"
      } ${className ?? ""}`}
    >
      <CardContent className="flex-grow">{children}</CardContent>

      <div
        className={`flex items-center justify-between px-4 py-2 text-sm font-medium ${
          selected
            ? "bg-brand-600 text-white"
            : "bg-gray-100 text-brand-700 dark:bg-gray-800 dark:text-brand-400"
        }`}
      >
        {selected ? (
          <>
            <span className="flex items-center gap-2">
              <span>✔</span> Attack selected
            </span>
            <FiInfo />
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onSelect}
              className="text-brand-600 hover:underline dark:text-brand-400"
            >
              Select this attack
            </button>
            <FiInfo />
          </>
        )}
      </div>
    </Card>
  );
};

export default SelectableCard;