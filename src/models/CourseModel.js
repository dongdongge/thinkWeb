import { courseAddCourse, courseFindCourseAll, teacherGetTeacherTno } from '@/services/StudentService';

export default {
  namespace: 'course',
  state: {
    courseData: [],
    tnoData: [],
  },
  reducers: {
    saveCourseData(state, { payload: { courseData } }) {
      return { ...state, courseData };
    },
    saveTno(state, { payload: { tnoData } }) {
      return { ...state, tnoData };
    },
  },
  effects: {
    * getCourseData({ payload }, { call, put }) {
      const courseData = yield call(courseFindCourseAll, {});
      yield put({ type: 'saveCourseData', payload: { courseData: courseData } });
      console.log(courseData);
    },
    * getTeacherTno({ payload }, { call, put }) {
      const tnoData = yield call(teacherGetTeacherTno, {});
      yield put({ type: 'saveTno' ,payload: { tnoData }});
    },
    * addCourse({ payload }, { call, put }) {
      yield call(courseAddCourse, payload.params);
      yield put({ type: 'getCourseData', payload: {} });
    },
  },
};
