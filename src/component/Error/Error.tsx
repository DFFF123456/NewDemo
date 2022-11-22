import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Error.css'
import { Button } from 'antd';
const Error = () => {
  const navigate = useNavigate();
  const goBack = () => {
    const username=sessionStorage.getItem('username')
    const url = '/' + username;
    navigate(url) 
  }
  return (
    <>
      <div className="body">
        <div className="title">
          <h1 className='title-text'>呃…找不到此网站。</h1>
        </div>
        <div id="errorLongDesc">
          <span data-l10n-id="error-head">
            <strong>若您确认输入的是正确网址，可以：</strong>
          </span>
          <ul>
            <li >稍后再试</li>
            <li >检查您的网络连接</li>
            <li >检查 Firefox 是否有联网权限（可能已接入网络，但被防火墙阻止）</li>
          </ul>
        </div>
        <div className="button">
          <Button type="primary" onClick={goBack}>Back to Main</Button>
        </div>
       
      </div>
      
    </>
  )
}

export default Error