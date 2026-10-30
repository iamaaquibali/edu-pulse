const BASE = 'http://127.0.0.1:5000/api';

const populate = async () => {
  console.log('[Populate] Setting up demo accounts on running server via fetch...');
  
  // 1. Register or Login Admin
  let token = '';
  try {
    const regRes = await fetch(`${BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Dr. Sarah Mitchell',
        email: 'admin@college.edu',
        password: 'Password@123',
        confirmPassword: 'Password@123',
        role: 'Admin',
        department: 'Computer Science & Engineering',
      }),
    });
    const regData = await regRes.json();
    if (regRes.status === 201) {
      token = regData.token;
      console.log('[Populate] Registered admin@college.edu');
    } else {
      const loginRes = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@college.edu',
          password: 'Password@123',
        }),
      });
      const loginData = await loginRes.json();
      token = loginData.token;
      console.log('[Populate] Signed in as admin@college.edu');
    }
  } catch (e) {
    console.error('Error authenticating admin:', e);
    return;
  }

  // 2. Register Faculty
  try {
    await fetch(`${BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Prof. Alex Johnson',
        email: 'faculty@college.edu',
        password: 'Password@123',
        confirmPassword: 'Password@123',
        role: 'Faculty',
        department: 'Information Technology',
      }),
    });
    console.log('[Populate] Ensured faculty@college.edu exists');
  } catch (e) {
    // Ignore if already exists
  }

  // 3. Populate Students
  const demoStudents = [
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
      guardianName: 'Rajesh Sharma',
      guardianPhone: '+91 98765 11111',
      address: 'Sector 14, Rohini, New Delhi',
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
      guardianName: 'Arthur Watson',
      guardianPhone: '+1 (555) 987-6543',
      address: '42 Baker St, Boston, MA',
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
      guardianName: 'Suresh Verma',
      guardianPhone: '+91 91234 99999',
      address: 'B-12 Green Park, Bangalore',
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
      guardianName: 'Carlos Martinez',
      guardianPhone: '+1 (555) 333-2222',
      address: '108 Sunnyvale Ave, San Jose, CA',
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
      guardianName: 'Baldev Singh',
      guardianPhone: '+91 99887 00000',
      address: 'Phase 7, Mohali, Punjab',
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
      guardianName: 'Prakash Deshmukh',
      guardianPhone: '+91 98220 67890',
      address: 'Kothrud, Pune, Maharashtra',
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
      guardianName: 'Sean O\'Connor',
      guardianPhone: '+1 (555) 444-5555',
      address: '89 Maple St, Chicago, IL',
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
      guardianName: 'Madhavan Nambiar',
      guardianPhone: '+91 94470 11223',
      address: 'Kaloor, Kochi, Kerala',
    },
  ];

  for (const s of demoStudents) {
    try {
      const res = await fetch(`${BASE}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(s),
      });
      const data = await res.json();
      if (res.status === 201) {
        console.log(`[Populate] Created: ${s.fullName} (${s.rollNumber})`);
      } else {
        console.log(`[Populate] Skip/Exists: ${s.fullName} (${data.message})`);
      }
    } catch (err) {
      console.error('Error creating student:', err.message);
    }
  }

  console.log('[Populate] Completed successfully!');
};

populate();
