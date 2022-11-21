import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import '../../CSS/Tables.css'

interface DataType {
  name: string;
  type: string;
  address: string;
  // href: string;
}

interface Props{
  children?:any,
  dataSources:any,
}




const Tables = (props: Props) => {

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Address',
      dataIndex: 'html_url',
      // render: text => <a href={{html_url}}>{text}</a>,
    },
  ];
  return (
    <>
      <div className="table">
        <Table columns={columns} dataSource={props.dataSources} />
      </div>
    </>
  )
}

export default Tables