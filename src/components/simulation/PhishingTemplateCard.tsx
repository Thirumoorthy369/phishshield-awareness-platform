
import { ArrowRight, Bell, CreditCard, Mail, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PhishingTemplateCardProps {
  template: {
    id: string;
    name: string;
    category: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    icon: 'mail' | 'bell' | 'creditcard' | 'shopping';
  };
  onSelect: (templateId: string) => void;
}

const PhishingTemplateCard = ({ template, onSelect }: PhishingTemplateCardProps) => {
  // Get the appropriate icon based on the template
  const getIcon = () => {
    switch(template.icon) {
      case 'bell': return <Bell className="h-5 w-5" />;
      case 'creditcard': return <CreditCard className="h-5 w-5" />;
      case 'shopping': return <ShoppingCart className="h-5 w-5" />;
      default: return <Mail className="h-5 w-5" />;
    }
  };
  
  // Get badge color based on difficulty
  const getBadgeVariant = () => {
    switch(template.difficulty) {
      case 'easy': return 'outline';
      case 'medium': return 'secondary';
      case 'hard': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-md bg-primary-50">
              {getIcon()}
            </div>
            <div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription>{template.category}</CardDescription>
            </div>
          </div>
          <Badge variant={getBadgeVariant()} className="capitalize">
            {template.difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600">{template.description}</p>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full justify-between" 
          onClick={() => onSelect(template.id)}
        >
          <span>Use Template</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PhishingTemplateCard;
