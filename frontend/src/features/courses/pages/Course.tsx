import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Page from "@/components/Page";
import { paddingX, pagePaddingY } from "@/constants/layout";
import { Button } from "@/components/ui/button";
import slugify from "slugify";
import debounce from "lodash.debounce";

// Define the Course interface
interface Course {
  id?: string;
  name: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  lessons: { title: string }[];
  slug?: string;
  userId?: string;
  createdAt?: Date;
}

export default function Course() {
  const { id } = useParams(); // Course ID from route
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course>({
    name: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    lessons: [],
  });
  const [loading, setLoading] = useState(true);
  const [isNewCourse, setIsNewCourse] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeCourse = async () => {
      setLoading(true);
      setError(null);

      if (!auth.currentUser) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      try {
        if (id === "new") {
          setIsNewCourse(true);
        } else {
          const docRef = doc(db, "courses", id!);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setCourse({ id: docSnap.id, ...docSnap.data() } as Course);
          } else {
            setError("Course not found.");
          }
        }
      } catch (err) {
        console.error("Error initializing course:", err);
        setError("Failed to load course.");
      } finally {
        setLoading(false);
      }
    };

    initializeCourse();
  }, [id]);

  const saveCourse = useCallback(
    debounce(async (updatedCourse: Course) => {
      if (!auth.currentUser) {
        setError("You must be logged in to save the course.");
        return;
      }

      try {
        const slug = slugify(updatedCourse.name, { lower: true });
        const courseRef = doc(db, "courses", updatedCourse.id || crypto.randomUUID());

        if (isNewCourse) {
          await setDoc(courseRef, {
            ...updatedCourse,
            slug,
            userId: auth.currentUser.uid,
            createdAt: new Date(),
          });
          setIsNewCourse(false);
        } else {
          await updateDoc(courseRef, { ...updatedCourse, slug });
        }
      } catch (error) {
        console.error("Error saving course:", error);
        setError("Failed to save course.");
      }
    }, 500),
    [isNewCourse]
  );

  const handleFieldChange = (field: keyof Course, value: string) => {
    setCourse((prev) => {
      const updatedCourse = { ...prev, [field]: value };
      saveCourse(updatedCourse);
      return updatedCourse;
    });
  };

  const addLesson = () => {
    setCourse((prev) => {
      const updatedCourse = {
        ...prev,
        lessons: [...prev.lessons, { title: `Lesson ${prev.lessons.length + 1}` }],
      };
      saveCourse(updatedCourse);
      return updatedCourse;
    });
  };

  const closeCourse = () => {
    navigate("/dashboard");
  };

  const content = loading ? (
    <div className={`h-full w-full ${paddingX} flex items-center justify-center`}>
      <p>Loading...</p>
    </div>
  ) : (
    <div className={`h-full w-full ${paddingX} ${pagePaddingY}`}>
      <div className="w-full max-w-md relative">
        <button
          onClick={closeCourse}
          className="absolute top-0 right-0 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h1 className="text-2xl font-bold mb-4">
          {isNewCourse ? "Create New Course" : `Edit Course: ${course.name}`}
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          value={course.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
          placeholder="Course Name"
          className="border px-4 py-2 w-full mb-4"
        />
        <textarea
          value={course.description}
          onChange={(e) => handleFieldChange("description", e.target.value)}
          placeholder="Course Description"
          className="border px-4 py-2 w-full mb-4"
        />
        <select
          value={course.category}
          onChange={(e) => handleFieldChange("category", e.target.value)}
          className="border px-4 py-2 w-full mb-4"
        >
          <option value="" disabled>
            Select a Category
          </option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Art">Art</option>
        </select>
        
        <Button
          variant="outline"
          onClick={addLesson}
          className="mt-4 w-full"
        >
          Add Lesson
        </Button>
        <p className="mt-2 text-gray-500">Lessons: {course.lessons.length}</p>
      </div>
    </div>
  );

  return <Page content={content} />;
}
