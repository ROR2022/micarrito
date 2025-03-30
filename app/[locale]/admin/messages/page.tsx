'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
//import { useAuth } from "@/hooks/useAuth"; // Asumiendo que tienes un hook de autenticación
import { Button } from '@/components/ui/button';

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'read' | 'unread';
  created_at: string;
};

export default function AdminMessagesPage() {
  const t = useTranslations('Admin.Messages');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const isAdmin = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log('user:..', user);
      const userEmail = user?.email || null;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('email', userEmail)
        .single();

      return profile?.role === 'admin';
    } catch (error) {
      console.error('Error al determinar si el usuario es administrador:', error);
      return false;
    }
  }, [supabase]);

  useEffect(() => {
    async function fetchMessages() {
      if (!(await isAdmin())) {
        setError(t('unauthorized'));
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        console.log('dataMessages:..', data);
        setMessages(data || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError(error instanceof Error ? error.message : t('fetchError'));
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, [t, isAdmin, supabase]);

  const markAsRead = async (id: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', id);

      if (error) throw error;

      // Actualizar estado local
      setMessages(messages.map((msg) => (msg.id === id ? { ...msg, status: 'read' } : msg)));
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="container py-12">
        <Card>
          <CardContent className="pt-6">
            <p>{t('unauthorized')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-12">
        <Card>
          <CardContent className="pt-6">
            <p>{t('loading')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <Card>
          <CardContent className="pt-6">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <p>{t('noMessages')}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('columns.status')}</TableHead>
                  <TableHead>{t('columns.name')}</TableHead>
                  <TableHead>{t('columns.email')}</TableHead>
                  <TableHead>{t('columns.subject')}</TableHead>
                  <TableHead>{t('columns.date')}</TableHead>
                  <TableHead>{t('columns.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>
                      <Badge variant={message.status === 'unread' ? 'default' : 'outline'}>
                        {message.status === 'unread' ? t('status.unread') : t('status.read')}
                      </Badge>
                    </TableCell>
                    <TableCell>{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{message.subject}</TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            /* Abrir modal con detalles */
                          }}
                        >
                          {t('actions.view')}
                        </Button>
                        {message.status === 'unread' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsRead(message.id)}
                          >
                            {t('actions.markRead')}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
