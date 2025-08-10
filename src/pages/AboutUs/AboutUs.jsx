import React from 'react';
import { Link } from 'react-router';

const AboutUs = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-amber-500 to-amber-700 py-16 px-6 text-center ">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Welcome to Book Hut
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto">
                    Your ultimate destination for discovering, tracking, and
                    sharing books you love. Whether you are a casual reader or a
                    passionate bookworm, Book Hut is here for you.
                </p>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Our Mission
                </h2>
                <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto">
                    At{' '}
                    <span className="text-amber-600 font-semibold">
                        Book Hut
                    </span>
                    , we believe in the power of books to change lives. Our
                    mission is to make reading more accessible, engaging, and
                    social. We aim to connect readers across the world and
                    provide a platform where you can track your reading journey,
                    review books, and discover new titles recommended by fellow
                    book lovers.
                </p>
            </section>

            {/* Features Section */}
            <section className="py-16 px-6">
                <h2 className="text-3xl font-bold mb-12 text-center">
                    Why Choose Book Hut?
                </h2>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-3 text-amber-600">
                            📚 Vast Book Collection
                        </h3>
                        <p>
                            Explore thousands of books from different genres,
                            authors, and categories.
                        </p>
                    </div>
                    <div className="p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-3 text-amber-600">
                            ⭐ Track & Review
                        </h3>
                        <p>
                            Keep track of books you’ve read, are reading, or
                            want to read. Leave reviews to share your thoughts.
                        </p>
                    </div>
                    <div className="p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-3 text-amber-600">
                            🌍 Community of Readers
                        </h3>
                        <p>
                            Connect with book lovers worldwide, exchange
                            recommendations, and join reading challenges.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Start Your Reading Journey Today!
                </h2>
                <p className="max-w-2xl mx-auto mb-6">
                    Sign up for free and become part of a vibrant reading
                    community.
                </p>
                <Link to="/bookShelf">
                    <a
                        href="/register"
                        className="px-6 py-3 bg-amber-600 hover:bg-amber-700 rounded-lg shadow-md transition"
                    >
                        Join Now
                    </a>
                </Link>
            </section>
        </div>
    );
};

export default AboutUs;
