import { Image } from 'antd';
import React from 'react';
import './CSS/Information.css'
interface Props{
  dataSource:any,
}
const Information = ({ dataSource }: Props) => {
  console.log(dataSource)
  let url = ''
  let dis = 'none'
  let name=''
  if (dataSource.owner) {
    url = dataSource.owner.avatar_url
    dis = ''
    name=dataSource.owner.login
  }
  return (
    <>
      <Image className="logo" style={{display:dis}}
        width={256}
        height={256}
        src={url    }
      />
      <p>
        {name}
      </p>
    </>
  )
}

export default Information