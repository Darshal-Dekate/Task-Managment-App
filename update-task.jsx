import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, useFormik, Field } from "formik";

export function EditTask() {
  const [task, settask] = useState([
    { taskid: 0, Title: "", Description: "", Status: false },
  ]);

  const params = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      taskid: task[0].taskid,
      Title: task[0].Title,
      Description: task[0].Description,
      Status: task[0].Status,
    },

    onSubmit: (values) => {
      console.log(values);
      axios({
        method: "put",
        url: `http://127.0.0.1:5000/updatetasklist/${params.id}`,
        data: values,
      });
      alert("Task Updated");
      navigate("/task-home");
    },
    enableReinitialize: true,
  });

  function GetVideo() {
    axios({
      method: "get",
      url: `http://127.0.0.1:5000/tasklist/${params.id}`,
    }).then((response) => {
      settask(response.data);
    });
  }

  useEffect(() => {
    GetVideo();
  }, []);
  return (
    <div className="d-flex justify-content-center m-4 ">
      <div className="border border-1 border-black rounded rounded-3 align-item-center m-4 p-4 ">
        <h3>Edit Task Details</h3>
        <form onSubmit={formik.handleSubmit}>
          <dl>
            <dt>Task Id</dt>
            <dd>
              <input
                type="number"
                className="form-control"
                value={formik.values.VideoId}
                onChange={formik.handleChange}
                name="taskid"
              />
            </dd>
            <dt>Title</dt>
            <dd>
              <input
                type="text"
                value={formik.values.Title}
                onChange={formik.handleChange}
                name="Title"
                className="form-control"
              />
            </dd>
            <dt>Description</dt>
            <dd>
              <input
                type="text"
                value={formik.values.Description}
                onChange={formik.handleChange}
                name="Description"
                className="form-control"
              />
            </dd>
            <dt>Status</dt>
            <dd>
              <input
                type="checkbox"
                checked={task.Status}
                className="form-switch"
                onChange={formik.handleChange}
                name="Status"
              />
              &nbsp;<label>Completd</label>
            </dd>
            
          </dl>
          <button className="btn btn-primary w-100">Update Task</button>
        </form>
        <p>
          <Link to="/task-home">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
