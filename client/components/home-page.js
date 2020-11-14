import Carousel from 'react-bootstrap/Carousel'
import React from 'react'
//d-block w-100 image-carousel

const HomePage = () => {
  return (
    <div>
      <div>
        <Carousel fade="true" className="carousel">
          <Carousel.Item interval={3000}>
            <img
              className="image-carousel"
              src="https://www.togetherresorts.com/wp-content/uploads/2016/09/beer-cheers.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <div className="centered-caption">
                <h1>HOPPY ENDINGS!</h1>
                <p>
                  乾杯 Salud Prost Santé Saúde 건배 Skål Gesondheid 干杯 Υγεία
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="image-carousel"
              src="https://p2d7x8x2.stackpathcdn.com/wordpress/wp-content/uploads/2020/03/iStock-1040303026.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Hoegaarden</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="image-carousel"
              src="https://steadydrinker.com/wp-content/uploads/2020/05/Hitachino-Nest-Non-Ale-1-scaled.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Hitachino</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="image-carousel"
              src="https://img2.chinadaily.com.cn/images/201812/06/5c087441a310eff36909b689.jpeg"
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
