import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { MdArrowDropDown, MdCheck } from "react-icons/md";

const SelectInput = ({ options, selectedOption, setSelectedOption, disabled }) => {
  return (
    <Listbox value={selectedOption} onChange={setSelectedOption} disabled={disabled}>
      {({ open }) => (
        <>
          <div className="relative w-[300px] max-w-[300px] mt-0 pt-0 -ml-2">
            <Listbox.Button className="relative w-full rounded-md pl-3 pr-10 py-2 text-left cursor-default sm:text-sm">
              <span className="block truncate max-w-[50px]">{selectedOption.label}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <MdArrowDropDown className="h-5 w-5 text-gray-400" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm !w-[200px]">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option}
                    className={({ active }) =>
                      `${active ? "text-white bg-blue-600" : "text-gray-900"}
                      cursor-default select-none relative py-2 pl-3 pr-9`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`${selected ? "font-medium" : "font-normal"} block truncate`}>
                          {option.label}
                        </span>
                        {selected && (
                          <span
                            className={`${active ? "text-white" : "text-blue-600"}
                            absolute inset-y-0 right-0 flex items-center pr-4`}
                          >
                            <MdCheck className="h-5 w-5" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectInput;
