import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, TrendingUp, Shield, AlertCircle, CheckCircle, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HealthMetric {
  name: string;
  score: number;
  status: 'excellent' | 'good' | 'warning' | 'poor';
  description: string;
}

interface HealthRecommendation {
  type: 'improve' | 'maintain' | 'caution';
  title: string;
  description: string;
}

const PortfolioHealthTracker = () => {
  // Mock data - would be calculated from real portfolio data
  const overallHealthScore = 82;
  
  const healthMetrics: HealthMetric[] = [
    {
      name: 'Diversification',
      score: 78,
      status: 'good',
      description: 'Portfolio spread across sectors and asset classes'
    },
    {
      name: 'Risk Management',
      score: 85,
      status: 'excellent',
      description: 'Balanced risk-to-reward ratio'
    },
    {
      name: 'Performance Stability',
      score: 72,
      status: 'good',
      description: 'Consistent returns with manageable volatility'
    },
    {
      name: 'Expense Efficiency',
      score: 91,
      status: 'excellent',
      description: 'Low fees and transaction costs'
    },
    {
      name: 'Rebalancing Frequency',
      score: 65,
      status: 'warning',
      description: 'Portfolio drift from target allocation'
    },
    {
      name: 'Recovery Readiness',
      score: 88,
      status: 'excellent',
      description: 'Cash reserves and defensive positions'
    }
  ];

  const recommendations: HealthRecommendation[] = [
    {
      type: 'improve',
      title: 'Rebalance Portfolio',
      description: 'Your allocation has drifted 8% from targets. Consider rebalancing to maintain optimal risk profile.'
    },
    {
      type: 'maintain',
      title: 'Strong Risk Management',
      description: 'Your current risk levels are well-calibrated for your investment horizon.'
    },
    {
      type: 'caution',
      title: 'Sector Concentration',
      description: 'Technology sector represents 35% of portfolio. Consider diversifying into other sectors.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-50';
      case 'good':
        return 'text-blue-600 bg-blue-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'poor':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="h-4 w-4" />;
      case 'good':
        return <TrendingUp className="h-4 w-4" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4" />;
      case 'poor':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'improve':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'maintain':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'caution':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6 animate-scale-in">
      {/* Overall Health Score */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            <CardTitle>Portfolio Health Score</CardTitle>
          </div>
          <CardDescription>
            Your portfolio's overall health and optimization level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className={cn("text-3xl font-bold", getHealthColor(overallHealthScore))}>
                    {overallHealthScore}
                  </div>
                  <div className="text-sm text-muted-foreground">Health Score</div>
                </div>
              </div>
              <div 
                className="absolute top-0 left-0 w-32 h-32 rounded-full border-8 border-transparent"
                style={{
                  borderTopColor: overallHealthScore >= 80 ? '#22c55e' : 
                                 overallHealthScore >= 60 ? '#3b82f6' : 
                                 overallHealthScore >= 40 ? '#f59e0b' : '#ef4444',
                  borderRightColor: overallHealthScore >= 60 ? (overallHealthScore >= 80 ? '#22c55e' : '#3b82f6') : 'transparent',
                  borderBottomColor: overallHealthScore >= 40 ? (overallHealthScore >= 80 ? '#22c55e' : overallHealthScore >= 60 ? '#3b82f6' : '#f59e0b') : 'transparent',
                  borderLeftColor: overallHealthScore >= 20 ? (overallHealthScore >= 80 ? '#22c55e' : overallHealthScore >= 60 ? '#3b82f6' : overallHealthScore >= 40 ? '#f59e0b' : '#ef4444') : 'transparent',
                  transform: `rotate(${(overallHealthScore / 100) * 360}deg)`,
                  transition: 'all 0.5s ease-in-out'
                }}
              />
            </div>
          </div>
          
          <div className="text-center">
            <Badge variant={overallHealthScore >= 80 ? "default" : overallHealthScore >= 60 ? "secondary" : "destructive"}>
              {overallHealthScore >= 80 ? "Excellent Health" : 
               overallHealthScore >= 60 ? "Good Health" : 
               overallHealthScore >= 40 ? "Needs Attention" : "Poor Health"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Health Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Health Metrics
          </CardTitle>
          <CardDescription>
            Detailed breakdown of your portfolio's health indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthMetrics.map((metric, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(metric.status)}
                    <span className="font-medium">{metric.name}</span>
                  </div>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.score}/100
                  </Badge>
                </div>
                
                <Progress value={metric.score} className="mb-2" />
                
                <p className="text-sm text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Health Recommendations
          </CardTitle>
          <CardDescription>
            Actionable insights to optimize your portfolio health
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <div className="flex items-start gap-3">
                  {getRecommendationIcon(rec.type)}
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {rec.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioHealthTracker;