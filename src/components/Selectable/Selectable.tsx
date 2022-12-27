import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  BackspaceIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useClickOutside } from "../../utils";

export type LabelValue = string | number;

export interface DropdownOptions {
  label: LabelValue;
  content?: ReactNode | string;
}

export interface Props {
  className?: string;
  width: number | "100%";
  options: DropdownOptions[];
  defaultValue: LabelValue | LabelValue[];
  multi?: boolean;
  onChange?: (values: DropdownOptions[]) => void;
  allowClear?: boolean;
  allowRefill?: boolean;
  menuPlacement?: "top" | "bottom";
}

const Selectable: React.FC<Props> = ({
  className = "",
  width,
  options,
  defaultValue,
  multi = false,
  onChange = undefined,
  allowClear = false,
  allowRefill = false,
  menuPlacement = "bottom",
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState([]);
  const ref = useRef(null);
  const [clickedOutside, setClickedOutside] = useClickOutside(ref);
  const controlsRef = useRef(null);

  useEffect(() => {
    const res = processDefault(defaultValue);
    setSelected(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  useEffect(() => {
    if (clickedOutside) {
      setExpanded(false);
      (setClickedOutside as Dispatch<SetStateAction<boolean>>)(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedOutside]);

  const processDefault = (defaultValue) => {
    let res;
    if (typeof defaultValue === "string" || typeof defaultValue === "number") {
      const defaultOption = options.filter(
        ({ label }) => label === defaultValue
      );
      if (defaultOption.length > 0) res = [defaultOption[0]];
      else res = [options[0]];
    } else if (Array.isArray(defaultValue)) {
      if (!multi) return [];
      const defaultOptions = [];
      for (const d of defaultValue) {
        if (typeof d !== "string" && typeof d !== "number") return [];
        const defaultOption = options.filter(({ label }) => label === d);
        if (defaultOption.length > 0) defaultOptions.push(defaultOption[0]);
      }
      res = defaultOptions;
    }
    return res;
  };

  const handleExpand = (e) => {
    e.stopPropagation();
    setExpanded((expanded) => !expanded);
  };

  const handleSelect = async (e, option) => {
    e.stopPropagation();
    if (multi) {
      const found = selected.find((s) => s.label === option.label);
      if (found) {
        const newSelected = selected.filter((s) => s.label !== option.label);
        setSelected(newSelected);
        onChange(newSelected);
        return;
      }
      const newSelected = [...selected, option];
      setSelected(newSelected);
      onChange(newSelected);
    } else {
      setSelected([option]);
      onChange([option]);
      setExpanded(false);
    }
  };

  return (
    <div
      className={`relative z-50 py-1 pl-1 pr-1 text-sm transition-colors duration-100 bg-white dark:bg-slate-600 ease-in border rounded select-none group border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-800 ${className}`}
      style={{ width }}
      onClick={handleExpand}
      ref={ref}
    >
      <div className="flex items-center justify-between w-full dark:text-white ">
        <div className="flex flex-wrap gap-1">
          {multi ? (
            selected.length ? (
              <>
                {selected.map((s) => (
                  <span
                    style={{
                      maxWidth:
                        (typeof width === "number"
                          ? width
                          : ref.current &&
                            ref.current.parentElement.clientWidth) -
                        (controlsRef.current
                          ? controlsRef.current.clientWidth + 10
                          : 0),
                    }}
                    className="flex items-center h-5 gap-1 px-1 truncate duration-100 ease-in rounded-sm transition-color bg-slate-200 hover:bg-slate-300 dark:bg-white dark:hover:bg-slate-200"
                    key={s.label}
                  >
                    <p
                      className="m-0 truncate dark:text-black"
                      style={{ maxWidth: width }}
                    >
                      {s.content || s.label}
                    </p>
                    <div
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newSelected = selected.filter(
                          (c) => c.label !== s.label
                        );
                        setSelected(newSelected);
                        onChange(newSelected);
                      }}
                    >
                      <XMarkIcon className="w-3.5 h-3.5 text-slate-600 dark:text-slate-700" />
                    </div>
                  </span>
                ))}
              </>
            ) : (
              <span className="text-slate-400 dark:text-slate-200">
                Select...
              </span>
            )
          ) : (
            selected.length && (selected[0].content || selected[0].label)
          )}
        </div>
        <div
          className="flex items-center flex-none h-full gap-1 pl-2"
          ref={controlsRef}
        >
          {multi && (
            <div className="flex gap-1">
              {allowRefill && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(options);
                    onChange(options);
                  }}
                >
                  <ArrowPathIcon className="w-4 h-4 transition-colors duration-100 ease-in cursor-pointer text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-white" />
                </div>
              )}
              {allowClear && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                    onChange([]);
                  }}
                >
                  <BackspaceIcon className="w-4 h-4 transition-colors duration-100 ease-in cursor-pointer text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-white" />
                </div>
              )}
            </div>
          )}
          {menuPlacement === "top" ? (
            <ChevronUpIcon className="w-5 h-5 transition-colors duration-100 ease-in text-slate-500 group-hover:text-slate-600 dark:text-slate-300 dark:group-hover:text-white" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 transition-colors duration-100 ease-in text-slate-500 group-hover:text-slate-600 dark:text-slate-300 dark:group-hover:text-white" />
          )}
        </div>
      </div>
      {expanded && (
        <div
          className={`absolute bg-white dark:bg-slate-600 border -translate-x-[5px] translate-y-2 border-slate-200 dark:border-slate-800 rounded flex flex-col divide-y dark:divide-slate-800 ${
            menuPlacement === "top" ? "bottom-10" : ""
          }`}
          style={{
            width:
              typeof width === "string" && width === "100%"
                ? ref.current.parentElement.clientWidth
                : width,
          }}
        >
          {options.map((option, index) => {
            const isSelected = selected.find((s) => s.label === option.label);
            return (
              <div
                key={option.label}
                onClick={(e) => handleSelect(e, option)}
                className={`px-1 py-1 cursor-pointer w-full ${
                  !index
                    ? "rounded-t"
                    : index === options.length - 1
                    ? "rounded-b"
                    : ""
                } ${isSelected && "bg-slate-50 dark:bg-slate-500"}`}
              >
                <div className="flex items-center justify-between w-full">
                  <p className="m-0 dark:text-white">
                    {option.content || option.label}
                  </p>
                  {isSelected && (
                    <p className="m-0 text-xs text-slate-400 dark:text-slate-200">
                      Selected
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Selectable;
