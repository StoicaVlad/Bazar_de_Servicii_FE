import { useEffect, useState } from "react";
import axiosBaseURL from "../components/HttpCommon";
import "../profile_style.css";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CreateReview from "./Modals/CreateReviewModal";

const ProfilePage = (props: any) => {
  let { profileId } = useParams();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    address: "",
    userScore: 0,
  });

  const [reviewsData, setReviewsData] = useState<any[]>([]);
  const [showReviews, setShowReviews] = useState(false);
  const [showCreateReviewModal, setShowCreateReviewModal] = useState(false);
  const handleCloseModal = () => {setShowCreateReviewModal(false)};

  let config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + props.props.token,
    },
  };

  const getUserProfileData = () =>
    axiosBaseURL
      .get("api/profile/getProfileInfo?profileId=" + profileId, config)
      .then((response: any) => {
        profileData.firstName = response.data.firstName;
        profileData.lastName = response.data.lastName;
        profileData.emailAddress = response.data.emailAddress;
        profileData.address = response.data.address;
        profileData.userScore = response.data.userScore;
        profileData.phoneNumber = response.data.phoneNumber;
        setProfileData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          emailAddress: response.data.emailAddress,
          address: response.data.address,
          userScore: response.data.userScore,
          phoneNumber: response.data.phoneNumber,
        });
      })
      .catch((error) => {
        console.log(error);
      });

  const getUserReviews = () =>
    axiosBaseURL
      .get("api/review/showReviews?userId=" + profileId, config)
      .then((response: any) => {
        setReviewsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  useEffect(() => {
    getUserProfileData();
    getUserReviews();
  }, [1]);

  return (
    <>
    {showCreateReviewModal ? <CreateReview props={{token: props.props.token, userId: profileId}} handleClose={handleCloseModal}/> : null}
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                    ></img>
                    <div className="mt-3">
                      <h4>{profileData.firstName}</h4>
                      <p className="text-secondary mb-1">
                        {"User score: " +
                          (profileData.userScore.toString() !== "NaN"
                            ? profileData.userScore.toFixed(2)
                            : profileData.userScore)}
                      </p>
                      <p className="text-muted font-size-sm">
                        {profileData.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profileData.firstName + " " + profileData.lastName}
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profileData.emailAddress}
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profileData.phoneNumber}
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profileData.address}
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    {profileId === props.props.profileId ? (
                      <div className="col-sm-12">
                        <a
                          className="btn btn-info "
                          target="__blank"
                          href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                        >
                          Edit
                        </a>
                      </div>
                    ) : null}

                    <div className="col-sm-12 mb-2">
                      <a
                        className="btn btn-info "
                        target="__blank"
                        onClick={() => {
                          setShowCreateReviewModal(true);
                        }}
                      >
                        Add a review
                      </a>
                    </div>

                    {reviewsData.length ? (
                      <div className="col-sm-12">
                        <a
                          className="btn btn-info "
                          target="__blank"
                          onClick={() => {
                            showReviews
                              ? setShowReviews(false)
                              : setShowReviews(true);
                          }}
                        >
                          {showReviews ? "Hide reviews" : "Show reviews"}
                        </a>
                      </div>
                    ) : (
                      <div>This user has 0 reviews</div>
                    )}
                  </div>
                </div>
              </div>

              {showReviews ? (
                <div className="row gutters-sm">
                  <div className="col-sm-12 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h4 className="d-flex align-items-center mb-3">
                          Reviews
                        </h4>
                        <h5>User Score: {profileData.userScore.toFixed(2)}</h5>
                        <div>
                          {reviewsData.map((review, index) => (
                            <Card
                              className={
                                review.score <= 2.0
                                  ? "card-bad"
                                  : review.score > 2 && review.score < 4
                                  ? "card-middle"
                                  : "card-good"
                              }
                              key={index}
                              bg={
                                review.score <= 2.0
                                  ? "danger"
                                  : review.score > 2 && review.score < 4
                                  ? "warning"
                                  : "success"
                              }
                            >
                              <Card.Header>
                                <h5>
                                  {review.score <= 2.0
                                    ? "Unsatisfied"
                                    : review.score > 2 && review.score < 4
                                    ? "Impartial"
                                    : "Satisfied"}
                                </h5>
                              </Card.Header>
                              <Card.Body
                                style={
                                  review.score <= 2.0
                                    ? { backgroundColor: "#FFCCCC" }
                                    : review.score > 2 && review.score < 4
                                    ? { backgroundColor: "#FFFFCC" }
                                    : { backgroundColor: "#CCFFCC" }
                                }
                              >
                                <Card.Title>
                                  <b>{review.score}</b>
                                </Card.Title>
                                <Card.Text>{review.description}</Card.Text>
                              </Card.Body>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
