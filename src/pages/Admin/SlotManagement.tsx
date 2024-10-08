import { Button, message, Table } from "antd";
import Column from "antd/es/table/Column";
import { useCreateSlotsMutation, useGetAllSlotsQuery, useUpdateSlotStatusMutation } from "../../Redux/features/slotManagement/slotManagement";
import SlotForm from "./SlotForm";
import { useGetAllServicesQuery } from "../../Redux/features/serviceManagement/serviceManagement.api";
import { useState } from "react";
import { slotStatus } from "../../constant/constant";
import './style.css'
import { RxUpdate } from "react-icons/rx";
import moment from "moment";

const SlotManagement = () => {
    const [err, setErr] = useState('');
    const { data: slots } = useGetAllSlotsQuery(undefined);
    const { data: servicesResponse } = useGetAllServicesQuery(undefined);
    const [createSlot, { isLoading: creatingSlot }] = useCreateSlotsMutation();
    const [updateSlotStatus] = useUpdateSlotStatusMutation();

    const servicesOptions = servicesResponse?.data.map(service => ({
        label: service.name,
        value: service._id,
    }))

    const onSubmit = async (values) => {
        try {
            const res = await createSlot(values).unwrap(); 
            if (res.success) {
                message.success('Slot created successfully!');
                setErr('');
            }
        } catch (err) {
            setErr(err?.data?.message || "Something went wrong");
            message.error(err?.data?.message || "Something went wrong");
        }
    };


    const handleStatusChange = (slotId, status) => {
        updateSlotStatus({ status: { isBooked: status }, slotId });
    };


    const slotsData = slots?.data.map(slot => ({
        key: slot._id,
        time: `${slot.startTime} - ${slot.endTime}`,
        status: slot.isBooked,
        serviceName: slot.service.name,
        date: slot.date
    }))

    return (
        <div>
            <div>
                <SlotForm error={err} onSubmit={onSubmit} options={servicesOptions} loading={creatingSlot} />
            </div>

            <Table dataSource={slotsData} pagination={{ pageSize: 5 }} scroll={{ x: 'max-content' }}>
                <Column
                    title="Service"
                    dataIndex="serviceName"
                    key="serviceName"

                />
                <Column
                    title="Date"
                    dataIndex="date"
                    key="date"
                    render={(item) => <p>{moment(item).format("DD-MM-YYYY")}</p>}
                    width={"15%"}
                />
                <Column
                    title="Time"
                    dataIndex="time"
                    key="time"
                    render={(item) => <Button block size="small">{item}</Button>}
                    width={"15%"}
                />
                <Column
                    title="Status"
                    dataIndex="status" key="status" width={"15%"}
                    render={(item) => {
                        return (
                            < Button
                                className={item === slotStatus.available ? "status-btn-available" : "status-btn-cancel"}
                                block
                                size="small"
                                disabled={item === slotStatus.booked}
                            > {item}</Button>
                        )
                    }}
                />
                <Column
                    width={20}
                    title="Actions"
                    key="actions"
                    render={(_, record) => {
                        return (
                            <>
                                {
                                    record.status === slotStatus.booked ?
                                        <Button block disabled>
                                            {record.status}
                                        </Button>
                                        :
                                        <Button
                                            type="primary"
                                            block
                                            onClick={() => handleStatusChange(record.key, record.status === slotStatus.available ? slotStatus.canceled : slotStatus.available)}
                                            disabled={record.status === 'BOOKED'}
                                            iconPosition="end"
                                            icon={<RxUpdate />}
                                        >
                                            {(record.status === slotStatus.available) ? "Cancel" : 'Make Available'}
                                        </Button>

                                }
                            </>
                        )
                    }}
                />
            </Table>
        </div >
    );
};

export default SlotManagement;
