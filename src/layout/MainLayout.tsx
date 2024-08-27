import { Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/header/Header";
import MainFooter from "../components/footer/MainFooter";


const MainLayout = () => {



    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <MainHeader />
            <Content style={{ padding: '0 48px', marginTop: "20px", marginBottom: "20px" }}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </div>
            </Content>

            {/* footer */}
            <MainFooter />
        </Layout>
    );
};

export default MainLayout;