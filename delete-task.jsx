import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export function DeleteVideo() {
  const params = useParams();
  const [task, setTask] = useState([
    { taskid: 0, Title: "", Description: "",Status:false },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:5000/tasklist/${params.id}`,
    }).then((response) => {
        setTask(response.data);
    });
  }, []);

  function handleDeleteClick() {
    axios({
      method: "delete",
      url: `http://127.0.0.1:5000/deletetasklist/${params.id}`,
    });
    alert("Task Deleted");
    navigate("/task-home");
  }

  return (
    <div>
      <h1>Deleting Video {task[0].Title} are you sure? </h1>
      <p>
        <button onClick={handleDeleteClick} className="btn btn-danger">
          Yes
        </button>{" "}
        <Link className="btn btn-warning" to="/task-home">
          Cancel
        </Link>
      </p>
    </div>
  );
}
