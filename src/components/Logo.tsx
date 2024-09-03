import { useNavigate } from 'react-router-dom';

const Logo = ({to}) => {
    const navigate = useNavigate();

    const handleLogo = () => {
        navigate(to);
    }

    return (
        <div className="logo" >
            <span onClick={handleLogo} className="logo-container ">
                <span className="clv">C</span>
                <span className="clv">L</span>
                <span className="dr">D</span>
                <span className="dr">R</span>
                <span className="dr">I</span>
                <span className="clv">V</span>
                <span className="clv">E</span>
            </span>
        </div>
    );
};

export default Logo;