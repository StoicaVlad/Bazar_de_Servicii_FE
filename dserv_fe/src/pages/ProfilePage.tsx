import { useEffect, useState } from "react";
import axiosBaseURL from "../components/HttpCommon";
import { Form, Button } from "react-bootstrap";


const ProfilePage = (props: any) => {

  const [profileData, setProfileData] = useState({
    firsName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    city: "",
    county: "",
    street: "",
    userId: -1,
  });

  let config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + props.props.token,
    },
  };

  useEffect(() => {
    axiosBaseURL
      .get(
        "api/profile/getProfileInfo?profileId=" + props.props.profileId,
        config
      )
      .then((response: any) => {
        console.log(response);
        setProfileData({
            firsName: response.data.firstName,
            lastName: response.data.lastName,
            emailAddress: response.data.emailAddress,
            phoneNumber: response.data.phoneNumber,
            city: "",
            county: "",
            street: "",
            userId: -1,
          });
        console.log(profileData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Form>
        <Form.Group
          controlId="formBasicEmail"
          style={{ padding: "15px" }}
          onChange={(e: any) => {
            profileData.emailAddress = e.target.value;
          }}
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email address" />
          <Form.Text className="text-muted">
            This email address will be linked to your account.
          </Form.Text>
        </Form.Group>

        <Form.Group
          controlId="formBasicEmail"
          style={{ padding: "15px" }}
          onChange={(e: any) => {
            profileData.phoneNumber = e.target.value;
          }}
        >
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="email" placeholder="Enter your phone number" />
        </Form.Group>

        <Form.Group
          controlId="formBasicEmail"
          style={{ padding: "15px" }}
          onChange={(e: any) => {
            profileData.firsName = e.target.value;
          }}
        >
          <Form.Label>First Name</Form.Label>
          <Form.Control type="email" placeholder="Enter your first name" />
        </Form.Group>

        <Form.Group
          controlId="formBasicEmail"
          style={{ padding: "15px" }}
          onChange={(e: any) => {
            profileData.lastName = e.target.value;
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
          }}
        >
          <Form.Label>City</Form.Label>
          <Form.Control type="email" placeholder="Enter the city you live in" />
        </Form.Group>

        <Form.Group
          controlId="formBasicEmail"
          style={{ padding: "15px" }}
          onChange={(e: any) => {
            profileData.county = e.target.value;
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
          }}
        >
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your address ( Street and number )"
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default ProfilePage;
