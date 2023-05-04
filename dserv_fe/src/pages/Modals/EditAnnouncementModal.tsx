import "../../style.css";
import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import "../../components/HttpCommon";
import axiosBaseURL from "../../components/HttpCommon";

function EditServiceModal(props: any) {
  const [errorString, setErrorString] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const [announcementData] = useState({
    title: props.props.item.title,
    description: props.props.item.description,
    price: props.props.item.price,
    noWorkers: props.props.item.noWorkers,
    duration: props.props.item.durationTimeHours,
    currency: props.props.item.currency,
    announcementId: props.props.item.id
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
        Authorization: "Bearer " + props.props.token,
      },
    };

    e.preventDefault();
    await axiosBaseURL
      .put(
        "api/announcement/update",
        {
          title: announcementData.title,
          description: announcementData.description,
          priceOffering: announcementData.price,
          durationTimeHours: announcementData.duration,
          requiredPeopleNumber: announcementData.noWorkers,
          announcementId: announcementData.announcementId
        },
        config
      )
      .then((response) => {
        if (!validationMessage.length || !response.data.includes(" ")) {
          setValidationMessage(response.data);
        }
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
            <Modal.Title>Changed your mind?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Edit your announcement data. It is recommended to let the providers you talked with know about these changes!
          </Modal.Body>
          {!validationMessage.length ? (
            <Form>
              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  announcementData.title = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter a title for your announcement"
                  defaultValue={props.props.item.title}
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  announcementData.description = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter a description for your announceemnt"
                  defaultValue={props.props.item.description}
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  announcementData.noWorkers = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Number of workers required</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter the minimum number of workers required for this task"
                  defaultValue={props.props.item.noWorkers}
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  announcementData.duration = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Minimum duration time in hours</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter the minimum duration of your task ( in hours )"
                  defaultValue={props.props.item.duration}
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  announcementData.price = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Maximum price offering</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter the price you will pay a provider"
                  defaultValue={props.props.item.price}
                />
              </Form.Group>
            </Form>
          ) : (
            <Modal.Body style={{ color: "green" }}>
              {validationMessage.length
                ? "Announcement was updated successfully!"
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
