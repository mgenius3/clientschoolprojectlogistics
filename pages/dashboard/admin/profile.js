import React, { useState, useEffect } from 'react';
import { getInitials } from '../../../utils/stringManipulation';
import jwtDecode from 'jwt-decode';
import UserLayout from '../../../components/admin/Layout';
const UserProfile = () => {
  const [token] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
  });
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      let decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  return (
    <UserLayout>
      <div className="card card-style1 border-0">
        <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              {/* <img
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt="..."
            /> */}
              <span
                style={{
                  color: 'white',
                  backgroundColor: 'black',
                  borderRadius: '50%',
                  padding: '10px',
                  fontSize: '100px',
                }}
              >
                {getInitials(user?.firstName, user?.lastName)}
              </span>
            </div>
            <div className="col-lg-6 px-xl-10">
              <div className="bg-danger d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                <h3 className="h2 text-white mb-0">
                  {user?.firstName} {user?.lastName}
                </h3>
              </div>
              <br />
              <ul className="list-unstyled mb-1-9">
                <li className="mb-2 mb-xl-3 display-28">
                  <span className="display-26 text-danger me-2 font-weight-600">
                    Address:
                  </span>{' '}
                  {user?.address}
                </li>

                <li className="mb-2 mb-xl-3 display-28">
                  <span className="display-26 text-danger me-2 font-weight-600">
                    Email:
                  </span>{' '}
                  {user?.email}
                </li>

                <li className="display-28">
                  <span className="display-26 text-danger me-2 font-weight-600">
                    Phone:
                  </span>{' '}
                  {user?.telephone}
                </li>
              </ul>
              <ul className="social-icon-style1 list-unstyled mb-0 ps-0">
                <li>
                  <a href="#!">
                    <i className="ti-twitter-alt"></i>
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="ti-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="ti-pinterest"></i>
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="ti-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserProfile;
