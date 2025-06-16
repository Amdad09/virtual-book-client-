import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react'; 
const OnlineData = () => {
    return (
        <div className="hero bg-base-200 py-20">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="flex-1 w-64 md:w-72 lg:w-80 pl-0 ">
                    <motion.img
                        animate={{ y: [0, 50, 0] }}
                        transition={{ duration: 7, repeat: Infinity }}
                        src="https://i.ibb.co/m5nnxnCv/pexels-freestocks-12627.jpg"
                        className="w-64 md:w-72 lg:w-80 rounded-t-[40px] shadow-2xl border-b-8 rounded-br-[40px] border-l-8 border-amber-600"
                    />
                    <motion.img
                        animate={{ x: [20, 50, 20] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        src="https://i.ibb.co/Mk52b9dK/pexels-marta-wave-6437845.jpg"
                        className="w-60 md:w-72 lg:w-80 rounded-t-[40px] shadow-2xl border-b-8 rounded-br-[40px] border-l-8 border-amber-600"
                    />
                </div>

                <div className="flex-1">
                    <p className="text-amber-600 font-semibold mb-12">
                        Online Data
                    </p>
                    <h1 className="text-5xl font-bold">
                        The largest library on the planet
                    </h1>
                    <p className="py-6">
                        We share thousands of books with others by reviewing
                        them. Our goal is to get the books in the readers' hands
                        all over the world.
                    </p>
                    <Link
                        to="/bookShelf"
                        className="mt-6 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                        Read Books
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OnlineData;