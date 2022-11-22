import React, { useEffect, useState } from 'react'
import { Avatar, Badge, Layout, message, Input, Image } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useParams ,useNavigate} from "react-router-dom";


import './CSS/Main.css'
import Lists from './component/Lists/Lists';
import Information from './component/Information/Information';

const { Search } = Input;
const { Header, Content, Footer } = Layout;

interface Props {
  children?: any,
}

const Main: React.FC<Props> = (props: Props) => {
  const params = useParams();
  const navigate = useNavigate();
  const username = params.username;//登录者的名字
  

  const [dataSources, setDataSources] = useState([])//搜索的人名称，用于渲染数据
  const [inf, setInf] = useState([])//搜索的人名称，用于渲染个人信息
  const [loginUrl, setLoginUrl] = useState('')
  //搜索
  const onSearch = (e):void => {
    if (e) {
      sessionStorage.setItem('searchName', e);
      const searchUrl = 'https://api.github.com/users/' + e + '/repos'
      axios.get(searchUrl).then(res => {
        message.success('success');
        setDataSources(res.data)
      }).catch((err) => {
        if (err.message === 'Request failed with status code 404') {
          message.error('This is an error username', 3);
        }else
        message.error('Limit requests', 3);
      })

      const infUrl = 'https://api.github.com/users/' + e;
      console.log(infUrl)
      axios.get(infUrl).then(res => {
        setInf(res.data)
      }).catch(err => console.log(err))
    }
  }
  //注销
  const quit = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('searchName')
    message.success('success quit');
    navigate('/Login');//跳转到主页
  }
  const searchName = sessionStorage.getItem('searchName');
  useEffect(() => {
   
    if (searchName) {
      const searchUrl = 'https://api.github.com/users/' + searchName + '/repos';
      axios.get(searchUrl).then(res => {
        setDataSources(res.data)
      }).catch(err => console.log(err))

      const infUrl = 'https://api.github.com/users/' + searchName;
      // const infUrl='https://api.github.com/users/mojombo'
      console.log(infUrl)
      axios.get(infUrl).then(res => {
        setInf(res.data)
      }).catch(err => console.log(err))
    }
    
    //获取登录者的信息
    const loginUrl = 'https://api.github.com/users/' + username + '/repos'
    axios.get(loginUrl).then(res => {
      setLoginUrl(res.data[0].owner.avatar_url)
    }).catch(err => console.log(err))
    sessionStorage.setItem('username',username)
  }, [username,searchName])

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
            <p style={{ fontSize: "16px", color: "white", marginRight: "54px", display: "inline-block" }}>Welcome!  {username}</p>
            <PoweroffOutlined style={{color:"red",fontSize:"16px",borderRadius:"50%", position: "absolute", top: "28px" ,right:"40px"}} onClick={()=>quit()} />
            <Badge dot className="logo">
              <Avatar shape="circle" src={<Image src={loginUrl} style={{ width: 32 }} />} />
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
      </Layout>
    </>
  )
}

export default Main
