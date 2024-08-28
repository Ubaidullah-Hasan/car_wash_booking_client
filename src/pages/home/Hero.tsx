import { StarFilled } from '@ant-design/icons';
import { Button } from 'antd';

const Hero = () => {
    return (
        <div className='section-container hero'>
            <h1 className='white-color'>A car wash. Delivered to your door</h1>
            <p className='white-color subtitle'>Book a car wash with the UK's largest car wash specialist</p>
            <Button type="primary" shape="round" size="large" className='rating-btn'>4.6 <StarFilled /></Button> 
            <p className='small-text'>4.6 out of 5 recommend us (50+ reviews)</p>
        </div>
    );
};

export default Hero;