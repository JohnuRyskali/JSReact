{
const students = [
  { id: 1, name: "Anna", grade: 85 },
  { id: 2, name: "John", grade: 62 },
  { id: 3, name: "Sara", grade: 91 },
  { id: 4, name: "Mike", grade: 55 }
];

const passedStudents = students.filter(s => s.grade >= 70);

const studentNames = students.map(s => s.name);

const studentThree = students.find(s => s.id === 3);

const topStudent = students.reduce((top, s) => (s.grade > top.grade ? s : top), students[0]);

const totalGrade = students.reduce((acc, s) => acc + s.grade, 0);
const avgGrade = totalGrade / students.length;

const studentsWithStatus = students.map(s => ({
  ...s,
  passed: s.grade >= 70
}));

console.log(passedStudents);
console.log(studentNames);
console.log(studentThree);
console.log(topStudent);
console.log(totalGrade);
console.log(avgGrade);
console.log(studentsWithStatus);
}