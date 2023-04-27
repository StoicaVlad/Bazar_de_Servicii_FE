import Carousel from 'react-bootstrap/Carousel';
import '../../style.css';

const HomeCarousel = (images: string[]) => {
  return (
    <Carousel className='carousel'>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={images[0]}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>User Announcements</h3>
          <p>Check out the latest announcements.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-50"
          src={images[1]}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Services</h3>
          <p>New services have been created. Have a look!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={images[2]}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Just Review</h3>
          <p>
            Want to make a review or check a user's feedback?
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default HomeCarousel