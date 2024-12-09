import Hero from '../Hero';
import '../homeStyle.css'
import FeaturedServices from '../FeaturedServices';
import ReviewSection from '../ReviewSection';
import BestSale from '../BestSale';

const Home = () => {
    return (
        <div>
            <div className='hero-container'>
                <Hero />
            </div>
            <FeaturedServices />
            <BestSale />
            <ReviewSection />
        </div>
    );
};

export default Home;