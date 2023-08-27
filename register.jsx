import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function Register() {
  const navigate = useNavigate();
  const [userError, setUserError] = useState("");
  const [errorClass, setErrorClass] = useState("");
  const [user, setUser] = useState({ UserId: 0, UserName: "", Password: "" });

  function handleIdChange(e) {
    setUser({
      UserId: parseInt(e.target.value),
      UserName: user.UserName,
      Password: user.Password,
    });

    axios({
      method: "get",
      url: "http://127.0.0.1:5000/users",
    }).then((response) => {
      for (var user of response.data) {
        if (user.UserId === e.target.value) {
          setUserError("User Id Taken - Try Another");
          setErrorClass("text-danger");
          break;
        } else {
          setUserError("User Id Available");
          setErrorClass("text-success");
        }
      }
    });
  }

  function handleNameChange(e) {
    setUser({
      UserId: user.UserId,
      UserName: e.target.value,
      Password: user.Password,
    });
  }

  function handlePasswordChange(e) {
    setUser({
      UserId: user.UserId,
      UserName: user.UserName,
      Password: e.target.value,
    });
  }

  function handleSubmit() {
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/registeruser",
      data: user,
    });
    alert("Registered Successfully");
    navigate("/");
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="border border-1 border-dark rounded rounded-1 m-4 p-4">
        <h2>
          <span className="bi bi-person-fill"></span> Register User
        </h2>
        <form onSubmit={handleSubmit}>
          <dl>
            <dt>Task Id</dt>
            <dd>
              <input onChange={handleIdChange} type="number" className="form-control" />
            </dd>
            <dd className={errorClass}>{userError}</dd>
            <dt>User Name</dt>
            <dd>
              <input type="text" onChange={handleNameChange} className="form-control" />
            </dd>
            <dt>Password</dt>
            <dd>
              <input type="password" onChange={handlePasswordChange} className="form-control"/>
            </dd>
          </dl>
          <button className="btn btn-primary w-100">Register</button>
          <p>
            Existing User? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
