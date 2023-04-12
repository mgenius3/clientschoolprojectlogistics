import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { useForm } from 'react-hook-form';
// import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUpload from '../../utils/fileupload';
import PageAuthentication from '../../hooks/useAuth';

import {
  statesInNigeria,
  Condition,
  sellCategory,
  sellMaterials,
} from '../../utils/data';

export default function Logistics() {
  const [data, setData] = useState({});
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [fileUploadError, setFileUploadError] = useState();
  const [isLoading, setIsLoading] = useState();

  const [token] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
  });

  useEffect(() => {
    toast.error(fileUploadError);
    setData({ ...data, ['files']: JSON.stringify(filesToUpload) });
  }, [filesToUpload]);

  const { handleSubmit } = useForm();

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitPackageDetails = async () => {
    // sellPackageMutation.mutate(data);
    setIsLoading(true);
    try {
      const response = await fetch('/sell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const res = await response.json();
        setIsLoading(false);
        throw new Error(res.msg);
      }
      const res = await response.json();
      localStorage.setItem('token', res);
      if (window !== undefined) window.location.replace(`${res.msg}`);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <PageAuthentication>
      <Layout title="Sell - Market">
        <div id="page-content" style={{ margin: '50px 0px' }}>
          <div className="page section-header text-center">
            <div className="page-title">
              <div className="wrapper">
                <h1 className="page-width">Upload Sell Product</h1>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
                <div className="customer-box returning-customer">
                  <div
                    id="customer-login"
                    className="collapse customer-content"
                  ></div>
                </div>
              </div>
            </div>

            <div className="row billing-fields">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 sm-margin-30px-bottom">
                <div className="create-ac-content bg-light-gray padding-20px-all">
                  <form onSubmit={handleSubmit(submitPackageDetails)}>
                    <fieldset>
                      <h2 className="login-title mb-3">Sell Details</h2>
                      <ImageUpload
                        setFileUploadError={setFileUploadError}
                        setFilesToUpload={setFilesToUpload}
                      />
                    </fieldset>
                    <fieldset>
                      <div className="row">
                        <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                          <label htmlFor="input-firstname">
                            Product Title <span className="required-f">*</span>
                          </label>
                          <input
                            name="title"
                            id="input-firstname"
                            type="text"
                            required
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                          <label htmlFor="input-address-1">
                            Location <span className="required-f">*</span>
                          </label>
                          <input
                            name="location"
                            id="input-address-1"
                            type="text"
                            required
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                          <label htmlFor="input-city">
                            City <span className="required-f">*</span>
                          </label>
                          <input
                            name="city"
                            id="input-city"
                            type="text"
                            required
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                          <label htmlFor="state">
                            State <span className="required-f">*</span>
                          </label>
                          <select
                            name="state"
                            id="state"
                            required
                            onChange={handleInputChange}
                          >
                            <option disabled selected>
                              {' '}
                              --- Please Select ---{' '}
                            </option>
                            {statesInNigeria?.map((state, i) => (
                              <option value={state} key={i}>
                                {state}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                          <label htmlFor="category">
                            Category <span className="required-f">*</span>
                          </label>
                          <select
                            name="category"
                            id="category"
                            required
                            onChange={handleInputChange}
                          >
                            <option disabled selected>
                              {' '}
                              --- Please Select ---{' '}
                            </option>
                            {sellCategory?.map((category, i) => (
                              <option value={category} key={i}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                          <label htmlFor="material">
                            Material <span className="required-f">*</span>
                          </label>
                          <select
                            name="material"
                            id="material"
                            required
                            onChange={handleInputChange}
                          >
                            <option disabled selected>
                              {' '}
                              --- Please Select ---{' '}
                            </option>
                            {sellMaterials?.map((material, i) => (
                              <option value={material} key={i}>
                                {material}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                          <label htmlFor="condition">
                            Condition <span className="required-f">*</span>
                          </label>
                          <select
                            name="conditions"
                            id="conditions"
                            required
                            onChange={handleInputChange}
                          >
                            <option disabled selected>
                              {' '}
                              --- Please Select ---{' '}
                            </option>
                            {Condition?.map((condition, i) => (
                              <option value={condition} key={i}>
                                {condition}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                          <label htmlFor="input-city">
                            Price (&#8358;){' '}
                            <span className="required-f">*</span>
                          </label>
                          <input
                            name="price"
                            id="input-city"
                            type="text"
                            required
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-12 col-lg-12 col-xl-12">
                          <label htmlFor="input-company">
                            Package Description{' '}
                            <span className="required-f">*</span>
                          </label>
                          <textarea
                            className="form-control resize-both"
                            rows="3"
                            name="description"
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                      </div>
                    </fieldset>
                    <div className="order-button-payment">
                      {isLoading ? (
                        <button className="btn" disabled>
                          Loading...
                        </button>
                      ) : (
                        <button
                          className="btn"
                          value="Place order"
                          type="submit"
                        >
                          POST SELL
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </PageAuthentication>
  );
}
