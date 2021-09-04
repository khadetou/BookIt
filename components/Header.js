import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "../redux/actions/user";
import { signOut } from "next-auth/client";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    //Check if the user is set in order to dispatch it
    //otherwise we'll get some odd behavior
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  const logOutHandler = () => {
    signOut();
  };
  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <Link href="/">
            <a className="navbar-brand">
              <Image
                src="/images/bookit_logo.png"
                width={145}
                height={45}
                alt="BookIT"
              />
            </a>
          </Link>
        </div>

        <div className="col-3 mt-3 mt-md-0 text-center">
          {user ? (
            <div className="ml-4 dropdown d-inline">
              <a
                className="btn dropdown-toggle ml-4 w-100"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <Image
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                    width={100}
                    height={100}
                  />
                </figure>
                <span>{user && user.name}</span>
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <Link href="/bookings/me">
                  <a className="dropdown-item">My Bookings</a>
                </Link>
                {user.avatar.role === "admin" && (
                  <>
                    <Link href="/admin/rooms">
                      <a className="dropdown-item">Rooms</a>
                    </Link>
                    <Link href="/admin/users">
                      <a className="dropdown-item">Users</a>
                    </Link>
                    <Link href="/reviews">
                      <a className="dropdown-item">Reviews</a>
                    </Link>
                    <hr />
                  </>
                )}
                <Link href="/me/update">
                  <a className="dropdown-item">Profile</a>
                </Link>
                <Link href="/">
                  <a
                    className="dropdown-item text-danger"
                    onClick={logOutHandler}
                  >
                    Log out
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href="/login">
                <a className="btn btn-danger px-4 text-white login-header-btn float-right">
                  Login
                </a>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
