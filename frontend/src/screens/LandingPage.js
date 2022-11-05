import React from 'react'
import slideimg from '../assets/masterlogo.jpg'
import img1 from '../assets/anywhere.jpg'
import img3 from '../assets/wheels.jpg'
import img2 from '../assets/repair.jpg'
import img4 from '../assets/carecar.jpg'
import img5 from '../assets/friends.jpg'
import img6 from '../assets/personalassistant.jpg'
import {Link} from 'react-router-dom'


import ServiceSection from '../components/ServiceSection'

function LandingPage() {
  return (
    <div >
   {/* Slider */}
<section className="section-slide">
  <div className="wrap-slick1">
    <div className="slick1">
      <div className="item-slick1" style={{backgroundImage: `url(${slideimg})`, backgroundSize:"cover"}}>
        <div className="container h-full">
          <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
            <div className="layer-slick1 animated" >
              <span className="ltext-101 cl2 respon2">
               
              </span>
            </div>
            <div className="layer-slick1 animated " data-appear="fadeInUp" data-delay={800}>
              <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1" style={{color: "rgb(255, 204, 0)"}}>
                MASTER-SHOP
              </h2>
            </div>
            <div className="layer-slick1 animated " data-appear="zoomIn" data-delay={1600}>
            <Link to={'/shop'}>
              <a style={{color: "white"}} className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                Shop Now
              </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
  
     
    </div>
  </div>
</section>



{/* Banner */}
<div className="sec-banner bg0 p-t-80 p-b-50">
  <div className="container">
    <div className="p-b-32">
  <h3 style={{color: "rgb(255, 204, 0)"}} className="ltext-105 cl5 txt-center respon1">
  Our <span style={{color: "#1489EE"}}>Master</span> Goals

  </h3>
</div>
    <div className="row">
      <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
        {/* Block1 */}<Link to={'/shop'}>
        <div className="block1 wrap-pic-w">
          <img src={img3} alt="IMG-BANNER" />
          <a href="product.html" className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
            <div  className="block1-txt-child1 flex-col-l">
              <span style={{color: "rgb(255, 204, 0)"}} className="block1-name ltext-102 trans-04 p-b-8">
                To Assist Disabled Persons
              </span>
              <span style={{color: "rgb(255, 204, 0)"}} className="block1-info stext-102 trans-04">
                Anytime
              </span>
            </div>
            <div className="block1-txt-child2 p-b-4 trans-05">
              <div className="block1-link stext-101 cl0 trans-09">
                Shop Now
              </div>
            </div>
          </a>
        </div></Link>
      </div>
      <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
        {/* Block1 */}<Link to={'/shop'}>
        <div className="block1 wrap-pic-w">
          <img src={img2} alt="IMG-BANNER" />
          <a href="product.html" className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
            <div className="block1-txt-child1 flex-col-l">
              <span style={{color: "rgb(255, 204, 0)"}} className="block1-name ltext-102 trans-04 p-b-8">
                To Fix Your Vehicle
              </span>
              <span style={{color: "rgb(255, 204, 0)"}} className="block1-info stext-102 trans-04">
                From any problem
              </span>
            </div>
            <div className="block1-txt-child2 p-b-4 trans-05">
              <div className="block1-link stext-101 cl0 trans-09">
                Shop Now
              </div>
            </div>
          </a>
        </div></Link>
      </div>
      <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
        {/* Block1 */}<Link to={'/shop'}>
        <div className="block1 wrap-pic-w">
          <img src={img1} style={{height: '237.109px'}} alt="IMG-BANNER" />
          <a href="product.html" className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
            <div className="block1-txt-child1 flex-col-l">
              <span style={{color: "rgb(255, 204, 0)"}} className="block1-name ltext-102 trans-04 p-b-8">
                To Come For You
              </span>
              <span style={{color: "rgb(255, 204, 0)"}} className="block1-info stext-102 trans-04">
                Anywhere
              </span>
            </div>
            <div className="block1-txt-child2 p-b-4 trans-05">
              <div className="block1-link stext-101 cl0 trans-09">
                Shop Now
              </div>
            </div>
          </a>
        </div></Link>

        
      </div>
    </div>
  </div>
</div>

{/* Banner 2 */}
<div className="sec-banner bg0 p-t-80 p-b-50">
  <div className="container">
    <div className="row">
      <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
        {/* Block1 */}<Link to={'/shop'}>
        <div className="block1 wrap-pic-w">
          <img src={img4} style={{height: '237.109px', objectFit: 'cover'}} alt="IMG-BANNER" />
          <a href="product.html" className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
            <div className="block1-txt-child1 flex-col-l">
              <span style={{color: "rgb(255, 204, 0)"}} className="block1-name ltext-102 trans-04 p-b-8">
              To Care For Your Car
              </span>
              <span style={{color: "rgb(255, 204, 0)"}} className="block1-info stext-102 trans-04">
                Carefully
              </span>
            </div>
            <div className="block1-txt-child2 p-b-4 trans-05">
              <div className="block1-link stext-101 cl0 trans-09">
                Shop Now
              </div>
            </div>
          </a>
        </div></Link>
      </div>
      <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
        {/* Block1 */}<Link to={'/shop'}>
        <div className="block1 wrap-pic-w">
          <img src={img5} style={{height: '237.109px', objectFit: 'cover'}} alt="IMG-BANNER" />
          <a href="product.html" className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
            <div  className="block1-txt-child1 flex-col-l">
              <span style={{color: "rgb(255, 204, 0)"}} className="block1-name ltext-102 trans-04 p-b-8">
              To  Become Your Friend
              </span>
              <span style={{color: "rgb(255, 204, 0)"}} className="block1-info stext-102 trans-04">
              Today is a good day to try
              </span>
            </div>
            <div className="block1-txt-child2 p-b-4 trans-05">
              <div className="block1-link stext-101 cl0 trans-09">
                Shop Now
              </div>
            </div>
          </a>
        </div></Link>
      </div>
      <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
        {/* Block1 */}<Link to={'/shop'}>
        <div className="block1 wrap-pic-w">
          <img src={img6} style={{height: '237.109px', objectFit: 'cover'}} alt="IMG-BANNER" />
          <a href="product.html" className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
            <div className="block1-txt-child1 flex-col-l">
              <span style={{color: "rgb(255, 204, 0)"}} className="block1-name ltext-102 trans-04 p-b-8">
                To Be Your Personal Assistant
              </span>
              <span style={{color: "rgb(255, 204, 0)"}} className="block1-info stext-102 trans-04">
                In any transport issue
              </span>
            </div>
            <div className="block1-txt-child2 p-b-4 trans-05">
              <div className="block1-link stext-101 cl0 trans-09">
                Shop Now
              </div>
            </div>
          </a>
        </div></Link>

      


        
      </div>
    </div>
  </div>
</div>
<ServiceSection />

    </div>
  )
}

export default LandingPage