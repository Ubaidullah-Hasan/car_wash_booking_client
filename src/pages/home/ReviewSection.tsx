import { useEffect, useState } from 'react';
import { Input, Rate, Button, List, Statistic } from 'antd';
import SectionTitle from '../../components/SectionTitle';
import { ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../Redux/hooks';
import { currentUser } from '../../Redux/features/auth/authSlice';
import { useCreateReviewMutation, useGetAllReviewsQuery, useGetReviewByUserIdQuery } from '../../Redux/features/reviewManagement/ReviewManagement.api';
import { useGetUserByEmailQuery } from '../../Redux/features/user/userManagement.api';
import ReviewCard from '../../components/ReviewCard';

const ReviewSection = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const user = useAppSelector(currentUser);
    const { data: userData } = useGetUserByEmailQuery(user?.email, { skip: !(user?.email) });

    // create review and get single and all reviews
    const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();
    const { data: singleReview } = useGetReviewByUserIdQuery(userData?.data?._id, { skip: !user });
    const userReview = singleReview?.data;
    const { data: reviews } = useGetAllReviewsQuery({ limit: 2, date: -1 });
    const reviewsData = reviews?.data?.reviews;

    const overallRating = reviews?.data?.overallRating;

    const handleFeedbackSubmit = () => {
        const reviewSubmitData = {
            userId: userData?.data?._id,
            feedback: feedback,
            rating: rating,
        }
        createReview(reviewSubmitData);
    };

    const handleLoginRedirect = () => {
        navigate('/signin', { state: { from: '/#review-section' } });
    };

    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }

        if (userReview?.feedback) {
            setFeedback(userReview.feedback);
        }
        if (userReview?.rating) {
            setRating(userReview.rating);
        }
    }, [location, userReview]);


    return (
        <section id="review-section" className="section-container review-section">
            <SectionTitle
                title='Give your feedback'
                className='white-color'
            />

            <div className="post-submission">
                <Statistic
                    title="Overall Rating"
                    value={overallRating}
                    precision={1}
                    prefix={<Rate disabled value={overallRating} />}
                    style={{ marginTop: '20px' }}
                    className='custom-rating'
                />
                <List
                    itemLayout="vertical"
                    dataSource={reviewsData} // todo change review data number
                    renderItem={(item) => (
                        <List.Item>
                            <ReviewCard item={item} />
                        </List.Item>
                    )}
                />
                <Button
                    size='large'
                    type="link"
                    href="/reviews"
                    style={{ marginTop: '10px', color: 'white', textDecoration: 'underline' }}
                    className='see-all-review-btn'
                >
                    See All Reviews
                </Button>
            </div>

            {/* user input review */}
            <div className='user-feedback-input'>
                {!user?.email &&
                    <div className="overlay">
                        <h2 className="white-color">Please log in to leave a review</h2>
                        <Button size='large' className='login-btn' type="primary" onClick={handleLoginRedirect}>
                            Login
                        </Button>
                    </div>
                }
                <div style={{ textAlign: "end" }}>
                    <Rate
                        value={user && rating}
                        onChange={(value) => setRating(value)}
                        style={{ color: '#ffcc00', fontSize: '24px' }}
                        className='custom-rating'
                    />
                    <Input.TextArea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={4}
                        placeholder="Leave your feedback"
                        style={{ borderRadius: '10px', marginTop: '10px', height: "200px", padding: "20px" }}
                    />
                    {
                        userReview ?
                            <Button
                                type="primary"
                                onClick={handleFeedbackSubmit}
                                style={{ marginTop: '10px', textTransform: 'uppercase' }}
                                disabled={isCreating}
                                size='large'
                            >
                                Submited < CheckOutlined />
                            </Button> :
                            <Button
                                type="primary"
                                onClick={handleFeedbackSubmit}
                                style={{ marginTop: '10px' }}
                                disabled={isCreating}
                                size='large'
                            >
                                Submit Review <ArrowRightOutlined />
                            </Button>
                    }
                </div>
            </div>

        </section>
    );
};

export default ReviewSection;
