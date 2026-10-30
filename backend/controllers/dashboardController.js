import { Student } from '../models/Student.js';
import { ActivityLog } from '../models/ActivityLog.js';

// @desc    Get dashboard statistics & aggregated insights
// @route   GET /api/dashboard/stats
// @access  Private
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalStudents = await Student.countDocuments();
    const activeStudents = await Student.countDocuments({ status: 'Active' });
    const inactiveStudents = await Student.countDocuments({ status: 'Inactive' });
    const graduatedStudents = await Student.countDocuments({ status: 'Graduated' });

    // Average CGPA calculation
    const avgCgpaResult = await Student.aggregate([
      {
        $group: {
          _id: null,
          avgCgpa: { $avg: '$cgpa' },
        },
      },
    ]);
    const avgCgpa = avgCgpaResult.length > 0 ? Number(avgCgpaResult[0].avgCgpa.toFixed(2)) : 0;

    // Department breakdown
    const departmentStats = await Student.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 },
          avgCgpa: { $avg: '$cgpa' },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // Top performing students
    const topStudents = await Student.find()
      .sort({ cgpa: -1 })
      .limit(5)
      .select('fullName rollNumber department semester cgpa status');

    // Recent 5 added students
    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName rollNumber department semester cgpa status createdAt');

    // Recent activity logs
    const recentActivities = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(7)
      .select('userName action entityType description createdAt');

    res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        activeStudents,
        inactiveStudents,
        graduatedStudents,
        avgCgpa,
        departmentDistribution: departmentStats.map((d) => ({
          department: d._id,
          count: d.count,
          avgCgpa: Number(d.avgCgpa.toFixed(2)),
        })),
        topStudents,
        recentStudents,
        recentActivities,
      },
    });
  } catch (err) {
    next(err);
  }
};

