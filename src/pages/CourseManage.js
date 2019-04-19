import React, { Component, PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Table } from 'antd';

@connect((state) => {
  const { courseData } = state.course;
  return { courseData };
})
export default class CourseManage extends PureComponent {

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.props.dispatch({ type: 'course/getCourseData', payload: {} });
  }

  addCourse=()=>{
    alert("xx");
  };
  render() {
    console.log(this.props.courseData)
    const columns = [
      { title: '序号', dataIndex: 'index', key: 'index' , render:(text,record,index)=>(<a>{index}</a>)},
      { title: '编号', dataIndex: 'cno', key: 'cno' },
      { title: '名称', dataIndex: 'cname', key: 'cname' },
      { title: '教师编号', dataIndex: 'tno', key: 'tno' },
      { title: '上课时间', dataIndex: 'ctime', key: 'ctime' },
      { title: '学分', dataIndex: 'credit', key: 'credit' },
      { title: '操作', dataIndex: 'action', key: 'action' }
    ];
    const dataSource2 = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }];

    const columns2 = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }];
    return (
      <div>
        <Button onClick={this.addCourse} type={'primary'} style={{margin:20}}>新增课程</Button>
        <Table columns={columns} bordered={true} rowKey={record => record.cno} dataSource={this.props.courseData}/>
        {/*<Table dataSource={dataSource2} columns={columns2} />*/}
      </div>
    );
  }


}
