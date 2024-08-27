import {  Menu, Radio } from "antd";
import { Header } from "antd/es/layout/layout";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import './header.css';
import { useEffect, useState } from "react";

const MainHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const getDefaultKey = () => {
        const routes = [
            { path: '/services', key: '2' },
            { path: '/booking', key: '3' },
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
        }
    ]

    const handleLogo = () => {
        navigate("/");
    }




    return (
        <Header
            className="custom-header"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: 'white' }}>
            <div className="logo" onClick={handleLogo}>
                <span className="logo-container">
                    <span className="clv">C</span>
                    <span className="clv">L</span>
                    <span className="dr">D</span>
                    <span className="dr">R</span>
                    <span className="dr">I</span>
                    <span className="clv">V</span>
                    <span className="clv">E</span>
                </span>
            </div>

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
                <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)} className="custom-radio-group">
                    <Radio.Button value="start" onClick={() => handleAuth("/signin")} >Sign In</Radio.Button>
                    <Radio.Button value="end" onClick={() => handleAuth("/signup")}>Sign Up</Radio.Button>
                </Radio.Group>
            </div>
        </Header>
    );
};

export default MainHeader;