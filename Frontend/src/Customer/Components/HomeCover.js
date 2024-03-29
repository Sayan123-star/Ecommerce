
import { Image } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

function HomeCover() {
  return (
    // Creating a carousal of Images
    <Carousel data-bs-theme="dark">
      <Carousel.Item interval={1000}>
      <Image  className="w-100 h-25" src={require("../Img/carousalimg1.avif")} fluid />
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      <Image  className="w-100 h-25" src={require("../Img/carousalimg3.jpg")} fluid />
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      <Image  className="w-100 h-25" src={require("../Img/carousalimg2.webp")} fluid />
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCover;