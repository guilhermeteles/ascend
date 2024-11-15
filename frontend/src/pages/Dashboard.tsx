import { useEffect, useState } from 'react';
import { getCoursesByUser } from '../services/firestore';
import { auth } from '../firebaseConfig';

interface Course {
  id: string;
  title: string;
  userId: string;
  createdAt: Date;
}

function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]); // Explicitly type the state
  const userId = auth.currentUser?.uid || '';

  useEffect(() => {
    const fetchCourses = async () => {
      if (userId) {
        const userCourses = await getCoursesByUser(userId);
        setCourses(userCourses || []);
      }
    };

    fetchCourses();
  }, [userId]);

  return (
    <div>
      <h1>My Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
