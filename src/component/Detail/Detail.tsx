import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams} from "react-router-dom";
import Tables from '../Tables/Tables';
import { Button } from 'antd';
const Detail = () => {
  const [dataSources,setDataSources]=useState([])
  let params = useParams();
  const name = params.name;
  const username = params.username;
  const url = 'https://api.github.com/repos/'+username+'/'+name+'/contents'
  useEffect(() => {
    axios.get(url).then(res => {
      console.log(res.data);
      setDataSources(res.data)
    }).catch(err => console.log(err))
  }, [url])
  const navigate = useNavigate();
  // console.log(params.username)

  const goBack = () => {
    let username = sessionStorage.getItem('username');
    let url='/'+username+''
    navigate(url);
  }
  console.log(dataSources)
  return (
    <>
      <Tables dataSources={dataSources} >
      </Tables>
      {/* <p style={{fontSize:"26px",margin:" 100% auto "}}>
        Design ©2022 Created by York
      </p> */}
       <Button type="primary" style={{position: 'absolute',right: '20px'}} onClick={goBack}>Back</Button>
    </>
  )
}

export default Detail