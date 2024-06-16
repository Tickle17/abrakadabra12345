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
import { DefaultMessage } from '@/pages/Business/Settings/ui/autoMessage.tsx';

export default function EditMessage({
  template,
  close,
}: {
  template: DefaultMessage;
  close: () => void;
}) {
  const [title, setTitle] = useState(template.name);
  const [message, setMessage] = useState(template.message);
  const [active, setActive] = useState(template.active);

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

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setActive(e.target.checked);
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    const businessId = localStorage.getItem('id');
    const payload = {
      businessId,
      name: title,
      message: message,
      active: active,
    };

    try {
      const response = await axios.put(
        `https://backendhackaton.onrender.com/defaultMessages/${template.id}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status >= 200) {
        alert('Шаблон успешно обновлен');
        close();
      } else {
        alert('Ошибка при обновлении шаблона');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert('Произошла ошибка: ' + error.message);
      } else {
        console.log(error);
      }
    }
  }, [title, message, active, close, template.id]);

  const handleDelete = useCallback(async () => {
    try {
      const response = await axios.delete(
        `https://backendhackaton.onrender.com/defaultMessages/${template.id}`
      );

      if (response.status >= 200) {
        alert('Шаблон успешно удален');
        close();
      } else {
        alert('Ошибка при удалении шаблона');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert('Произошла ошибка: ' + error.message);
      } else {
        console.log(error);
      }
    }
  }, [close, template.id]);

  return (
    <Modal onClose={close}>
      <Card className="flex flex-col justify-between p-4">
        <CardHeader className="p-2 py-0">
          <CardTitle>Редактировать сообщение</CardTitle>
          <CardDescription>
            Измените имя шаблона и текст сообщения
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
          <div className="flex items-center gap-2">
            <label htmlFor="active-checkbox">Автоответ на отклик</label>
            <input
              id="active-checkbox"
              type="checkbox"
              checked={active}
              onChange={handleCheckboxChange}
            />
          </div>
        </CardContent>
        <CardFooter className="p-2 flex gap-2">
          <Button onClick={handleSubmit}>Изменить</Button>
          <Button onClick={handleDelete} variant="default">
            Удалить
          </Button>
        </CardFooter>
      </Card>
    </Modal>
  );
}
