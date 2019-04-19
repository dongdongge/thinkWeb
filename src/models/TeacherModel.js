import { teacherAddTeacher, teacherFindTeacher, teacherGetDepart, teacherGetProf } from '@/services/StudentService';

export default {
  namespace: 'teacher',
  state: {
    teacherData: [],
    prof:[],
    depart:[],
  },
  reducers: {
    saveTeacherData(state, { payload: { teacherData } }) {
      return { ...state, teacherData };
    },
    saveDepart(state, { payload: { depart } }) {
      return { ...state, depart };
    },
    saveProf(state, { payload: { prof } }) {
      return { ...state, prof };
    },
  },
  effects: {
    * getTeacherData({ payload }, { call, put }) {
      const teacherData = yield call(teacherFindTeacher, {});
      yield put({ type: 'saveTeacherData', payload: { teacherData } });
    },
    * addTeacher({ payload }, { call, put }) {
      yield call(teacherAddTeacher, payload.params);
      yield put({ type: 'getTeacherData', payload: {} });
    },

    * getDepart({payload},{call,put}){
      const depart = yield call(teacherGetDepart, {});
      yield put({ type: 'saveDepart', payload: { depart } });
    },
    * getProf({payload},{call,put}){
      const prof = yield call(teacherGetProf, {});
      yield put({ type: 'saveProf', payload: { prof } });
    }
  },
};
