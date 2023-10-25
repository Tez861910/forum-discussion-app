import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Read() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>User Detail</h3>
        <div className="text-white">
          <p>ID: {data.id}</p>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          {data.course && <p>Course: {data.course}</p>}
          {data.roleType && <p>Role Type: {data.roleType}</p>}
          <Link to="/" className="btn btn-primary">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Read;
