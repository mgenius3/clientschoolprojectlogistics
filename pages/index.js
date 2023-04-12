import Layout from '../components/Layout';
import Link from 'next/link';
import $ from 'jquery';
import React, { useEffect } from 'react';
// import 'slick-carousel/slick/slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
export default function Logistics() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window?.addEventListener('scroll', handleScroll); // add scroll event listener on component mount
    }
    return () => {
      if (typeof window !== 'undefined') {
        window?.removeEventListener('scroll', handleScroll); // remove scroll event listener on component unmount
      }
    };
  }, []);

  useEffect(() => {
    homeSlider();
  }, []);
  function handleScroll() {
    if (typeof window !== 'undefined') {
      if (window?.innerWidth > 1199) {
        const headerWrap = $('.header-wrap');
        if (window?.pageYOffset > 145) {
          headerWrap.addClass('stickyNav animated fadeInDown');
        } else {
          headerWrap.removeClass('stickyNav fadeInDown');
        }
      }
    }
  }
  function homeSlider() {
    // $('.home-slideshow').slick({
    //   dots: false,
    //   infinite: true,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   fade: true,
    //   arrows: true,
    //   autoplay: true,
    //   autoplaySpeed: 4000,
    //   lazyLoad: 'ondemand',
    // });
  }
  return (
    <Layout title="Home Page">
      {/* {/*<!--Body Content-->*/}
      <div id="page-content">
        {/* {/*<!--Home slider-->*/}
        <div className="slideshow slideshow-wrapper pb-section sliderFull">
          <Slider className="home-slideshow">
            <div className="slide">
              <div className="blur-up lazyload bg-size">
                <img
                  className="blur-up lazyload bg-img"
                  dataSrc="/images/slideshow-banners/belle-banner1.jpg"
                  src="/images/slideshow-banners/trucks.jpg"
                  alt="Shop Our New Collection"
                  title="Shop Our New Collection"
                />
                <div className="slideshow__text-wrap slideshow__overlay classic bottom">
                  <div className="slideshow__text-content bottom">
                    <div className="wrap-caption center">
                      <h2 className="h1 mega-title slideshow__title">
                        <b style={{ color: '#e60000' }}>Kupon</b> Logistics
                        Company
                      </h2>
                      <span className="mega-subtitle slideshow__subtitle">
                        If you need to move goods across the country, consider
                        using Kupon Logistics Company
                      </span>
                      <Link href="/logistics/send">
                        <span className="btn">Send Package</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide">
              <div className="blur-up lazyload bg-size">
                <img
                  className="blur-up lazyload bg-img"
                  dataSrc="/images/slideshow-banners/cart.jpg"
                  src="/images/slideshow-banners/belle-banner1.jpg"
                  alt="Summer Bikini Collection"
                  title="Summer Bikini Collection"
                />
                <div className="slideshow__text-wrap slideshow__overlay classic bottom">
                  <div className="slideshow__text-content bottom">
                    <div className="wrap-caption center">
                      <h2 className="h1 mega-title slideshow__title">
                        <b style={{ color: '#e60000' }}>Kupon</b> Logistics
                        Company
                      </h2>
                      <span className=" slideshow__subtitle">
                        Whether you&apos;re shipping goods across the country or
                        around the world, ABC Logistics has the expertise,
                        experience, and resources to get the job done right.
                        Contact us today to learn how we can help your business
                        streamline its supply chain and improve its bottom line.
                      </span>
                      <Link href="/logistics/send">
                        <span className="btn">Send Package</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
        {/* {/*<!--End Home slider-->*/}
        {/* {/*<!--Collection Tab slider-->*/}

        {/*<!--Collection Tab slider-->*/}

        {/*<!--Collection Box slider-->*/}

        {/*<!--End Collection Box slider-->*/}

        {/*<!--Logo Slider-->*/}
        {/* <div className="section logo-section">
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="logo-bar row">
                    <div className="logo-bar__item col-sm-2">
                      <img src="/images/logo/brandlogo1.png" alt="" title="" />
                    </div>
                    <div className="logo-bar__item col-sm-2">
                      <img src="/images/logo/brandlogo2.png" alt="" title="" />
                    </div>
                    <div className="logo-bar__item col-sm-2">
                      <img src="/images/logo/brandlogo3.png" alt="" title="" />
                    </div>
                    <div className="logo-bar__item col-sm-2">
                      <img src="/images/logo/brandlogo4.png" alt="" title="" />
                    </div>
                    <div className="logo-bar__item col-sm-2">
                      <img src="/images/logo/brandlogo5.png" alt="" title="" />
                    </div>
                    <div className="logo-bar__item col-sm-2">
                      <img src="/images/logo/brandlogo6.png" alt="" title="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        {/*<!--End Logo Slider-->*/}

        {/*<!--Featured Product-->*/}

        {/*<!--End Featured Product-->*/}

        {/*<!--Store Feature-->*/}
        <div className="store-feature section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <ul className="display-table store-info">
                  <li className="display-table-cell">
                    <i className="icon anm anm-truck-l"></i>
                    <h5>Fast Shipping &amp; Return</h5>
                    <span className="sub-text">
                      Provision of Fast Delivery of Ordes
                    </span>
                  </li>
                  <li className="display-table-cell">
                    <i className="icon anm anm-dollar-sign-r"></i>
                    <h5>Money Guarantee</h5>
                    <span className="sub-text">
                      30 days money back guarantee
                    </span>
                  </li>
                  <li className="display-table-cell">
                    <i className="icon anm anm-comments-l"></i>
                    <h5>Online Support</h5>
                    <span className="sub-text">
                      We support online 24/7 on day
                    </span>
                  </li>
                  <li className="display-table-cell">
                    <i className="icon anm anm-credit-card-front-r"></i>
                    <h5>Secure Payments</h5>
                    <span className="sub-text">
                      All payment are Secured and trusted.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* {/*<!--End Store Feature-->*/}
      </div>
      {/* {/*<!--End Body Content-->*/}
    </Layout>
  );
}
