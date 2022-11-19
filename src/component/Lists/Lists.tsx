import React, { useState } from 'react'
import { TeamOutlined, PartitionOutlined, GithubOutlined,StarOutlined,FolderAddOutlined } from '@ant-design/icons';
import { List, Space,Button, Drawer, Divider  } from 'antd';
import {  Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import Item from 'antd/lib/list/Item';
import RightDrawer from '../RightDrawer/RightDrawer';
import axios from 'axios';


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
  console.log(dataSources)
 
  const [open, setOpen] = useState(false);
  const [Inf, setInf] = useState([]);
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const showDrawer = (name,language) => {
    const username = dataSources[0].owner.login;
    setLanguage(language)
    setTitle(name)
    const url2 = 'https://api.github.com/repos/' + username+'/'+name + '/subscribers'
    console.log(url2)
    axios.get(url2).then(res => {
      console.log(res.data)
      setInf(res.data)
      
    }).catch(err => console.log(err))
    setOpen(true);

    console.log(Inf)
  };

  const onClose = () => {
    setOpen(false);
  };




  dayjs.extend(relativeTime)
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
    footer={
      <div>
      </div>
    }
        renderItem={item => (
      <List.Item
        key={item.id}
        actions={[
          <IconText icon={StarOutlined } text={item.watchers}     />,
          <IconText icon={PartitionOutlined} text={item.forks}  />,
          <IconText icon={FolderAddOutlined}  text={item.updated_at} />,
          <IconText icon={TeamOutlined} text={item.private?'public':'private'} />,
        ]}
        extra={
          <>
          <Button type="primary" onClick={()=>showDrawer(item.name,item.language)} style={{maxWidth:"65px",overflow: "hidden"}}>
              More
          </Button>
          </>
        }
      >
        <List.Item.Meta
          avatar={<GithubOutlined />}
          title={<Link to={item.url}>{item.name}</Link>}
          description={item.description}
        />
      </List.Item>
    )}
      />
      {/* <RightDrawer /> */}
         <Drawer
        // title="Basic Drawer"
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