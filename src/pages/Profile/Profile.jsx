import React, { use, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Profile = () => {
    const { user } = use(AuthContext);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Assuming books are fetched based on user email
        axios
            .get(
                `https://virtual-bookshelf-server.vercel.app/books?email=${user.email}`,
            )
            .then((res) => setBooks(res.data));
    }, [user.email]);

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
        <div className="p-6 max-w-4xl mx-auto">
            {/* User Info */}
            <div className="flex items-center gap-4 mb-8 bg-gray-100 p-4 rounded-lg shadow">
                <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                />
                <div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>

            {/* Book Summary */}
            <div className="grid grid-cols-2 gap-6 items-center">
                <div>
                    <h3 className="text-lg font-bold mb-2">
                        📚 Your Bookshelf Summary
                    </h3>
                    <p>Total Books: {books.length}</p>
                    {Object.keys(categoryMap).map((cat) => (
                        <p key={cat}>
                            {cat}: {categoryMap[cat]}
                        </p>
                    ))}
                </div>

                {/* Chart */}
                <div>
                    <h3 className="text-lg font-bold mb-2">
                        📊 Books by Category
                    </h3>
                    <PieChart width={300} height={300}>
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
    );
};

export default Profile;
