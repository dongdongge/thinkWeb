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
