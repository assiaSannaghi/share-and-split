import { useNavigate } from "react-router";

function Button({ children, variation, disabled }) {
  const navigate = useNavigate();

  if (variation === "primary")
    return (
      <button
        disabled={disabled}
        type="submit"
        className="px-5 py-4 text-lg cursor-pointer font-semibold rounded-full hover:shadow-xl border-2 border-yellow-400 grow bg-yellow-400 transition-shadow duration-300"
      >
        {children}
      </button>
    );
  if (variation === "secondary")
    return (
      <button
        type="reset"
        onClick={() => navigate(-1)}
        className="px-5 py-4 text-lg cursor-pointer font-semibold rounded-full hover:shadow-xl border-2 border-yellow-400 grow transition-shadow duration-300"
      >
        {children}
      </button>
    );
}

export default Button;
