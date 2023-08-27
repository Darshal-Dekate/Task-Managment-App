import { Link, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { useState, useEffect } from "react";
import * as yup from "yup";

export function AddTask() {
  // const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  

  const formik = useFormik({
    initialValues: {
      taskid: 0,
      Title: "",
      Description: "",
      Status: false,
    },

    onSubmit: (values) => {
      console.log(values);
      axios({
        method: "post",
        url: "http://127.0.0.1:5000/addtasklist",
        data: values,
      });
      alert("Video Added Successfully..");
      navigate("/task-home");
    },
  });

  return (
    <div className=" d-flex justify-content-center mt-5 w-100 ">
      <div className="border border-2 rounded rounded-3 border-dark p-4 m-4 w-25">
        <form onSubmit={formik.handleSubmit}>
          <h3>Add New Task</h3>
          <dl>
            <dt>Task Id</dt>
            <dd>
              <input
                type="number"
                className="form-control"
                onChange={formik.handleChange}
                name="taskid"
              />
            </dd>
            <dt>Title</dt>
            <dd>
              <input
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                name="Title"
              />
            </dd>
            <dt>Description</dt>
            <dd>
              <input
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                name="Description"
              />
            </dd>
            <dt>Status</dt>
            <dd>
              <input
                type="checkbox"
                className="form-switch"
                onChange={formik.handleChange}
                name="Status"
              />
              &nbsp;<label>Completed</label>
            </dd>
          </dl>
          <button className="btn btn-primary w-100">Add Task</button>
          <p>
            <Link to="/task-home">Back to Home</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
