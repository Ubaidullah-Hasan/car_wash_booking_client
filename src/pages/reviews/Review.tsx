import { Card, Space } from 'antd';
import ReviewCard from '../../components/ReviewCard';
import { useGetAllReviewsQuery } from '../../Redux/features/reviewManagement/ReviewManagement.api';
import "./style.css"

const Review = () => {
    const { data: reviews, isFetching } = useGetAllReviewsQuery(undefined);
    const reviewsData = reviews?.data?.reviews;
    console.log(reviewsData)

    return (
        <div className='section-container review-page'>
            <Space
                direction="vertical"
                className=' margin-y-medium'
                size="middle"
            >
                {
                    isFetching ?
                        <Card loading={isFetching} style={{width: 1000, height: "500px"}}>
                            
                        </Card>
                        :
                        reviewsData?.map(review => (
                            <ReviewCard  key={review?._id} item={review} />
                        ))
                }
            </Space>
        </div>
    );
};

export default Review;