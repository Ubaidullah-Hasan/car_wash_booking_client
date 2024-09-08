import { PlusOutlined } from '@ant-design/icons';
import { Form, Button, Select, DatePicker, TimePicker, Col, Row } from 'antd';

const { Option } = Select;

const SlotForm = ({ onSubmit, options, error, loading }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        const formattedValues = {
            service: values.service,
            date: values.date.format('YYYY-MM-DD'),
            startTime: values.startTime.format('HH:mm'),
            endTime: values.endTime.format('HH:mm'),
        };
        onSubmit(formattedValues);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
        >
            <Row gutter={16} align='bottom'>
                {/* Select Service */}
                <Col xs={24} sm={12} lg={6}>
                    <Form.Item
                        name="service"
                        label="Select Service"
                        rules={[{ required: true, message: 'Please select a service!' }]}
                    >
                        <Select placeholder="Select a service">
                            {options?.map(item => (
                                <Option key={item.value} value={item?.value}>{item?.label}</Option>
                            ))}

                        </Select>
                    </Form.Item>
                </Col>

                {/* Select Start Time */}
                <Col xs={24} sm={12} lg={4}>
                    <Form.Item
                        name="startTime"
                        label="Start Time"
                        rules={[{ required: true, message: 'Please select a start time!' }]}
                    >
                        <TimePicker use12Hours format="h:mm a" needConfirm={false} />
                    </Form.Item>
                </Col>

                {/* Select End Time */}
                <Col xs={24} sm={12} lg={4}>
                    <Form.Item
                        name="endTime"
                        label="End Time"
                        rules={[{ required: true, message: 'Please select an end time!' }]}
                    >
                        <TimePicker use12Hours format="h:mm a" needConfirm={false} />
                    </Form.Item>
                </Col>

                {/* Select Date */}
                <Col xs={24} sm={12} lg={4}>
                    <Form.Item
                        name="date"
                        label="Select Date"
                        rules={[{ required: true, message: 'Please select a date!' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={3}>
                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" iconPosition='end' icon={<PlusOutlined />} loading={loading}>
                            Create Slot 
                        </Button>
                    </Form.Item>
                </Col>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </Row>
        </Form>
    );
};

export default SlotForm;
