import "../../style.css";
import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import "../../components/HttpCommon";
import axiosBaseURL from "../../components/HttpCommon";

function ProfileSetup(props: any) {
  const [errorString, setErrorString] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const [profileData] = useState({
    firsName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    city: "",
    county: "",
    street: "",
    userId: -1,
  });

  const handleClose = () => {
    props.handleProfileCallback(validationMessage);
  };

  const handleSubmit = async (e: any) => {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + props.token,
      },
    };

    e.preventDefault();
    profileData.userId = props.userId;
    await axiosBaseURL
      .post(
        "api/profile/createProfile",
        {
            userId: profileData.userId,
            emailAddress: profileData.emailAddress,
            phoneNumber: profileData.phoneNumber,
            firstName: profileData.firsName,
            lastName: profileData.lastName,
            city: profileData.city,
            county: profileData.county,
            street: profileData.street
        },
        config
      )
      .then((response) => {
        console.log(response);
        setValidationMessage(response.data);
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
      <title>Profile Creation</title>
      <div className="modal show">
        <Modal show={true} onHide={props.handleClose} centered size="lg">
          <Modal.Header>
            <Modal.Title>Create your profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Complete the fields below to finish creating your profile. Do not
            worry, you can edit them later!
          </Modal.Body>
          {!validationMessage.length ? (
            <Form>
              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  profileData.emailAddress = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                />
                <Form.Text className="text-muted">
                  This email address will be linked to your account.
                </Form.Text>
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  profileData.phoneNumber = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your phone number"
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  profileData.firsName = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your first name"
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  profileData.lastName = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="email" placeholder="Enter your last name" />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  profileData.city = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter the city you live in"
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  profileData.county = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>County/Area</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter the county or area from a city you live in"
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  profileData.street = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your address ( Street and number )"
                />
              </Form.Group>
            </Form>
          ) : (
            <Modal.Body style={{ color: "green" }}>
              {validationMessage}
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
            ) : null }
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ProfileSetup;
