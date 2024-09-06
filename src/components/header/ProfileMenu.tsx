import {UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import "./profileMenu.css"
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../Redux/hooks';
import { currentUser } from '../../Redux/features/auth/authSlice';


const ProfileMenu = () => {
    const navigate = useNavigate();
    const user = useAppSelector(currentUser);


    return (
        <div>
            <Tooltip placement="bottomLeft" title={"Dashboard"}>
                <Avatar
                    style={{ backgroundColor: 'var(--primary-color)', marginLeft: "20px", cursor: "pointer" }}
                    icon={<UserOutlined />}
                    onClick={() => navigate(`dashboard/${user?.role}/overview`)}
                />
            </Tooltip>

        </div>
    );
};

export default ProfileMenu;
