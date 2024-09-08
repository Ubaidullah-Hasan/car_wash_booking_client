import { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAppSelector } from '../../Redux/hooks';
import { currentUser } from '../../Redux/features/auth/authSlice';
import { useGetUserByEmailQuery, useUpdateUserProfileMutation } from '../../Redux/features/user/userManagement.api';

const UserProfile = () => {
    const [form] = Form.useForm();
    const cuUser = useAppSelector(currentUser);
    const { data } = useGetUserByEmailQuery(cuUser?.email, { skip: !cuUser.email });
    const user = data?.data;
    const [updateUser, {isLoading}] = useUpdateUserProfileMutation();

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            });
        }
    }, [user, form]);

    const onFinish = async (values) => {
        const res = await updateUser({ data: values, email: cuUser?.email });
        if (res?.data?.success) {
            message.success("User updated successfully!")
        } else {
            message.error("")
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: "30px" }}>Account Settings</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please enter your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[{ required: true, message: 'Please enter your phone number!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ required: true, message: 'Please enter your address!' }]}
                >
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading} >
                        Update Profile
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserProfile;