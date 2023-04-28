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

function Login(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorString, setErrorString] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axiosBaseURL
      .post("api/auth/signin", { username, password }, config)
      .then((response) => {
        setValidationMessage(response.data.token);
        props.handleClose(response.data.token, response.data.roles, response.data.username, response.data.id.toString());
      })
      .catch(() => {
        setErrorString("Invalid username or password!")
      });
  };

  return (
    <>
      <title>Login</title>
      <div className="modal show">
        <Modal show={true} onHide={props.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Enter your account credentials</Modal.Title>
          </Modal.Header>
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

export default Login;
