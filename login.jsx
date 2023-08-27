import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function Login() {
  const [user, setUser] = useState({ UserName: "", Password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleIdChange(e) {
    setUser({
      UserName: e.target.value,
      Password: user.Password,
    });
  }

  function handlePwdChange(e) {
    setUser({
      UserName: user.UserName,
      Password: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("checking");
    axios({
      method: "get",
      url: "http://127.0.0.1:5000/users",
    }).then((response) => {
      console.log(response);
      for (var vuser of response.data) {
        if (
          vuser.UserName === user.UserName &&
          vuser.Password === user.Password
        ) {
          navigate("/task-home");
          break;
        } else {
          setError("Invalid Credentials");
        }
      }
    });
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="border border-1 border-dark rounded rounded-2 m-4 p-4">
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <dl>
            <dt> UserName</dt>
            <dd>
              <input
                type="text"
                onChange={handleIdChange}
                className="form-control"
              />
            </dd>
            <dt>Password</dt>
            <dd>
              <input
                type="password"
                onChange={handlePwdChange}
                className="form-control"
              />
            </dd>
          </dl>
          <button className="btn btn-primary me-2 w-100">Login</button>
          <Link to="/register">New User? Register</Link>
          <h4 className="text-danger">{error}</h4>
        </form>
      </div>
    </div>


  );
}
