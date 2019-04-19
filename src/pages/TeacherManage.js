import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { connect } from 'dva';

@connect((state) => {
  const { teacherData } = state.teacher;
  return { teacherData };
})
export default class TeacherManage extends PureComponent {


  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({ type: 'teacher/getTeacherData', payload: {} });
  }

  render() {
    const columns = [
      { title: '序号', dataIndex: 'index', key: 'index',render:(text,record,index)=> (<a>{index}</a>)},
      { title: '教师编号', dataIndex: 'tno', key: 'tno' },
      { title: '姓名', dataIndex: 'tname', key: 'tname' },
      { title: '性别', dataIndex: 'tsex', key: 'tsex' },
      { title: '生日', dataIndex: 'tbirthday', key: 'tbirthday' },
      { title: '职别', dataIndex: 'prof', key: 'prof' },
      { title: '院系', dataIndex: 'depart', key: 'depart' },
    ];
    return (<div>
      <Table columns={columns} dataSource={this.props.teacherData} bordered={true} rowKey={record => record.tno}/>
    </div>);
  }

}
