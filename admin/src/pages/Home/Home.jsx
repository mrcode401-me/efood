import React from 'react'
import {  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Home.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { dataContext } from '../../context/AdminContext';

const Home = () => {


  const {fetchProductList} = useContext(dataContext)

  const [productList,setProductList] = useState([]);

  const orderData = [
  { day: 'Mon', orders: 22 },
  { day: 'Tue', orders: 35 },
  { day: 'Wed', orders: 18 },
  { day: 'Thu', orders: 42 },
  { day: 'Fri', orders: 28 },
  { day: 'Sat', orders: 30 },
  { day: 'Sun', orders: 36 },
];

  const revenueData = [
  { day: 'Mon', revenue: 5122 },
  { day: 'Tue', revenue: 3122 },
  { day: 'Wed', revenue: 1028 },
  { day: 'Thu', revenue: 4582 },
  { day: 'Fri', revenue: 2108 },
  { day: 'Sat', revenue: 3000 },
  { day: 'Sun', revenue: 3526 },
];

  const summary = {
    totalProducts: 145,
    totalOrders: 987,
    pendingOrders: 32,
    completedOrders: 955,
    totalUsers: 743,
    todayOrders: 28,
    todayRevenue: 6240
  };

  const todaysOrders = [
    { id: '#1001', name: 'Amit Sharma', items: 3, amount: 520, status: 'Delivered', time: '10:30 AM' },
    { id: '#1002', name: 'Priya Singh', items: 2, amount: 340, status: 'Preparing', time: '11:10 AM' },
    { id: '#1003', name: 'Rahul Jain', items: 1, amount: 150, status: 'Delivered', time: '12:00 PM' },
    { id: '#1004', name: 'Sneha Roy', items: 4, amount: 700, status: 'Out for Delivery', time: '12:45 PM' },
  ];

  const topProducts = [
    { name: 'Paneer Butter Masala', sold: 320 },
    { name: 'Chicken Biryani', sold: 289 },
    { name: 'Veg Thali', sold: 245 },
    { name: 'Pizza Margherita', sold: 210 },
  ];

  const recentActivity = [
    "New user 'Sahil Khan' registered",
    "Order #1002 status updated to Preparing",
    "Product 'Pav Bhaji' added",
    "Order #999 marked as Delivered",
  ];

  useEffect(()=>{
    
  },[fetchProductList])


  return (
    <div className='add'>
            <div className="admin-dashboard">
      <h1>eFood Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">🛒 Products: {summary.totalProducts}</div>
        <div className="card">📦 Orders: {summary.totalOrders}</div>
        <div className="card">⏳ Pending: {summary.pendingOrders}</div>
        <div className="card">✅ Completed: {summary.completedOrders}</div>
        <div className="card">👥 Users: {summary.totalUsers}</div>
        <div className="card highlight">📅 Today’s Orders: {summary.todayOrders}</div>
        <div className="card highlight">💰 Revenue: ₹{summary.todayRevenue}</div>
      </div>

      {/* Chart Placeholder */}
      <div className="chart-section">

          <div className="order-chart">
            <h2>Weekly Order Summary</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={orderData} margin={{ top: 15, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#007cf0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="revenue-chart">
            <h2>Weekly Revenue Summary</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData} margin={{ top: 15, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#007cf0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

      </div>

      {/* Today's Orders */}
      <div className="orders-section">
        <h2>Today's Orders</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Customer</th><th>Items</th><th>Amount</th><th>Status</th><th>Time</th>
            </tr>
          </thead>
          <tbody>
            {todaysOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.items}</td>
                <td>₹{order.amount}</td>
                <td><span className={`status ${order.status.replaceAll(' ', '').toLowerCase()}`}>{order.status}</span></td>
                <td>{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Products & Recent Activity */}
      <div className="info-panels">
        <div className="top-products">
          <h3>Top Products</h3>
          <ul>
            {topProducts.map(p => (
              <li key={p.name}>{p.name} - <strong>{p.sold}</strong> sold</li>
            ))}
          </ul>
        </div>

        <div className="activity-log">
          <h3>Recent Activity</h3>
          <ul>
            {recentActivity.map((item, idx) => (
              <li key={idx}>🟢 {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home