import { Link } from "react-router-dom";

import AddButton from "../components/AddButton";
import Groups from "../components/Groups";

function HomePage() {
  return (
    <main className="px-2 text-center">
      <h1>Share And Split</h1>
      <Groups />
      <Link className="inline-block" to="/newGroup">
        <AddButton />
      </Link>
    </main>
  );
}

export default HomePage;
