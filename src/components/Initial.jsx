function Initial({ children }) {
  return (
    <div className="w-11 h-11 rounded-full mr-2 text-3xl leading-[1.1] text-center text-white bg-gray-200 font-bold uppercase p-1">
      <p>{children.slice(0, 1)}</p>
    </div>
  );
}

export default Initial;
