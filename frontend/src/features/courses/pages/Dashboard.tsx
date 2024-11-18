import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, deleteDoc, doc, addDoc } from "firebase/firestore";
import Page from "@/components/Page";
import { paddingX, pagePaddingY } from "@/constants/layout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Trash2, EllipsisVertical } from "lucide-react"
import { Alert } from "@/components/Alert";

interface Course {
  id: string;
  name: string;
  createdAt: { seconds: number; nanoseconds: number };
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "courses"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedCourses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Course, "id">),
      }));
      setCourses(fetchedCourses);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDeleteCourse = async () => {
    if (!courseToDelete) return;

    try {
      await deleteDoc(doc(db, "courses", courseToDelete.id));
      setAlertMessage(`Course "${courseToDelete.name}" deleted successfully!`);
      setAlertType("success");
      setCourseToDelete(null);
    } catch (error) {
      console.error("Error deleting course:", error);
      setAlertMessage("Failed to delete course.");
      setAlertType("error");
    }
  };

  const handleDuplicateCourse = async (course: Course) => {
    try {
      // Create a copy of the course object excluding the 'id' field
      const { id, ...newCourse } = course;
  
      // Add the duplicated course to Firestore with a new 'createdAt' timestamp
      await addDoc(collection(db, "courses"), {
        ...newCourse,
        createdAt: new Date(),
      });
  
      // Display success message
      setAlertMessage(`Course "${course.name}" duplicated successfully!`);
      setAlertType("success");
    } catch (error) {
      console.error("Error duplicating course:", error);
      setAlertMessage("Failed to duplicate course.");
      setAlertType("error");
    }
  };
  
  

  const content = loading ? (
    <div className={`h-full w-full ${paddingX} flex items-center justify-center`}>
      <p>Loading...</p>
    </div>
  ) : user ? (
    <div className={`h-full w-full ${paddingX} ${pagePaddingY}`}>
      <div className="w-full flex gap-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={() => navigate("/course/new")}>
          <Plus />
          Create New Course
        </Button>
      </div>
      <div className="flex mt-8 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Grupos</h2>
        </div>
        <div className="grow">
          <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
          {courses.length > 0 ? (
            <ul className="space-y-2 grid grid-cols-4 gap-4">
            {courses.map((course) => (
              <li
                key={course.id}
                className="p-4 bg-gray-100 rounded-md shadow-md flex justify-between items-center cursor-pointer hover:bg-gray-200 transition"
                onClick={() => navigate(`/course/${course.id}`)} // Navigate to course details
              >
                <div>
                  <h3 className="text-lg font-semibold">{course.name}</h3>
                  <p className="text-sm text-gray-500">
                    Created at: {new Date(course.createdAt.seconds * 1000).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center">
                  {/* Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        onClick={(e) => e.stopPropagation()} // Prevent parent click event
                        className="p-2 hover:bg-gray-300 rounded-full"
                      >
                        <EllipsisVertical className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[150px]">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent parent click event
                          setCourseToDelete(course);
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent parent click event
                          handleDuplicateCourse(course);
                        }}
                        className="text-blue-600"
                      >
                        <Plus className="mr-2 w-4 h-4" />
                        Duplicate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </li>
            ))}
          </ul>
          ) : (
            <div className={`h-full w-full ${paddingX} flex items-center justify-center`}>
              <p className="text-gray-500">You haven't created any courses yet.</p>
            </div>
          )}
        </div>
      </div>
      

      {courseToDelete && (
        <Alert
          title="Confirm Deletion"
          description={
            <>
              Are you sure you want to delete the course "
              <strong>{courseToDelete?.name}</strong>"? This action cannot be undone.
            </>
          }
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          onConfirm={handleDeleteCourse}
          onCancel={() => setCourseToDelete(null)}
          isOpen={!!courseToDelete}
          setIsOpen={() => setCourseToDelete(null)}
        />
      
      )}

      {alertMessage && (
        <Alert
          title={alertType === "success" ? "Success" : "Error"}
          description={alertMessage}
          confirmLabel="Close"
          onConfirm={() => setAlertMessage(null)}
          isOpen={!!alertMessage}
          setIsOpen={() => setAlertMessage(null)}
        />
      )}
    </div>
  ) : (
    <div className={`h-full w-full ${paddingX} flex items-center justify-center`}>
      <p>You are not logged in. Please log in to view your dashboard.</p>
    </div>
  );

  return <Page content={content} />;
}
