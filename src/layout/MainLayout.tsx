import { Button, ConfigProvider, Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";
import MainHeader from "../components/header/Header";
import MainFooter from "../components/footer/MainFooter";
import ScrollToTopButton from "../components/scrollButton/ScrollToTopButton";
import ImmediatedSlot from "../components/ImmediatedSlot";
import { useAppSelector } from "../Redux/hooks";
import { currentUser } from "../Redux/features/auth/authSlice";
import { USER_ROLE } from "../constant/constant";


const MainLayout = () => {
    const navigate = useNavigate();
    const user = useAppSelector(currentUser);

    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#37B45A',
                    colorTextDisabled: '#dededede',
                    colorBgContainerDisabled: "#37b45aa0"
                },
            }}
        >
            <Layout>
                <MainHeader />
                <Content>
                    {
                        user?.role === USER_ROLE.user &&
                        <Button onClick={() => navigate("/dashboard/user/overview")} type="primary" danger className="float-btn">
                            <ImmediatedSlot />
                        </Button>
                    }

                    <div
                        style={{
                            background: "#f5f5f5",
                            minHeight: "80vh",
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>

                {/* footer */}
                <MainFooter />
                <ScrollToTopButton />
            </Layout>
        </ConfigProvider>
    );
};

export default MainLayout;