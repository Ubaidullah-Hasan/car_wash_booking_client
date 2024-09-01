import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const ProfileMenu = () => {
    const [current, setCurrent] = useState('1');

    const items: MenuItem[] = [
        {
            key: 'sub1',
            label: 'Navigation One',
            icon: <MailOutlined />,
            children: [
                { key: '1', label: 'Option 1' },
                { key: '2', label: 'Option 2' },
                { key: '3', label: 'Option 3' },
                { key: '4', label: 'Option 4' },
            ],
        },
        {
            key: 'sub2',
            label: 'Navigation Two',
            icon: <AppstoreOutlined />,
            children: [
                { key: '5', label: 'Option 5' },
                { key: '6', label: 'Option 6' },
            ],
        },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Menu
            theme='dark'
            onClick={onClick}
            style={{ width: 256 }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[current]}
            mode="inline"
            items={items}
        />
    );
};

export default ProfileMenu;