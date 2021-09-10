import { useCallback, useEffect } from 'react';

import { useMessageQueue } from './queue';
import { useSpeech } from './speech';

import { Message, Ban } from '~/types';
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
  const queue = useMessageQueue();
  const speech = useSpeech();

  const triggerSpeech = useCallback(() => {
    /**
     * Speech is only triggered when:
     * - TTS is enabled on the enabled props (currently as a button)
     * - Queue has a message
     * - There is no currently running speech
     *
     * This hook runs as a callback since it is passed to speech hook
     * which then invoked on message end
     */
    if (enabled && queue.countMessages() > 0 && !speech.currentSpeech) {
      const messageToSpeak = queue.popMessage();
      if (messageToSpeak) {
        speech.setCurrentSpeech({
          message: messageToSpeak.message,
          username: messageToSpeak.username,
        });
      }
    }
  }, [enabled, queue, speech]);

  useEffect(() => {
    speech.setEndCallback(triggerSpeech);
  }, [speech, triggerSpeech]);

  const messageHandler = useCallback<CallbackHandler<Message>>(
    (payload) => {
      // If payload exists and message doesn't start with command trigger, speak the message
      if (payload && !payload.message.startsWith(`!`)) {
        queue.addMessage({
          message: payload.message,
          username: payload.username,
          'msg-id': payload[`msg-id`],
        });
      }
    },
    [queue],
  );

  const userFilterHandler = useCallback<CallbackHandler<Ban>>(
    (payload) => {
      if (payload) {
        queue.clearUserMessage(payload.username);
      }
    },
    [queue],
  );

  useEffect(() => {
    client.registerMessageHandler(messageHandler);
    client.registerTimeoutHandler(userFilterHandler);
    client.registerBanHandler(userFilterHandler);
  }, [client, messageHandler, userFilterHandler]);
};
