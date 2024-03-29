import "../../style.css";
import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import "../../components/HttpCommon";
import axiosBaseURL from "../../components/HttpCommon";

let config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=UTF-8",
  },
};

function SignUp(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorString, setErrorString] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const checkPasswordRestrictions = () => {
    if (
      password.length < 8 ||
      password.match(/[A-Z]/g) === null
      //|| password.match[/[0-9]/g] === null
    ) {
      setErrorString(
        "Password does not match restrictions!\nIt should have minimum 8 characters, an uppercase letter and a number!"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: any) => {
    if(validationMessage.length) {
      props.handleClose(validationMessage);
      return;
    }

    if (checkPasswordRestrictions() && !validationMessage.length) {
      e.preventDefault();
      await axiosBaseURL
        .post("api/auth/signup", { username, password, role: [role] }, config)
        .then((response) => {
          setValidationMessage(response.data.message);
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
    }
  };

  return (
    <>
      <title>Sign Up</title>
      <div className="modal show">
        <Modal show={true} onHide={props.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Enter your credentials</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please enter an username and a password of your choice. These will
            represent your authentication credentials.
          </Modal.Body>
          {!validationMessage.length ? (
            <Form>
              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  setUsername(e.target.value);
                  setErrorString("");
                }}
              >
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter username" />
                <Form.Text className="text-muted">
                  This username will be your only way to access the website.
                </Form.Text>
              </Form.Group>

              <Form.Group
                controlId="formBasicPassword"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                  setErrorString("");
                }}
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group style={{ padding: "15px" }}>
                <Form.Label>Select user type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e: any) => setRole(e.target.value)}
                >
                  <option value="client">Normal client</option>
                  <option value="provider">Services provider</option>
                </Form.Select>
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
              <Button variant="secondary" onClick={props.handleClose}>
                Close
              </Button>
            {!validationMessage.length ? 
            <Button variant="primary" onClick={handleSubmit}> Submit
            </Button> : null}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default SignUp;
