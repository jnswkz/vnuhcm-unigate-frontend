import { Link } from "react-router-dom";

export default function ActionCard({
  icon,
  title,
  description,
  buttonText,
  buttonColor,
  borderColor,
  link,
}) {
  return (
    <div
      className="p-6 rounded-lg shadow-md"
      style={{ border: `1px solid ${borderColor}` }}
    >
      <div className="flex items-center mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <Link
        to={link}
        className="inline-block px-4 py-2 text-sm font-bold rounded"
        style={{
          backgroundColor: buttonColor,
          color: "#fff",
        }}
      >
        {buttonText}
      </Link>
    </div>
  );
}