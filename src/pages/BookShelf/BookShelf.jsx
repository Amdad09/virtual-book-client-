import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import axios from 'axios';

const BookShelf = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/books').then((res) => {
            setBooks(res.data);
            setFilteredBooks(res.data); 
        });
    }, []);

    useEffect(() => {
        const filtered = books.filter((book) => {
            const titleMatch = (book.book_title || '')
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const authorMatch = (book.book_author || '')
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            const statusMatch = statusFilter
                ? (book.reading_status || '').toLowerCase() ===
                  statusFilter.toLowerCase()
                : true;

            return (titleMatch || authorMatch) && statusMatch;
        });

        setFilteredBooks(filtered);
    }, [books, searchTerm, statusFilter]);

    const handleSearch = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        setSearchTerm(name);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    return (
        <div className="w-11/12 mx-auto">
            <div className="my-12">
                <h2 className="text-3xl font-bold text-center mb-2">
                    Popular Books
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Check out the most loved books by our readers!
                </p>
            </div>

            {/* Filter Form */}
            <div className="my-6 flex flex-col md:flex-row gap-5 items-center justify-between">
                <form onSubmit={handleSearch} className="flex gap-5">
                    <input
                        type="text"
                        name="name"
                        className="input w-auto md:w-[300px]"
                        placeholder="Search by title or author"
                    />
                    <input
                        type="submit"
                        className="btn bg-amber-600 hover:bg-amber-700 text-white"
                        value="Search"
                    />
                </form>

                <select
                    onChange={handleStatusChange}
                    className="select border rounded p-2 w-[200px]">
                    <option value="">All Status</option>
                    <option value="Read">Read</option>
                    <option value="Reading">Reading</option>
                    <option value="Want to Read">Want to Read</option>
                </select>
            </div>

            {/* Book Cards */}
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                        <BookCard key={index} book={book} />
                    ))
                ) : (
                    <p className="text-center col-span-3 text-gray-500 text-xl">
                        No books found!
                    </p>
                )}
            </div>
        </div>
    );
};

export default BookShelf;
