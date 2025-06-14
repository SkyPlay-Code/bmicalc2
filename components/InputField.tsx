import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  unit?: string;
}

// Wrap with React.memo to prevent re-renders if props are unchanged
const InputField: React.FC<InputFieldProps> = React.memo(({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text", // Changed default from "number" to "text"
  unit
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {unit && `(${unit})`}
      </label>
      <input
        type={type} // Use the provided type, which will now default to "text"
        inputMode="decimal" // Added for better mobile UX with numeric-like input
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-colors"
        autoComplete="off" // Add autocomplete off to prevent browser interference
      />
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;