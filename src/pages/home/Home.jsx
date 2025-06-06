import React, { Suspense } from 'react';
import Banner from './Banner';
import FeaturedCategories from './FeaturedCategories/FeaturedCategories';
import Loading from '../../shared/Loading';

const Home = () => {
    const booksPromise = fetch('http://localhost:3000/books').then((res) =>
        res.json(),
    );

    return (
        <div>
            <Banner />
            <Suspense fallback={<Loading></Loading>}>
                <FeaturedCategories booksPromise={booksPromise} />
            </Suspense>
        </div>
    );
};

export default Home;
