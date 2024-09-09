import {UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Tooltip } from 'antd';
import "./profileMenu.css"
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../Redux/hooks';
import { currentUser } from '../../Redux/features/auth/authSlice';
import useScreenWidth from '../../Hooks/useScreenWidth';


const ProfileMenu = () => {
    const navigate = useNavigate();
    const user = useAppSelector(currentUser);
    const screenWidth = useScreenWidth();


    return (
        <div>
            {
                screenWidth >= 1024 ?
                    <Tooltip placement="bottomLeft" title={"Dashboard"}>
                        <Avatar
                            style={{ backgroundColor: 'var(--primary-color)', marginLeft: "20px", cursor: "pointer" }}
                            icon={<UserOutlined />}
                            onClick={() => navigate(`dashboard/${user?.role}/overview`)}
                        />
                    </Tooltip>
                    :
                    <Button block size='large' onClick={() => navigate(`dashboard/${user?.role}/overview`)}>Dashboard</Button>
            }
            

        </div>
    );
};

export default ProfileMenu;
