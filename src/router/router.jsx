import { createBrowserRouter } from 'react-router';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MainLayout from '../layouts/MainLayout';
import AboutUs from '../pages/AboutUs/AboutUs';
import AddBook from '../pages/AddBook/AddBook';
import BookDetails from '../pages/BookDetails/BookDetails';
import BookShelf from '../pages/BookShelf/BookShelf';
import Home from '../pages/home/Home';
import LogIn from '../pages/LogIn/LogIn';
import MyBooks from '../pages/MyBooks/MyBooks';
import Profile from '../pages/Profile/Profile';
import Register from '../pages/Register/Register';
import UpdateBook from '../pages/UpdateBook/UpdateBook';
import PrivateRoute from '../routes/PrivateRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorMessage />,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/addBook',
                element: (
                    <PrivateRoute>
                        <AddBook />
                    </PrivateRoute>
                ),
            },
            {
                path: '/aboutUs',
                element: <AboutUs />,
            },
            {
                path: '/updateBook/:id',
                loader: ({ params }) =>
                    fetch(`http://localhost:3000/books/${params.id}`),
                element: (
                    <PrivateRoute>
                        <UpdateBook />
                    </PrivateRoute>
                ),
            },
            {
                path: '/profile',
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ),
            },
            {
                path: '/bookShelf',
                loader: () => fetch('http://localhost:3000/books'),
                Component: BookShelf,
            },
            {
                path: '/bookDetails/:id',
                loader: ({ params }) =>
                    fetch(`http://localhost:3000/books/${params.id}`),
                Component: BookDetails,
            },
            {
                path: 'myBooks',
                element: (
                    <PrivateRoute>
                        <MyBooks />
                    </PrivateRoute>
                ),
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
