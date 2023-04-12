import React, { useState, useEffect } from 'react';
import { shortenString } from '../../../utils/stringManipulation';
import UserLayout from '../../../components/user/Layout';
const UserLogistics = () => {
  const [token] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
  });
  const [data, setData] = useState([]);

  //   const data = [
  //     {
  //       id: 1,
  //       shipmentId: 'S0001',
  //       sender: 'John Doe',
  //       receiver: 'Jane Smith',
  //       status: 'In transit',
  //     },
  //     {
  //       id: 2,
  //       shipmentId: 'S0002',
  //       sender: 'Bob Johnson',
  //       receiver: 'Alice Lee',
  //       status: 'Delivered',
  //     },
  //     {
  //       id: 3,
  //       shipmentId: 'S0003',
  //       sender: 'Mary Brown',
  //       receiver: 'Tom Wilson',
  //       status: 'Pending',
  //     },
  //   ];

  useEffect(() => {
    const fetchLogistics = async () => {
      try {
        console.log(data);
        const response = await fetch('/logistic/user', {
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
        console.log(res);
        setData(res.msg);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLogistics();
  }, []);
  return (
    <UserLayout>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Shipment ID</th>
              <th scope="col">Address(Sender)</th>
              <th scope="col">Address(receiver)</th>
              <th scope="col">Status</th>
              <th scope="col">Code</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item?.id}>
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
                <td>{item?.receiverCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </UserLayout>
  );
};

export default UserLogistics;
