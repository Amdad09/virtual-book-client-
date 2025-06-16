
import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import MyBook from './MyBook';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyBooks = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/books/user?user_email=${user?.email}`)
                .then((res) => setBooks(res.data));
        }
       
    }, [axiosSecure, user?.email]);

    const handleDelete = (id) => {
        setBooks((preBooks) => preBooks.filter((book) => book._id !== id));
    };

    return (
        <div>
            <h2 className="text-2xl text-center font-bold my-12">My Books</h2>
            {books.length === 0 ? (
                <div className="flex justify-center items-center pb-12">
                    <div className="text-center p-10 border-2 border-dashed border-gray-300 shadow-xl rounded-xl bg-white max-w-xl">
                        <h2 className="text-4xl font-bold text-gray-700 mb-4">
                            📚 No Books Found
                        </h2>
                        <p className="text-lg text-gray-600">
                            We flipped through all the pages, searched every
                            shelf, and even checked under the table...
                            <br />
                            But sadly, we couldn't find any books matching your
                            request.
                        </p>
                        <p className="text-gray-500 mt-4">
                            Try changing your search term or explore other
                            categories.
                        </p>
                        <div className="mt-6">
                            <Link
                                to="/addBook"
                                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-5 rounded-full transition duration-300">
                                Add Book
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Author</th>
                                <th>Page</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => (
                                <MyBook
                                    key={book._id}
                                    book={book}
                                    onDelete={handleDelete}
                                    index={index}></MyBook>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyBooks;
