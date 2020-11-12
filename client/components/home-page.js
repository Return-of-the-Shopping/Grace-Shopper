import Carousel from 'react-bootstrap/Carousel'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <div>
        <Carousel className="carousel">
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src="https://www.handfamilycompanies.com/filebin/images/brewery_logos/HO_Logo.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Hoegaarden</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src="https://hitachino.cc/img/common/gnav_logo.png"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Hitachino</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src="http://www.tsingtaobeer.com.hk/eng/img/header/AboutUs_LOGO.jpg"
              alt="TsingTao"
            />
            <Carousel.Caption>
              <h3>Tsing Tao</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div />
    </div>
  )
}

export default HomePage
