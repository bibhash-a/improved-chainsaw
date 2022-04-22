import './App.css';
import { useState, useEffect } from 'react'
import {getAllStudents} from "./client";
import {Layout, Menu, Breadcrumb, Table, Button} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    PlusOutlined,
} from '@ant-design/icons';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {StudentDrawerForm} from "./StudentDrawerForm";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
];

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
    const [students, setStudents] = useState([])
    const [collapsed, setCollapsed] = useState(true)
    const [fetching, setFetching] = useState(true)
    const [showDrawer, setShowDrawer] = useState(false)
    useEffect(() => {
        console.log("Component mounted!");
        fetchStudents()
    }, [])

    const fetchStudents = () => {
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setStudents(data)
                setFetching(false)
            })
    }

    const renderStudentsTable = () => {
        if (fetching) {
            return <Spin indicator={antIcon} />
        }

        // if (students.length === 0) {
        //     return <Empty />
        // }

        return<>
            <StudentDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
            />
            <Table columns={columns}
                      dataSource={students}
                      title={() =>
                            <Button
                                type="primary"
                                shape="round"
                                icon={<PlusOutlined/>}
                                size="large"
                                onClick={() => setShowDrawer(!showDrawer)}
                            >
                                Add Student
                            </Button>}
                      pagination={{pageSize : 25}}
                      scroll={{y : 600}}
                      rowKey={(student) => student.id}
            />
            </>
    }


    return   <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bibhash</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 700 }}>
                    {renderStudentsTable()}
                </div>
            </Content>

            <Footer style={{ textAlign: 'center' }}><a href="https://www.google.com">I love coding!</a></Footer>
        </Layout>
    </Layout>
}



export default App;
