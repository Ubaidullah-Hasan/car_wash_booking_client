import React from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import profileImg from "../../assets/icon/profile.png"
import { Link } from 'react-router-dom';

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

const SignUp = () => {

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            console.log('Form Values:', values);
            // Here, you'd typically make an API call to register the user
            // For example:
            // await registerUser(values);
            message.success('Registration successful!');
            form.resetFields();
        } catch (error) {
            message.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className='form-bg'>
            <Row justify="center" align={"middle"} style={{ height: "100vh" }}>
                <Col span={7}>
                    <Form
                        className='custom-form'
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                        layout="vertical"
                    >
                        {
                            profileImg && <Form.Item className='profileImg-container'>
                                <img src={profileImg} className='profileImg' />
                            </Form.Item>
                        }
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Enter your name" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { type: 'email', message: 'The input is not a valid email!' },
                                { required: true, message: 'Please input your email!' },
                            ]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            hasFeedback
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Confirm your password" />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[
                                { required: true, message: 'Please input your phone number!' },
                                { pattern: /^[0-9]{10}$/, message: 'Please input a valid phone number!' }
                            ]}
                        >
                            <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
                        </Form.Item>

                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <Input prefix={<HomeOutlined />} placeholder="Enter your address" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Register
                            </Button>
                        </Form.Item>
                        <p>I have an account! <Link to={"/signIn"} style={{textDecoration: "underline"}}>Sign In</Link></p>
                    </Form>
                </Col>
            </Row >
        </div>
    );
};

export default SignUp;