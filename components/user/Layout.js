import React, { useRef, useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getInitials, shortenString } from '../../utils/stringManipulation';
import jwtDecode from 'jwt-decode';
import logout from '../../utils/logout';
import PageAuthentication from '../../hooks/useAuth';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserLayout({ children }) {
  const [token] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
  });
  const [user, setUser] = useState();
  const asideRef = useRef();
  const router = useRouter();

  useEffect(() => {
    try {
      let decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  const userlogout = () => {
    let out = logout();
    if (out) router.push('/login');
  };
  return (
    <Fragment>
      <Head>
        <title>User - Kupon </title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="description" content="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/images/kupon icon.png" />
      </Head>
      <ToastContainer position="bottom-center" />
      <PageAuthentication>
        <main id="account">
          <aside ref={asideRef}>
            <div className="profile">
              <span>
                <span
                  style={{
                    color: 'white',
                    backgroundColor: 'black',
                    borderRadius: '50%',
                    padding: '3px',
                  }}
                >
                  {getInitials(user?.firstName, user?.lastName)}
                </span>
                <p>
                  {shortenString(user?.firstName + ' ' + user?.lastName, 15)}
                </p>
              </span>

              <img
                id="cancel"
                src="https://img.icons8.com/ios/50/FD7E14/cancel.png"
                onClick={() => asideRef.current.classList.remove('menu')}
              />
            </div>

            <div className="side_links">
              <Link href="/">
                <span style={{ cursor: 'pointer' }}>
                  <img
                    src="https://img.icons8.com/ios-glyphs/30/FD7E14/home-page--v1.png"
                    className="icon"
                  />
                  <b>Home</b>
                </span>
              </Link>

              <Link href="profile">
                <span style={{ cursor: 'pointer' }}>
                  <img
                    src="https://img.icons8.com/material-outlined/24/FD7E14/user.png"
                    className="icon"
                  />
                  <b>Profile</b>
                </span>
              </Link>

              <Link href="logistics">
                <span style={{ cursor: 'pointer' }}>
                  <img
                    src="https://img.icons8.com/material-outlined/24/FD7E14/dashboard-layout.png"
                    className="icon"
                  />
                  <b>Logistics</b>
                </span>
              </Link>

              <span style={{ cursor: 'pointer' }} onClick={() => userlogout()}>
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

          {/* <section className="main_container">
            <header>
              <div>
                <img
                  id="menu"
                  src="https://img.icons8.com/ios-filled/50/000000/menu--v1.png"
                  onClick={() => asideRef.current.classList.add('menu')}
                />
                <div className="alert alert-primary" role="alert">
                  <h3 className="h1 text-center"> Admin</h3>
                </div>
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

            <article>{children}</article>
          </section> */}
          <section className="main_container">
            <header>
              <div>
                <img
                  id="menu"
                  src="https://img.icons8.com/ios-filled/50/000000/menu--v1.png"
                  onClick={() => asideRef.current.classList.add('menu')}
                />

                <h3>User Settings</h3>
                <p style={{ opacity: '0.7' }}>
                  Manage your Admin and Organization settings
                </p>
              </div>
              {/* <nav>
                <ul style={{ listStyle: 'none', margin: '10px' }}>
                  <li style={{ margin: '10px' }}>
                    <Link href="profile">Profile</Link>
                  </li>
                  <li style={{ margin: '10px' }}>
                    <Link href="password">Password</Link> 
                  </li>
                </ul>
              </nav> */}
            </header>

            <article>{children}</article>
          </section>
        </main>
      </PageAuthentication>
    </Fragment>
  );
}

export default UserLayout;
