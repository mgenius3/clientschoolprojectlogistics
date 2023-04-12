import React, { useState, useEffect } from 'react';
import { shortenString } from '../../../../utils/stringManipulation';
import UserLayout from '../../../../components/admin/Layout';
import { Modal, Button } from 'react-bootstrap';
import ConfirmationInput from '../../../../components/Confirmation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLogistics = () => {
  const [token] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
  });

  const [data, setData] = useState([]);
  // const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();

  //to display confirmation input
  const [confirmation, setConfirmation] = useState(false);
  //update status
  const [isLoadingUpdateStatus, setIsLoadingUpdateStatus] = useState(false);

  useEffect(() => {
    const fetchLogistics = async () => {
      try {
        console.log(data);
        const response = await fetch('/admin/logistics', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const res = await response.json();
          throw new Error(res.msg);
        }
        const res = await response.json();
        setData(res.msg);
        console.log(res.msg);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLogistics();
  }, []);

  const handleModalOpen = (item) => {
    setShowModal(true);
    setModalData(item);
  };
  const handleModalClose = () => setShowModal(false);

  const updateStatus = async () => {
    setIsLoadingUpdateStatus(true);
    try {
      const response = await fetch('/admin/logistics/update_status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: modalData?.id,
          status: modalData?.status == 'pending' ? 'in transit' : 'delivered',
        }),
      });

      if (!response.ok) {
        setIsLoadingUpdateStatus(false);
        const res = await response.json();
        throw new Error(res?.msg);
      }
      const res = await response.json();
      toast.success(res?.msg);
      setIsLoadingUpdateStatus(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserLayout>
      <div className="table-responsive">
        <h1>
          LOGISTICS ORDER : <b>{data.length}</b>
        </h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Shipment ID</th>
              <th scope="col">Address(Sender)</th>
              <th scope="col">Address(receiver)</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr
                key={item?.id}
                onClick={() => handleModalOpen(item)}
                style={{ cursor: 'pointer' }}
              >
                <td>{item?.id}</td>
                <td>{shortenString(item?.pickupAddress, 20)}</td>
                <td>{shortenString(item?.deliveryAddress, 20)}</td>
                <td
                  style={{
                    color:
                      item?.status == 'pending'
                        ? 'red'
                        : item?.status == 'in transit'
                        ? '#f1c40f'
                        : 'green',
                  }}
                >
                  {item?.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ overflow: 'auto' }}>
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Logistics Details</Modal.Title>
            <br />
            {isLoadingUpdateStatus ? (
              <button
                style={{
                  backgroundColor:
                    modalData?.status == 'pending'
                      ? 'red'
                      : modalData?.status == 'in transit'
                      ? '#f1c40f'
                      : 'green',
                  color: 'white',
                  padding: '2px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => setConfirmation(true)}
                disabled={modalData?.status == 'delivered' ? true : false}
              >
                ...
              </button>
            ) : (
              <button
                style={{
                  backgroundColor:
                    modalData?.status == 'pending'
                      ? 'red'
                      : modalData?.status == 'in transit'
                      ? '#f1c40f'
                      : 'green',
                  color: 'white',
                  padding: '2px 3px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => setConfirmation(true)}
                disabled={modalData?.status == 'delivered' ? true : false}
              >
                {modalData?.status}
              </button>
            )}
          </Modal.Header>
          <Modal.Body>
            <table className="table">
              <thead>Sender Details</thead>
              <tbody>
                <tr>
                  <th>Shipment ID</th>
                  <td>{modalData?.id}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>
                    {modalData?.firstName} {modalData?.lastName}
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{modalData?.email}</td>
                </tr>
                <tr>
                  <th>Telephone</th>
                  <td>{modalData?.telephone}</td>
                </tr>
                <tr>
                  <th>Pick up address</th>
                  <td>{modalData?.pickupAddress}</td>
                </tr>
                <tr>
                  <th>Pick up city</th>
                  <td>{modalData?.pickupCity}</td>
                </tr>
                <tr>
                  <th>Pick up state</th>
                  <td>{modalData?.pickupState}</td>
                </tr>
              </tbody>
              <hr />
              <thead>Receiver Details</thead>
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>
                    {modalData?.firstName} {modalData?.lastName}
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{modalData?.email}</td>
                </tr>
                <tr>
                  <th>Delivery address</th>
                  <td>{modalData?.deliveryAddress}</td>
                </tr>
                <tr>
                  <th>Delivery city</th>
                  <td>{modalData?.deliveryCity}</td>
                </tr>
                <tr>
                  <th>Delivery state</th>
                  <td>{modalData?.deliveryState}</td>
                </tr>
              </tbody>
              <tfoot>
                <th>Package Code</th>
                <td>{modalData?.receiverCode}</td>
              </tfoot>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {confirmation ? (
          <Modal show={true}>
            <ConfirmationInput
              setConfirmation={setConfirmation}
              updateStatus={updateStatus}
            />
          </Modal>
        ) : null}
      </div>
    </UserLayout>
  );
};

export default UserLogistics;
