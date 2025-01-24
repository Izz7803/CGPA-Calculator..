// Store semester data
let semesters = []; // Array to store all semesters
let currentSemester = []; // Courses for the current semester

// Add course to the current semester
document.getElementById('addCourse').addEventListener('click', () => {
  const name = document.getElementById('courseName').value.trim();
  const marks = parseFloat(document.getElementById('marks').value);
  const credits = parseFloat(document.getElementById('credits').value);

  // Validate input
  if (!name || isNaN(marks) || isNaN(credits) || marks < 0 || marks > 100 || credits <= 0) {
    showNotification('Please provide valid inputs!', 'error');
    return;
  }

  // Calculate grade points
  const gradePoints = calculateGradePoints(marks);

  // Add course to current semester
  currentSemester.push({ name, marks, credits, gradePoints });

  // Update the table
  displayCourses(currentSemester);
  document.getElementById('courseForm').reset();

  showNotification(`Course "${name}" added successfully!`, 'success');
});

// Save current semester and prepare for a new one
document.getElementById('saveSemester').addEventListener('click', () => {
  if (currentSemester.length === 0) {
    showNotification('No courses to save for the semester.', 'error');
    return;
  }

  // Calculate and save GPA for the current semester
  const gpa = calculateGPA(currentSemester);
  semesters.push({ courses: [...currentSemester], gpa });

  // Reset current semester
  currentSemester = [];
  displayCourses(currentSemester);

  showNotification(`Semester saved! GPA: ${gpa.toFixed(2)}`, 'success');
});

// Calculate GPA for the current semester
document.getElementById('calculateGPA').addEventListener('click', () => {
  if (currentSemester.length === 0) {
    showNotification('No courses added yet.', 'error');
    return;
  }

  const gpa = calculateGPA(currentSemester);
  document.getElementById('gpaDisplay').innerHTML = `<i class="fas fa-graduation-cap"></i> GPA: ${gpa.toFixed(2)}`;
  showNotification(`Current Semester GPA: ${gpa.toFixed(2)}`, 'info');
});

// Calculate CGPA across all semesters
document.getElementById('calculateCGPA').addEventListener('click', () => {
  if (semesters.length === 0) {
    showNotification('No semesters saved yet.', 'error');
    return;
  }

  const cgpa = calculateCGPA();
  document.getElementById('cgpaDisplay').innerHTML = `<i class="fas fa-chart-line"></i> CGPA: ${cgpa.toFixed(2)}`;
  showNotification(`Cumulative CGPA: ${cgpa.toFixed(2)}`, 'info');
});

// Calculate grade points based on marks
function calculateGradePoints(marks) {
  if (marks >= 90) return 4.0;
  if (marks >= 80) return 3.7;
  if (marks >= 70) return 3.0;
  if (marks >= 60) return 2.0;
  return 0.0;
}

// Calculate GPA for a single semester
function calculateGPA(courses) {
  let totalPoints = 0;
  let totalCredits = 0;

  for (const course of courses) {
    totalPoints += course.gradePoints * course.credits;
    totalCredits += course.credits;
  }

  return totalPoints / totalCredits;
}

// Calculate CGPA across all semesters
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

// Display courses in the table
function displayCourses(courses) {
  const tbody = document.querySelector('#resultsTable tbody');
  tbody.innerHTML = '';

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

// Display notifications
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}
