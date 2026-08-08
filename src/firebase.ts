import { initializeApp } from "firebase/app";
import { 
  initializeFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  writeBatch 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA79DJLkHEeiMLUpLTTqIiNeisRnGoTh4Y",
  authDomain: "total-outrider-38gvj.firebaseapp.com",
  projectId: "total-outrider-38gvj",
  storageBucket: "total-outrider-38gvj.firebasestorage.app",
  messagingSenderId: "159802514495",
  appId: "1:159802514495:web:0b127118d770e37cb3ac8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with force long-polling for reliable and immediate network connectivity in iframe/sandboxed environments
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, "ai-studio-alumniassociatio-76426495-8cb4-46cb-a768-623bb6e7c330");

/**
 * Recursively removes keys with `undefined` values from an object,
 * as Firestore throws an error if any field value is `undefined`.
 */
export function sanitizeFirestoreData<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeFirestoreData(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const cleaned: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        cleaned[key] = sanitizeFirestoreData(value);
      }
    }
    return cleaned as T;
  }

  return obj;
}

/**
 * Fetches all documents from a Firestore collection.
 * If the collection is empty, it seeds it with the provided default data.
 */
export async function getCollectionData<T extends { id: string }>(
  collectionName: string,
  initialData: T[]
): Promise<T[]> {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    
    if (snapshot.empty && initialData.length > 0) {
      console.log(`Seeding Firestore collection: ${collectionName}`);
      const batch = writeBatch(db);
      for (const item of initialData) {
        const docRef = doc(db, collectionName, item.id);
        const sanitized = sanitizeFirestoreData(item);
        batch.set(docRef, sanitized);
      }
      await batch.commit();
      return initialData;
    }
    
    const list: T[] = [];
    snapshot.forEach((doc) => {
      list.push(doc.data() as T);
    });
    return list;
  } catch (err) {
    console.error(`Error loading collection ${collectionName}:`, err);
    return initialData;
  }
}

/**
 * Saves a single document in a Firestore collection
 */
export async function saveDocument(
  collectionName: string,
  id: string,
  data: any
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    const sanitized = sanitizeFirestoreData({ ...data, id });
    await setDoc(docRef, sanitized);
  } catch (err) {
    console.error(`Error saving document ${id} to ${collectionName}:`, err);
    throw err;
  }
}

/**
 * Deletes a single document from a Firestore collection
 */
export async function deleteDocument(
  collectionName: string,
  id: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error(`Error deleting document ${id} from ${collectionName}:`, err);
    throw err;
  }
}

/**
 * Saves non-array settings like the gallery headline and descriptions
 */
export async function getSettingsDoc<T>(
  docId: string,
  defaultData: T
): Promise<T> {
  try {
    const colRef = collection(db, "settings");
    const snapshot = await getDocs(colRef);
    const foundDoc = snapshot.docs.find(d => d.id === docId);
    
    if (!foundDoc) {
      const docRef = doc(db, "settings", docId);
      await setDoc(docRef, defaultData as any);
      return defaultData;
    }
    return foundDoc.data() as T;
  } catch (err) {
    console.error(`Error loading settings doc ${docId}:`, err);
    return defaultData;
  }
}

export async function saveSettingsDoc(
  docId: string,
  data: any
): Promise<void> {
  try {
    const docRef = doc(db, "settings", docId);
    const sanitized = sanitizeFirestoreData(data);
    await setDoc(docRef, sanitized);
  } catch (err) {
    console.error(`Error saving settings doc ${docId}:`, err);
    throw err;
  }
}
