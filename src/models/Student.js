/* eslint-disable max-len,no-trailing-spaces */
/* eslint-disable no-undef */
import { routerRedux } from 'dva/router';
import { studentFindStudentAll,studentFindClassAll,studentAddStudent } from '@/services/StudentService';

export default {
  namespace: 'student',
  state: {
    studentItems: [],
    page:1,
    queryValues:{},
    total:null
  },
  reducers: {
    saveList(state, { payload: { studentItems } }) {
      return { ...state, studentItems}
    },
  },

  effects: {
    * getStudentList({ payload: { params } }, { call, put }) {
      const studentItems = yield call(studentFindStudentAll,{});
      console.log(studentItems)
      yield put({type:'saveList',payload:{studentItems:studentItems.data}});
    },
    * getStudentClass({payload:{params}},{call,put}){
      const classData = yield call(studentFindClassAll,{});
      if (classData&&params.callback){
        params.callback(classData.data)
      }
    },
    * addStudent({payload:{params}},{call,put}){
      const res = yield call(studentAddStudent,params);
    }
  },
};
