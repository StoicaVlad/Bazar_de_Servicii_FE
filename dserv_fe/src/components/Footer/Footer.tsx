import {Container, Row, Col} from "react-bootstrap";

const Footer = () => {
  return (
    <footer
    style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        border: "1px solid #E4E4E4"
    }}>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    Copyright &copy; Bazar De Servicii 
                </Col>
            </Row>
        </Container>

    </footer>
  )
}

export default Footer