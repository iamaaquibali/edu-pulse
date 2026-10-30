import http from 'http';

const BASE_URL = process.env.API_URL || 'http://localhost:5000';

const request = (path, method = 'GET', body = null, token = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

const runTests = async () => {
  console.log('--- STARTING COMPREHENSIVE BACKEND API TEST SUITE ---');
  let testsPassed = 0;
  let testsFailed = 0;

  const assert = (condition, description) => {
    if (condition) {
      console.log(`[PASS] ${description}`);
      testsPassed++;
    } else {
      console.error(`[FAIL] ${description}`);
      testsFailed++;
    }
  };

  try {
    // 1. Health check
    const health = await request('/api/health');
    assert(health.status === 200 && health.body.status === 'online', '1. Server Health Check Endpoint');

    // Test unique email for registration
    const uniqueEmail = `testuser_${Date.now()}@college.edu`;

    // 2. User Registration
    const regRes = await request('/api/auth/register', 'POST', {
      name: 'Professor Tester',
      email: uniqueEmail,
      password: 'SecurePassword123!',
      confirmPassword: 'SecurePassword123!',
      role: 'Faculty',
      department: 'Computer Science',
    });
    assert(regRes.status === 201 && regRes.body.token, '2. User Registration & JWT Generation');

    // 3. Duplicate Email Prevention
    const dupRes = await request('/api/auth/register', 'POST', {
      name: 'Duplicate Tester',
      email: uniqueEmail,
      password: 'SecurePassword123!',
      confirmPassword: 'SecurePassword123!',
    });
    assert(dupRes.status === 400, '3. Duplicate Email Rejection (Expected HTTP 400)');

    // 4. Invalid Login Credentials
    const invalidLogin = await request('/api/auth/login', 'POST', {
      email: uniqueEmail,
      password: 'WrongPassword999',
    });
    assert(invalidLogin.status === 401, '4. Invalid Credentials Rejected (Expected HTTP 401)');

    // 5. Valid Login
    const loginRes = await request('/api/auth/login', 'POST', {
      email: uniqueEmail,
      password: 'SecurePassword123!',
    });
    assert(loginRes.status === 200 && loginRes.body.token, '5. Valid Login Returns JWT Token');
    const authToken = loginRes.body.token;

    // 6. Protected Route without Token (Expected 401)
    const unauthorized = await request('/api/auth/me', 'GET');
    assert(unauthorized.status === 401, '6. Protected Route Access Denied Without Token');

    // 7. Protected Route with Token (/api/auth/me)
    const meRes = await request('/api/auth/me', 'GET', null, authToken);
    assert(meRes.status === 200 && meRes.body.user.email === uniqueEmail, '7. Protected Route /api/auth/me with Bearer Token');

    // 8. Create Student (POST /api/students)
    const rollNo = `CS${Math.floor(100000 + Math.random() * 900000)}`;
    const studentRes = await request(
      '/api/students',
      'POST',
      {
        fullName: 'Jane Doe',
        rollNumber: rollNo,
        email: `jane.${rollNo.toLowerCase()}@student.edu`,
        department: 'Computer Science',
        semester: 4,
        cgpa: 9.35,
        status: 'Active',
        phone: '+1 555-0199',
        gender: 'Female',
        guardianName: 'John Doe',
        guardianPhone: '+1 555-0100',
        address: '100 University Ave',
      },
      authToken
    );
    assert(studentRes.status === 201 && studentRes.body.student._id, '8. Create Student Record (POST /api/students)');
    const createdStudentId = studentRes.body.student?._id;

    // 9. Read Students with Filter (GET /api/students)
    const listRes = await request('/api/students?department=Computer%20Science', 'GET', null, authToken);
    assert(listRes.status === 200 && Array.isArray(listRes.body.students), '9. Read Students with Filters & Pagination');

    // 10. Read Single Student (GET /api/students/:id)
    const singleRes = await request(`/api/students/${createdStudentId}`, 'GET', null, authToken);
    assert(singleRes.status === 200 && singleRes.body.student.rollNumber === rollNo, '10. Read Single Student by ID');

    // 11. Update Student (PUT /api/students/:id)
    const updateRes = await request(
      `/api/students/${createdStudentId}`,
      'PUT',
      {
        cgpa: 9.85,
        status: 'Active',
        phone: '+1 555-9999',
      },
      authToken
    );
    assert(updateRes.status === 200 && updateRes.body.student.cgpa === 9.85, '11. Update Student Record (PUT /api/students/:id)');

    // 12. Dashboard Stats (GET /api/dashboard/stats)
    const statsRes = await request('/api/dashboard/stats', 'GET', null, authToken);
    assert(
      statsRes.status === 200 &&
      statsRes.body.stats &&
      statsRes.body.stats.totalStudents >= 1,
      '12. Dashboard Aggregated Statistics (GET /api/dashboard/stats)'
    );

    // 13. Profile Update (PUT /api/auth/profile)
    const profileRes = await request(
      '/api/auth/profile',
      'PUT',
      {
        name: 'Professor Tester Ph.D.',
        bio: 'Senior Academic Advisor and Researcher.',
      },
      authToken
    );
    assert(profileRes.status === 200 && profileRes.body.user.name === 'Professor Tester Ph.D.', '13. User Profile Update (PUT /api/auth/profile)');

    // 14. Delete Student Record (DELETE /api/students/:id)
    const delRes = await request(`/api/students/${createdStudentId}`, 'DELETE', null, authToken);
    assert(delRes.status === 200, '14. Delete Student Record (DELETE /api/students/:id)');

    // 15. Verify Deletion (GET /api/students/:id should return 404)
    const verifyDel = await request(`/api/students/${createdStudentId}`, 'GET', null, authToken);
    assert(verifyDel.status === 404, '15. Verify Deleted Record Returns 404');

    console.log('----------------------------------------------------');
    console.log(`TOTAL TESTS: ${testsPassed + testsFailed} | PASSED: ${testsPassed} | FAILED: ${testsFailed}`);
    console.log('----------------------------------------------------');

    if (testsFailed === 0) {
      console.log('ALL BACKEND API TESTS COMPLETED SUCCESSFULLY!');
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error('Test execution error:', error);
    process.exit(1);
  }
};

runTests();

