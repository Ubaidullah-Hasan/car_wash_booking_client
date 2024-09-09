/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, ConfigProvider, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { currentUser, logout } from '../Redux/features/auth/authSlice';
import { ClockCircleOutlined, DashboardOutlined, LoginOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import "./style.css"
import { useState } from 'react';
import ScrollToTopButton from '../components/scrollButton/ScrollToTopButton';
import ImmediatedSlot from '../components/ImmediatedSlot';
import { USER_ROLE } from '../constant/constant';
const { Header, Content, Footer, Sider } = Layout;


const DashboardLayout = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [isMobile, setIsMobile] = useState(false);

    const handleLog = () => {
        if (user) {
            dispatch(logout());
            navigate("/signIn", { state: { from: "/" } });
        }
        else navigate("/signIn", { state: { from: "/" } });
    }


    const getDefaultKey = () => {
        const routes = [
            { path: '/overview', key: '1' },
            { path: '/serviceManagement', key: '2' },
            { path: '/slotsManagement', key: '3' },
            { path: '/userManagement', key: '4' },
            { path: '/userBooking', key: 'userBooking' },
            { path: '/userManagement', key: 'userManagement' },
            { path: '/profile', key: 'myprofile' }
        ];
        const matchingRoute = routes.find((item) => location.pathname.includes(item.path));
        return matchingRoute.key;
    }
    const [selectedKey] = useState(getDefaultKey());


    const itemsOfAdmin = [
        {
            key: '1',
            label: 'Overview',
            icon: <DashboardOutlined />,
            onClick: () => navigate(`/dashboard/${user.role}/overview`),
        },
        {
            key: '2',
            label: 'Service Management',
            icon: <SettingOutlined />,
            onClick: () => navigate(`/dashboard/${user.role}/serviceManagement`),
        },
        {
            key: '3',
            label: 'Slot Management',
            icon: <ClockCircleOutlined />,
            onClick: () => navigate(`/dashboard/${user.role}/slotsManagement`),
        },

        {
            key: '4',
            label: 'User Management',
            icon: <UserOutlined />,
            children: [
                {
                    key: 'userBooking',
                    label: 'User Booking',
                    onClick: () => navigate(`/dashboard/${user.role}/userBooking`),
                },
                {
                    key: 'userManagement',
                    label: 'User Manage',
                    onClick: () => navigate(`/dashboard/${user.role}/userManagement`),
                },
            ]
        },
        {
            key: '5',
            label: user ? 'Logout' : "Sign In",
            icon: user ? <LogoutOutlined /> : <LoginOutlined />,
            onClick: () => handleLog(),
        },
    ];

    const itemsOfUser = [
        {
            key: '1',
            label: 'Overview',
            icon: <DashboardOutlined />,
            onClick: () => navigate(`/dashboard/${user.role}/overview`),
        },
        {
            key: 'myprofile',
            label: 'My Profile',
            icon: <UserOutlined />,
            onClick: () => navigate(`/dashboard/${user.role}/profile`),
        },
        {
            key: '5',
            label: user ? 'Logout' : "Sign In",
            icon: user ? <LogoutOutlined /> : <LoginOutlined />,
            onClick: () => handleLog(),
        },
    ];

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#37B45A',
                },
            }}
        >
            <Layout className={!isMobile ? "dash-layout" : ''}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onCollapse={(collapsed) => {
                        setIsMobile(collapsed);
                    }}
                    className={!isMobile ? 'dash-sidebar' : ""}
                >
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedKey]} items={user?.role === "admin" ? itemsOfAdmin : itemsOfUser} />
                </Sider>
                <Layout>
                    <Header className={!isMobile ? "dash-content" : ""} style={{ paddingLeft: 30, background: colorBgContainer }}>
                        <div style={{display: "flex", alignItems: "center", justifyContent:"space-between"}}>
                            <Logo to={`/`} />
                            {
                                user?.role === USER_ROLE.user &&
                                <Button type="primary" danger>
                                    <ImmediatedSlot />
                                </Button>
                            }
                        </div>
                    </Header>
                    <Content className={!isMobile ? "dash-content" : ""} style={{ margin: '24px 16px 0', minHeight: "90vh" }}>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                    <ScrollToTopButton />
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default DashboardLayout;