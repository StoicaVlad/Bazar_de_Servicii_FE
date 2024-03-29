import { Row } from "react-bootstrap";
import ServiceCard from "../components/ServiceCard";
import { useState, useEffect } from "react";
import "../style.css";
import axiosBaseURL from "../components/HttpCommon";

let config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=UTF-8",
  },
};

const Services = () => {

  const [serviceData, setServiceData] = useState<any[]>([]);

  useEffect(() => {
    axiosBaseURL
      .get("api/services/show", config)
      .then((response: any) => {
        setServiceData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  return (
    <>
      <h1 style={{margin: '30px'}}>Available services</h1>
      <Row className="main-content">{
        serviceData.map((item, index) => (
                <ServiceCard props={item} key={index}></ServiceCard>
        ))
        }</Row>
    </>
  );
};

export default Services;
