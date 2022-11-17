import { Avatar, Badge, Layout, message,Button  } from 'antd'

import axios from 'axios';
import { useParams ,useNavigate} from "react-router-dom";
import { Input, Image } from 'antd';
import React, { useEffect, useState } from 'react'
import './CSS/Main.css'
import Lists from './component/Lists/Lists';
import Information from './component/Information/Information';
const { Search } = Input;
const { Header, Content, Footer } = Layout;

interface Props {
  children?: any,
}

const Main: React.FC<Props> = (props: Props) => {
  let params = useParams();

  const username = params.username;
  const navigate = useNavigate();
  const [dataSources, setDataSources] = useState([])
  const [inf, setInf] = useState([])
  const [src, setSrc] = useState('')
  const onSearch = (e) => {
    if (e) {
      const url1 = 'https://api.github.com/users/' + e + '/repos'
      axios.get(url1).then(res => {
        message.success('success');
        console.log(res.data)
        setDataSources(res.data)
      }).catch((err) => {
        if (err.message === 'Request failed with status code 404') {
          message.error('This is an error username', 3);
        }
        message.error('Limit requests', 3);
      })
      const url2 = 'https://api.github.com/users/' + e + '/subscriptions'
      axios.get(url2).then(res => {
        setInf(res.data[0].owner)
      }).catch(err => console.log(err))
    }
  }
  const quit = () => {
    sessionStorage.removeItem('token');
    navigate('/Login');//跳转到主页
  }

  useEffect(() => {
    const url3 = 'https://api.github.com/users/' + username + '/repos'
    axios.get(url3).then(res => {
      setSrc(res.data[0].owner.avatar_url)
    }).catch(err => console.log(err))
  }, [username])

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
            style={{ maxWidth: "400px", marginTop: "12px", minWidth: "200px" }}
          />
          <span style={{ marginLeft: "0px", position: "absolute", right: "50px" }}>
            <p style={{ fontSize: "16px", color: "white", marginRight: "10px", display: "inline-block" }}>Welcome!  {username}</p>
            <Badge dot className="logo">
              <Avatar shape="circle" src={<Image src={src} style={{ width: 32 }} />} />
              <Button type="primary" className="primary" onClick={()=>quit()} style={{width:"80px"}}> 注销</Button>
            </Badge>
          </span>
          
         
        </Header>
        <Content
          style={{
            padding: '0 50px',
            height: "100%"
          }}
        >
          <div className="site-layout-content" >
            <div style={{ marginTop: "100px", marginLeft: "100px" }}>
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
