
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

type NewsItemProps = {
  title: string;
  source: string;
  time: string;
  category: 'economic' | 'industry' | 'company';
  url: string;
};

const NewsItem = ({ title, source, time, category, url }: NewsItemProps) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex flex-col p-3 rounded-md transition-all duration-300 hover:bg-secondary/50 group"
    >
      <div className="flex items-start gap-2">
        <div 
          className={cn(
            "px-2 py-0.5 text-xs rounded-full mt-0.5",
            category === 'economic' ? "bg-market-blue/10 text-market-blue" : 
            category === 'industry' ? "bg-market-indigo/10 text-market-indigo" : 
            "bg-market-neutral/10 text-market-neutral"
          )}
        >
          {category === 'economic' ? 'Economic' : category === 'industry' ? 'Industry' : 'Company'}
        </div>
        <h3 className="font-medium flex-1 group-hover:text-market-blue transition-colors duration-200">{title}</h3>
        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
        <span>{source}</span>
        <span>•</span>
        <span>{time}</span>
      </div>
    </a>
  );
};

const NewsHighlights = () => {
  // Mock data - would be fetched from API in a real app
  const news = [
    { 
      title: "Fed signals potential interest rate cuts in 2024",
      source: "Financial Times",
      time: "2 hours ago",
      category: 'economic' as const,
      url: "#"
    },
    { 
      title: "Tech sector facing semiconductor supply chain challenges",
      source: "Bloomberg",
      time: "4 hours ago",
      category: 'industry' as const,
      url: "#"
    },
    { 
      title: "Tesla announces new battery technology breakthrough",
      source: "Reuters",
      time: "6 hours ago",
      category: 'company' as const,
      url: "#"
    },
    { 
      title: "Consumer spending up 0.8% in latest economic report",
      source: "CNBC",
      time: "8 hours ago",
      category: 'economic' as const,
      url: "#"
    },
    { 
      title: "Apple supplier reports better than expected production figures",
      source: "Wall Street Journal",
      time: "10 hours ago",
      category: 'company' as const,
      url: "#"
    },
  ];
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md animate-scale-in animate-delay-200">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-market-blue" />
          <CardTitle className="text-base">News Highlights</CardTitle>
        </div>
        <CardDescription>Latest market & industry news</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-0.5 max-h-[350px] overflow-y-auto pr-1">
          {news.map((item, index) => (
            <NewsItem key={index} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsHighlights;
