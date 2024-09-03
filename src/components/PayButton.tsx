import { Button } from "antd";

const PayButton = ({ slotData, loading }) => {
    

    return (
        <Button
            disabled={!slotData}
            type="primary"
            block
            loading={loading}
            htmlType='submit'
        >
            Pay Now
        </Button>
    );
};

export default PayButton;
