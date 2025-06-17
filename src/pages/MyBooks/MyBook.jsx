
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyBook = ({ book, index, onDelete }) => {
    const axiosSecure = useAxiosSecure();
    const { _id, book_title, cover_photo, book_author, total_page } = book;
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`http://localhost:3000/books/${id}`);
                onDelete(id);

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your book has been deleted.',
                    icon: 'success',
                });
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong.',
                    icon: 'error',
                });
            }
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
            <th className='flex gap-1'>
                <Link to={`/updateBook/${_id}`}>
                    <button className="btn btn-ghost btn-xs bg-green-600 mr-2">
                        Update
                    </button>
                </Link>

                <button
                    onClick={() => handleDelete(_id)}
                    className="btn btn-ghost btn-xs bg-red-600">
                    Delete
                </button>
            </th>
            <th>
                
            </th>
        </tr>
    );
};

export default MyBook;
