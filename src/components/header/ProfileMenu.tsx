import {UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import "./profileMenu.css"
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../Redux/hooks';
import { currentUser } from '../../Redux/features/auth/authSlice';

// type MenuItem = Required<MenuProps>['items'][number];

const ProfileMenu = () => {
    // const [isDashMenu, setIsDashMenu] = useState(false);
    const navigate = useNavigate();
    const user = useAppSelector(currentUser);


    return (
        <div>
            <Tooltip placement="bottomLeft" title={"Dashboard"}>
                <Avatar
                    style={{ backgroundColor: 'var(--primary-color)', marginLeft: "20px", cursor: "pointer" }}
                    icon={<UserOutlined />}
                    onClick={() => navigate(`/dashboard/${user?.role}`)}
                />
            </Tooltip>

        </div>
    );
};

export default ProfileMenu;




{/* todo: next time i include more functionality */ }
{/* 
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
            
            */}
{/* {
                isDashMenu &&
                <Menu
                    theme='dark'
                    onClick={onClick}
                    style={{ width: 256 }}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[current]}
                    mode="inline"
                    items={items}
                    className='profile-menu'
                />
            } */}