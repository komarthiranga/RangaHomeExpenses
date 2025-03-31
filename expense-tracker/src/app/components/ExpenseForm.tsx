'use client'
import React from 'react';  
import { Form, Input, Button, DatePicker } from 'antd';   

export interface Expense {  
  date: string;  
  description: string;  
  amount: number;  
}  

interface ExpenseFormProps {  
  onAddExpense: (expense: Expense) => void;  
}  

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {  
  const [form] = Form.useForm();  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any  
  const onFinish = (values: any) => {  
    const expense: Expense = {  
      date: values.date.format('YYYY-MM-DD'),  
      description: values.description,  
      amount: values.amount,  
    };  
    onAddExpense(expense);  
    form.resetFields(); // Reset form after submission  
  };  

  return (  
    <Form  
      form={form}  
      layout="vertical"  
      className="expense-form"  
      onFinish={onFinish}  
      style={{ marginBottom: '20px' }}  
    >  
      <Form.Item  
        name="date"  
        rules={[{ required: true, message: 'Please select a date!' }]}  
      >  
        <DatePicker style={{ width: '100%' }} />  
      </Form.Item>  
      <Form.Item  
        name="description"  
        rules={[{ required: true, message: 'Please enter a description!' }]}  
      >  
        <Input placeholder="Description" />  
      </Form.Item>  
      <Form.Item  
        name="amount"  
        rules={[{ required: true, message: 'Please enter an amount!' }]}  
      >  
        <Input type="number" placeholder="Amount" />  
      </Form.Item>  
      <Form.Item>  
        <Button type="primary" htmlType="submit">  
          Add Expense  
        </Button>  
      </Form.Item>  
    </Form>  
  );  
};  

export default ExpenseForm;  