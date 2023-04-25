import { Row } from "react-bootstrap";
import ServiceCard from "../components/ServiceCard";
import { useState } from "react";
import "../style.css";

const Services = () => {

  let serviceData: any[] = [1,2,3,4];

  return (
    <>
      <div>Services</div>
      <Row className="main-content">{
        serviceData.map((item, index) => (
                <ServiceCard></ServiceCard>
        ))
        }</Row>
    </>
  );
};

export default Services;
