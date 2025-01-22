// Arrays to store grades and credits
let grades = [];
let credits = [];

// Function to add a new subject row
function addSubject() {
    const subjectsDiv = document.getElementById('subjects');
    const newRow = document.createElement('div');
    newRow.classList.add('subject-row');
    newRow.innerHTML = `
        <input type="number" class="grade" placeholder="Grade (0-4)" min="0" max="4" step="0.01">
        <input type="number" class="credit" placeholder="Credits" min="1" step="1">
    `;
    subjectsDiv.appendChild(newRow);
}

// Function to calculate CGPA
function calculateCGPA() {
    const gradeInputs = document.querySelectorAll('.grade');
    const creditInputs = document.querySelectorAll('.credit');

    // Reset arrays and totals
    grades = [];
    credits = [];
    let totalQualityPoints = 0;
    let totalCredits = 0;

    // Loop through inputs and calculate total quality points and credits
    for (let i = 0; i < gradeInputs.length; i++) {
        const grade = parseFloat(gradeInputs[i].value);
        const credit = parseFloat(creditInputs[i].value);

        if (!isNaN(grade) && !isNaN(credit) && grade >= 0 && grade <= 4 && credit > 0) {
            grades.push(grade);
            credits.push(credit);
            totalQualityPoints += grade * credit;
            totalCredits += credit;
        } else {
            alert('Please enter valid grades (0-4) and credits (>0).');
            return;
        }
    }

    // Calculate CGPA
    const cgpa = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : 0;

    // Display result
    document.getElementById('result').innerText = `Your CGPA is: ${cgpa}`;
}
