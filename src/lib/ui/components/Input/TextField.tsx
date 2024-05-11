import React, { useState, useEffect } from "react";

interface TextFieldProps {
  label: string;
  placeholder: string;
  value: string;
  name: string;
  errMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  onChange,
  value,
  placeholder,
  name,
  errMessage,
}) => {
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (errMessage) {
      setErr(true);
    }
  }, [errMessage]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    setErr(false);
  };

  return (
    <div className="mb-4">
      <label>{label}</label>
      <input
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        className="w-full mt-1 p-2 border text-black rounded"
      />
      {errMessage && err && <p className="text-red-500">{errMessage}</p>}
    </div>
  );
};

export default TextField;
