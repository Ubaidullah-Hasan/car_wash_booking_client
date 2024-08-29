import { DoubleRightOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { IoTimeOutline } from 'react-icons/io5';
import serviceIcon from "../../assets/icon/serviceIcon.gif"

type TProps = {
    serviceName: string
    description: string
    image: string
    price: number
    duration: string
}

type TTimeFormate = (param1: string) => void

const FetauredCard = ({ data }: { data: TProps }) => {
    
    function formatDuration(duration: string): string {
        // Parse the duration and convert it to the appropriate format
        const timeParts = duration.toLowerCase().split(' ');

        if (timeParts.length === 2) {
            const value = parseInt(timeParts[0], 10);
            const unit = timeParts[1];

            if (unit.includes('hour')) {
                return `${value}H`;
            } else if (unit.includes('minute')) {
                return `${value}M`;
            }
        }
        return duration;
    }


    return (
        <Card
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={[
                <span className='text-green' style={{fontWeight: "700" }}>{data?.price} ৳</span>,
                <span className='text-green' style={{display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "700"}}> <IoTimeOutline />  {formatDuration(data.duration)} </span>,
                <button className='card-btn'>Book Now <DoubleRightOutlined /></button>
            ]}
        >
            <Meta
            style={{height: "100px"}}
                avatar={<Avatar src={serviceIcon} />}
                title={data?.serviceName}
                description={data?.description}
            />
        </Card>
    );
};

export default FetauredCard;