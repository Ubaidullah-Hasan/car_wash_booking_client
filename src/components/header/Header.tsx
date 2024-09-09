import { Button, Menu, Radio, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import './header.css';
import { useEffect, useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { currentUser, logout } from "../../Redux/features/auth/authSlice";
import ProfileMenu from "./ProfileMenu";
import Logo from "../Logo";
import useScreenWidth from "../../Hooks/useScreenWidth";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

const MainHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAppSelector(currentUser);
    const dispatch = useAppDispatch();
    const screenWidth = useScreenWidth();
    console.log(screenWidth)
    const [isToggle, setisToggle] = useState(false);


    const getDefaultKey = () => {
        const routes = [
            { path: '/services', key: '2' },
            { path: '/booking', key: '3' },
            { path: '/reviews', key: '4' },
        ];

        const matchingRoute = routes.find(route => location.pathname.startsWith(route.path));
        return matchingRoute ? matchingRoute.key : '1';
    };


    const [selectedKey, setSelectedKey] = useState(getDefaultKey());

    useEffect(() => {
        setSelectedKey(getDefaultKey());
    }, [location.pathname]);


    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };
    const [position, setPosition] = useState<'start' | 'end'>('end');

    const handleAuth = (link: string) => {
        navigate(link);
    }


    // menu items
    const items = [
        {
            key: "1",
            label: <NavLink to={"/"}>Home</NavLink>
        },
        {
            key: "2",
            label: <NavLink to={"/services"}>Services</NavLink>
        },
        {
            key: "3",
            label: <NavLink to={"/booking"}>Booking</NavLink>
        },
        {
            key: "4",
            label: <NavLink to={"/reviews"}>Reviews</NavLink>
        }
    ]


    return (
        <Header
            className="custom-header"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: 'white' }}>
            <Logo to={"/"} />
            {
                screenWidth >= 1024 ?
                    <>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={[selectedKey]}
                            onClick={handleMenuClick}
                            items={items}
                            style={{ flex: 1, minWidth: 0, justifyContent: "end" }}
                            className="custom-menu "
                        />
                        {/* right side */}
                        <div>
                            <Space size={20}>
                                {
                                    !user ? <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)} className="custom-radio-group">
                                        <Radio.Button value="start" onClick={() => handleAuth("/signin")} >Sign In</Radio.Button>
                                        <Radio.Button value="end" onClick={() => handleAuth("/signup")}>Sign Up</Radio.Button>
                                    </Radio.Group>
                                        :
                                        <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)} className="custom-radio-group">
                                            <Radio.Button value="end" onClick={() => dispatch(logout())} >Log Out</Radio.Button>
                                        </Radio.Group>
                                }

                                <Button onClick={() => navigate("/services")} className="custom-btn" type="primary" iconPosition="end" icon={<CaretRightOutlined />}>
                                    Get Started
                                </Button>
                            </Space>
                        </div>

                        {/* dashboard menu */}
                        < ProfileMenu />
                    </>
                    :
                    <div
                        className={isToggle ? "responsive-header-bottom" : "responsive-header-top"}
                        style={{ display: "flex", flexDirection: "column", backgroundColor: "rgb(54 180 90)", position: "absolute", top: 60, left: 0, zIndex: 30, width: "100%", padding: "20px" }}
                    >

                        {/* dashboard menu */}
                        < ProfileMenu />

                        <Menu
                            mode="vertical"
                            defaultSelectedKeys={[selectedKey]}
                            onClick={handleMenuClick}
                            items={items}
                            style={{ background: "transparent" }}
                        />

                        {/* right side */}
                        <div>
                            <Space size={20}>
                                {
                                    !user ? <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)} className="custom-radio-group">
                                        <Radio.Button value="start" onClick={() => handleAuth("/signin")} >Sign In</Radio.Button>
                                        <Radio.Button value="end" onClick={() => handleAuth("/signup")}>Sign Up</Radio.Button>
                                    </Radio.Group>
                                        :
                                        <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)} className="custom-radio-group">
                                            <Radio.Button value="end" onClick={() => dispatch(logout())} >Log Out</Radio.Button>
                                        </Radio.Group>
                                }
                            </Space>
                        </div>
                    </div>
            }

            <div style={{ marginTop: "20px" }}>
                {
                    screenWidth >= 1024 ? <></> :
                        (
                            isToggle ? <RxCross2
                                onClick={() => setisToggle(!isToggle)} size={30}
                            /> : <AiOutlineMenu onClick={() => setisToggle(!isToggle)} size={30} />
                        )
                }
            </div>

        </Header>
    );
};

export default MainHeader;
