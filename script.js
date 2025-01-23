// Store courses data
let courses = [];

// Add course data when the "Add Course" button is clicked
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
  
  // Add course to the list
  courses.push({ name, marks, credits, gradePoints });

  // Update the table and reset the form
  displayCourses();
  document.getElementById('courseForm').reset();
});

// Calculate GPA when the "Calculate GPA" button is clicked
document.getElementById('calculateGPA').addEventListener('click', () => {
  const gpa = calculateGPA();
  if (gpa !== null) {
    document.getElementById('gpaDisplay').textContent = `GPA: ${gpa.toFixed(2)}`;
  }
});

// Calculate CGPA when the "Calculate CGPA" button is clicked
document.getElementById('calculateCGPA').addEventListener('click', () => {
  const cgpa = calculateCGPA();
  if (cgpa !== null) {
    document.getElementById('cgpaDisplay').textContent = `CGPA: ${cgpa.toFixed(2)}`;
  }
});

// Function to calculate grade points based on marks
function calculateGradePoints(marks) {
  if (marks >= 90) return 4.0;
  if (marks >= 80) return 3.7;
  if (marks >= 70) return 3.0;
  if (marks >= 60) return 2.0;
  return 0.0;
}

// Function to calculate GPA
function calculateGPA() {
  if (courses.length === 0) {
    alert('No courses added yet.');
    return null;
  }

  let totalPoints = 0;
  let totalCredits = 0;

  for (const course of courses) {
    totalPoints += course.gradePoints * course.credits;
    totalCredits += course.credits;
  }

  return totalPoints / totalCredits;
}

// Function to calculate CGPA (same as GPA for simplicity; can extend for multiple semesters)
function calculateCGPA() {
  return calculateGPA();
}

// Function to dynamically display courses in the table
function displayCourses() {
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
