import "../../style.css";
import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import "../../components/HttpCommon";
import axiosBaseURL from "../../components/HttpCommon";

function EditServiceModal(props: any) {
  const [errorString, setErrorString] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  console.log(props);

  const [serviceData] = useState({
    title: "",
    description: "",
    price: 0,
    noWorkers: 0,
    durationTimeHours: 0,
    currency: "",
    category: "",
    ownerId: props.props.props.profileId,
  });

  const handleClose = () => {
    props.handleClose();
    if (validationMessage.length) {
      window.location.reload();
    }
  };

  const handleSubmit = async (e: any) => {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + props.props.props.token,
      },
    };

    e.preventDefault();
    serviceData.ownerId = props.props.props.profileId;
    await axiosBaseURL
      .post(
        "api/services/create",
        {
          ownerId: serviceData.ownerId,
          title: serviceData.title,
          description: serviceData.description,
          price: serviceData.price,
          currency: serviceData.currency,
          category: serviceData.category,
          durationTimeHours: serviceData.durationTimeHours,
          noWorkers: serviceData.noWorkers,
        },
        config
      )
      .then((response) => {
        if (!validationMessage.length || !response.data.includes(" ")) {
          setValidationMessage(response.data);
        }
        console.log(validationMessage);
      })
      .catch((error) => {
        const errorUnjsonified = error.request.response.split("message").pop();
        setErrorString(
          errorUnjsonified.substring(
            errorUnjsonified.indexOf('"') + 3,
            errorUnjsonified.lastIndexOf('"')
          )
        );
      });
  };

  return (
    <>
      <title>Edit your service</title>
      <div className="modal show">
        <Modal show={true} onHide={props.handleClose} centered size="lg">
          <Modal.Header>
            <Modal.Title>Edit your service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Edit your service data. This will also affect your current reservations!
          </Modal.Body>
          {!validationMessage.length ? (
            <Form>
              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  serviceData.title = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter a title for your service"
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  serviceData.description = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter a description for your service"
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  serviceData.category = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Category</Form.Label>
                <Form.Select>
                  <option>Choose your service's category</option>
                  <option value={"HOME"}>Home and housekeeping related</option>
                  <option value={"CONSTRUCTIONS"}>Constructions related</option>
                  <option value={"ELECTRONICS"}>Electronics related</option>
                  <option value={"VEHICLES"}>Vehicles related</option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  serviceData.noWorkers = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Number of workers required</Form.Label>
                <Form.Control type="email" placeholder="Enter the minimum number of workers required for this service" />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  serviceData.durationTimeHours = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Minimum duration time in hours</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter the minimum duration of your service ( in hours )"
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  serviceData.price = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Price per hour</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter the price a client will pay ( per hour )"
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  serviceData.currency = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Currency</Form.Label>
                <Form.Select>
                  <option>Choose your service's currency</option>
                  <option value={"RON"}>Lei</option>
                  <option value={"EUR"}>Euro</option>
                  <option value={"USD"}>Dolari</option>
                  <option value={"GBP"}>Lire</option>
                </Form.Select>
              </Form.Group>
            </Form>
          ) : (
            <Modal.Body style={{ color: "green" }}>
              {validationMessage.length
                ? "Service was created successfully"
                : null}
            </Modal.Body>
          )}
          {errorString.length ? (
            <Modal.Body style={{ color: "red" }}>{errorString}</Modal.Body>
          ) : null}
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
            {!validationMessage.length ? (
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            ) : null}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default EditServiceModal;
