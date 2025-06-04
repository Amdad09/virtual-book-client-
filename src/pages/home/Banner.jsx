// components/Banner.jsx
import Slider from 'react-slick';
import { Link } from 'react-router';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'motion/react';
const NextArrow = ({ onClick }) => (
    <div
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer text-amber-500 bg-black/40 p-2 rounded-full hover:bg-black transition"
        onClick={onClick}>
        <FaArrowRight size={20} />
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer text-amber-500 bg-black/40 p-2 rounded-full hover:bg-black transition"
        onClick={onClick}>
        <FaArrowLeft size={20} />
    </div>
);

const slides = [
    {
        id: 1,
        title: 'Discover Rare Books',
        description:
            'Explore a world of timeless knowledge from our bookshelf collection.',
        image: 'https://i.ibb.co/4nGh2cNv/pexels-pixabay-207662.jpg',
    },
    {
        id: 2,
        title: 'Unlock Stories That Matter',
        description: 'Thousands of tales and truths await your discovery.',
        image: 'https://i.ibb.co/CKQ46HnZ/pexels-mikhail-nilov-7582590.jpg',
    },
    {
        id: 3,
        title: 'Pagla Bookshelf for Book Lovers',
        description:
            'Curated with care, built for passionate readers like you.',
        image: 'https://i.ibb.co/Cs997QKt/pexels-tima-miroshnichenko-5303515.jpg',
    },
];

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="w-full relative">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="relative h-[400px] lg:h-[500px]">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
                            <motion.h2
                                initial={{ scale: 0 }}
                                animate={{
                                    scale: 1,
                                    transition: { duration: 2 },
                                }}
                                className="text-3xl md:text-5xl font-bold mb-4">
                                {slide.title}
                            </motion.h2>
                            <p className="text-lg md:text-xl mb-6">
                                {slide.description}
                            </p>
                            <Link
                                to="/books"
                                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md font-semibold transition">
                                Explore Now
                            </Link>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;
