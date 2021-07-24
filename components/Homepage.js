import Cart from "./subcomponents/Cart";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Homepage = () => {
  const { rooms, error } = useSelector((state) => state.allRooms);

  useEffect(() => {
    toast.error(error);
  });

  return (
    <section id="rooms" className="container mt-5">
      <h2 className="mb-3 ml-2 stays-heading">Stays in New York</h2>

      <a href="#" className="ml-2 back-to-search">
        <i className="fa fa-arrow-left"></i> Back to Search
      </a>
      <div className="row">
        {rooms && rooms.length === 0 ? (
          <div className="alert alert-danger mt-5 ml-3 container text-center">
            No room found.
          </div>
        ) : (
          rooms.map((room, idx) => (
            <Cart
              key={idx}
              src={room.images[0].url}
              name={room.name}
              price={room.pricePerNight}
              id={room._id}
              rating={room.rating}
              reviews={room.numOfReviews}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Homepage;
