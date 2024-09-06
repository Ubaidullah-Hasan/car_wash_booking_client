import { useState } from 'react';
import { useGetAllUserQuery, useUpdateUserRoleMutation } from '../../Redux/features/user/userManagement.api';
import { Table, Button, Modal, Select, Form } from 'antd';
import { USER_ROLE } from '../../constant/constant';

const { Option } = Select;

const UserManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const { data: usersResponse } = useGetAllUserQuery(undefined);
    const users = usersResponse?.data;
    const [updateRole] = useUpdateUserRoleMutation();

    const userData = users?.map(user => ({
        key: user?._id,
        username: user?.name,
        email: user?.email,
        role: user?.role,
    }))


    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (item) => (
                <Button size='small' disabled style={{ textTransform: "uppercase" }}>{item}</Button>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button onClick={() => showModal(record)}>Edit Role</Button>
            ),
        },
    ];



    const showModal = (user) => {
        setCurrentUser(user);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentUser(null);
    };

    const handleOk = (value) => {
        updateRole({ userId: currentUser?.key, role: { role: value.role } })
        setIsModalVisible(false);
    };

    return (
        <>
            <Table columns={columns} dataSource={userData} />

            <Modal
                title="Edit User Role"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form onFinish={handleOk} initialValues={{ role: currentUser?.role }}>
                    <Form.Item
                        name="role"
                        label="Select Role"
                        rules={[{ required: true, message: 'Please select a role!' }]}
                    >
                        <Select placeholder="Select a role" style={{ textTransform: "capitalize" }}>
                            <Option value={USER_ROLE.admin}>Admin</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Save Changes</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserManagement;




