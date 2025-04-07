const Input = ({ label, name, register, error, placeholder, type = "text", ...rest }) => {
    return (
      <div className="space-y-1">
        {label && <label className="block text-sm font-medium">{label}</label>}
        <input
          type={type}
          placeholder={placeholder}
          {...(register ? register(name) : {})}
          {...rest}
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
      </div>
    );
  };
  
  export default Input;