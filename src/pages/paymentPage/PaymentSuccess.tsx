import { Button, Result } from 'antd';
import "./payment.css"

const PaymentSuccess = () => {

    return (
        <div className='payment-result'>
            <Result
                status="success"
                title="Successfully Purchased!"
                subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                extra={[
                    <Button href='/' type="primary" key="console">
                        Go Home
                    </Button>,
                    <Button href='/services' key="buy">Buy Again</Button>,
                ]}
            />
        </div>
    );
};


export default PaymentSuccess;