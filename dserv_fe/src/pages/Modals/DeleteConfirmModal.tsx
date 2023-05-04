import "../../style.css";
import { Modal, Button } from "react-bootstrap";
import "../../components/HttpCommon";
import axiosBaseURL from "../../components/HttpCommon";


// props: object, url, token, handleclose
function DeleteConfirmModal(props: any) {

  const handleSubmit = async (e: any) => {

    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + props.props.token,
      },
    };

    e.preventDefault();
    await axiosBaseURL
      .delete(props.props.url + props.props.item.id, config)
      .then(() => {
        window.location.reload();
        props.handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <title>Confirmation</title>
      <div className="modal show">
        <Modal show={true} onHide={props.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Hold on a sec...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {"Are you sure you want to delete '" + props.props.item.title + "' ?"}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {" "}
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default DeleteConfirmModal;
