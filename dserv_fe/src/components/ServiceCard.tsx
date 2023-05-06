import { Card, Button } from "react-bootstrap";
import { useState } from "react";


const ServiceCard = (serviceInfo: any) => {

  const [showDetails, setShowDetails] = useState(false);
  const handleDetailsButtonClicked = () => {
    if(showDetails)
      setShowDetails(false);
    else 
      setShowDetails(true);
  }

  const redirect = (url: string) => {
    window.location.href = url;
  };

  const goToUserReviews = () => {
    let url = "/profile/" + serviceInfo.props.ownerProfileId;
    redirect(url);
  }

  return (
    <div className="service-card">
      <Card border="info">
        <Card.Header as="h5">{serviceInfo.props.category}</Card.Header>
        <Card.Body>
          <Card.Title>{serviceInfo.props.title}</Card.Title>
          <Card.Text>{serviceInfo.props.location}</Card.Text>
          {showDetails ?
          <ul>
            <li>
              <Card.Text>
                Description: {serviceInfo.props.description}
              </Card.Text>
            </li>
            <li>
              <Card.Text>
                Price: {serviceInfo.props.price + serviceInfo.props.currency}
              </Card.Text>
            </li>
            <li>
              <Card.Text>
                Minimal duration: {serviceInfo.props.duration}
              </Card.Text>
            </li>
            <li>
              <Card.Text>
                Minimum number of workers: {serviceInfo.props.noWorkers}
              </Card.Text>
            </li>
            <li>
              <Card.Text>Owner: {serviceInfo.props.owner}</Card.Text>
            </li>
          </ul> : null }
          <div>
          <Button variant="info" onClick={handleDetailsButtonClicked} style={{marginRight:'5px'}}>{!showDetails ? 'Details' : 'Hide'}</Button>
          <Button variant="info" onClick={goToUserReviews}>Go to owner's profile</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ServiceCard;
