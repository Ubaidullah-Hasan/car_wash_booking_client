import Hero from '../Hero';
import '../homeStyle.css'
import FeaturedServices from '../FeaturedServices';

const Home = () => {
    return (
        <div>
            <div className='hero-container'>
                <Hero />
            </div>
            <FeaturedServices />
        </div>
    );
};

export default Home;