import React, { useState, Fragment, useEffect } from 'react';
import Link from 'next/link';
import jwtDecode from 'jwt-decode';
import { getInitials } from '../../utils/stringManipulation';
import logout from '../../utils/logout';
import { useRouter } from 'next/router';

export default function MainHeader() {
  const [token] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
  });
  const [user, setUser] = useState({});
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [avatarMenu, setAvatarMenu] = useState(false);
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
    //  <!--Header-->
    <Fragment>
      {/* mobile nav */}
      <aside
        style={{
          position: 'absolute',
          top: '0px',
          zIndex: '100',
          background: 'white',
          padding: '20px 40px 10px 20px',
          width: '100%',
          display: openMobileNav == true ? 'block' : 'none',
        }}
      >
        <ul id="" className="site-nav medium center hidearrow">
          <img
            onClick={() => setOpenMobileNav(false)}
            src="https://img.icons8.com/ios-glyphs/30/null/delete-sign.png"
            style={{ position: 'absolute', right: '20px', cursor: 'pointer' }}
          />
          <li
            className="lvl1 parent megamenu"
            style={{
              cursor: 'pointer',
              padding: '10px',
              margin: '0px 10px',
              listStyle: 'none',
            }}
          >
            <Link href="/market">
              <p> Home</p>
            </Link>
          </li>
          <li
            className="lvl1 parent megamenu"
            style={{
              cursor: 'pointer',
              padding: '10px',
              margin: '0px 10px',
              listStyle: 'none',
            }}
          >
            <Link href="/market/shop">
              <p>Shop</p>
            </Link>
          </li>

          <li
            className="lvl1 parent dropdown"
            style={{
              cursor: 'pointer',
              padding: '10px',
              margin: '0px 10px',
              listStyle: 'none',
            }}
          >
            <Link href="/market/contact-us">
              <p> Contact Us</p>
            </Link>
          </li>

          <li
            className="lvl1"
            style={{
              cursor: 'pointer',
              padding: '10px',
              margin: '0px 10px',
              listStyle: 'none',
            }}
          >
            <Link href="/market/send">
              <p>
                <b className="">Sell</b>{' '}
              </p>
            </Link>
          </li>
        </ul>
      </aside>
      <div className="header-wrap classicHeader animated d-flex">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* <!--Desktop Logo--> */}
            <div className="logo col-md-2 col-lg-2 d-none d-lg-block">
              <Link href="/">
                <img
                  src="/images/kupon logo with text (1).png"
                  alt="Belle Multipurpose Html Template"
                  width={100}
                  // title="Belle Multipurpose Html Template"
                />
              </Link>
            </div>
            {/* <!--End Desktop Logo--> */}
            <div className="col-2 col-sm-3 col-md-3 col-lg-8">
              <div className="d-block d-lg-none">
                <button
                  type="button"
                  className="btn--link site-header__menu js-mobile-nav-toggle mobile-nav--open"
                >
                  <i className="icon anm anm-times-l"></i>
                  <img
                    src="https://img.icons8.com/ios/50/1A1A1A/menu--v1.png"
                    width={20}
                    onClick={() => setOpenMobileNav(true)}
                  />
                </button>
              </div>
              {/* <!--Desktop Menu--> */}
              <nav className="grid__item" id="AccessibleNav">
                {/* <!-- for mobile --> */}
                <ul id="siteNav" className="site-nav medium center hidearrow">
                  <li
                    className="lvl1 parent megamenu"
                    style={{ cursor: 'pointer' }}
                  >
                    <Link href="/market">
                      <p>
                        {' '}
                        Home <i className="anm anm-angle-down-l mx-3"></i>
                      </p>
                    </Link>
                  </li>
                  <li
                    className="lvl1 parent megamenu"
                    style={{ cursor: 'pointer' }}
                  >
                    <Link href="/market/shop">
                      <p>
                        Shop <i className="anm anm-angle-down-l mx-3"></i>
                      </p>
                    </Link>
                  </li>

                  <li
                    className="lvl1 parent dropdown"
                    style={{ cursor: 'pointer' }}
                  >
                    <Link href="/market/contact-us">
                      <p>
                        {' '}
                        Contact Us<i className="anm anm-angle-down-l mx-3"></i>
                      </p>
                    </Link>
                  </li>

                  <li className="lvl1" style={{ cursor: 'pointer' }}>
                    <Link href="/market/sell">
                      <p>
                        <b className="">Sell</b>{' '}
                      </p>
                    </Link>
                  </li>
                </ul>
              </nav>
              {/* <!--End Desktop Menu--> */}
            </div>
            {/* <!--Mobile Logo--> */}
            <div className="col-6 col-sm-6 col-md-6 col-lg-2 d-block d-lg-none mobile-logo ">
              <div className="logo">
                <Link href="/">
                  <img
                    src="/images/kupon text for white bg.png"
                    alt="Belle Multipurpose Html Template"
                    title="Belle Multipurpose Html Template"
                    width={70}
                  />
                </Link>
              </div>
            </div>
            {/* <!--Mobile Logo--> */}
            <div className="col-4 col-sm-3 col-md-3 col-lg-2 justify-content-end">
              <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                  <ul
                    className="navbar-nav"
                    style={{ position: 'absolute', right: '0px' }}
                  >
                    {/* <!-- Avatar Menu --> */}
                    {!Object.keys(user).length ? (
                      <li>
                        <Link href="/login">
                          <small
                            style={{
                              fontSize: '15px',
                              cursor: 'pointer',
                            }}
                          >
                            {' '}
                            sign in{' '}
                          </small>
                        </Link>
                        <Link href="register">
                          <small
                            style={{
                              backgroundColor: '#e64c00',
                              color: 'white',
                              padding: '2px',
                              fontSize: '15px',
                              cursor: 'pointer',
                            }}
                          >
                            {' '}
                            sign up{' '}
                          </small>
                        </Link>
                      </li>
                    ) : (
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle d-flex align-items-center"
                          href="#"
                          id="navbarDropdownMenuLink"
                          role="button"
                          data-mdb-toggle="dropdown"
                          aria-expanded="false"
                          onClick={() => setAvatarMenu(!avatarMenu)}
                        >
                          <p
                            style={{
                              color: 'white',
                              backgroundColor: 'black',
                              borderRadius: '50%',
                              padding: '3px',
                            }}
                          >
                            {getInitials(user?.firstName, user?.lastName)}
                          </p>
                        </a>
                        {avatarMenu ? (
                          <ul
                            className="bg-light position-absolute"
                            aria-labelledby="navbarDropdownMenuLink"
                            style={{ left: '-50px' }}
                          >
                            <li
                              className="dropdown-item"
                              style={{ cursor: 'pointer' }}
                            >
                              <Link href={`/dashboard/user/market`}>
                                <span>
                                  <img
                                    src="https://img.icons8.com/ios-filled/50/null/user.png"
                                    width={15}
                                  />{' '}
                                  profile
                                </span>
                              </Link>
                            </li>

                            <li
                              className="dropdown-item"
                              style={{ cursor: 'pointer' }}
                              onClick={() => userlogout()}
                            >
                              <span>
                                <img
                                  src="https://img.icons8.com/ios-filled/50/null/logout-rounded.png"
                                  width={15}
                                />{' '}
                                logout
                              </span>
                            </li>
                          </ul>
                        ) : null}
                      </li>
                    )}
                  </ul>
                </div>
              </nav>
              {/* <div className="rounded bg-black">
                <img src="https://img.icons8.com/office/16/null/guest-male--v1.png" />
              </div> */}
              {/* <div className="site-cart">
                <Link href="#;" className="site-header__cart" title="Cart">
                  <p>
                    {' '}
                    <img src="https://img.icons8.com/material-outlined/24/null/shopping-cart--v1.png" />
                    <span
                      id="CartCount"
                      className="site-header__cart-count"
                      data-cart-render="item_count"
                    >
                      2
                    </span>
                  </p>
                </Link>
                <!--Minicart Popup-->
                <div id="header-cart" className="block block-cart">
                  <ul className="mini-products-list">
                    <li className="item">
                      <Link className="product-image" href="#">
                        <img
                          src="assets/images/product-images/cape-dress-1.jpg"
                          alt="3/4 Sleeve Kimono Dress"
                          title=""
                        />
                      </Link>
                      <div className="product-details">
                        <Link href="#" className="remove">
                          <i className="anm anm-times-l" aria-hidden="true"></i>
                        </Link>
                        <Link href="#" className="edit-i remove">
                          <i className="anm anm-edit" aria-hidden="true"></i>
                        </Link>
                        <Link className="pName" href="cart.html">
                          Sleeve Kimono Dress
                        </Link>
                        <div className="variant-cart">Black / XL</div>
                        <div className="wrapQtyBtn">
                          <div className="qtyField">
                            <span className="label">Qty:</span>
                            <Link
                              className="qtyBtn minus"
                              href="javascript:void(0);"
                            >
                              <i
                                className="fa anm anm-minus-r"
                                aria-hidden="true"
                              ></i>
                            </Link>
                            <input
                              type="text"
                              id="Quantity"
                              name="quantity"
                              value="1"
                              className="product-form__input qty"
                            />
                            <Link
                              className="qtyBtn plus"
                              href="javascript:void(0);"
                            >
                              <i
                                className="fa anm anm-plus-r"
                                aria-hidden="true"
                              ></i>
                            </Link>
                          </div>
                        </div>
                        <div className="priceRow">
                          <div className="product-price">
                            <span className="money">$59.00</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="item">
                      <Link className="product-image" href="#">
                        <img
                          src="assets/images/product-images/cape-dress-2.jpg"
                          alt="Elastic Waist Dress - Black / Small"
                          title=""
                        />
                      </Link>
                      <div className="product-details">
                        <Link href="#" className="remove">
                          <i className="anm anm-times-l" aria-hidden="true"></i>
                        </Link>
                        <Link href="#" className="edit-i remove">
                          <i className="anm anm-edit" aria-hidden="true"></i>
                        </Link>
                        <Link className="pName" href="cart.html">
                          Elastic Waist Dress
                        </Link>
                        <div className="variant-cart">Gray / XXL</div>
                        <div className="wrapQtyBtn">
                          <div className="qtyField">
                            <span className="label">Qty:</span>
                            <Link
                              className="qtyBtn minus"
                              href="javascript:void(0);"
                            >
                              <i
                                className="fa anm anm-minus-r"
                                aria-hidden="true"
                              ></i>
                            </Link>
                            <input
                              type="text"
                              id="Quantity"
                              name="quantity"
                              value="1"
                              className="product-form__input qty"
                            />
                            <Link
                              className="qtyBtn plus"
                              href="javascript:void(0);"
                            >
                              <i
                                className="fa anm anm-plus-r"
                                aria-hidden="true"
                              ></i>
                            </Link>
                          </div>
                        </div>
                        <div className="priceRow">
                          <div className="product-price">
                            <span className="money">$99.00</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="total">
                    <div className="total-in">
                      <span className="label">Cart Subtotal:</span>
                      <span className="product-price">
                        <span className="money">$748.00</span>
                      </span>
                    </div>
                    <div className="buttonSet text-center">
                      <Link
                        href="cart.html"
                        className="btn btn-secondary btn--small"
                      >
                        View Cart
                      </Link>
                      <Link
                        href="checkout.html"
                        className="btn btn-secondary btn--small"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
                <!--EndMinicart Popup-->
              </div> */}
              {/* <div className="site-header__search">
                <button type="button" className="search-trigger">
                  <i className="icon "></i>

                  <img
                    src="https://img.icons8.com/ios/50/737373/search--v1.png"
                    className="anm anm-search-l"
                    width={25}
                  />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
