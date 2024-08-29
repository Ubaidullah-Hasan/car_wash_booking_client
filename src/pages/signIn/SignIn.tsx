/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FormProps } from 'antd';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import './signin.css'
import profileImg from "../../assets/icon/profile.png"
import { useLoginMutation } from '../../Redux/features/auth/auth.api';
import { verifyToken } from '../../utility/verifyToken';
import { useAppDispatch } from '../../Redux/hooks';
import { setUser } from '../../Redux/features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};


const SignIn = () => {
    const [err, setErr] =useState<string>('');
    const [login, {isLoading}] = useLoginMutation();
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

    return (<div className='custom-login'>
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
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input type='email'/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                    >
                        <Button disabled={isLoading} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    {err && <p style={{ color: "red" }}>{err}</p>}
                </Form>
            </Col>
        </Row>
    </div>
    )
};

export default SignIn;