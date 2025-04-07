const Button = ({ children, onClick, className = "", disabled = false, variant = "primary" }) => {
    const baseStyles = "px-4 py-2 rounded font-semibold transition-colors";
    const variantStyles = {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-500 text-white hover:bg-gray-600",
      danger: "bg-red-500 text-white hover:bg-red-600",
    };
  
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;