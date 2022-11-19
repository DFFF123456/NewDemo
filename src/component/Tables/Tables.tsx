import { Button , Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import '../../CSS/Tables.css'
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
  return (
    <>
      <div className="table">
        <Table columns={columns} dataSource={props.dataSources} />
      </div>
      {/* <div className="right">
        2
      </div> */}
    </>
  )
}

export default Tables