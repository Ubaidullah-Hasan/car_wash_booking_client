import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import FetauredCard from '../../components/card/FetauredCard';
import SectionTitle from '../../components/SectionTitle';
import { useGetAllServicesQuery } from '../../Redux/features/serviceManagement/serviceManagement.api';


const featuredServices = [
    {
        serviceName: "Personal Training",
        description: "One-on-one training sessions tailored to your fitness goals.",
        image: "https://example.com/images/personal_training.jpg",
        price: 50,
        duration: "1 hour"
    },
    {
        serviceName: "Group Fitness Classes",
        description: "High-energy classes that keep you motivated and fit.",
        image: "https://example.com/images/group_fitness_classes.jpg",
        price: 20,
        duration: "45 minutes"
    },
    {
        serviceName: "Yoga Classes",
        description: "Relaxing yoga sessions for all skill levels.",
        image: "https://example.com/images/yoga_classes.jpg",
        price: 30,
        duration: "1 hour"
    },
    {
        serviceName: "Nutrition Counseling",
        description: "Personalized nutrition plans to complement your fitness routine.",
        image: "https://example.com/images/nutrition_counseling.jpg",
        price: 60,
        duration: "1 hour"
    },
    {
        serviceName: "Massage Therapy",
        description: "Relieve muscle tension and improve recovery with professional massage therapy.",
        image: "https://example.com/images/massage_therapy.jpg",
        price: 70,
        duration: "1 hour"
    },
    {
        serviceName: "Physical Therapy",
        description: "Rehabilitative services to help you recover from injuries.",
        image: "https://example.com/images/physical_therapy.jpg",
        price: 80,
        duration: "1 hour"
    }
];


const FeaturedServices = () => {
    const { data: servicesData, isSuccess } = useGetAllServicesQuery({limit: 6});

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <section className='section-container padding-y-medium'>
            <div className="custom-shape-divider-top-1724903460">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </div>
            <SectionTitle
                className='white-color'
                title='Our Most Popular Services'
            />
            < Carousel
                responsive={responsive}
                autoPlay={true}
                itemClass='carousel-gap'
            >
                { isSuccess &&
                    servicesData?.data.map((service) => (
                        <FetauredCard key={service?._id} data={service} />
                    ))
                }
            </Carousel >

        </section>
    )

};

export default FeaturedServices;