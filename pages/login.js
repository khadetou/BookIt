import Link from "next/link";
const login = () => {
  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg">
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label for="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value=""
              />
            </div>

            <div className="form-group">
              <label for="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value=""
              />
            </div>
            <Link href="/forgot-password">
              <a className="float-right mb-4">Forgot Password?</a>
            </Link>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <a href="#" className="float-right mt-3">
              New User?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
