import React, { useState } from 'react';
import './creater.css';

const CreatorsMessage = () => {
    const messages = [
        {
            id: 1,
            photo: 'https://i.ibb.co/0MP1K82/flirty-young-female-student-reading-book-table-1262-5042.jpg',
            message:
                'Book Hut has completely changed how I discover and enjoy books. The collection is fresh, the interface is clean, and I love the reading status tracking!',
            name: 'Shompa Sultana',
            position: 'Sales Manager',
        },
        {
            id: 2,
            photo: 'https://i.ibb.co/fvZDnxx/portrait-young-bearded-man-reading-book-114579-79011.jpg',
            message:
                'As a software engineer, I love how Book Hut gives me full control over my reading habits. The user-friendly dashboard is a big plus!',
            name: 'Rakib Hasan',
            position: 'Software Engineer',
        },
        {
            id: 3,
            photo: 'https://i.ibb.co/LQ697YK/woman-embracing-book-23-2147797373.jpg',
            message:
                'I’ve always struggled to stay organized with my reading, but this app helps me keep track of everything I read or want to read. Super helpful!',
            name: 'Moushumi Khatun',
            position: 'Freelance Writer',
        },
    ];

    const [activeMessage, setActiveMessage] = useState(messages[0]); // Default first message

    return (
        <div className="bg-gradient-to-r from-amber-500 to-amber-700 py-28 flex flex-col items-center">
            <div className="text-center max-w-xl bg-white p-4 rounded shadow mb-10">
                <p className="text-gray-800 italic mb-2">
                    "{activeMessage.message}"
                </p>
                <h3 className="font-bold">{activeMessage.name}</h3>
                <p className="text-sm text-gray-600">
                    {activeMessage.position}
                </p>
            </div>

            <div className="flex justify-center items-center gap-6">
                {messages.map((msg) => (
                    <img
                        key={msg.id}
                        onClick={() => setActiveMessage(msg)}
                        className={`w-16 h-16 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 ${
                            activeMessage.id === msg.id
                                ? 'ring-4 ring-white scale-110'
                                : ''
                        }`}
                        src={msg.photo}
                        alt={msg.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default CreatorsMessage;
