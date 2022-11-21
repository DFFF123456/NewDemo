import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import { Button } from 'antd';
import Tables from '../Tables/Tables';

const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();
  let [dataSources,setDataSources]=useState([])
  const name = params.name;
  const searchName = params.username;
  
  const DetailUrl = 'https://api.github.com/repos/'+searchName+'/'+name+'/contents'
  useEffect(() => {
    axios.get(DetailUrl).then(res => {
      setDataSources(res.data)
    }).catch(err => console.log(err))
  }, [DetailUrl])

  console.log(dataSources)
  //回退
  const goBack = () => {
    let username = sessionStorage.getItem('username');
    let url='/'+username+''
    navigate(url);
  }

  return (
    <>
      <Tables dataSources={dataSources} >
      </Tables>
      <Button type="primary" style={{position: 'absolute',right: '20px'}} onClick={goBack}>Back</Button>
    </>
  )
}

export default Detail