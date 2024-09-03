import { DoubleRightOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { IoTimeOutline } from 'react-icons/io5';
import serviceIcon from "../../assets/icon/serviceIcon.gif"
import { useNavigate } from 'react-router-dom';

type TProps = {
    name: string
    description: string
    image: string
    price: number
    duration: string
    _id: string
}

const FetauredCard = ({ data }: { data: TProps }) => {
    const navigate = useNavigate();

    return (
        <Card
            cover={
                <img
                    alt="example"
                    src={data?.image || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                />
            }
            actions={[
                <span className='text-green' style={{ fontWeight: "700" }}>{data?.price} ৳</span>,
                <span className='text-green' style={{ display: "flex", justifyContent: "center", alignItems: "center", }}> <IoTimeOutline />  {data?.duration} Mins</span>,
                <button className='card-btn' onClick={() => navigate(`/services/${data?._id}`)}>Book Now <DoubleRightOutlined /></button>
            ]}
        >
            <Meta
                style={{ height: "100px" }}
                avatar={<Avatar src={serviceIcon} />}
                title={data?.name}
                description={data?.description}
            />
        </Card>
    );
};

export default FetauredCard;