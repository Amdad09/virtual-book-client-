import { use } from "react";

const FeaturedCategories = ({ booksPromise }) => {
    const books = use(booksPromise);

    const fictionBooks = books.filter((book) => book?.book_category === 'Fiction');

    const nonFictionBooks = books.filter((book) => book?.book_category === 'Non-Fiction');

    const fantasyBooks = books.filter((book) => book?.book_category === 'Fantasy');

    console.log(fictionBooks, nonFictionBooks, fantasyBooks);


    return (
        <section className="py-12 px-4 ">
            <h2 className="text-4xl font-bold mb-8 text-center">
                Featured Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div>
                   
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;


{/* <div
                        key={cat.id}
                        className=" rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-2xl font-semibold mb-2">
                                {cat.name}
                            </h3>
                            <p className="text-gray-600">{cat.description}</p>
                        </div>
                    </div> */}