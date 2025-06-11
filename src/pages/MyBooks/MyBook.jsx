import axios from 'axios';
import React from 'react';
import { Link } from 'react-router';

const MyBook = ({ book, index }) => {
    const { _id, book_title, cover_photo, book_author, total_page } = book;
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/books/${id}`);
            console.log('delete')
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img src={cover_photo} alt={book_title} />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <div className="font-bold">{book_title}</div>
                </div>
            </td>
            <td>
                <div className="text-sm opacity-50">{book_author}</div>
            </td>

            <td>{total_page}</td>
            <th>
                <Link to={`/updateBook/${_id}`}>
                    <button className="btn btn-ghost btn-xs bg-green-600 mr-2">
                        Update
                    </button>
                </Link>

                <button onClick={()=>handleDelete(_id)} className="btn btn-ghost btn-xs bg-red-600">
                    Delete
                </button>
            </th>
        </tr>
    );
};

export default MyBook;
