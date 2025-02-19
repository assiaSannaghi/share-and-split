import { NavLink, useParams } from "react-router";

function GroupNav() {
  const { groupId } = useParams();

  return (
    <nav>
      <ul className="flex gap-12 my-6">
        <li className="grow">
          <NavLink
            to={`/expenses/${groupId}`}
            className="px-3 py-2 text-lg cursor-pointer font-semibold rounded-full text-center block border-2 border-gray-200 "
          >
            Expenses
          </NavLink>
        </li>
        <li className="grow">
          <NavLink
            to={`/balance/${groupId}`}
            className="px-3 py-2 text-lg cursor-pointer font-semibold rounded-full text-center block border-2 border-gray-200"
          >
            Balance
          </NavLink>
        </li>
      </ul>
      {/* <Button variation="primary">Expenses</Button>
      <Button variation="balance">Balance</Button> */}
    </nav>
  );
}

export default GroupNav;
