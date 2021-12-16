import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { session } from "next-auth/client";
import { registerUser } from "../redux/actions/user";
import ButtonLoader from "../components/ButtonLoader";
import Image from "next/image";
import { CLEAR_ERROR } from "../redux/types/type";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.svg"
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { success, error, loading } = useSelector((state) => state.auth);
  const { name, email, password } = user;

  useEffect(() => {
    if (success) {
      router.push("/login");
    }

    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [success, error, loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!avatar) {
      toast.error("Please select upload avatar");
      return;
    }
    const userData = {
      name,
      email,
      password,
      avatar,
    };
    dispatch(registerUser(userData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Join Us</h1>

            <div className="form-group">
              <label htmlFor="name_field">Full Name</label>
              <input
                type="text"
                id="name_field"
                name="name"
                className="form-control"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                name="email"
                className="form-control"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <Image
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="image"
                      width={60}
                      height={55}
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              {loading ? <ButtonLoader /> : "REGISTER"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
