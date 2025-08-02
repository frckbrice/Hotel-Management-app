import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type CardProps = React.ComponentProps<typeof Card>;
type CustomCardProps = CardProps & {
  cardHeader?: React.ReactNode;
  cardContent?: React.ReactNode;
  cardFooter?: React.ReactNode;
  location?: string;
};

const CustomCard: React.FC<CustomCardProps> = ({
  className,
  cardHeader,
  cardContent,
  cardFooter,
  location,
  ...props
}) => {
  return (
    <Card className={cn('w-[380px] shadow-xl', className)} {...props}>
      <CardHeader>
        <div className='flex flex-col gap-2'>{cardHeader}</div>
      </CardHeader>
      <CardContent
        className='grid
        gap-4
      '
      >
        {cardContent}
      </CardContent>
      <CardFooter>{cardFooter}</CardFooter>
    </Card>
  );
};

export default CustomCard;
