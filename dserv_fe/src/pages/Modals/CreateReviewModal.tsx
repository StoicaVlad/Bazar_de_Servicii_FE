import "../../style.css";
import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import "../../components/HttpCommon";
import axiosBaseURL from "../../components/HttpCommon";

function CreateReview(props: any) {
  const [errorString, setErrorString] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const [serviceData] = useState({
    userId: props.props.userId,
    description: "",
    score: 0,
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

    if (serviceData.score >= 0 && serviceData.score <= 5) {
      e.preventDefault();
      await axiosBaseURL
        .post(
          "api/review/create",
          {
            userId: serviceData.userId,
            score: serviceData.score,
            description: serviceData.description,
          },
          config
        )
        .then((response) => {
          if (!validationMessage.length || !response.data.includes(" ")) {
            setValidationMessage(response.data);
          }
        })
        .catch((error) => {
          const errorUnjsonified = error.request.response
            .split("message")
            .pop();
          setErrorString(
            errorUnjsonified.substring(
              errorUnjsonified.indexOf('"') + 3,
              errorUnjsonified.lastIndexOf('"')
            )
          );
        });
    } else {
      setErrorString("Score must be between 0 and 5!");
    }
  };

  return (
    <>
      <title>Let people know your experience</title>
      <div className="modal show">
        <Modal show={true} onHide={props.handleClose} centered size="lg">
          <Modal.Header>
            <Modal.Title>Let people know your experience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Provide feedback for this user! Let people know how your interaction
            was and your satisfaction level.<br></br>
            <b>Be careful!</b>
            <br></br> Once submitted, you will not be able to delete this review
            unless you contact an administrator or moderator!
          </Modal.Body>
          {!validationMessage.length ? (
            <Form>
              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  serviceData.score = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Note</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Give the services a note from 1 to 5"
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
                  placeholder="Please describe your experience"
                />
              </Form.Group>
            </Form>
          ) : (
            <Modal.Body style={{ color: "green" }}>
              {validationMessage.length
                ? "Review was created successfully"
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

export default CreateReview;
