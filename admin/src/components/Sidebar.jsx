import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul className="space-y-3">
          <li>
            <Link to="/" className="block p-2 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/create-test" className="block p-2 hover:bg-gray-700 rounded">
              Create Test
            </Link>
          </li>
          <li>
            <Link to="/manage-tests" className="block p-2 hover:bg-gray-700 rounded">
              Manage Tests
            </Link>
          </li>
          <li>
            <Link to="/update-questions" className="block p-2 hover:bg-gray-700 rounded">
              Update Questions
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
