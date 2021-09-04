import { useRouter } from "next/router";
import Link from "next/link";
import Cart from "./subcomponents/Cart";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

const Homepage = () => {
  const { rooms, roomsCount, resPerpage, filteredRoomsCount, error } =
    useSelector((state) => state.allRooms);
  const router = useRouter();

  let { page = 1, location } = router.query;
  page = Number(page);

  let count = roomsCount;
  if (count) {
    count = filteredRoomsCount;
  }
  useEffect(() => {
    toast.error(error);
  });

  const handlePagination = (pageNumber) => {
    window.location.href = `/?page=${pageNumber}`;
  };

  return (
    <>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">
          {location ? `Rooms ${location}` : "All rooms "}
        </h2>

        <Link href="/search">
          <a className="ml-2 back-to-search">
            <i className="fa fa-arrow-left"></i> Back to Search
          </a>
        </Link>
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
                rating={room.ratings}
                reviews={room.numOfReviews}
              />
            ))
          )}
        </div>
      </section>

      <div className="d-flex justify-content-center mt-5">
        {resPerpage < roomsCount && (
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerpage}
            totalItemsCount={roomsCount}
            onChange={handlePagination}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        )}
      </div>
    </>
  );
};

export default Homepage;
