/* eslint-disable max-len,no-trailing-spaces */
/* eslint-disable no-undef */
import {
  studentFindStudentAll,
  studentFindClassAll,
  studentAddStudent,
  studentDeleteStudent,
} from '@/services/StudentService';

export default {
  namespace: 'student',
  state: {
    studentItems: [],
    page: 1,
    queryValues: {},
    classData: [],
    total: null,
  },
  reducers: {
    saveList(state, { payload: { studentItems } }) {
      return { ...state, studentItems };
    },
    saveClass(state, { payload: { classData } }) {
      return { ...state, classData };
    },
  },

  effects: {
    * getStudentList({ payload: { params } }, { call, put }) {
      const studentItems = yield call(studentFindStudentAll, {});
      yield put({ type: 'saveList', payload: { studentItems: studentItems } });
    },
    * getStudentClass({ payload }, { call, put }) {
      const classData = yield call(studentFindClassAll, {});
      yield put({ type: 'saveClass', payload: { classData } });
    },
    * addStudent({ payload }, { call, put }) {
      yield call(studentAddStudent, payload.params);
      yield put({ type: 'getStudentList', payload: {} });
    },
    * deleteStudent({payload},{call,put}){
      yield call(studentDeleteStudent, payload);
      yield put({ type: 'getStudentList', payload: {} });
    }
  },
};
