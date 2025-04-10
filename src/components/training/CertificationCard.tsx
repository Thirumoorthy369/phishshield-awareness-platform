
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface Certification {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  level: string;
  date?: string;
  expiry?: string;
  requirements?: string;
}

interface CertificationCardProps {
  certification: Certification;
}

const CertificationCard = ({ certification }: CertificationCardProps) => {
  return (
    <Card key={certification.id} className={certification.completed ? "border-green-200" : ""}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{certification.title}</CardTitle>
          <Badge variant="outline" className={certification.completed ? "border-green-500 text-green-600" : ""}>
            {certification.level}
          </Badge>
        </div>
        <CardDescription>{certification.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {certification.completed ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Earned:</span>
              <span>{certification.date && new Date(certification.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Expires:</span>
              <span>{certification.expiry && new Date(certification.expiry).toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            <p>Requirements:</p>
            <p className="font-medium mt-1">{certification.requirements}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant={certification.completed ? "outline" : "default"} className="w-full">
          {certification.completed ? 'View Certificate' : 'Start Certification Path'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CertificationCard;
