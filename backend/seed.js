import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User.js';
import { Student } from './models/Student.js';
import { ActivityLog } from './models/ActivityLog.js';
import { connectDB } from './config/db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('[Seed] Clearing existing collections...');
    await User.deleteMany({});
    await Student.deleteMany({});
    await ActivityLog.deleteMany({});

    console.log('[Seed] Creating demo faculty and admin users...');
    const adminUser = await User.create({
      name: 'Dr. Sarah Mitchell',
      email: 'admin@college.edu',
      password: 'Password@123',
      role: 'Admin',
      department: 'Computer Science & Engineering',
      phone: '+1 (555) 019-2834',
      bio: 'Head of Academic Affairs & Systems Administrator.',
    });

    const facultyUser = await User.create({
      name: 'Prof. Alex Johnson',
      email: 'faculty@college.edu',
      password: 'Password@123',
      role: 'Faculty',
      department: 'Information Technology',
      phone: '+1 (555) 014-9982',
      bio: 'Assistant Professor, Department of Information Technology.',
    });

    console.log('[Seed] Users created:');
    console.log(`  - Admin:   ${adminUser.email} / Password@123`);
    console.log(`  - Faculty: ${facultyUser.email} / Password@123`);

    console.log('[Seed] Populating realistic student records...');
    const sampleStudents = [
      {
        fullName: 'Aarav Sharma',
        rollNumber: 'CS2023001',
        email: 'aarav.sharma@student.edu',
        department: 'Computer Science',
        semester: 6,
        cgpa: 9.42,
        status: 'Active',
        phone: '+91 98765 43210',
        gender: 'Male',
        dateOfBirth: new Date('2003-05-14'),
        guardianName: 'Rajesh Sharma',
        guardianPhone: '+91 98765 11111',
        address: 'Sector 14, Rohini, New Delhi',
        createdBy: adminUser._id,
      },
      {
        fullName: 'Emily Watson',
        rollNumber: 'IT2023015',
        email: 'emily.watson@student.edu',
        department: 'Information Technology',
        semester: 4,
        cgpa: 8.85,
        status: 'Active',
        phone: '+1 (555) 345-6789',
        gender: 'Female',
        dateOfBirth: new Date('2004-09-22'),
        guardianName: 'Arthur Watson',
        guardianPhone: '+1 (555) 987-6543',
        address: '42 Baker St, Boston, MA',
        createdBy: facultyUser._id,
      },
      {
        fullName: 'Rohan Verma',
        rollNumber: 'EC2023042',
        email: 'rohan.verma@student.edu',
        department: 'Electronics & Comm.',
        semester: 8,
        cgpa: 8.20,
        status: 'Graduated',
        phone: '+91 91234 56789',
        gender: 'Male',
        dateOfBirth: new Date('2002-11-03'),
        guardianName: 'Suresh Verma',
        guardianPhone: '+91 91234 99999',
        address: 'B-12 Green Park, Bangalore',
        createdBy: adminUser._id,
      },
      {
        fullName: 'Sophia Martinez',
        rollNumber: 'CS2023089',
        email: 'sophia.m@student.edu',
        department: 'Computer Science',
        semester: 6,
        cgpa: 9.75,
        status: 'Active',
        phone: '+1 (555) 765-4321',
        gender: 'Female',
        dateOfBirth: new Date('2003-08-19'),
        guardianName: 'Carlos Martinez',
        guardianPhone: '+1 (555) 333-2222',
        address: '108 Sunnyvale Ave, San Jose, CA',
        createdBy: adminUser._id,
      },
      {
        fullName: 'Vikram Singh',
        rollNumber: 'ME2023012',
        email: 'vikram.singh@student.edu',
        department: 'Mechanical Eng.',
        semester: 5,
        cgpa: 7.65,
        status: 'Active',
        phone: '+91 99887 76655',
        gender: 'Male',
        dateOfBirth: new Date('2003-01-30'),
        guardianName: 'Baldev Singh',
        guardianPhone: '+91 99887 00000',
        address: 'Phase 7, Mohali, Punjab',
        createdBy: facultyUser._id,
      },
      {
        fullName: 'Ananya Deshmukh',
        rollNumber: 'DS2023004',
        email: 'ananya.d@student.edu',
        department: 'Data Science',
        semester: 3,
        cgpa: 9.10,
        status: 'Active',
        phone: '+91 98220 12345',
        gender: 'Female',
        dateOfBirth: new Date('2004-12-08'),
        guardianName: 'Prakash Deshmukh',
        guardianPhone: '+91 98220 67890',
        address: 'Kothrud, Pune, Maharashtra',
        createdBy: facultyUser._id,
      },
      {
        fullName: 'Liam O\'Connor',
        rollNumber: 'BA2023030',
        email: 'liam.oc@student.edu',
        department: 'Business Administration',
        semester: 4,
        cgpa: 6.90,
        status: 'Inactive',
        phone: '+1 (555) 234-8901',
        gender: 'Male',
        dateOfBirth: new Date('2003-07-15'),
        guardianName: 'Sean O\'Connor',
        guardianPhone: '+1 (555) 444-5555',
        address: '89 Maple St, Chicago, IL',
        createdBy: adminUser._id,
      },
      {
        fullName: 'Priya Nambiar',
        rollNumber: 'EE2023021',
        email: 'priya.n@student.edu',
        department: 'Electrical Eng.',
        semester: 7,
        cgpa: 8.92,
        status: 'Active',
        phone: '+91 94470 54321',
        gender: 'Female',
        dateOfBirth: new Date('2002-04-12'),
        guardianName: 'Madhavan Nambiar',
        guardianPhone: '+91 94470 11223',
        address: 'Kaloor, Kochi, Kerala',
        createdBy: adminUser._id,
      },
      {
        fullName: 'David Kim',
        rollNumber: 'CS2023104',
        email: 'david.kim@student.edu',
        department: 'Computer Science',
        semester: 2,
        cgpa: 8.40,
        status: 'Active',
        phone: '+1 (555) 901-2345',
        gender: 'Male',
        dateOfBirth: new Date('2005-02-18'),
        guardianName: 'Jin Kim',
        guardianPhone: '+1 (555) 888-7777',
        address: '210 Pine Ave, Seattle, WA',
        createdBy: facultyUser._id,
      },
      {
        fullName: 'Fatima Al-Mansoor',
        rollNumber: 'CE2023008',
        email: 'fatima.am@student.edu',
        department: 'Civil Eng.',
        semester: 6,
        cgpa: 7.95,
        status: 'Active',
        phone: '+1 (555) 678-9012',
        gender: 'Female',
        dateOfBirth: new Date('2003-10-25'),
        guardianName: 'Tariq Al-Mansoor',
        guardianPhone: '+1 (555) 666-5555',
        address: '77 Lakeview Blvd, Austin, TX',
        createdBy: facultyUser._id,
      },
    ];

    const inserted = await Student.insertMany(sampleStudents);
    console.log(`[Seed] Successfully inserted ${inserted.length} student records.`);

    console.log('[Seed] Creating initial system activity logs...');
    const activities = [
      {
        user: adminUser._id,
        userName: adminUser.name,
        action: 'USER_REGISTER',
        entityType: 'User',
        entityId: adminUser._id.toString(),
        description: 'System Administrator account initialized.',
      },
      {
        user: facultyUser._id,
        userName: facultyUser.name,
        action: 'USER_LOGIN',
        entityType: 'User',
        entityId: facultyUser._id.toString(),
        description: 'Faculty portal login session started.',
      },
      {
        user: adminUser._id,
        userName: adminUser.name,
        action: 'CREATE_STUDENT',
        entityType: 'Student',
        entityId: inserted[0]._id.toString(),
        description: `Enrolled student Aarav Sharma (CS2023001) in Computer Science.`,
      },
      {
        user: facultyUser._id,
        userName: facultyUser.name,
        action: 'CREATE_STUDENT',
        entityType: 'Student',
        entityId: inserted[1]._id.toString(),
        description: `Enrolled student Emily Watson (IT2023015) in Information Technology.`,
      },
    ];

    await ActivityLog.insertMany(activities);
    console.log(`[Seed] Inserted ${activities.length} activity logs.`);

    console.log('====================================================');
    console.log('Database seeding completed successfully!');
    console.log('You can now log in with:');
    console.log('  Email:    admin@college.edu');
    console.log('  Password: Password@123');
    console.log('====================================================');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    process.exit(1);
  }
};

seedData();

