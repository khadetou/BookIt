import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import { getReviews } from "../redux/actions/rooms";
import { getSession } from "next-auth/client";

export default function RoomReviews() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  console.log(roomId);
  const { loading, error, reviews } = useSelector((state) => state.getReviews);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (roomId !== "") {
      dispatch(getReviews(roomId));
    }
  }, [dispatch, roomId]);

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
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

    reviews &&
      reviews.forEach((review) => {
        data.rows.push({
          id: review._id,
          rating: review.rating,
          comment: review.comment,
          user: review.name,
          actions: (
            <>
              <Link href={`/admin/reviews/${review._id}`}>
                <a className="btn btn-primary mr-2">
                  <i className="fa fa-pencil"></i>
                </a>
              </Link>
            </>
          ),
        });
      });
    return data;
  };

  return (
    <div className="container container-fluid">
      <div className="row justify-content-center mt-5">
        <div className="col-5">
          <form>
            <div className="form-group">
              <label htmlFor="roomId_field">Enter Room Id</label>
              <input
                type="email"
                id="roomId_field"
                value={roomId}
                className="form-control"
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      {reviews && reviews.length > 0 ? (
        <MDBDataTable
          data={setReviews()}
          className="px-3"
          bordered
          striped
          hover
        />
      ) : (
        <div className="alert alert-danger text-center"> No Reviews</div>
      )}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session || session.user.avatar.role !== "admin") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
