import React, { useEffect, useState } from 'react';
import './home.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ renderButtonsByRoleId, onButtonClick, roleId, enrolledCourses }) => {
  const navigate = useNavigate();
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const userId = localStorage.getItem('userId');
  
        if (!userId) {
          console.error('User ID not found in local storage');
          return;
        }
  
        const response = await axios.get('http://localhost:8081/users/usercourses/get', {
          params: { userId: userId }, 
        });
  
        if (response.status === 200) {
          setUserCourses(response.data.userCourses);
        } else {
          console.error('Failed to fetch user courses:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user courses:', error);
      }
    };
  
    fetchUserCourses();
  }, []);
  
  
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <i className="navbar-brand bi bi-justify-left fs-4" onClick={() => onButtonClick('/')}></i>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-justify"></i>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          {renderButtonsByRoleId(roleId)}

          {userCourses && userCourses.length > 0 && (
            <>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  type="button"
                  id="enrolledCoursesDropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Enrolled Courses
                </button>
                <div className="dropdown-menu" aria-labelledby="enrolledCoursesDropdown">
                  {userCourses.map((course) => (
                    <Link key={course.CourseID} to={`/home/course/${course.CourseID}`} className="dropdown-item">
                      Course {course.CourseID}
                    </Link>
                  ))}
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
