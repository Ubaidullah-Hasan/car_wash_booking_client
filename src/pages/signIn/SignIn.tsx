/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FormProps } from 'antd';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import './signin.css'
import profileImg from "../../assets/icon/profile.png"
import { useLoginMutation } from '../../Redux/features/auth/auth.api';
import { verifyToken } from '../../utility/verifyToken';
import { useAppDispatch } from '../../Redux/hooks';
import { setUser } from '../../Redux/features/auth/authSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};


const SignIn = () => {
    const [err, setErr] = useState<string>('');
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const path = location?.state?.from || "/";

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const res = await login(values);
            const user = verifyToken(res.data.token);
            dispatch(setUser({ user: user, token: res.data.token }));
            navigate(path);
        } catch (error) {
            setErr("Something went wrong");
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
    <div className='form-bg'>
        <Row justify="center" align={"middle"} style={{ height: "100vh" }}>
            <Col span={7}>
                <Form
                    className='custom-form'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    {
                        profileImg && <Form.Item className='profileImg-container'>
                            <img src={profileImg} className='profileImg' />
                        </Form.Item>
                    }

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

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                    >
                            <Button disabled={isLoading} type="primary" htmlType="submit" block>
                            Submit
                        </Button>
                    </Form.Item>
                        <p>I have no account! <Link style={{ textDecoration: "underline" }} to={"/signUp"}>Sign UP</Link></p>
                    {err && <p style={{ color: "red" }}>{err}</p>}
                </Form>
            </Col>
        </Row>
    </div>
    )
};

export default SignIn;