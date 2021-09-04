import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "../../../components/Loader";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import { getAllUsers, loadUser } from "../../../redux/actions/user";
import { getSession } from "next-auth/client";

export default function AdminUsers() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, users, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getAllUsers());
  }, [dispatch]);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "category",
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

    users &&
      users.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          actions: (
            <>
              <Link href={`/admin/users/${user._id}`}>
                <a className="btn btn-primary mr-2">
                  <i className="fa fa-pencil"></i>
                </a>
              </Link>

              <button className="btn btn-danger">
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });
    return data;
  };

  return (
    <div className="container container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-5">{`${users && users.length} Rooms`}</h1>

          <MDBDataTable
            data={setUsers()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
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
