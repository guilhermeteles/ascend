import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

/**
 * Creates a new course in the Firestore database.
 * @param {string} title - The title of the course.
 * @param {string} userId - The ID of the user creating the course.
 */
export async function createCourse(title: string, userId: string) {
  try {
    const docRef = await addDoc(collection(db, 'courses'), {
      title,
      userId,
      createdAt: new Date(),
    });
    console.log('Course created:', docRef.id);
  } catch (error) {
    console.error('Error creating course:', error);
  }
}

interface Course {
  id: string;
  title: string;
  userId: string;
  createdAt: Date;
}

export async function getCoursesByUser(userId: string): Promise<Course[]> {
  try {
    const q = query(collection(db, 'courses'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Course[];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}
