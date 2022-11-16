import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

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

const Tables = (props:Props) => {
  return (
    <>
      <Table columns={columns} dataSource={props.dataSources}/>
    </>
  )
}

export default Tables