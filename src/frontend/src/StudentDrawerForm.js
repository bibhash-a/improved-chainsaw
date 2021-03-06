import { Drawer, Form, Button, Col, Row, Input, Select } from 'antd';
import {addNewStudent} from "./client";
const { Option } = Select;

export function StudentDrawerForm({showDrawer, setShowDrawer}) {
  const onFinishFailed = errorInfo => {
    alert(JSON.stringify(errorInfo, null, 2))
  }

  const onFinish = student => {
    console.log(JSON.stringify(student, null, 2))
    addNewStudent(student).then(() => {
      console.log("Student added!")

    }).catch(err => {
      console.log(err)
    })
  }

  const onClose = () => setShowDrawer(false)
  return (
    <>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={showDrawer}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
        <div style={{textAlign: 'right'}}>
          <Button onClick={onClose} style={{marginRight: 8}}>Cancel</Button>
        </div>
        }
      >
        <Form layout="vertical"
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter student name' }]}
              >
                <Input placeholder="Please enter student name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please enter Email' }]}
              >
                <Input placeholder="Please enter email"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please select an gender' }]}
              >
                <Select placeholder="Please select an gender">
                  <Option value="MALE">MALE</Option>
                  <Option value="FEMALE">FEMALE</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}

