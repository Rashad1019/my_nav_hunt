import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy
} from 'firebase/firestore';

export const useJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Real-time subscription to Firestore
    useEffect(() => {
        const q = query(collection(db, "jobs"), orderBy("dateAdded", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const jobsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setJobs(jobsData);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching jobs:", err);
            setError("Failed to sync with cloud.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const addJob = async (job) => {
        try {
            await addDoc(collection(db, "jobs"), {
                ...job,
                dateAdded: new Date().toISOString(),
                status: job.status || 'discovered'
            });
        } catch (err) {
            console.error("Error adding job:", err);
            setError("Failed to add job.");
        }
    };

    const updateJobStatus = async (id, newStatus) => {
        try {
            const jobRef = doc(db, "jobs", id);
            await updateDoc(jobRef, { status: newStatus });
        } catch (err) {
            console.error("Error updating status:", err);
            setError("Failed to update status.");
        }
    };

    const deleteJob = async (id) => {
        try {
            const jobRef = doc(db, "jobs", id);
            await deleteDoc(jobRef);
        } catch (err) {
            console.error("Error deleting job:", err);
            setError("Failed to delete job.");
        }
    };

    const updateJob = async (updatedJob) => {
        try {
            const jobRef = doc(db, "jobs", updatedJob.id);
            const dataToUpdate = { ...updatedJob };
            delete dataToUpdate.id; // Exclude ID from data
            await updateDoc(jobRef, dataToUpdate);
        } catch (err) {
            console.error("Error updating job:", err);
            setError("Failed to update job.");
        }
    };

    return { jobs, addJob, updateJobStatus, deleteJob, updateJob, loading, error };
};
