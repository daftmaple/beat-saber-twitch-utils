import { useMemo, useState } from 'react';

type ChatMessage = {
  message: string;
  username: string;
  'msg-id': string;
};

type Actions = {
  addMessage(newMessage: ChatMessage): void;
  clearUserMessage(username: string): void;
  clearMessages(): void;
  deleteMessage(id: string): void;
};

type MessageActions = {
  popMessage(): ChatMessage | undefined;
  countMessages(): number;
};

export const useMessageQueue = (): [Actions, MessageActions] => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const actions = useMemo<Actions>(
    () => ({
      addMessage(newMessage: ChatMessage) {
        setMessages((previousMessages) => [...previousMessages, newMessage]);
      },
      clearUserMessage(username: string) {
        setMessages((previousMessages) =>
          previousMessages.filter((message) => message.username !== username),
        );
      },
      clearMessages() {
        setMessages([]);
      },
      deleteMessage(id: string) {
        setMessages((previousMessages) =>
          previousMessages.filter((message) => message[`msg-id`] !== id),
        );
      },
    }),
    [],
  );

  const messageActions = useMemo<MessageActions>(
    () => ({
      popMessage(): ChatMessage | undefined {
        const [newestMessage, ...previousMessages] = messages;
        setMessages(previousMessages);
        return newestMessage;
      },
      countMessages() {
        return messages.length;
      },
    }),
    [messages],
  );

  return [actions, messageActions];
};
