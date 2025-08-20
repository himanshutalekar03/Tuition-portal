import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import ClassModel from "@/models/Class";
import Subject from "@/models/Subject";

export async function GET() {
  try {
    await connectDB();

    const studentsCount = await User.countDocuments({ role: "student" });
    const teachersCount = await User.countDocuments({ role: "teacher" });
    const classesCount = await ClassModel.countDocuments();
    const subjectsCount = await Subject.countDocuments();

    return new Response(
      JSON.stringify({
        students: studentsCount,
        teachers: teachersCount,
        classes: classesCount,
        subjects: subjectsCount,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch stats" }), {
      status: 500,
    });
  }
}
