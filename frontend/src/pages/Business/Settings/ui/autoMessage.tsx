import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui';

export function AutoMessageSettings() {
  return (
    <Card>
      <CardHeader className="p-2">
        <CardTitle>Авто - сообщения</CardTitle>
        <CardDescription>Настройте отправку автосообщений</CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="p-2">
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
