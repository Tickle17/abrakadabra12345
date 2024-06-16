import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui';
import CreateMessage from '@/pages/Business/Settings/ui/createMessage.tsx';
import EditMessage from '@/pages/Business/Settings/ui/changeAutoMesage.tsx';

export type DefaultMessage = {
  id: string;
  businessId: string;
  name: string;
  message: string;
  active: boolean;
};

export function AutoMessageSettings() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<DefaultMessage | null>(null);
  const [templates, setTemplates] = useState<DefaultMessage[]>([]);

  const closeCreate = () => setOpenCreate(false);
  const closeEdit = () => setOpenEdit(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      const businessId = localStorage.getItem('id');
      if (!businessId) {
        console.error('Business ID not found in localStorage');
        return;
      }

      try {
        const response = await axios.get(
          `https://backendhackaton.onrender.com/defaultMessages/${businessId}`
        );
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <Card className="flex flex-col justify-between p-4">
      <CardHeader className="p-2 py-0">
        <CardTitle>Авто - сообщения</CardTitle>
        <CardDescription>Настройте отправку автосообщений</CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        {templates.length > 0 ? (
          templates.map(template => (
            <Button
              key={template.id}
              className="mb-2"
              onClick={() => {
                setSelectedTemplate(template);
                setOpenEdit(true);
              }}
            >
              {template.name}
            </Button>
          ))
        ) : (
          <p>Нет доступных шаблонов</p>
        )}
      </CardContent>
      <CardFooter className="p-2 flex gap-2">
        <Button
          onClick={() => {
            setOpenCreate(true);
          }}
        >
          Создать авто-сообщение
        </Button>
      </CardFooter>
      {openCreate && <CreateMessage close={closeCreate} />}
      {openEdit && selectedTemplate && (
        <EditMessage template={selectedTemplate} close={closeEdit} />
      )}
    </Card>
  );
}
