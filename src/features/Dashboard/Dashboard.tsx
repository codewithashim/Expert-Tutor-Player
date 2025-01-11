"use client";
import React from 'react'
import { DashboardHeader } from './@component/DashboardHeader';
import { DashboardCards } from './@component/DashboardCards';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <DashboardHeader />
      <DashboardCards />
    </div>
  )
}

export default Dashboard
