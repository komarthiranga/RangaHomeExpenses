// components/ExpenseTable.tsx  
'use client'
import React from 'react';  
import { Table } from 'antd';  
import dayjs from 'dayjs';  
import { Expense } from './ExpenseForm';  

interface ExpenseTableProps {  
  expenses: Expense[];  
}  

const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses }) => {  
  const columns = [  
    {  
      title: 'Date',  
      dataIndex: 'date',  
      key: 'date',  
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),  
    },  
    {  
      title: 'Description',  
      dataIndex: 'description',  
      key: 'description',  
    },  
    {  
      title: 'Amount',  
      dataIndex: 'amount',  
      key: 'amount',  
      render: (amount: number) => (typeof amount === 'number' ? `₹${amount.toFixed(2)}` : '$0.00'),  
    },  
  ];  

  const rowClassName = (record: Expense, index: number) => {  
    return index % 2 === 0 ? 'even-row' : 'odd-row'; // Alternate row classes  
  };  

  return (  
    <Table  
      dataSource={expenses}  
      columns={columns}  
      rowKey="id"  
      rowClassName={rowClassName} // Set custom class for rows  
    />  
  );  
};  

export default ExpenseTable;  