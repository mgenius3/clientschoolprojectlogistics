import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import { Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../../../store/store';
import { sellCategory, Condition } from '../../../utils/data';
export default function Shop() {
  const [allData, setAllData] = useState([]);
  const dispatch = useDispatch();
  let { data, isLoading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    setAllData(data);
  }, [data]);

  console.log(allData);
  console.log(data);
  function searchData(name, e) {
    if (name == 'name') {
      if (e == '' || e == 'Other') setAllData(data);
      else {
        setAllData(() =>
          data.filter((product) =>
            product.title.toLowerCase().includes(e.toLowerCase())
          )
        );
      }
    } else if (name == 'condition') {
      console.log(name);
      if (e == '' || e == 'Other') setAllData(data);
      else {
        setAllData(() =>
          data.filter((product) =>
            product.conditions.toLowerCase().includes(e.toLowerCase())
          )
        );
      }
    } else if (name == 'category') {
      console.log(name);
      if (e == '' || e == 'Other') setAllData(data);
      else {
        setAllData(() =>
          data.filter((product) =>
            product.category.toLowerCase().includes(e.toLowerCase())
          )
        );
      }
    }
  }
  return (
    <Layout title="Shop - Market">
      <div id="page-content" style={{ marginTop: '80px' }}>
        <div classNameName="page section-header text-center">
          <div className="page-title">
            <div className="wrapper">
              <h1 className="page-width text-center"> Shop List</h1>
            </div>
            <br />
          </div>
        </div>
      </div>

      <div className="grid-products container">
        <div className="">
          <br />
          <div className="row">
            <div className="col-6">
              <label htmlFor="state">
                Name <span></span>
              </label>
              <input
                type="text"
                className="form-control search_input"
                onChange={(e) => searchData('name', e.target.value)}
              />
            </div>
            <div className="form-group col-6 required">
              <label htmlFor="state">
                Condition <span></span>
              </label>
              <select onChange={(e) => searchData('condition', e.target.value)}>
                <option disabled selected>
                  {' '}
                  --- Please Select ---{' '}
                </option>
                {Condition?.map((a, i) => (
                  <option value={a} key={i}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-6 required">
              <label htmlFor="state">
                Category <span></span>
              </label>
              <select onChange={(e) => searchData('category', e.target.value)}>
                <option disabled selected>
                  {' '}
                  --- Please Select ---{' '}
                </option>
                {sellCategory?.map((a, i) => (
                  <option value={a} key={i}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-6 required">
              <label htmlFor="state">
                Price <span></span>
              </label>
              <select onChange={(e) => searchData('price', e.target.value)}>
                <option disabled selected>
                  {' '}
                  --- Please Select ---{' '}
                </option>
              </select>
            </div>
          </div>

          <br />
        </div>
        <div className="row">
          {isLoading ? (
            <div className="section text-center col-12">
              <Spinner animation="grow" role="status" variant="danger">
                <span className="text-center">Loading...</span>
              </Spinner>
            </div>
          ) : (
            allData?.map((product, i) => (
              <Link href={`/market/shop/${product?.id}`} key={i}>
                <div className="col-6 col-sm-6 col-md-4 col-lg-4 item grid-view-item style2">
                  <div className="grid-view_image">
                    {/*<!-- start product image -->*/}
                    <div className="grid-view-item__link">
                      {/*<!-- image -->*/}
                      <img
                        className="grid-view-item__image primary blur-up lazyload"
                        dataSrc={`data:image/png;base64,${
                          JSON.parse(product?.files)[0]
                        }`}
                        src={`data:image/png;base64,${
                          JSON.parse(product?.files)[0]
                        }`}
                        alt="image"
                        title="product"
                        style={{ height: '250px' }}
                      />
                      {/*<!-- End image -->*/}
                      {/*<!-- Hover image -->*/}
                      <img
                        className="grid-view-item__image hover blur-up lazyload"
                        dataSrc={`data:image/png;base64,${
                          JSON.parse(product.files)[1]
                            ? JSON.parse(product.files)[1]
                            : JSON.parse(product.files)[0]
                        }`}
                        src={`data:image/png;base64,${
                          JSON.parse(product.files)[1]
                            ? JSON.parse(product.files)[1]
                            : JSON.parse(product.files)[0]
                        }`}
                        alt="image"
                        title="product"
                        style={{ height: '250px' }}
                      />

                      <div className="product-labels rectangular">
                        <span className="lbl on-sale">{product?.category}</span>{' '}
                        <span className="lbl pr-label1">
                          {product?.conditions}
                        </span>
                      </div>
                      {/*<!-- End product label -->*/}
                    </div>
                    {/*<!-- end product image -->*/}
                    {/*<!--start product details -->*/}
                    <div className="product-details hoverDetails text-center mobile">
                      {/*<!-- product name -->*/}
                      <div className="product-name">
                        <span>{product?.title}</span>
                      </div>
                      {/*<!-- End product name -->*/}
                      {/*<!-- product price -->*/}
                      <div className="product-price">
                        {/* <span className="old-price">$500.00</span> */}
                        <span className="price">&#8358;{product?.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
