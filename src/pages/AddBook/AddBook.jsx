
import { use } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddBook = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleAddBook = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            await axiosSecure.post('/books', data);
            navigate('/myBooks');
            Swal.fire({
                title: 'Success!',
                text: 'Book added successfully!',
                icon: 'success',
                confirmButtonText: 'Cool',
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong!',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };
    return (
        <div>
            <div className="text-center mt-12">
                <h1 className="text-3xl font-bold mb-2">Add A New Book</h1>
                <p className="text-gray-500 mb-6">
                    Fill out the form below to add a new book to your shelf.
                </p>
            </div>

            <form
                onSubmit={handleAddBook}
                className="p-6 rounded-xl shadow-md space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                    {/* Book Title */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Book Title
                        </label>
                        <input
                            type="text"
                            name="book_title"
                            className="w-full border px-3 py-2 rounded-lg"
                            placeholder="Enter book title"
                            required
                        />
                    </div>

                    {/* Cover Photo */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Cover Photo (URL)
                        </label>
                        <input
                            type="text"
                            name="cover_photo"
                            className="w-full border px-3 py-2 rounded-lg"
                            placeholder="Enter image URL"
                        />
                    </div>

                    {/* Total Page */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Total Pages
                        </label>
                        <input
                            type="number"
                            name="total_page"
                            className="w-full border px-3 py-2 rounded-lg"
                            placeholder="Enter total number of pages"
                        />
                    </div>

                    {/* Book Author */}
                    <div>
                        <label className="block mb-1 font-medium">Author</label>
                        <input
                            type="text"
                            name="book_author"
                            className="w-full border px-3 py-2 rounded-lg"
                            placeholder="Enter author's name"
                        />
                    </div>

                    {/* User Email (Read-only) */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Your Email
                        </label>
                        <input
                            type="email"
                            name="user_email"
                            className="w-full border px-3 py-2 rounded-lg "
                            value={user?.email || ''}
                            readOnly
                        />
                    </div>

                    {/* User Name (Read-only) */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Your Name
                        </label>
                        <input
                            type="text"
                            name="user_name"
                            className="w-full border px-3 py-2 rounded-lg "
                            value={user?.displayName || ''}
                            readOnly
                        />
                    </div>

                    {/* Book Category Dropdown */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Book Category
                        </label>
                        <select
                            name="book_category"
                            className="select border px-3 py-2 w-full rounded-lg">
                            <option value="">Select a category</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-Fiction">Non-Fiction</option>
                            <option value="Fantasy">Fantasy</option>
                        </select>
                        
                    </div>

                    {/* Reading Status Dropdown */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Reading Status
                        </label>
                        <select
                            name="reading_status"
                            className="select w-full border px-3 py-2 rounded-lg">
                            <option value="">Select status</option>
                            <option value="Read">Read</option>
                            <option value="Reading">Reading</option>
                            <option value="Want-to-Read">Want to Read</option>
                        </select>
                    </div>
                </div>
                {/* Book Overview */}
                <div>
                    <label className="block mb-1 font-medium">
                        Book Overview
                    </label>
                    <textarea
                        name="book_overview"
                        className="w-full border px-3 py-2 rounded-lg"
                        rows="4"
                        placeholder="Write a short overview of the book..."></textarea>
                </div>
                {/* Submit Button */}
                <div className="text-center">
                    <input
                        type="submit"
                        className="btn drop-shadow-md bg-amber-600 hover:bg-amber-700 btn-neutral mr-3"
                        value="Add a Book"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddBook;
