import { Avatar, Badge, Layout } from 'antd'
import {UserOutlined } from '@ant-design/icons';
import axios from 'axios';

import { Input } from 'antd';
import React, { useEffect, useState } from 'react'
import './CSS/Main.css'
import Lists from './Lists';
import Information from './Information';
const { Search } = Input;
const { Header, Content, Footer } = Layout;

interface Props{
  children?:any,
}

const Main: React.FC<Props> = (props: Props) => {
  const [dataSources, setDataSources] = useState([])
  const [inf,setInf]=useState([])
  const onSearch = (e) => {
    const url1 = 'https://api.github.com/users/' + e + '/repos'
    // https://api.github.com/users/DFFF123456/repos
    axios.get(url1).then(res => {
      console.log(res.data);
      setDataSources(res.data)
    }).catch(err => console.log(err))
  
    const url2 = 'https://api.github.com/users/' + e + '/subscriptions'
    axios.get(url2).then(res => {
      console.log(res.data);
      setInf(res.data[0])
    }).catch(err => console.log(err))

  }

  return (
    <>
    <Layout className="layout" >
    <Header style={{}}>
      
    <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      defaultValue="mojombo"
      style={{width:"400px",marginTop:"12px"}}
    />
     <span style={{marginLeft:"0px",position:"absolute",right:"50px"}}>
      <Badge dot>
        <Avatar shape="circle" icon={<UserOutlined />} />
      </Badge>
    </span>
    </Header>
    <Content
      style={{
          padding: '0 50px',
          height:"100%"
      }}
    >
          <div className="site-layout-content" >
            <div  style={{marginTop:"100px",marginLeft:"100px"}}>
              <Information dataSource={inf} ></Information>
            </div>
            <div className="lists">
              <Lists dataSources={dataSources}></Lists>
            </div>   
      </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Design ©2022 Created by York
    </Footer>
  </Layout>
    </>
  )
}

export default Main
