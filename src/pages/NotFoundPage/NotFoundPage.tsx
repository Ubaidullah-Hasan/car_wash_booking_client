import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate('/');  
    };

    const handleLogin = () => {
        navigate('/signIn'); 
    };

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <div>
                    <Button type="primary" onClick={handleBackHome} style={{ marginRight: '10px' }}>
                        Back Home
                    </Button>
                    <Button onClick={handleLogin}>
                        Login
                    </Button>
                </div>
            }
        />
    );
};

export default NotFoundPage;
