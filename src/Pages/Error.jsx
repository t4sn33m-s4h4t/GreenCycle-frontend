import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gray-100 dark:bg-gray-900">
            <div className="flex flex-col items-center">
                <h1 className="text-[120px] font-extrabold text-gray-700 dark:text-gray-200">404</h1>
                <p className="text-2xl font-medium text-gray-600 dark:text-gray-400 mb-6">Page Not Found</p>
                <Link
                    to="/"
                    className="px-4 py-2 font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 transition-all duration-200 ease-in-out"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default Error;