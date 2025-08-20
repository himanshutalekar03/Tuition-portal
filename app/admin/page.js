"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Users,
  User,
  Library,
  Book,
  ArrowRight,
  LayoutDashboard,
  GraduationCap,
  LogOut,
} from "lucide-react";

import DashboardLayout from "@/components/DashboardLayout"; // use your existing one

export default function AdminPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);

  const statsConfig = [
    {
      name: "Total Students",
      key: "students",
      icon: <Users className="text-indigo-500" />,
      href: "/admin/students",
      bgColor: "bg-indigo-100",
    },
    {
      name: "Total Teachers",
      key: "teachers",
      icon: <User className="text-teal-500" />,
      href: "/admin/teachers",
      bgColor: "bg-teal-100",
    },
    {
      name: "Total Classes",
      key: "classes",
      icon: <Library className="text-amber-500" />,
      href: "/admin/classes",
      bgColor: "bg-amber-100",
    },
    {
      name: "Total Subjects",
      key: "subjects",
      icon: <Book className="text-rose-500" />,
      href: "/admin/subjects",
      bgColor: "bg-rose-100",
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
    <DashboardLayout role={"admin"}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Admin Dashboard</h2>
          <p className="mt-2 text-slate-600">
            Welcome back! Here's an overview of your institution's activity.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsConfig.map((item) => (
            <div
              key={item.name}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{item.name}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">
                    {stats ? stats[item.key] : "..."}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bgColor}`}
                >
                  {item.icon}
                </div>
              </div>
              <a
                href={item.href}
                className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
              >
                Manage
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>
          ))}
        </div>

        {/* Placeholder for more components */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Recent Activity
          </h3>
          <p className="text-slate-500">
            This area could display recent student enrollments, new notes
            uploaded by teachers, or system notifications.
          </p>
        </div>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
}
