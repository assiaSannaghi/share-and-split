import { GoPlus } from "react-icons/go";

function AddButton() {
  return (
    <button className="my-5 mx-auto flex justify-center items-center text-5xl cursor-pointer bg-yellow-400 w-12 h-12 rounded-full transition-shadow duration-300 hover:shadow-xl grow-0 text-white">
      <GoPlus />
    </button>
  );
}

export default AddButton;
