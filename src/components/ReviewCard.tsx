import { Avatar, Card, Rate } from 'antd';
import Meta from 'antd/es/card/Meta';

const ReviewCard = ({ item, sortDescription = false }) => {
    return (
        <Card >
            <Rate className='card-rating' disabled value={item.rating} style={{ color: '#ffcc00' }} />
            {
                !sortDescription ?
                    <Meta
                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                        title={item?.userId?.name}
                        description={item.feedback}
                        style={{ textTransform: "capitalize" }}
                    /> :
                    <Meta
                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                        title={item?.userId?.name}
                        description={item.feedback.length > 120 ? `${item.feedback.slice(0, 120)}...more` : item.feedback}
                        style={{ textTransform: "capitalize" }}
                    />
            }

        </Card>
    );
};

export default ReviewCard;