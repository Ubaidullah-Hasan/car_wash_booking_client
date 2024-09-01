import React, { useState } from 'react';
import { Input, Card, Row, Col, Select, Typography, Button } from 'antd';
import './style.css'
import SectionTitle from '../../components/SectionTitle';

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

// Mock data for services
const servicesData = [
    { id: 1, name: 'Basic Wash', description: 'Includes exterior wash and dry.', price: 10, duration: 30 },
    { id: 2, name: 'Deluxe Wash', description: 'Exterior wash, dry, and wax.', price: 20, duration: 45 },
    { id: 3, name: 'Premium Wash', description: 'Complete interior and exterior wash.', price: 30, duration: 60 },
    { id: 4, name: 'Ultimate Wash', description: 'Full service wash including tire shine.', price: 40, duration: 90 },
    // Add more services as needed
];

const ServicesPage = () => {
    const [services, setServices] = useState(servicesData);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortPriceOrder, setSortPriceOrder] = useState('ascend');
    const [sortDurationOrder, setSortDurationOrder] = useState('ascend');

    // Handle search
    const onSearch = (value: string) => {
        setSearchTerm(value);
        console.log(value);
    };

    // Handle sorting by price
    const handlePriceSortChange = (order: string) => {
        setSortPriceOrder(order);
        console.log(order);
    };

    // Handle sorting by duration
    const handleDurationSortChange = (order: string) => {
        setSortDurationOrder(order);
        console.log(order);
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
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
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
                    {services.map(service => (
                        <Col xs={24} sm={12} md={8} lg={8} key={service.id}>
                            <Card title={service.name} bordered={true} hoverable>
                                <p>{service.description}</p>
                                <p><strong>Price:</strong> ${service.price}</p>
                                <p><strong>Duration:</strong> {service.duration} mins</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ServicesPage;
