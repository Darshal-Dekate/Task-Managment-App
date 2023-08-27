import { useState, useEffect } from "react";
import axios from "axios";
import React, { Fragment } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export function TaskHome() {
  const [task, setVideos] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:5000/tasklist",
    }).then((response) => {
      console.log(response.data);
      setVideos(response.data);
    });
  }, []);

  return (
    <Fragment>
        <div className="text-center mt-3">
            <h2>Task Managment App</h2>
        </div>
      <div >
        <table
          className="table table-striped table-hover table-bordered "
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Task Status</th>
            </tr>
          </thead>
          <tbody>
            {task && task.length > 0
              ? task.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.taskid}</td>
                      <td>{item.Title}</td>
                      <td>{item.Description}</td>
                      <td>
                        {item.Status == true ? "Completed" : "Not completed"}
                      </td>
                      <td>
                        {/* <Link to={`/edit-task/${task.taskid}`} className="btn btn-warning me-2"><span className="bi bi-pen-fill"></span></Link> */}
                        <Link
                          to={`/delete-task/${item.taskid}`}
                          className="btn btn-danger me-2"
                        >
                          <span className="bi bi-trash-fill"></span>
                        </Link>
                        <Link
                          to={`/update-task/${item.taskid}`}
                          className="btn btn-warning"
                        >
                          <span className="bi bi-pen-fill"></span>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              : "No Data Available"}
          </tbody>
          <Link className="btn btn-primary mt-4 w-75" to="/add-task">
            <span>Create</span>
          </Link>
        </table>
        <br />
      </div>
    </Fragment>
  );
}
