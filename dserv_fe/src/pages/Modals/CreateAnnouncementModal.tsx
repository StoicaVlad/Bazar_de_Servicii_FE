import "../../style.css";
import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import "../../components/HttpCommon";
import axiosBaseURL from "../../components/HttpCommon";

function CreateAnnouncement(props: any) {
  const [errorString, setErrorString] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const [announcementData] = useState({
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
    announcementData.ownerId = props.props.props.profileId;
    await axiosBaseURL
      .post(
        "api/announcement/create",
        {
          ownerId: announcementData.ownerId,
          title: announcementData.title,
          description: announcementData.description,
          priceOffering: announcementData.price,
          currency: announcementData.currency,
          category: announcementData.category,
          durationTimeHours: announcementData.durationTimeHours,
          requiredPeopleNumber: announcementData.noWorkers,
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
      <title>Post an announcement</title>
      <div className="modal show">
        <Modal show={true} onHide={props.handleClose} centered size="lg">
          <Modal.Header>
            <Modal.Title>Let them know what you need</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Complete the fields below to create a new announcement. Although, you can edit your announcement
            after, it is not recommended!
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
                  placeholder="Enter a title for your post"
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
                  placeholder="Enter a description for your post"
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  announcementData.category = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Category</Form.Label>
                <Form.Select>
                  <option>Choose your announcement's category</option>
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
                  announcementData.noWorkers = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Approximate number of workers required</Form.Label>
                <Form.Control type="email" placeholder="Enter the minimum number of workers required for this service" />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  announcementData.durationTimeHours = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Minimum duration time in hours</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter the minimum duration of your job ( in hours )"
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
                <Form.Label>Maximum offering</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter the maximum value you are willing to pay for this job"
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "15px" }}
                onChange={(e: any) => {
                  announcementData.currency = e.target.value;
                  setErrorString("");
                }}
              >
                <Form.Label>Currency</Form.Label>
                <Form.Select>
                  <option>Choose your announcement's currency</option>
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
                ? "Announcement was created successfully"
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

export default CreateAnnouncement;
