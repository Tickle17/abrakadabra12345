import React, { useCallback, useState } from 'react';
import axios from 'axios';
import Modal from '@/widgets/Modal/Modal.tsx';
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

export default function CreateMessage({ close }: { close: () => void }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleMessageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    const id = localStorage.getItem('id');
    const payload = {
      businessId: id,
      name: title,
      message: message,
      active: false,
    };

    try {
      const response = await axios.post(
        'https://backendhackaton.onrender.com/defaultMessage',
        payload
      );

      if (response.status >= 200) {
        alert('Шаблон успешно создан');
        close();
      } else {
        alert('Ошибка при создании шаблона');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert('Произошла ошибка: ' + error.message);
      } else {
        console.log(error);
      }
    }
  }, [title, message, close]);

  return (
    <Modal onClose={close}>
      <Card className="flex flex-col justify-between p-4">
        <CardHeader className="p-2 py-0">
          <CardTitle>Создать сообщение</CardTitle>
          <CardDescription>
            Укажите имя шаблона и текст сообщения
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col p-2 gap-4">
          <Input
            placeholder="Название"
            value={title}
            onChange={handleTitleChange}
          />
          <Input
            placeholder="Текст сообщения"
            value={message}
            onChange={handleMessageChange}
          />
        </CardContent>
        <CardFooter className="p-2 flex gap-2">
          <Button onClick={handleSubmit}>Создать авто-сообщение</Button>
        </CardFooter>
      </Card>
    </Modal>
  );
}
