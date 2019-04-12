import { formatter } from '../common/utils'

const menuData = [
  {
    name: '学生管理',
    path: 'StudentManage',
    icon: 'cd-organization',
    authority: '',
  }, {
    name: '班级管理',
    path: 'ClassManage',
    icon: 'cd-statistics',
    authority: 'ClassManage',
  }, {
    name: '用户管理',
    path: 'UserManage',
    icon: 'cd-people',
    authority: '',
  },
]

export const getMenuData = () => formatter(menuData);
