import { useEffect, useState } from 'react';
import { Input, Rate, Button, Card, List, Statistic, Avatar } from 'antd';
import SectionTitle from '../../components/SectionTitle';
import { ArrowRightOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../Redux/hooks';
import { currentUser } from '../../Redux/features/auth/authSlice';
import { useCreateReviewMutation, useGetReviewByUserIdQuery } from '../../Redux/features/reviewManagement/ReviewManagement.api';
import { useGetUserByEmailQuery } from '../../Redux/features/user/userManagement.api';

const reviews = [
    {
        id: 1,
        userName: "John Doe",
        rating: 5,
        feedback: "Amazing service! Highly recommend.",
        date: "2024-08-15",
    },
    {
        id: 2,
        userName: "Jane Smith",
        rating: 4,
        feedback: "Great experience overall, but there's room for improvement.",
        date: "2024-08-14",
    },
    {
        id: 3,
        userName: "Alice Johnson",
        rating: 3,
        feedback: "Average service, nothing special.",
        date: "2024-08-13",
    },
    {
        id: 4,
        userName: "Bob Brown",
        rating: 5,
        feedback: "Exceeded my expectations!",
        date: "2024-08-12",
    },
    {
        id: 5,
        userName: "Sarah Wilson",
        rating: 2,
        feedback: "Not satisfied with the service.",
        date: "2024-08-11",
    }
];


const ReviewSection = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const user = useAppSelector(currentUser);
    const { data: userData } = useGetUserByEmailQuery(user?.email, { skip: !(user?.email) });

    const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();
    const { data: singleReview } = useGetReviewByUserIdQuery(userData?.data?._id, { skip: !user });
    const userReview = singleReview?.data;

    const overallRating = reviews.reduce((acc, currentValue) => currentValue.rating + acc / reviews.length, 0);

    const handleFeedbackSubmit = () => {
        const reviewSubmitData = {
            userId: userData?.data?._id,
            feedback: feedback,
            rating: rating,
        }
        createReview(reviewSubmitData);
    };

    useEffect(() => {
        if (userReview?.feedback) {
            setFeedback(userReview.feedback);
        }
        if (userReview?.rating) {
            setRating(userReview.rating);
        }
    }, [userReview]);

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
    }, [location]);


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
                    dataSource={reviews.slice(0, 2)} // todo change review data number
                    renderItem={(item) => (
                        <List.Item>
                            <Card>
                                <Rate className='card-rating' disabled value={item.rating} style={{ color: '#ffcc00' }} />
                                <Meta
                                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                                    title={item?.userName}
                                    description={item.feedback}
                                />
                            </Card>
                        </List.Item>
                    )}
                />
                <Button
                    size='large'
                    type="link"
                    href="/reviews"
                    style={{ marginTop: '10px', color: 'white', textDecoration: 'underline' }}
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
                    <Button
                        type="primary"
                        onClick={handleFeedbackSubmit}
                        style={{ marginTop: '10px' }}
                        disabled={isCreating}
                    >
                        Submit Review
                        <ArrowRightOutlined />
                    </Button>
                </div>
            </div>

        </section>
    );
};

export default ReviewSection;
