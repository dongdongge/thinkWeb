import React, { Component, PureComponent } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select, Table } from 'antd';
import { connect } from 'dva';

const Option = Select.Option;

@Form.create()
class AddTeacherModal extends Component {
  render() {
    const {form,prof,depart} = this.props;
    console.log("AddTeacherModal");
    console.log(prof);
    console.log(depart);
    const { getFieldDecorator } = form;
    const optionsProf =prof?prof.map((item,index) => <Option key={index} value={item}>{item}</Option>):null;
    const optionsDepart = depart?depart.map((item,index) => <Option key={index} value={item}>{item}</Option>):null;
    return (<Form layout={'vertical'}>
      <Form.Item label={'教师编号'}>  {getFieldDecorator('tno', { rules: [{ required: true, message: 'Please input the 教师编号 of collection!' }] })(
        <Input type={'number'}/>)}</Form.Item>
      <Form.Item label={'姓名'}> {getFieldDecorator('tname', { rules: [{ required: true, message: 'Please input the 姓名 of collection!' }] })(<Input/>)}</Form.Item>
      <Form.Item label={'性别'}>  {getFieldDecorator('tsex', { initialValue: '男', rules: [{ required: true, message: 'Please input the 性别 of collection!' }], })(
        <Select style={{ width: 200 }}>
          <Option value="男">男</Option>
          <Option value="女">女</Option>
        </Select>)}</Form.Item>
      <Form.Item label={'出生日期'}>  {getFieldDecorator('tbirthday', { rules: [{ required: true, message: 'Please input the 出生日期 of collection!', }], })(<DatePicker format="YYYY-MM-DD"/>)}</Form.Item>
      <Form.Item label={'职别'}> <Select
        showSearch
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        notFoundContent={null}>
        {optionsProf}
      </Select></Form.Item>
      <Form.Item label={'院系'}> <Select
        showSearch
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        notFoundContent={null}>
        {optionsDepart}
      </Select></Form.Item>
    </Form>);
  }

}

@connect((state) => {
  const { teacherData,prof,depart } = state.teacher;
  return { teacherData,prof,depart};
})
export default class TeacherManage extends PureComponent {


  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: 'teacher/getTeacherData', payload: {} });
    this.props.dispatch({ type: 'teacher/getDepart', payload: {} });
    this.props.dispatch({ type: 'teacher/getProf', payload: {} });
  }
  hiddenModal=()=>{
    this.setState({visible:false})
  };
  showModal=()=>{
    this.setState({visible:true})
  }
  save=()=>{
    const { modalForm } = this;
    modalForm.validateFieldsAndScroll({ force: true }, (err, values) => {
      if (!err) {
        this.addStudent(values);
        this.hiddenModal();
      }
    });
  };
  render() {

    console.log("TeacherManage");
    console.log(this.props.prof);
    console.log(this.props.depart);
    const columns = [
      { title: '序号', dataIndex: 'index', key: 'index', render: (text, record, index) => (<a>{index}</a>) },
      { title: '教师编号', dataIndex: 'tno', key: 'tno' },
      { title: '姓名', dataIndex: 'tname', key: 'tname' },
      { title: '性别', dataIndex: 'tsex', key: 'tsex' },
      { title: '生日', dataIndex: 'tbirthday', key: 'tbirthday' },
      { title: '职别', dataIndex: 'prof', key: 'prof' },
      { title: '院系', dataIndex: 'depart', key: 'depart' },
    ];
    return (<div>
      <Button type={'primary'} onClick={this.showModal} style={{margin:16}}>新增教师</Button>
      <Table columns={columns} dataSource={this.props.teacherData} bordered={true} rowKey={record => record.tno}/>
      <Modal visible={this.state.visible}
             onCancel={this.hiddenModal}
             onOk={this.hiddenModal}
             destroyOnClose={true}
             footer={<Button key="submit" type="primary" onClick={this.save}>确定</Button>}>
        <AddTeacherModal ref={(form)=>{this.modalForm = form}} prof={this.props.prof} depart={this.props.depart}/>
      </Modal>
    </div>);
  }

}
