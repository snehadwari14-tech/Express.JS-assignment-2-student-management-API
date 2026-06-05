const express = require("express");
const app = express();

app.use(express.json());

// Sample Data
let students = [
  { id: 1, name: "Rahul", course: "BCA", city: "Kolkata", fees: 25000 },
  { id: 2, name: "Sneha", course: "BTech", city: "Delhi", fees: 40000 },
  { id: 3, name: "Amit", course: "BCA", city: "Mumbai", fees: 30000 }
];

// 1. Welcome Message
app.get("/", (req, res) => {
  res.send("Welcome to Student Management API");
});

// 2. Fetch All Students
app.get("/students", (req, res) => {
  res.json(students);
});

// 3. Fetch Student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);

    if (student) { return res.status(200).json(student); }
    else { return res.status(404).json({ message: "Student not found" }); }
    res.json(student);
});


// 4. Add New Student
app.post("/students", (req, res) => {
  students.push(req.body);
  res.json({ message: "Student added", students });
});

// 5. Delete Student by ID
app.delete("/students/:id", (req, res) => {
  students = students.filter(s => s.id != req.params.id);
  res.json({ message: "Student deleted", students });
});

// 6. Update Student
app.put("/students/:id", (req, res) => {
  const index = students.findIndex(s => s.id == req.params.id);

  if (index !== -1) {
    students[index] = { ...students[index], ...req.body };
    res.json(students[index]);
  } else {
    res.json({ message: "Student not found" });
  }
});

// 7. Search by Name
app.get("/search/name/:name", (req, res) => {
  const result = students.filter(
    s => s.name.toLowerCase().includes(req.params.name.toLowerCase())
  );
  res.json(result);
});

// 8. Search by Course
app.get("/search/course/:course", (req, res) => {
  const result = students.filter(
    s => s.course.toLowerCase() === req.params.course.toLowerCase()
  );
  res.json(result);
});

// 9. Filter by City
app.get("/search/city/:city", (req, res) => {
  const result = students.filter(
    s => s.city.toLowerCase() === req.params.city.toLowerCase()
  );
  res.json(result);
});

// 10. Count Students
app.get("/count", (req, res) => {
  res.json({ totalStudents: students.length });
});

// 11. Fees Greater Than Amount
app.get("/fees/greater/:amount", (req, res) => {
  const result = students.filter(
    s => s.fees > Number(req.params.amount)
  );
  res.json(result);
});

// 12. Fees Less Than Amount
app.get("/fees/less/:amount", (req, res) => {
  const result = students.filter(
    s => s.fees < Number(req.params.amount)
  );
  res.json(result);
});

// 13. Sort by Name
app.get("/sort/name", (req, res) => {
  const result = [...students].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  res.json(result);
});

// 14. Sort Fees Low to High
app.get("/sort/fees/asc", (req, res) => {
  const result = [...students].sort((a, b) => a.fees - b.fees);
  res.json(result);
});

// 15. Sort Fees High to Low
app.get("/sort/fees/desc", (req, res) => {
  const result = [...students].sort((a, b) => b.fees - a.fees);
  res.json(result);
});

// 16. Check Student Exists
app.get("/exists/:id", (req, res) => {
  const exists = students.some(s => s.id == req.params.id);
  res.json({ exists });
});

// 17. Total Fees Collected
app.get("/fees/total", (req, res) => {
  const total = students.reduce((sum, s) => sum + s.fees, 0);
  res.json({ totalFees: total });
});

// 18. Course Wise Students
app.get("/coursewise", (req, res) => {
  const result = {};

  students.forEach(student => {
    if (!result[student.course]) {
      result[student.course] = [];
    }
    result[student.course].push(student);
  });

  res.json(result);
});

// 19. Add Multiple Students
app.post("/students/bulk", (req, res) => {
  students.push(...req.body);
  res.json({
    message: "Multiple students added",
    students
  });
});

// 20. Student Dashboard Report
app.get("/dashboard", (req, res) => {
  const totalStudents = students.length;

  const totalFees = students.reduce(
    (sum, s) => sum + s.fees,0);

  const courses = [...new Set(students.map(s => s.course))];

  res.json({
    totalStudents,
    totalFees,
    courses
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});