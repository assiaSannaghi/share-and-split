import { IoArrowBack } from "react-icons/io5";

function BackButton() {
  return (
    <button className="absolute my-3 mx-auto flex justify-center items-center text-3xl cursor-pointer hover:bg-yellow-400 w-12 h-12 rounded-full transition-all duration-300 hover:shadow-xl grow-0 ">
      <IoArrowBack />
    </button>
  );
}

export default BackButton;
