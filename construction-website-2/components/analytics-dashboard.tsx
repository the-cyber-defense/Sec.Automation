"use client"

import { useState, useEffect } from 'react'
import { TrendingUp, Users, Phone, Mail, MapPin, Clock, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AnalyticsData {
  totalLeads: number
  highValueLeads: number
  averageLeadScore: number
  topProjectTypes: Array<{ type: string; count: number }>
  topLocations: Array<{ location: string; count: number }>
  conversionRate: number
  averageResponseTime: string
}

export function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalLeads: 0,
    highValueLeads: 0,
    averageLeadScore: 0,
    topProjectTypes: [],
    topLocations: [],
    conversionRate: 0,
    averageResponseTime: '0h'
  })

  // Mock data - in production this would come from your analytics API
  useEffect(() => {
    const mockData: AnalyticsData = {
      totalLeads: 47,
      highValueLeads: 23,
      averageLeadScore: 342,
      topProjectTypes: [
        { type: 'Drainage Solutions', count: 12 },
        { type: 'Retaining Walls', count: 9 },
        { type: 'Emergency Services', count: 7 },
        { type: 'Concrete & Masonry', count: 6 },
        { type: 'Landscaping', count: 5 }
      ],
      topLocations: [
        { location: 'Livermore, CA', count: 15 },
        { location: 'Pleasanton, CA', count: 12 },
        { location: 'Dublin, CA', count: 8 },
        { location: 'San Ramon, CA', count: 6 },
        { location: 'Danville, CA', count: 4 }
      ],
      conversionRate: 68.2,
      averageResponseTime: '2.3h'
    }
    
    setAnalyticsData(mockData)
  }, [])

  const getLeadScoreColor = (score: number) => {
    if (score >= 400) return 'text-green-600'
    if (score >= 300) return 'text-blue-600'
    if (score >= 200) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getLeadScoreLabel = (score: number) => {
    if (score >= 400) return 'Hot Lead'
    if (score >= 300) return 'Warm Lead'
    if (score >= 200) return 'Cool Lead'
    return 'Cold Lead'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Value Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.highValueLeads}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((analyticsData.highValueLeads / analyticsData.totalLeads) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Lead Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getLeadScoreColor(analyticsData.averageLeadScore)}`}>
              {analyticsData.averageLeadScore}
            </div>
            <p className="text-xs text-muted-foreground">
              {getLeadScoreLabel(analyticsData.averageLeadScore)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Project Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Project Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topProjectTypes.map((project, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`} />
                    <span className="text-sm font-medium">{project.type}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{project.count} leads</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Top Service Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{location.location}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{location.count} leads</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{analyticsData.averageResponseTime}</div>
              <p className="text-sm text-muted-foreground">Average Response Time</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">98%</div>
              <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <p className="text-sm text-muted-foreground">Emergency Availability</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
