import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import { Carousel, Alert, Card } from 'react-bootstrap';
import PageAuthentication from '../../../hooks/useAuth';
import Link from 'next/link';
export default function Cart() {
  const router = useRouter();
  const { query } = router;
  const { product } = query;
  const [data, setData] = useState({});
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [token] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
  });

  useEffect(() => {
    fetch(`/sell/${product}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data?.msg);
      })
      .catch(() => {
        setError(error);
      });
  }, [product]);

  useEffect(() => {
    fetch(`/user/${data?.sellerId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data?.msg);
      })
      .catch(() => {
        // setError(error);
      });
  }, [data]);

  console.log(typeof data?.files);

  return (
    <PageAuthentication>
      <Layout title="Cart - Market">
        {data ? (
          <div id="page-content" style={{ margin: '60px 0px' }}>
            <div className="page section-header text-center">
              <div className="page-title">
                <div className="wrapper">
                  <h1 className="page-width">Your cart</h1>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-8 col-lg-8 main-col">
                  <div className="cart style2">
                    <div style={{ display: 'block', width: 700, padding: 30 }}>
                      <h4>{data?.category}</h4>
                      <Card>
                        <Carousel>
                          {typeof data.files === 'string'
                            ? JSON.parse(data.files)?.map((file, i) => (
                                <Carousel.Item interval={4500} key={i}>
                                  <img
                                    className="d-block"
                                    src={`data:image/png;base64,${file}`}
                                    alt="Image One"
                                    style={{ width: '100%' }}
                                  />
                                  <Carousel.Caption className="bg-secondary o">
                                    <h3>{data?.title} </h3>
                                    <p> {data?.description} </p>
                                  </Carousel.Caption>
                                </Carousel.Item>
                              ))
                            : null}
                        </Carousel>
                        <Card.Body>
                          <Card.Title>{data?.title}</Card.Title>
                          <Card.Text>Material: {data?.material}</Card.Text>
                          <small>Condition : {data?.conditions}</small>
                        </Card.Body>
                        <Card.Footer>
                          <img src="https://img.icons8.com/ios-glyphs/30/null/user-location.png" />
                          {data?.location} {data?.state}
                        </Card.Footer>
                      </Card>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-8 col-lg-4 cart__footer mx-auto">
                  <div className="cart-note">
                    <div className="solid-border">
                      <h1>SELLER</h1>
                      <hr />
                      <h5>
                        <label
                          htmlFor="CartSpecialInstructions"
                          className="cart-note__label small--text-center flex align-items-center"
                        >
                          <img
                            src="https://img.icons8.com/plasticine/100/null/gender-neutral-user--v1.png"
                            width={50}
                          />{' '}
                          {user?.firstName} {user?.lastName}
                        </label>
                      </h5>
                      <Link href="tel:2348134460259">
                        <button className="btn">call : 2348134460259</button>
                      </Link>
                    </div>
                  </div>
                  <div className="solid-border">
                    <div className="row">
                      <span className="col-12 col-sm-6 cart__subtotal-title">
                        <strong>Price</strong>
                      </span>
                      <span className="col-12 col-sm-6 cart__subtotal-title cart__subtotal text-right">
                        <span className="money">&#8358;{data?.price}</span>
                      </span>
                    </div>
                    {/* <div className="cart__shipping">
                      Shipping &amp; taxes calculated at checkout
                    </div> */}
                    <p className="cart_tearm">
                      <label>
                        <input
                          type="checkbox"
                          name="tearm"
                          id="cartTearm"
                          className="checkbox"
                          value="tearm"
                          required=""
                        />
                        I agree with the terms and conditions
                      </label>
                    </p>
                    <input
                      type="submit"
                      name="checkout"
                      id="cartCheckout"
                      className="btn btn--small-wide checkout"
                      value="Checkout"
                      disabled="disabled"
                    />
                    {/* <div className="paymnet-img">
                      <img src="/images/payment-img.jpg" alt="Payment" />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Alert
            key="danger"
            variant="danger"
            style={{ margin: '200px 100px' }}
          >
            loading...
          </Alert>
        )}
      </Layout>
    </PageAuthentication>
  );
}
