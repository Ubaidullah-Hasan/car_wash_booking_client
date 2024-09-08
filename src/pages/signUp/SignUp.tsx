/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, message, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import profileImg from "../../assets/icon/profile.png"
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../Redux/features/auth/auth.api';



const SignUp = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [getRegistration,{isLoading: creating}] = useRegisterUserMutation();

    const onFinish = async (values: any) => {
        try {
            const registerInfo = {
                name: values.name,
                email: values.email,
                password: values.password,
                address: values.address,
                phone: values.phone,
            }
            console.log(registerInfo);
            const res = await getRegistration(registerInfo);
            console.log(res?.data?.success);
            if(res.data.success) {
                navigate("/signIn");
            }
            message.success('Registration successful!');
            // form.resetFields();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            message.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className='form-bg'>
            <Row justify="center" align={"middle"} style={{ minHeight: "100vh", padding: "40px 0px" }}>
                <Col xs={20} md={12} lg={10} xl={7}> 
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
                                { pattern: /^[0-9]{11}$/, message: 'Please input a valid phone number!' }
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
                            <Button type="primary" htmlType="submit" block disabled={creating}>
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