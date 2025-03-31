'use client'
import React, { useEffect, useState } from 'react';  
import { Layout, DatePicker, Button, Select, Space, Typography } from 'antd';  
import ExpenseForm, { Expense } from './components/ExpenseForm';  
import ExpenseTable from './components/ExpenseTable';  
import dayjs from 'dayjs';  

const { Header, Content } = Layout;  
const { Title } = Typography;  
const { Option } = Select;  

const Home: React.FC = () => {  
  const [expenses, setExpenses] = useState<Expense[]>([]);  
  const [searchDateRange, setSearchDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);  

  // Function to fetch expenses from the backend  
  const fetchExpenses = async () => {  
    try {  
      const response = await fetch(`http://localhost:8000/api/expenses?${new URLSearchParams({  
        startDate: searchDateRange[0] ? searchDateRange[0].toISOString() : '',  
        endDate: searchDateRange[1] ? searchDateRange[1].toISOString() : ''  
      })}`);  
      const result = await response.json();  
      setExpenses(result);  
    } catch (error) {  
      console.error('Error fetching expenses:', error);  
    }  
  };  

  // Save an expense  
  const handleAddExpense = async (expense: Expense) => {  
    try {  
      const response = await fetch('http://localhost:8000/api/expenses', {  
        method: 'POST',  
        headers: {  
          'Content-Type': 'application/json',  
        },  
        body: JSON.stringify(expense),  
      });  
      const newExpense = await response.json();  
      setExpenses((prev) => [...prev, newExpense]);  
    } catch (error) {  
      console.error('Error adding expense:', error);  
    }  
  };  

  // Handle date range selection  
  const handleSelectChange = (value: string) => {  
    const today = dayjs();  
    if (value === 'today') {  
      setSearchDateRange([today.startOf('day'), today.endOf('day')]);  
    } else if (value === 'week') {  
      setSearchDateRange([today.startOf('week'), today.endOf('week')]);  
    } else if (value === 'month') {  
      setSearchDateRange([today.startOf('month'), today.endOf('month')]);  
    } else {  
      setSearchDateRange([null, null]); // Reset if a custom range is selected  
    }  
  };  

  // const handleCustomRangeChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null]) => {  
  //   setSearchDateRange(dates);  
  // };  

  // Effect to fetch expenses on date range change  
  useEffect(() => {  
    fetchExpenses();  
  }, [searchDateRange]);  

  return (  
    <Layout>  
      <Header style={{ color: '#fff', textAlign: 'center', fontSize: '24px' }}>  
        Expense Tracker  
      </Header>  
      <Content style={{ padding: '20px' }}>  
        <ExpenseForm onAddExpense={handleAddExpense} />  

        <Space style={{ marginTop: '20px', marginBottom: '20px', width: '100%', flexDirection: 'column', alignItems: 'flex-start' }}>  
          <Select   
            defaultValue="Select Range"   
            style={{ width: '100%', marginBottom: '10px' }}   
            onChange={handleSelectChange}  
          >  
            <Option value="today">Today</Option>  
            <Option value="week">This Week</Option>  
            <Option value="month">This Month</Option>  
            <Option value="custom">Custom Range</Option>  
          </Select>  
          
          <DatePicker.RangePicker  
            // onChange={handleCustomRangeChange}  
            style={{ width: '100%' }}  
            disabled={!searchDateRange[0] && !searchDateRange[1]} // Enable only when 'Custom Range' is selected  
          />  
        </Space>  

        {/* Display Total Expenses */}  
        <Title level={4} style={{ color: '#000aeb' }}>  
          Total Expenses: ₹{expenses.reduce((sum, { amount }) => sum + amount, 0).toFixed(2)}  
        </Title>  

        <ExpenseTable expenses={expenses} />  
      </Content>  
    </Layout>  
  );  
};  

export default Home;  