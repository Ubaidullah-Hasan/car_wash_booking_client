import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import FetauredCard from '../../components/card/FetauredCard';
import SectionTitle from '../../components/SectionTitle';
import { useGetBestsaleServicesQuery } from '../../Redux/features/serviceManagement/serviceManagement.api';



const BestSale = () => {
    const { data: servicesData, isSuccess } = useGetBestsaleServicesQuery({});

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
            <div className="best-sale custom-shape-divider-top-1724903460">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                    {/* <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path> */}
                </svg>
            </div>
            <SectionTitle
                className='black-color'
                title='Best Sale Services'
            />
            < Carousel
                responsive={responsive}
                autoPlay={true}
                itemClass='carousel-gap'
            >
                {isSuccess &&
                    servicesData?.data.map((service) => (
                        <FetauredCard key={service?._id} data={service} />
                    ))
                }
            </Carousel >

        </section>
    )

};

export default BestSale;