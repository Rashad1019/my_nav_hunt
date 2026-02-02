import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
    collection,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy
} from 'firebase/firestore';

const COLLECTION_NAME = 'jobs';

export const useJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Real-time subscription to Firestore
    useEffect(() => {
        // Basic query: get all jobs, ordered by dateAdded (newest first)
        // Note: You might need to create an index in Firebase console for complex queries
        const q = query(collection(db, COLLECTION_NAME));

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const jobsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Sort client-side to avoid index requirement immediately
                jobsData.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

                setJobs(jobsData);
                setLoading(false);
            },
            (err) => {
                console.error("Firebase subscription error:", err);
                setError("Failed to sync leads. Check your API keys.");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const addJob = async (job) => {
        try {
            await addDoc(collection(db, COLLECTION_NAME), {
                ...job,
                dateAdded: new Date().toISOString()
            });
        } catch (err) {
            console.error("Error adding job:", err);
            // Optional: Add toast notification here
        }
    };

    const updateJobStatus = async (id, newStatus) => {
        try {
            const jobRef = doc(db, COLLECTION_NAME, id);
            await updateDoc(jobRef, { status: newStatus });
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const deleteJob = async (id) => {
        try {
            await deleteDoc(doc(db, COLLECTION_NAME, id));
        } catch (err) {
            console.error("Error deleting job:", err);
        }
    };

    const updateJob = async (updatedJob) => {
        try {
            const jobRef = doc(db, COLLECTION_NAME, updatedJob.id);
            const { id, ...dataToUpdate } = updatedJob; // Remove ID from payload
            await updateDoc(jobRef, dataToUpdate);
        } catch (err) {
            console.error("Error updating job:", err);
        }
    };

    return { jobs, addJob, updateJobStatus, deleteJob, updateJob, loading, error };
};
