import { courseAddCourse, courseFindCourseAll } from '@/services/StudentService';

export default {
  namespace: 'course',
  state: {
    courseData: [],
  },
  reducers: {
    saveCourseData(state, { payload: { courseData } }) {
      return { ...state, courseData };
    },
  },
  effects: {
    * getCourseData({ payload }, { call, put }) {
      const courseData = yield call(courseFindCourseAll, {});
      yield put({ type: 'saveCourseData', payload: { courseData: courseData } });
      console.log(courseData);
    },

    * addCourse({ payload }, { call, put }) {
      yield call(courseAddCourse, payload.params);
      yield put({ type: 'getCourseData', payload: {} });
    },
  },
};
