import { Suspense } from 'react';
import Loading from '../../shared/Loading';
import AllTypesBooks from './AllTypesBooks/AllTypesBooks';
import Banner from './Banner';
import CreatorsMessage from './CreatorsMessage/CreatorsMessage';
import FavBooks from './FavBooks/FavBooks';
import FeaturedCategories from './FeaturedCategories/FeaturedCategories';
import OnlineData from './OnlineData/OnlineData';

const Home = () => {
    const booksPromise = fetch('http://localhost:3000/books').then((res) =>
        res.json(),
    );

    const favBooksPromise = fetch('http://localhost:3000/books/top').then(
        (res) => res.json(),
    );

    return (
        <div>
            <Banner />
            <Suspense fallback={<Loading />}>
                <FavBooks favBooksPromise={favBooksPromise}></FavBooks>
            </Suspense>
            <Suspense fallback={<Loading></Loading>}>
                <FeaturedCategories booksPromise={booksPromise} />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <AllTypesBooks booksPromise={booksPromise} />
            </Suspense>

            <OnlineData />
            <CreatorsMessage />
        </div>
    );
};

export default Home;
