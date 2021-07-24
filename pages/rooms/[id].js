import { getRoomDetails } from "../../redux/actions/rooms";
import { wrapper } from "../../redux/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import { Carousel } from "react-bootstrap";
export default function RoomDetails() {
  const {
    room: {
      address,
      airConditioned,
      breakfast,
      category,
      description,
      guestCapacity,
      images,
      internet,
      name,
      numOfBeds,
      numOfReviews,
      petsAllowed,
      pricePerNight,
      ratings,
      roomCleaning,
    },
  } = useSelector((state) => state.room);

  return (
    <div className="container container-fluid">
      <h2 className="mt-5">{name}</h2>

      <div className="ratings mt-auto mb-3">
        <div className="rating-outer">
          <div
            className="rating-inner"
            style={{ width: `${(ratings / 5) * 100}%` }}
          ></div>
        </div>
        <span id="no_of_reviews">{`(${numOfReviews} Reviews)`}</span>
      </div>
      <Carousel hover="pause">
        {images &&
          images.map((image) => (
            <div
              key={image.public_id}
              style={{ width: "100%", height: "440px" }}
            >
              <Image src={image.url} alt={name} layout="fill" />
            </div>
          ))}
      </Carousel>

      <div className="row my-5">
        <div className="col-12 col-md-6 col-lg-8">
          <h3>Description</h3>
          <p>{description}</p>

          <div className="features mt-5">
            <h3 className="mb-4">Features:</h3>
            <div className="room-feature">
              <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
              <p>{guestCapacity} Guests</p>
            </div>

            <div className="room-feature">
              <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
              <p>{numOfBeds} Beds</p>
            </div>

            <div className="room-feature">
              <i className="fa fa-cog fa-fw fa-bath" aria-hidden="true"></i>
              <p>2 Baths</p>
            </div>

            <div className="room-feature">
              <i
                className={
                  breakfast
                    ? "fa fa-check text-success"
                    : "fa fa-times text-danger"
                }
                aria-hidden="true"
              ></i>
              <p>Breakfast</p>
            </div>

            <div className="room-feature">
              <i
                className={
                  internet
                    ? "fa fa-check text-success"
                    : "fa fa-times text-danger"
                }
                aria-hidden="true"
              ></i>
              <p>Internet</p>
            </div>

            <div className="room-feature">
              <i
                className={
                  airConditioned
                    ? "fa fa-check text-success"
                    : "fa fa-times text-danger"
                }
                aria-hidden="true"
              ></i>
              <p>Air Conditioned</p>
            </div>

            <div className="room-feature">
              <i
                className={
                  petsAllowed
                    ? "fa fa-check text-success"
                    : "fa fa-times text-danger"
                }
                aria-hidden="true"
              ></i>
              <p>Pets Allowed</p>
            </div>

            <div className="room-feature">
              <i
                className={
                  roomCleaning
                    ? "fa fa-check text-success"
                    : "fa fa-times text-danger"
                }
                aria-hidden="true"
              ></i>
              <p>Room Cleaning</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="booking-card shadow-lg p-4">
            <p className="price-per-night">
              <b>${pricePerNight}</b> / night
            </p>

            <button className="btn btn-block py-3 booking-btn">Pay</button>
          </div>
        </div>
      </div>

      <div className="reviews w-75">
        <h3>Reviews:</h3>
        <hr />
        <div className="review-card my-3">
          <div className="rating-outer">
            <div className="rating-inner"></div>
          </div>
          <p className="review_user">by John</p>
          <p className="review_comment">Good Quality</p>

          <hr />
        </div>

        <div className="review-card my-3">
          <div className="rating-outer">
            <div className="rating-inner"></div>
          </div>
          <p className="review_user">by John</p>
          <p className="review_comment">Good Quality</p>

          <hr />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getRoomDetails(req, params.id));
    }
);
