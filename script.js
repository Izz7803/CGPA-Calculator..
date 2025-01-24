// Store semester data
let semesters = []; // Each semester contains a list of courses

// Store current semester courses
let currentSemester = [];

// Add course data to the current semester
document.getElementById('addCourse').addEventListener('click', () => {
  const name = document.getElementById('courseName').value.trim();
  const marks = parseFloat(document.getElementById('marks').value);
  const credits = parseFloat(document.getElementById('credits').value);

  // Input validation
  if (!name || isNaN(marks) || isNaN(credits) || marks < 0 || marks > 100 || credits <= 0) {
    alert('Please provide valid inputs.');
    return;
  }

  // Calculate grade points based on marks
  const gradePoints = calculateGradePoints(marks);
  
  // Add course to the current semester
  currentSemester.push({ name, marks, credits, gradePoints });

  // Update the table and reset the form
  displayCourses(currentSemester);
  document.getElementById('courseForm').reset();
});

// Save current semester and reset for the next semester
document.getElementById('saveSemester').addEventListener('click', () => {
  if (currentSemester.length === 0) {
    alert('No courses to save for the semester.');
    return;
  }

  // Calculate GPA for the current semester
  const gpa = calculateGPA(currentSemester);
  semesters.push({ courses: currentSemester, gpa });
  
  // Reset the current semester
  currentSemester = [];
  displayCourses(currentSemester); // Clear the table
  alert(`Semester saved! GPA: ${gpa.toFixed(2)}`);
});

// Calculate GPA for the current semester
document.getElementById('calculateGPA').addEventListener('click', () => {
  if (currentSemester.length === 0) {
    alert('No courses added yet.');
    return;
  }

  const gpa = calculateGPA(currentSemester);
  document.getElementById('gpaDisplay').textContent = `GPA: ${gpa.toFixed(2)}`;
});

// Calculate CGPA across all saved semesters
document.getElementById('calculateCGPA').addEventListener('click', () => {
  if (semesters.length === 0) {
    alert('No semesters saved yet.');
    return;
  }

  const cgpa = calculateCGPA();
  document.getElementById('cgpaDisplay').textContent = `CGPA: ${cgpa.toFixed(2)}`;
});

// Function to calculate grade points based on marks
function calculateGradePoints(marks) {
  if (marks >= 90) return 4.0;
  if (marks >= 80) return 3.7;
  if (marks >= 70) return 3.0;
  if (marks >= 60) return 2.0;
  return 0.0;
}

// Function to calculate GPA for a single semester
function calculateGPA(courses) {
  let totalPoints = 0;
  let totalCredits = 0;

  for (const course of courses) {
    totalPoints += course.gradePoints * course.credits;
    totalCredits += course.credits;
  }

  return totalPoints / totalCredits;
}

// Function to calculate CGPA across all semesters
function calculateCGPA() {
  let totalPoints = 0;
  let totalCredits = 0;

  for (const semester of semesters) {
    for (const course of semester.courses) {
      totalPoints += course.gradePoints * course.credits;
      totalCredits += course.credits;
    }
  }

  return totalPoints / totalCredits;
}

// Function to dynamically display courses in the table
function displayCourses(courses) {
  const tbody = document.querySelector('#resultsTable tbody');
  tbody.innerHTML = ''; // Clear existing rows

  for (const course of courses) {
    const row = `<tr>
      <td>${course.name}</td>
      <td>${course.marks}</td>
      <td>${course.credits}</td>
      <td>${course.gradePoints.toFixed(2)}</td>
    </tr>`;
    tbody.innerHTML += row;
  }
}
