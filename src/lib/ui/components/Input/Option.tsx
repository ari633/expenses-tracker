import React from 'react';

export interface TypeOption {
  value: string;
  label: string;
}

interface OptionsProps {
  options: TypeOption[];
  label: string;
  name: string;
  errMessage: string | string[] | undefined;
  onSelect: (value: TypeOption) => void;
}

const Options: React.FC<OptionsProps> = ({ options, name, errMessage, label, onSelect }) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    onSelect({label: name, value: value});
  };

  return (
    <div className="mb-4">
      <label className="block mb-2">
        {label}
        <select
          name={name}
          className="w-full mt-1 p-2 border text-black rounded"
          onChange={handleSelect}
        >
          <option value="">--Select--</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errMessage && <p className="text-red-500">{errMessage}</p>}
      </label>
    </div>
  );
};

export default Options;