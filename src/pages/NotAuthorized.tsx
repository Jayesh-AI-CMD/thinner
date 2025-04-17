import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">403 - Not Authorized</h1>
        <p className="mt-4 text-lg text-gray-600">
          You do not have permission to access this page.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotAuthorized;