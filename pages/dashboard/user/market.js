import React, { useEffect, useState, Fragment } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import UserLayout from '../../../components/user/Layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserMarket = () => {
  const [token] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSell = async () => {
      try {
        const response = await fetch('/sell/user/package', {
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
      } catch (err) {
        console.log(err);
      }
    };
    fetchSell();
  }, []);

  const pay = async (id) => {
    try {
      const response = await fetch(`/sell/pay/${id}`, {
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
      if (window !== undefined) window.location.replace(`${res.msg}`);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePackage = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/sell/delete/${id}`, {
        method: 'DELETE',
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
      setIsLoading(false);
      toast.success(res.msg);
    } catch (err) {
      setIsLoading(false);
      toast.error(err);
    }
  };
  return (
    <UserLayout>
      <Container>
        <Fragment>
          <Row>
            {data?.map((product) => (
              <Col sm={12} md={12} lg={6} key={product.id}>
                <Card className="product-card">
                  <Carousel>
                    {typeof product?.files == 'string'
                      ? JSON.parse(product?.files).map((image, index) => (
                          <Carousel.Item key={index}>
                            <img
                              className="d-block w-100"
                              src={`data:image/png;base64,${image}`}
                              alt={`Product ${product.title}`}
                              style={{ height: 'auto' }}
                            />
                          </Carousel.Item>
                        ))
                      : null}
                  </Carousel>
                  <Card.Body>
                    <Card.Title>{product?.title}</Card.Title>
                    <Card.Text>
                      &#x20A6;
                      {product?.price}
                    </Card.Text>
                    <Card.Text>{product?.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Card.Text>
                      Created on:{' '}
                      {new Date(product?.created_at).toLocaleDateString()}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      {product.paid ? (
                        <Button disabled variant="primary">
                          PAID
                        </Button>
                      ) : (
                        <Button variant="info" onClick={() => pay(product?.id)}>
                          PAY NOW
                        </Button>
                      )}
                      {isLoading ? (
                        <Button
                          variant="error"
                          onClick={() => deletePackage(product?.id)}
                        >
                          ...
                        </Button>
                      ) : (
                        <Button
                          variant="error"
                          onClick={() => deletePackage(product?.id)}
                        >
                          DELETE
                        </Button>
                      )}
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Fragment>
      </Container>
    </UserLayout>
  );
};

export default UserMarket;
