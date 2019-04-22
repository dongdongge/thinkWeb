import React, { Component, PureComponent } from 'react';
import { Table, Divider, Tag, Popconfirm, Button, Modal, Input,message, Select, DatePicker, Form } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import * as _ from 'lodash';

const Option = Select.Option;

@Form.create()
class AddModuleStudent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }


  render() {
    const { visible, onCancel, onCreate, form, classData } = this.props;
    const { getFieldDecorator } = form;
    const options = classData.map(d => <Option key={d.id} value={d.cno}>{d.cno}</Option>);
    return (
      <Form layout="vertical">
        <Form.Item label="学号">
          {getFieldDecorator('sno', { rules: [{ required: true, message: 'Please input the 学号 of collection!' }] })(
            <Input type={'number'}/>)}
        </Form.Item>
        <Form.Item label="姓名">
          {getFieldDecorator('sname', { rules: [{ required: true, message: 'Please input the 姓名 of collection!' }] })(
            <Input/>)}
        </Form.Item>
        <Form.Item label="性别">
          {getFieldDecorator('ssex', {
            initialValue: '男',
            rules: [{ required: true, message: 'Please input the 性别 of collection!' }],
          })(
            <Select style={{ width: 200 }}>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>)}
        </Form.Item>
        <Form.Item label="出生日期">
          {getFieldDecorator('sbirthday', {
            rules: [{
              required: true,
              message: 'Please input the 出生日期 of collection!',
            }],
          })(<DatePicker format="YYYY-MM-DD"/>)}
        </Form.Item>
        <Form.Item label="班级">
          {getFieldDecorator('class', { rules: [{ required: true, message: 'Please input the 班级 of collection!' }] })(
            <Select
              showSearch
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={this.handleSearch}
              notFoundContent={null}>
              {options}
            </Select>)}
        </Form.Item>
      </Form>
    );
  }
}

@connect((state) => {
  const { studentItems, page, total, queryValues, classData } = state.student;
  return { studentItems, page, total, queryValues, classData };
})
export default class StudentManage extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: 'student/getStudentList', payload: {} });
    this.props.dispatch({ type: 'student/getStudentClass', payload: {} });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleAdd = () => {
    this.showModal();
  };
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  addStudent = (values) => {
    if (moment.isMoment(values.sbirthday)) {
      values.sbirthday = moment(values.sbirthday).format('YYYY-MM-DD');
    }
    this.props.dispatch({ type: 'student/addStudent', payload: { params: values}});
  };
  deleteStudent=(sno)=>{
    this.props.dispatch({type:'student/deleteStudent',payload:{sno}});
  };
  save = () => {
    const { modalForm } = this;
    modalForm.validateFieldsAndScroll({ force: true }, (err, values) => {
      if (!err) {
        this.addStudent(values);
        this.handleOk();
      }
    });
  };

  render() {
    const columns = [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render:(text,record,index)=>(<a>{index}</a>)
    },{
      title: '学号',
      dataIndex: 'sno',
      key: 'sno',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '姓名',
      dataIndex: 'sname',
      key: 'sname',
    }, {
      title: '性别',
      dataIndex: 'ssex',
      key: 'ssex',
    }, {
      title: '生日',
      dataIndex: 'sbirthday',
      key: 'sbirthday',
    }, {
      title: '班级',
      key: 'class',
      dataIndex: 'class',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        this.props.studentItems.length>=1?
          (<Popconfirm title={"sure to delete?"} onConfirm={()=>{this.deleteStudent(record.sno)}}>
            <a href="javascript:;">删除</a>
          </Popconfirm>):null
      ),
    }];
    return (<div>
      <Button onClick={this.handleAdd} type="primary" style={{ margin: 16 }}>新增Student</Button>
      <Table columns={columns} bordered={true} rowKey={record => record.sno} dataSource={this.props.studentItems}/>
      <Modal
        visible={this.state.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        destroyOnClose={true}
        footer={<Button key="submit" type="primary" onClick={this.save}>确定</Button>}>
        <AddModuleStudent
          ref={(form) => {this.modalForm = form;}}
          dispatch={this.props.dispatch}
          classData={this.props.classData}
        />
      </Modal>
    </div>);
  }
}
