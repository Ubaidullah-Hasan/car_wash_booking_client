import Hero from '../Hero';
import '../homeStyle.css'
import FeaturedServices from '../FeaturedServices';
import ReviewSection from '../ReviewSection';

const Home = () => {
    return (
        <div>
            <div className='hero-container'>
                <Hero />
            </div>
            <FeaturedServices />
            <ReviewSection />
        </div>
    );
};

export default Home;