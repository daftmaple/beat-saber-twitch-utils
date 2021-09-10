import { useCallback, useEffect } from 'react';

import { useMessageQueue } from './queue';
import { useSpeech } from './speech';

import { Message, Ban, ClearChat, MessageDeleted } from '~/types';
import { TwitchChat } from '~/utils/twitch';

type CallbackHandler<T> = (arg: T | null) => void;

interface Props {
  enabled: boolean;
  client: TwitchChat;
}

/**
 * This linker links between queue, speech, and the twitch connections
 */
export const useLinker = (props: Props) => {
  const { enabled, client } = props;
  const [messageQueue, messageQueueActions] = useMessageQueue();
  const {
    currentSpeech,
    setCurrentSpeech,
    setEndCallback,
    cancelCurrentSpeech,
  } = useSpeech();

  /**
   * Triggers speech. Speech is only triggered when:
   * - TTS is enabled on the enabled props (currently as a button)
   * - Queue has a message
   * - There is no currently running speech
   *
   * This hook runs as a callback since it is passed to speech hook
   * which then invoked on message end
   */
  const triggerSpeech = useCallback(() => {
    if (enabled && messageQueueActions.countMessages() > 0 && !currentSpeech) {
      const messageToSpeak = messageQueueActions.popMessage();
      if (messageToSpeak) {
        setCurrentSpeech(messageToSpeak);
      }
    }
  }, [currentSpeech, enabled, messageQueueActions, setCurrentSpeech]);

  useEffect(() => {
    setEndCallback(triggerSpeech);
  }, [setEndCallback, triggerSpeech]);

  /**
   * Adds message to queue
   */
  const messageHandler = useCallback<CallbackHandler<Message>>(
    (payload) => {
      // If payload exists and message doesn't start with command trigger, speak the message
      if (payload && !payload.message.startsWith(`!`)) {
        messageQueue.addMessage({
          message: payload.message,
          username: payload.username,
          'msg-id': payload[`msg-id`],
        });
      }
    },
    [messageQueue],
  );

  /**
   * Clears queue based on username and stops message if username is matching
   */
  const userFilterHandler = useCallback<CallbackHandler<Ban>>(
    (payload) => {
      if (payload) {
        messageQueue.clearUserMessage(payload.username);
        if (currentSpeech?.username === payload.username) {
          cancelCurrentSpeech();
        }
      }
    },
    [currentSpeech, messageQueue, cancelCurrentSpeech],
  );

  /**
   * Clears queue and empties currently spoken speech
   */
  const clearChatHandler = useCallback<CallbackHandler<ClearChat>>(
    (payload) => {
      if (payload) {
        messageQueue.clearMessages();
        cancelCurrentSpeech();
      }
    },
    [messageQueue, cancelCurrentSpeech],
  );

  /**
   * Deletes message from queue and stops message from playing if id is matching
   */
  const messageDeletedHandler = useCallback<CallbackHandler<MessageDeleted>>(
    (payload) => {
      if (payload) {
        messageQueue.deleteMessage(payload[`msg-id`]);
        if (currentSpeech?.[`msg-id`] === payload[`msg-id`]) {
          cancelCurrentSpeech();
        }
      }
    },
    [currentSpeech, messageQueue, cancelCurrentSpeech],
  );

  useEffect(() => {
    client.registerMessageHandler(messageHandler);
    client.registerTimeoutHandler(userFilterHandler);
    client.registerBanHandler(userFilterHandler);
    client.registerClearChatHandler(clearChatHandler);
    client.registerMessageDeletedHandler(messageDeletedHandler);
  }, [
    clearChatHandler,
    client,
    messageDeletedHandler,
    messageHandler,
    userFilterHandler,
  ]);
};
