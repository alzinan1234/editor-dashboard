import ContentSubmissions from '@/components/ContentSubmissions'
import DashboardStats from '@/components/DashboardStats'
import PerformanceChart from '@/components/PerformanceChart'
import React from 'react'

const page = () => {
  return (
    <div>
        <DashboardStats />
        <PerformanceChart />
        <ContentSubmissions />
    </div>
  )
}

export default page
