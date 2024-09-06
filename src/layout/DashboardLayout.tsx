import { ConfigProvider, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { currentUser, logout } from '../Redux/features/auth/authSlice';
import { BookOutlined, ClockCircleOutlined, DashboardOutlined, LoginOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import "./style.css"
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;


const DashboardLayout = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [isMobile, setIsMobile] = useState(false); console.log(isMobile)

    const handleLog = () => {
        if (user) dispatch(logout());
        else navigate("/signIn");
    }

    const items = [
        {
            key: '1',
            label: 'Overview',
            icon: <DashboardOutlined />,
            onClick: () => navigate('/dashboard/admin/overview'),
        },
        {
            key: '2',
            label: 'Bookings',
            icon: <BookOutlined />,
            onClick: () => navigate('/dashboard/admin/bookings'),
        },
        {
            key: '3',
            label: 'Service Management',
            icon: <SettingOutlined />,
            onClick: () => navigate('/dashboard/admin/serviceManagement'),
        },
        {
            key: '4',
            label: 'Slot Management',
            icon: <ClockCircleOutlined />,
            onClick: () => navigate('/dashboard/admin/slotsManagement'),
        },

        {
            key: '5',
            label: 'User Management',
            icon: <UserOutlined />,
            onClick: () => navigate('/dashboard/admin/users'),
        },

        {
            key: '6',
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
                    onBreakpoint={(broken) => {
                        console.log(broken)
                    }}
                    onCollapse={(collapsed) => {
                        setIsMobile(collapsed);
                    }}
                    className={!isMobile ? 'dash-sidebar' : ""}
                >
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
                </Sider>
                <Layout>
                    <Header style={{ paddingLeft: 30, background: colorBgContainer }}>
                        <Logo to={`/dashboard/${user?.role}/overview`} />
                    </Header>
                    <Content className={!isMobile ? "dash-content" : ""} style={{ margin: '24px 16px 0', height: "90vh" }}>
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
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default DashboardLayout;