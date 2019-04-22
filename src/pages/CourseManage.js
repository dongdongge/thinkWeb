import React, { Component, PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Modal, Popconfirm, Select, Table } from 'antd';

const Option = Select.Option;

@Form.create()
class AddCourseFrom extends Component {
  render() {
    const { form ,tnoData} = this.props;
    const { getFieldDecorator } = form;
    const cnoArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const conOption = cnoArray.map((value,index) => <Option key={index} value={value}>{value}</Option>);
    const tnoOption = tnoData.map((value,index) => <Option key={index} value={value}>{value}</Option>);
    return (
      <Form>
        <Form.Item label={'课程编号'}>
          {getFieldDecorator('cno', { rules: [{ require: true, message: '请填写课程编号' }] })(<Input/>)}
        </Form.Item>
        <Form.Item label={'课程名称'}>
          {getFieldDecorator('cname', { rules: [{ require: true, message: '请填写课程名称' }] })(<Input/>)}
        </Form.Item>
        <Form.Item label={'教师编号'}>
          {getFieldDecorator('tno', { rules: [{ require: true, message: '请选择教师编号' }] })(<Select>{tnoOption}</Select>)}
        </Form.Item>
        <Form.Item label={'上课时间'}>
          {getFieldDecorator('ctime', { rules: [{ require: true, message: '请填写课程编号' }] })(<Input/>)}
        </Form.Item>
        <Form.Item label={'学分'}>
          {getFieldDecorator('credit', { rules: [{ require: true, message: '请选择学分' }] })(<Select>{conOption}</Select>)}
        </Form.Item>
      </Form>
    );
  }
}

@connect((state) => {
  const { courseData , tnoData} = state.course;
  return { courseData ,tnoData};
})
export default class CourseManage extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }


  componentDidMount() {
    this.props.dispatch({ type: 'course/getCourseData', payload: {} });
    this.props.dispatch({ type: 'course/getTeacherTno', payload: {} });
  }
  addCourse(values){
    this.props.dispatch({ type: 'course/addCourse', payload: {params:values} });
  }
  save=()=>{
    const {modalForm} = this;
    modalForm.validateFieldsAndScroll({force:true},(err,values)=>{
      if (!err){
        this.addCourse(values);
        this.closeModal();
      }
    })
  };
  showModal=()=>{
    this.setState({ visible: true });
  }
  closeModal = () => {
    this.setState({ visible: false });
  };
  render() {
    const columns = [
      { title: '序号', dataIndex: 'index', key: 'index', render: (text, record, index) => (<a>{index}</a>) },
      { title: '编号', dataIndex: 'cno', key: 'cno' },
      { title: '名称', dataIndex: 'cname', key: 'cname' },
      { title: '教师编号', dataIndex: 'tno', key: 'tno' },
      { title: '上课时间', dataIndex: 'ctime', key: 'ctime' },
      { title: '学分', dataIndex: 'credit', key: 'credit' },
      { title: '操作', dataIndex: 'action', key: 'action',render:(text,reword,index)=>
          this.props.courseData.length>=1?
            (<Popconfirm title={"sure to delete?"} onConfirm={()=>{}}>
              <a href="javascript:;">删除</a>
            </Popconfirm>):null
      },
    ];
    return (
      <div>
        <Button onClick={this.showModal} type={'primary'} style={{ margin: 20 }}>新增课程</Button>
        <Table columns={columns} bordered={true} rowKey={record => record.cno} dataSource={this.props.courseData}/>
        <Modal visible={this.state.visible}
               onCancel={this.closeModal}
               onOk={this.closeModal}
               footer={<Button key={'submit'} type={'primary'} onClick={this.save}>确定</Button>}>
          <AddCourseFrom ref={(form) => {
            this.modalForm = form;
          }} tnoData={this.props.tnoData}/>
        </Modal>
      </div>
    );
  }


}
