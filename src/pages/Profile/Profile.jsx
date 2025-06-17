import React, { use, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { AuthContext } from '../../contexts/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Profile = () => {
    const { user } = use(AuthContext);
    const [books, setBooks] = useState([]);
    console.log(books);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/books/user?user_email=${user.email}`)
                .then((res) => setBooks(res.data))
        }
        
    }, [axiosSecure, user.email]);

    // Group books by category
    const categoryData = [];
    const categoryMap = {};

    books.forEach((book) => {
        const category = book.book_category;

        if (categoryMap[category]) {
            categoryMap[category] += 1;
        } else {
            categoryMap[category] = 1;
        }
    });

    for (const key in categoryMap) {
        categoryData.push({ name: key, value: categoryMap[key] });
    }

    return (
        <div className=" max-w-4xl mx-auto my-12">
            {/* User Info */}
            <div className="flex flex-col items-center gap-4 mb-8 bg-gray-100 p-4 rounded-lg shadow">
                <img src={user.photoURL} alt="Profile" className="w-96 h-96" />
                <div>
                    <h2 className="text-xl text-gray-600 font-semibold">
                        Name: {user.displayName}
                    </h2>
                    <p className="text-gray-600">E-mail: {user.email}</p>
                </div>
            </div>

            {/* Book Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  items-center lg:items-start pt-10">
                <div className="text-center">
                    <h3 className="text-lg font-bold mb-2">
                        📚 Your Bookshelf Summary
                    </h3>
                    <p>Total Books: {books.length}</p>
                    {Object.keys(categoryMap).map((cat) => (
                        <p key={cat}>
                            {cat || 'Others Category'} : {categoryMap[cat]}
                        </p>
                    ))}
                </div>

                {/* Chart */}
                <div className="text-center">
                    <h3 className="text-lg font-bold">
                        📊 Books by Category
                    </h3>
                    <div className='flex justify-center  items-center '>
                        <PieChart width={300} height={300} >
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label>
                                {categoryData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
