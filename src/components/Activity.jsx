import Initial from "./Initial";

function Activity({ participant, title, price }) {
  return (
    <div className="flex items-center mb-5 rounded-md mt-1">
      <Initial>{participant}</Initial>
      <div>
        <p className="text-lg uppercase font-bold">{title}</p>
        <p className="text-xs font-bold text-left text-gray-400">
          By {participant}
        </p>
      </div>
      <p className="ml-auto">{price} MAD</p>
    </div>
  );
}

export default Activity;
