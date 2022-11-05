import React from 'react'
import ilustration from '../assets/photoes/about-right-dec.png'
import repairimg from '../assets/photoes/repair.png'
import {Link} from 'react-router-dom'



function ServiceSection() {
  return (
    <div>
        <div>
  <div id="services" className="services section">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="section-heading  wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">
            <h4 style={{color: "rgb(255, 204, 0)"}}>Amazing <em>Services &amp; Features</em> for you</h4>
            <img src="assets/images/heading-line-dec.png" alt />
            <p> <a rel="nofollow" href="https://www.toocss.com/" target="_blank"></a>  <a href="https://templatemo.com/contact" target="_parent"></a> </p>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <div className="service-item first-service">
            <div className="icon" />
            <h4>Solve Any Kind of Transport Problem</h4>
            <p>Our professional and creative team will discuss and find best solution </p>
            <div className="text-button">
              
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="service-item second-service">
            <div className="icon" />
            <h4>Rocket Speed Service & Experience</h4>
            <p>We will assist you with "race-pace" which brings to your daily life satisfaction </p>
            <div className="text-button">
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="service-item third-service">
            <div className="icon" />
            <h4>Flexible Service For Customers</h4>
            <p>We care respect your time and budget. Always ready to find flexible solution </p>
            <div className="text-button">
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="service-item fourth-service">
            <div className="icon" />
            <h4>24/7 Help &amp; Support</h4>
            <p>Our "reactive" team is ready to assist you anytime, anywhere</p>
            <div className="text-button">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="about" className="about-us section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 align-self-center">
          <div className="section-heading">
            <h4>About <em>How Do We Work</em> &amp; Who We Are</h4>
            <img src="assets/images/heading-line-dec.png" alt />
            <p>Our Certified and professional assistants build trust with a lot of customers</p>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">You Contact To Us</a></h4>
                <p>Anytime !!!</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">We Come and Evaluate your issue  </a></h4>
                <p>Lorem Ipsum Text</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">We Fix Issues with quality</a></h4>
                <p>You can continue your daily life</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">You will get back result soon</a></h4>
                <p>Enjoy with this experience</p>
              </div>
            </div>
            <div className="col-lg-12">
              <p></p>
              <Link to="/contact">
              <div className="gradient-button">
                <a >Try Master-Experience</a>
              </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="right-image">
            <img src={repairimg} alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default ServiceSection

