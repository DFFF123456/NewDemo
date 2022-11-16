import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams} from "react-router-dom";
import Tables from './Tables';
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
  },[url])
  console.log(dataSources)
  return (
    <>
      <Tables dataSources={dataSources} >
      </Tables>
      {/* <p style={{fontSize:"26px",margin:" 100% auto "}}>
        Design ©2022 Created by York
      </p> */}
    </>
  )
}

export default Detail