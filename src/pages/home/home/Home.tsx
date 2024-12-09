import Hero from '../Hero';
import '../homeStyle.css'
import FeaturedServices from '../FeaturedServices';
import ReviewSection from '../ReviewSection';
import BestSale from '../BestSale';
import OfferServices from '../OfferServices';

const Home = () => {
    return (
        <div>
            <div className='hero-container'>
                <Hero />
            </div>
            <FeaturedServices />
            <BestSale />
            <ReviewSection />
            <OfferServices />
        </div>
    );
};

export default Home;