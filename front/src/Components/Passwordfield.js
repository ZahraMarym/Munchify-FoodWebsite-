const passwordfield = ({
    label,
    placeholder,
    className,
    value,
    setValue,
    labelClassName,
  }) => {
    return (
      <div className="mb-4">
        <label htmlFor="email" className="text-white mb-1 block">
          {label}
        </label>
        <input
          type="password"
          id={label}
          placeholder={placeholder}
          className="w-full px-3 py-2 border bg-transparent text-yellow-500 border-yellow-500 focus:border-yellow-500 border-2"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
    );
  };
  export default passwordfield;
  