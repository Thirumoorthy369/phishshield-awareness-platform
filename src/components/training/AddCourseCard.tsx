
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AddCourseCard = () => {
  return (
    <Card className="border-dashed">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Explore More Courses</CardTitle>
        <CardDescription>Discover additional security training content</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-32">
        <Button variant="ghost" className="h-20 w-20 rounded-full">
          <PlusCircle className="h-10 w-10 text-muted-foreground" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddCourseCard;
