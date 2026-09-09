{
const students = [
  { id: 1, name: "Anna", age: 20, grades: [85, 90, 88] },
  { id: 2, name: "John", age: 22, grades: [60, 65, 58] },
  { id: 3, name: "Sara", age: 21, grades: [95, 92, 98] },
  { id: 4, name: "Mike", age: 23, grades: [50, 55, 62] },
  { id: 5, name: "Elena", age: 19, grades: [78, 82, 80] }
];

// average of a grade array
const getAverage = grades => 
  grades.length ? grades.reduce((sum, g) => sum + g, 0) / grades.length : 0;

// average grade of a single student
const getStudentAverage = student => getAverage(student.grades);

// students who passed
const getPassedStudents = studentsList => 
  studentsList.filter(student => getStudentAverage(student) >= 70);

// all student names
const getStudentNames = studentsList => 
  studentsList.map(student => student.name);

// student by ID
const findStudent = (studentsList, id) => 
  studentsList.find(student => student.id === id);

// student with the highest average grade
const getTopStudent = studentsList => 
  studentsList.reduce((top, student) => 
    getStudentAverage(student) > getStudentAverage(top) ? student : top
  , studentsList[0]);

// concise overview array (Immutable transform)
const studentSummaries = students.map(student => {
  const avg = Number(getStudentAverage(student).toFixed(2));
  return {
    id: student.id,
    name: student.name,
    average: avg,
    passed: avg >= 70
  };
});

console.log("Passed Students:", getPassedStudents(students));
console.log("Top Student:", getTopStudent(students));
console.log("Summaries:", studentSummaries);
}