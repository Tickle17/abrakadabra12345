import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from '@/shared/ui';
import { createBusiness } from '@/widgets/FetchData/fetchCreateBusiness.ts';
import { useState } from 'react';

export function CreateWorkers() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateBusiness = async () => {
    const confirmation = window.confirm(
      `Email: ${email}\nPassword: ${password}\n\nСоздать сотрудника с этими данными?`
    );
    if (confirmation) {
      await createBusiness(email, password);
    }
  };

  return (
    <Card>
      <CardHeader className="p-2">
        <CardTitle>Регистрация сотрудников</CardTitle>
        <CardDescription>Добавить нового сотрудника в компанию</CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <Input
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </CardContent>
      <CardFooter className="p-2">
        <Input
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </CardFooter>
      <div className="p-2 flex justify-end">
        <Button onClick={handleCreateBusiness}>Создать сотрудника</Button>
      </div>
    </Card>
  );
}
