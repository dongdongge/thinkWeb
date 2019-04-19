import { formatter } from '../common/utils'

const menuData = [
  {
    name: '学生管理',
    path: 'StudentManage',
    icon: 'cd-statistics',
    authority: '',
  }, {
    name: '课程管理',
    path: 'CourseManage',
    icon: 'cd-statistics',
    authority: '',
  }, {
    name: '教师管理',
    path: 'TeacherManage',
    icon: 'cd-statistics',
    authority: '',
  },{
    name: '用户管理',
    path: 'UserManage',
    icon: 'cd-people',
    authority: '',
  },
]

export const getMenuData = () => formatter(menuData);
