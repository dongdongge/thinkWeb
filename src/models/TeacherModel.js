import { teacherAddTeacher, teacherFindTeacher } from '@/services/StudentService';

export default {
  namespace: 'teacher',
  state: {
    teacherData: [],
  },
  reducers: {
    saveTeacherData(state, { payload: { teacherData } }) {
      return { ...state, teacherData };
    },
  },
  effects: {
    * getTeacherData({ payload }, { call, put }) {
      const teacherData = yield call(teacherFindTeacher, {});
      yield put({ type: 'saveTeacherData', payload: { teacherData } });
    },
    * addTeacher({ payload }, { call, put }) {
      yield call(teacherAddTeacher, payload.params);
      put({ type: 'getTeacherData', payload: {} });
    },
  },
};
