import { Student } from '../models/Student.js';
import { ActivityLog } from '../models/ActivityLog.js';

// @desc    Get all students with search, filters, pagination, and sorting
// @route   GET /api/students
// @access  Private
export const getStudents = async (req, res, next) => {
  try {
    const {
      search,
      department,
      semester,
      status,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Search filter across name, rollNumber, or email
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { fullName: searchRegex },
        { rollNumber: searchRegex },
        { email: searchRegex },
      ];
    }

    // Specific filters
    if (department && department !== 'All') {
      query.department = department;
    }
    if (semester && semester !== 'All') {
      query.semester = Number(semester);
    }
    if (status && status !== 'All') {
      query.status = status;
    }

    // Pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortOptions = { [sortBy]: sortOrder };

    const total = await Student.countDocuments(query);
    const students = await Student.find(query)
      .populate('createdBy', 'name email role')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: students.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      students,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single student by ID
// @route   GET /api/students/:id
// @access  Private
export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      'createdBy',
      'name email role'
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student record not found.',
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new student record
// @route   POST /api/students
// @access  Private
export const createStudent = async (req, res, next) => {
  try {
    const {
      fullName,
      rollNumber,
      email,
      department,
      semester,
      cgpa,
      status,
      phone,
      gender,
      dateOfBirth,
      guardianName,
      guardianPhone,
      address,
    } = req.body;

    // Check rollNumber uniqueness
    const existingRoll = await Student.findOne({
      rollNumber: rollNumber?.toUpperCase().trim(),
    });
    if (existingRoll) {
      return res.status(400).json({
        success: false,
        message: `A student with roll number ${rollNumber} already exists.`,
      });
    }

    // Check email uniqueness
    const existingEmail = await Student.findOne({
      email: email?.toLowerCase().trim(),
    });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: `A student with email address ${email} already exists.`,
      });
    }

    const student = await Student.create({
      fullName,
      rollNumber: rollNumber?.toUpperCase().trim(),
      email: email?.toLowerCase().trim(),
      department,
      semester: Number(semester),
      cgpa: parseFloat(cgpa),
      status: status || 'Active',
      phone,
      gender: gender || 'Male',
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      guardianName,
      guardianPhone,
      address,
      createdBy: req.user._id,
    });

    await ActivityLog.create({
      user: req.user._id,
      userName: req.user.name,
      action: 'CREATE_STUDENT',
      entityType: 'Student',
      entityId: student._id.toString(),
      description: `Added new student: ${student.fullName} (${student.rollNumber}) in ${student.department}`,
    });

    res.status(201).json({
      success: true,
      message: 'Student record created successfully!',
      student,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update student record
// @route   PUT /api/students/:id
// @access  Private
export const updateStudent = async (req, res, next) => {
  try {
    let student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student record not found.',
      });
    }

    const {
      fullName,
      rollNumber,
      email,
      department,
      semester,
      cgpa,
      status,
      phone,
      gender,
      dateOfBirth,
      guardianName,
      guardianPhone,
      address,
    } = req.body;

    // Check roll number uniqueness if changed
    if (
      rollNumber &&
      rollNumber.toUpperCase().trim() !== student.rollNumber
    ) {
      const existingRoll = await Student.findOne({
        rollNumber: rollNumber.toUpperCase().trim(),
        _id: { $ne: student._id },
      });
      if (existingRoll) {
        return res.status(400).json({
          success: false,
          message: `A student with roll number ${rollNumber} already exists.`,
        });
      }
      student.rollNumber = rollNumber.toUpperCase().trim();
    }

    // Check email uniqueness if changed
    if (email && email.toLowerCase().trim() !== student.email) {
      const existingEmail = await Student.findOne({
        email: email.toLowerCase().trim(),
        _id: { $ne: student._id },
      });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: `A student with email ${email} already exists.`,
        });
      }
      student.email = email.toLowerCase().trim();
    }

    if (fullName) student.fullName = fullName.trim();
    if (department) student.department = department;
    if (semester !== undefined) student.semester = Number(semester);
    if (cgpa !== undefined) student.cgpa = parseFloat(cgpa);
    if (status) student.status = status;
    if (phone) student.phone = phone.trim();
    if (gender) student.gender = gender;
    if (dateOfBirth) student.dateOfBirth = new Date(dateOfBirth);
    if (guardianName !== undefined) student.guardianName = guardianName.trim();
    if (guardianPhone !== undefined) student.guardianPhone = guardianPhone.trim();
    if (address !== undefined) student.address = address.trim();

    await student.save();

    await ActivityLog.create({
      user: req.user._id,
      userName: req.user.name,
      action: 'UPDATE_STUDENT',
      entityType: 'Student',
      entityId: student._id.toString(),
      description: `Updated student record: ${student.fullName} (${student.rollNumber})`,
    });

    res.status(200).json({
      success: true,
      message: 'Student record updated successfully!',
      student,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete student record
// @route   DELETE /api/students/:id
// @access  Private
export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student record not found.',
      });
    }

    const studentInfo = `${student.fullName} (${student.rollNumber})`;
    await student.deleteOne();

    await ActivityLog.create({
      user: req.user._id,
      userName: req.user.name,
      action: 'DELETE_STUDENT',
      entityType: 'Student',
      entityId: req.params.id,
      description: `Deleted student record: ${studentInfo}`,
    });

    res.status(200).json({
      success: true,
      message: `Student record '${studentInfo}' deleted successfully.`,
    });
  } catch (err) {
    next(err);
  }
};

