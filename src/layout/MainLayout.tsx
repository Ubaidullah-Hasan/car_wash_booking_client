import { ConfigProvider, Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/header/Header";
import MainFooter from "../components/footer/MainFooter";


const MainLayout = () => {



    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <ConfigProvider
            theme={{
                token: {
                    // Seed Token
                    colorPrimary: '#37B45A',
                    // borderRadius: 2,

                    // Alias Token
                    // colorBgContainer: '#f6ffed',
                },
            }}
        >
            <Layout>
                <MainHeader />
                <Content>
                    <div
                        style={{
                            background: colorBgContainer,
                            minHeight: "100vh",
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>

                {/* footer */}
                <MainFooter />
            </Layout>
        </ConfigProvider>
    );
};

export default MainLayout;