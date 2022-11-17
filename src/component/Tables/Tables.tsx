import { Button , Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useNavigate ,useParams} from "react-router-dom";
interface DataType {
  name: string;
  type: string;
  address: string;
}
interface Props{
  children?:any,
  dataSources:any,
}


const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: text => <a >{text}</a>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Address',
    dataIndex: 'url',
  },
];

const Tables = (props: Props) => {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params.username)
  const goBack = () => {
    let username = sessionStorage.getItem('username');
    console.log(username)
    let url='/'+username+''
     navigate(url);
  }
  return (
    <>
      <Table columns={columns} dataSource={props.dataSources} />
      <Button type="primary" style={{position: 'absolute',right: '20px'}} onClick={goBack}>Back</Button>
    </>
  )
}

export default Tables