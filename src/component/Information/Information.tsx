import { Image ,Divider} from 'antd';
import React from 'react';
import { EnvironmentOutlined, LinkOutlined ,BankOutlined} from '@ant-design/icons';
import '../../CSS/Information.css'
interface Props{
  dataSource:any,
}
const Information = ({ dataSource }: Props) => {
  console.log(dataSource)
  const data = {
    url : '',
    dis : 'none',
    login : '',
    name : '',
    company : '',
    location : '',
    blog:''
  }

  if (dataSource.length!==0) {
    data.url = dataSource.avatar_url
    data.dis = ''
    data.login = dataSource.login
    data.name = dataSource.name
    data.company = dataSource.company
    data.location = dataSource.location
    data.blog=dataSource.blog
  }
  return (
    <div className="main2">
      <Image style={{display:data.dis}}  className="bigLogo"
        width={300}
        height={300}
        src={data.url}
      />
      <h1>
        <span className="realName">
        {data.name}
        </span>
        <span className="loginName">
        {data.login}
        </span>
      </h1>
      <Divider />
      <div className="inf" style={{display:data.dis}} >
        <ul>
          <li style={{display:data.company?'':'none'}}>
            <p className="firstP"><BankOutlined /></p>
            <span className="firstSpan">{data.company}</span>
          </li>
          <li style={{display:data.location?'':'none'}}>
            <p><EnvironmentOutlined /></p>
            <span>{data.location}</span>
          </li>
          <li style={{display:data.blog?'':'none'}}>
            <p><LinkOutlined /></p>
            <span>{data.blog}</span>
          </li>
        
        </ul>
      </div>
    </div>
  )
}

export default Information