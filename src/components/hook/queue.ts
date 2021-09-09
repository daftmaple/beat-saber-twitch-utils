import { useMemo, useState } from 'react';

type ChatMessage = {
  message: string;
  username: string;
  'msg-id': string;
};

export const useMessageQueue = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const actions = useMemo(
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

  return actions;
};
