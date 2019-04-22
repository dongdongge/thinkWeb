import request from '../common/request.js';

const student = '/student';
export async function studentFindStudentAll() {
  return request(`${student}/think/student/find/student`,{});
}
export async function studentFindClassAll() {
  return request(`${student}/think/student/find/class`,{});
}
export async function studentAddStudent(params) {
  return request(`${student}/think/student/add/student`,{method:"POST",body:params});
}
export async function studentDeleteStudent(params) {
  return request(`${student}/think/student/delete/student/${params.sno}`,{method:"DELETE"});
}
export async function courseFindCourseAll() {
  return request(`${student}/think/student/find/course`,{});
}
export async function courseAddCourse(params) {
  return request(`${student}/think/student/add/course`,{method:"POST",body:params});
}
export async function teacherFindTeacher() {
  return request(`${student}/think/student/find/teacher`,{});
}
export async function teacherAddTeacher(params) {
  return request(`${student}/think/student/add/teacher`,{method:"POST",body:params})
}
export async function teacherDelete(params) {
  return request(`${student}/think/student/delete/teacher/${params.tno}`,{method:"DELETE"})
}
export async function teacherGetTeacherTno() {
  return request(`${student}/think/student/find/tno`,{});
}
export async function teacherGetDepart() {
  return request(`${student}/think/student/find/depart`,{})
}
export async function teacherGetProf() {
  return request(`${student}/think/student/find/prof`,{})
}


