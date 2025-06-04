// components/FeaturedCategories.jsx


const categories = [
    {
        id: 1,
        name: 'Fiction',
        description: 'Imaginative and creative storytelling.',
        image: 'https://example.com/fiction.jpg',
    },
    {
        id: 2,
        name: 'Non-Fiction',
        description: 'Real stories, facts, and knowledge.',
        image: 'https://example.com/nonfiction.jpg',
    },
    {
        id: 3,
        name: 'Fantasy',
        description: 'Magical worlds and epic adventures.',
        image: 'https://example.com/fantasy.jpg',
    },
];

const FeaturedCategories = () => {
    return (
        <section className="py-12 px-4 bg-gray-100">
            <h2 className="text-4xl font-bold mb-8 text-center">
                Featured Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3
                                className="text-2xl font-semibold mb-2">
                                {cat.name}
                            </h3>
                            <p className="text-gray-600">{cat.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedCategories;
