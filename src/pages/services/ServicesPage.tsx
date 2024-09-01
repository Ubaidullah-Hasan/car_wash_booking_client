import { useState } from 'react';
import { Input, Card, Row, Col, Select } from 'antd';
import './style.css'
import SectionTitle from '../../components/SectionTitle';
import { useGetAllServicesQuery } from '../../Redux/features/serviceManagement/serviceManagement.api';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;
const { Option } = Select;

const ServicesPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortPriceOrder, setSortPriceOrder] = useState<string>('ascend');
    const [sortDurationOrder, setSortDurationOrder] = useState<string>('ascend');
    const { data: services } = useGetAllServicesQuery({ searchTerm, sortDurationOrder, sortPriceOrder });

    // Handle search
    const onSearch = (value: string) => {
        setSearchTerm(value);
    };

    // Handle sorting by price
    const handlePriceSortChange = (order: string) => {
        setSortDurationOrder("");
        setSortPriceOrder(order);
    };

    // Handle sorting by duration
    const handleDurationSortChange = (order: string) => {
        setSortPriceOrder("");
        setSortDurationOrder(order);
    };

    return (
        <div className='section-container service-page'>
            <div className='margin-y-medium'>
                <SectionTitle title='Car Wash Services' />

                <Row gutter={[80, 16]} style={{ marginBottom: '20px' }}>
                    <Col xs={24} md={12}>
                        <Search placeholder="Search services" onSearch={onSearch} enterButton />
                    </Col>
                    <Col xs={24} md={12}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                                <div className='service-filter-form'>
                                    <label htmlFor="price">Price</label>
                                    <Select
                                        id='price'
                                        defaultValue="ascend"
                                        onChange={(value) => handlePriceSortChange(value)}
                                        style={{ width: 160, marginRight: 10 }}
                                    >
                                        <Option value="ascend">Low to High</Option>
                                        <Option value="descend">High to Low</Option>
                                    </Select>
                                </div>

                                <div className='service-filter-form'>
                                    <label>Duration:</label>
                                    <Select
                                        defaultValue="ascend"
                                        onChange={(value) => handleDurationSortChange(value)}
                                        style={{ width: 160 }}
                                    >
                                        <Option value="ascend">Low to High</Option>
                                        <Option value="descend">High to Low</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    {services?.data?.map(service => (
                        <Col xs={24} sm={12} md={8} lg={8} key={service._id}>
                            <Card
                                bordered={true}
                                hoverable
                                cover={
                                    <img
                                        alt={service?.name}
                                        src={service?.image || "https://cdni.autocarindia.com/utils/ImageResizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Hyundai-Grand-i10-Nios-200120231541.jpg"}
                                        style={{ height: '200px', objectFit: 'cover', borderBottom: "1px solid #dedcdc80" }}
                                    />
                                }
                                onClick={() => navigate(service?._id)}
                            >
                                <h3>{service.name}</h3>
                                <p style={{ height: "50px" }}>
                                    {service.description.length > 100
                                        ? `${service.description.substring(0, 100)}...`
                                        : service.description}
                                </p>
                                <div style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}>
                                    <p><strong>Price:</strong> ৳{service.price}</p>
                                    <p><strong>Duration:</strong> {service.duration} mins</p>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ServicesPage;
