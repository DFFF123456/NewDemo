import { Image } from 'antd';
import React from 'react';
import '../../CSS/Information.css'
interface Props{
  dataSource:any,
}
const Information = ({ dataSource }: Props) => {

  let url = ''
  let dis = 'none'
  let name=''
  if (dataSource.length!==0) {
    url = dataSource.avatar_url
    dis = ''
    name=dataSource.login
  }
  // className={url===''?'logo':''}
  return (
    <>
      <Image style={{display:dis}}  className="bigLogo"
        width={256}
        height={256}
        src={url}
      />
      <p>
        {name}
      </p>
    </>
  )
}

export default Information