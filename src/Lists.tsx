import React from 'react'
import { TeamOutlined, PartitionOutlined, GithubOutlined,StarOutlined,FolderAddOutlined } from '@ant-design/icons';
import { List, Space } from 'antd';
import {  Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'


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
  
  dayjs.extend(relativeTime)
  console.log(dayjs("2021-04-03T10:15:42Z").fromNow())
  const data = Array.from(dataSources).map((item: any) => ({
    id:item.id,
    name: item.name,
    private: item.private,
    forks: item.forks,
    watchers:item.watchers,
    description: item.description,
    url: '/Detail/' + item.owner.login + '/' + item.name,
    updated_at:dayjs(item.updated_at).fromNow(),//"2021-04-03T10:15:42Z"
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
          <IconText icon={StarOutlined} text={item.watchers}  />,
          <IconText icon={PartitionOutlined} text={item.forks}  />,
          <IconText icon={FolderAddOutlined}  text={item.updated_at} />,
          <IconText icon={TeamOutlined} text={item.private?'public':'private'} />,
        ]}
        extra={
        <button>123</button>
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
    </>
  )
}

export default Lists