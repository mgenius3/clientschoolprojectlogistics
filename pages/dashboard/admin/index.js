import React, { useRef } from 'react';
import Link from 'next/link';
// import './account.css';

// import useAuth from '../../../hooks/useAuth';
import PageAuthentication from '../../../hooks/useAuth';

function Account() {
  const asideRef = useRef();
  // const user = useAuth();

  return (
    <PageAuthentication>
      <main id="account">
        <aside ref={asideRef}>
          <div className="profile">
            <img
              src="https://img.icons8.com/material-outlined/24/FD7E14/user-female-circle.png"
              alt="kupon"
            />

            <span className="profile_ne">
              <b style={{ fontSize: '8px' }}>
                {/* {userDetails ? userDetails.userFirstname : null} */}
              </b>
              <br />
              <b style={{ fontSize: '8px' }}>
                {/* {userDetails ? userDetails.useremail : null} */}
              </b>
            </span>
            {/* <img src="https://img.icons8.com/ios/50/FD7E14/cancel.png" /> */}
            <img
              id="cancel"
              src="https://img.icons8.com/ios/50/FD7E14/cancel.png"
              onClick={() => asideRef.current.classList.remove('menu')}
            />
          </div>

          <div className="side_links">
            <span>
              <img
                src="https://img.icons8.com/ios-glyphs/30/FD7E14/home-page--v1.png"
                className="icon"
              />
              <Link href="/">
                <b>Home</b>
              </Link>
            </span>
            <span>
              <img
                src="https://img.icons8.com/material-outlined/24/FD7E14/dashboard-layout.png"
                className="icon"
              />
              <b>Dashboard</b>
            </span>
            <span>
              <img
                src="https://img.icons8.com/ios/50/FD7E14/administrator-male--v1.png"
                className="icon"
              />
              <b>Profile</b>
            </span>

            <span>
              <img
                src="https://img.icons8.com/ios/50/FD7E14/push-notifications.png"
                className="icon"
              />
              <b>Notification</b>
            </span>

            <span style={{ cursor: 'pointer' }}>
              <img
                src="https://img.icons8.com/ios/50/FD7E14/logout-rounded--v1.png"
                className="icon"
              />
              <b>Logout</b>
            </span>
            {/* <span>
              <img src={collapse} className="icon" alt="lynue home" />
              <b>Collapse</b>
            </span> */}
          </div>
        </aside>

        <section className="main_container">
          <header>
            <div>
              <img
                id="menu"
                src="https://img.icons8.com/ios-filled/50/000000/menu--v1.png"
                onClick={() => asideRef.current.classList.add('menu')}
              />
              {/* <div className="alert alert-primary" role="alert">
                <h3 className="h1 text-center"> Admin</h3>
              </div> */}
              <h3>Settings</h3>
              <p style={{ opacity: '0.7' }}>
                Manage your personal and organization settings
              </p>
            </div>
            <nav>
              <ul style={{ listStyle: 'none', margin: '10px' }}>
                <li style={{ margin: '10px' }}>
                  <Link href="profile">Profile</Link>
                </li>
                <li style={{ margin: '10px' }}>
                  <Link href="password">Password</Link>
                </li>
              </ul>
            </nav>
          </header>

          <article>{/* <Outlet /> */}</article>
        </section>
      </main>
    </PageAuthentication>
  );
}
export default Account;
