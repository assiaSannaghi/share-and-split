import Initial from "./Initial";

function ParticipantBalance({ participant, balance = 0 }) {
  return (
    <div className="flex items-center mb-5 rounded-md mt-1">
      <Initial>{participant.slice(0, 1)}</Initial>

      <p className="text-lg font-bold">{participant}</p>

      {+balance >= 0 ? (
        <p className="ml-auto font-bold text-green-500">+ {balance} MAD</p>
      ) : (
        <p className="ml-auto font-bold text-red-500">
          - {Math.abs(balance)} MAD
        </p>
      )}
    </div>
  );
}

export default ParticipantBalance;
