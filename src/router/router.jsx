import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import AddBook from "../pages/AddBook/AddBook";
import UpdateBook from "../pages/UpdateBook/UpdateBook";
import Profile from "../pages/Profile/Profile";
import BookShelf from "../pages/BookShelf/BookShelf";
import BookDetails from "../pages/BookDetails/BookDetails";
import Register from "../pages/Register/Register";
import LogIn from "../pages/LogIn/LogIn";
import PrivateRoute from "../routes/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/addBook',
                element:<PrivateRoute><AddBook/></PrivateRoute>
            },
            {
                path: '/updateBook',
                element: <PrivateRoute><UpdateBook/></PrivateRoute>
            },
            {
                path: '/profile',
                Component: Profile,
            },
            {
                path: '/bookShelf',
                loader: () => fetch('http://localhost:3000/books'),
                Component: BookShelf,
            },
            {
                path: '/bookDetails/:id',
                loader: ({params}) => fetch(`http://localhost:3000/books/${params.id}`),
                Component: BookDetails,
            },
            {
                path: '/register',
                Component: Register,
            },
            {
                path: '/logIn',
                Component: LogIn,
            },
        ],
    },
]);
