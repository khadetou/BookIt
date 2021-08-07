import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { getBookings } from "../../redux/actions/booking";
import { toast } from "react-toastify";
import { wrapper } from "../../redux/store";
import { getSession } from "next-auth/client";

export default function Bookings() {
  const dispatch = useDispatch();

  const { bookings, error } = useSelector((state) => state.booking);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getBookings());
  }, [dispatch]);

  const setBookings = () => {
    const data = {
      columns: [
        {
          label: "Booking ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Check In",
          field: "checkIn",
          sort: "asc",
        },
        {
          label: "Check Out",
          field: "checkOut",
          sort: "asc",
        },
        {
          label: "Amount paid",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    bookings &&
      bookings.forEach((booking) => {
        data.rows.push({
          id: booking._id,
          checkIn: new Date(booking.checkInDate).toLocaleDateString("en-Us"),
          checkOut: new Date(booking.checkOutDate).toLocaleDateString("en-US"),
          amount: `$${booking.amountPaid}`,
          actions: (
            <>
              <Link href={`/bookings/${booking._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-eye"></i>
                </a>
              </Link>

              <button className="btn btn-success mx-2">
                <i className="fa fa-download"></i>
              </button>
            </>
          ),
        });
      });
    return data;
  };

  return (
    <div className="container container-fluid">
      <h1 className="my-5">My Bookings</h1>

      <MDBDataTable
        data={setBookings()}
        className="px-3"
        bordered
        striped
        hover
      />
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });

      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      await store.dispatch(getBookings(req.headers.cookie, req));
    }
);
