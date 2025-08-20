"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function StudentDashboard() {
  const { data: session } = useSession();
  const [classInfo, setClassInfo] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (session?.user) {
      fetchClassAndSubjects();
      fetchNotes();
    }
  }, [session]);

  const fetchClassAndSubjects = async () => {
    try {
      const res = await fetch("/api/student/class");
      const data = await res.json();
      setClassInfo(data);
    } catch (error) {
      console.error("Error fetching class info:", error);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/student/notes");
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["student"]}>
    <DashboardLayout role="student">
      <h2 className="text-2xl font-bold mb-6 text-black">Student Dashboard</h2>

      {/* My Class & Subjects */}
      <div className="mb-8 p-6 bg-white rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-3 text-black">My Class </h3>
        {classInfo ? (
          <div>
            <p className="text-gray-700 mb-2">
              <strong>Class:</strong> {classInfo.class?.name}
            </p>
            <p className="text-gray-700">
              <strong>Subjects:</strong>{" "}
              {classInfo.subjects?.length > 0
                ? classInfo.subjects.map((sub) => sub.name).join(", ")
                : "No subjects assigned"}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Loading class info...</p>
        )}
      </div>

      {/* Notes Section */}
      <div className="p-6 bg-white rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-3 text-black">Notes</h3>
        {notes.length > 0 ? (
          <ul className="space-y-3">
            {notes.map((note) => (
              <li
                key={note._id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <span className="text-gray-800">{note.title}</span>
                <a
                  href={note.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  View / Download
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notes available yet.</p>
        )}
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
}
