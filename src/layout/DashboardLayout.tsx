import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useAppSelector } from '../Redux/hooks';
import { currentUser } from '../Redux/features/auth/authSlice';
import { BookOutlined, ClockCircleOutlined, DashboardOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;


const DashboardLayout = () => {
    const navigate = useNavigate();
    const user = useAppSelector(currentUser);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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
            label: 'User Management',
            icon: <UserOutlined />,
            onClick: () => navigate('/dashboard/admin/users'),
        },
        {
            key: '4',
            label: 'Slot Management',
            icon: <ClockCircleOutlined />,
            onClick: () => navigate('/dashboard/admin/slots'),
        },
        {
            key: '5',
            label: 'Service Management',
            icon: <SettingOutlined />,
            onClick: () => navigate('/dashboard/admin/serviceManagement'),
        },
        {
            key: '6',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: () => navigate('/logout'),
        },
    ];

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                }}
                onCollapse={(collapsed, type) => {
                    // console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout>
                <Header style={{ paddingLeft: 30, background: colorBgContainer }}>
                    <Logo to={`/dashboard/${user?.role}/overview`} />
                </Header>
                <Content style={{ margin: '24px 16px 0', height: "90vh" }}>
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
    );
};

export default DashboardLayout;