import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import MyBook from './MyBook';

const MyBooks = () => {
    const { user } = use(AuthContext);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(
                    `http://localhost:3000/books/user?user_email=${user?.email}`,
                )
                .then((res) => setBooks(res.data));
        }
    }, [user]);

    return (
        <div>
            <h2 className="text-2xl font-bold my-12">My Books</h2>
            {books.length === 0 ? (
                <p>No books found.</p>
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
                                <MyBook key={book._id} book={book} index={index}></MyBook>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyBooks;
