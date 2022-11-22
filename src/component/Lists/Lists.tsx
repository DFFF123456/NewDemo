import React, { useState } from 'react'
import { TeamOutlined, PartitionOutlined, GithubOutlined,StarOutlined,FolderAddOutlined } from '@ant-design/icons';
import { List, Space,Button, Drawer, Divider  } from 'antd';
import {  Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import axios from 'axios';
import '../../CSS/Lists.css'


const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
interface Props{
  dataSources:any,
}
const Lists: React.FC<Props> = ({ dataSources }) => {
  dayjs.extend(relativeTime)
  const [open, setOpen] = useState(false);//判断抽屉是否打开
  const [title, setTitle] = useState('');
  const [Inf, setInf] = useState([]);//某个项目的贡献者信息，放在抽屉中
  const [language, setLanguage] = useState('');//某个项目的语言，放在抽屉中

  const showDrawer = (projectName, language) => {//展开抽屉
  const searchName = dataSources[0].owner.login;//查询者的信息
  setLanguage(language)
  setTitle(projectName) //项目名称
  const projectUrl = 'https://api.github.com/repos/' + searchName + '/' + projectName + '/subscribers' //某个项目的具体内容路径
  axios.get(projectUrl).then(res => {
      setInf(res.data)
    }).catch(err => console.log(err))
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const data = Array.from(dataSources).map((item: any) => ({
    id:item.id,
    name: item.name,
    private: item.private,
    forks: item.forks,
    watchers:item.watchers,
    description: item.description,
    url: '/Detail/' + item.owner.login + '/' + item.name,
    updated_at: dayjs(item.updated_at).fromNow(),//"2021-04-03T10:15:42Z"
    language: item.language,
  }));

  
  return (
    <>
    <List
    itemLayout="vertical"
    size="large"
    pagination={{
      pageSize: 5,
    }}
    dataSource={data}
      renderItem={item => (
      <List.Item
        key={item.id}
        actions={[
          <IconText icon={StarOutlined } text={item.watchers}     />,//被收藏数量
          <IconText icon={PartitionOutlined} text={item.forks}  />,//被fork数量
          <IconText icon={FolderAddOutlined}  text={item.updated_at} />,//上次更新时间
          <IconText icon={TeamOutlined} text={item.private?'private':'public'} />,//是否是私有
        ]}
        extra={
          <>
          <Button type="primary" onClick={()=>showDrawer(item.name,item.language)} style={{maxWidth:"65px",overflow: "hidden"}}>
              More
          </Button>
          </>
        }
        >
        {/* 每个列表的内容 */}
        <List.Item.Meta
          avatar={<GithubOutlined />}
          title={<Link to={item.url} className="link">{item.name}</Link>}//跳转路由，到某个项目的详细页
          description={item.description}
        />
      </List.Item>
    )}
      />
      <Drawer
        style={{height:"800px"}}
        title={title}
        placement="right"
        closable={true}
        onClose={onClose}
        size={'large'}
        open={open}
        getContainer={false}
      >
       <span style={{fontWeight:"700px",marginRight:"10px",fontSize:"20px",verticalAlign:"top"}}>Contribute:</span>
        {
          Inf.map((item, i) => {
            return (
              <>
              <img src={item.avatar_url} alt='error' style={{width:"32px",height:"32px",borderRadius:"50%",display:"inline-block"}}></img>
              </>
           )
          })
        }
        <Divider />
        <span style={{ fontWeight: "700px", marginRight: "20px", fontSize: "20px" }}>language:</span>
        <span>{language}</span>
      </Drawer>
    </>
  )
}

export default Lists