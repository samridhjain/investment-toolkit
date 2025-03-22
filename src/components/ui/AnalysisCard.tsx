
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type AnalysisCardProps = {
  title: string;
  icon: React.ReactNode;
  description: string;
  onClick: () => void;
  className?: string;
};

const AnalysisCard = ({ title, icon, description, onClick, className }: AnalysisCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md",
      "border border-border hover:border-primary/20",
      "h-full flex flex-col",
      className
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          variant="ghost" 
          className="w-full justify-between hover:bg-secondary"
          onClick={onClick}
        >
          Run Analysis
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnalysisCard;
