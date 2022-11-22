import React, { useEffect, useState } from 'react'
import { Avatar, Badge, Layout, message, Input, Image ,Divider} from 'antd'
import { MoreOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useParams ,useNavigate} from "react-router-dom";


import './CSS/Main.css'
import Lists from './component/Lists/Lists';
import Information from './component/Information/Information';

const { Search } = Input;
const { Header, Content} = Layout;

interface Props {
  children?: any,
}

const Main: React.FC<Props> = (props: Props) => {
  const params = useParams();
  const navigate = useNavigate();
  const username = params.username;//登录者的名字
 
  const [show,setShow] = useState(false);//显示退出功能
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
  const changeShow = () => {
    setShow(!show)
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
          <span style={{ marginLeft: "0px", position: "absolute", right: "70px" }}>
            <p style={{ fontSize: "16px", color: "white", marginRight: "20px", display: "inline-block" }}>Welcome!  {username}</p>
            <Badge dot >
              <Avatar shape="circle" src={<Image src={loginUrl} style={{ width: 32 }} />} />
            </Badge>
            <MoreOutlined  onClick={changeShow}  style={{color:"white",fontSize:"32px",position: "absolute", top: "20px" ,right:"-40px"}} />
            <div className="buttons" style={{display:show?'inline-block':'none'}}>
              <div className="title">
                <span>Signed in as</span>
                <strong>{username}</strong>
              </div>
              <Divider style={{marginTop:"8px",marginBottom:"10px"}} />
              <ul>
                <li>
                  <div onClick={()=>quit()}>Sign out</div>
                </li>
              </ul>
            </div>
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
