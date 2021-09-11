import { useCallback, useEffect, useState } from 'react';

/**
 * Template for choosing speech
 * Reference: https://blog.teamtreehouse.com/getting-started-speech-synthesis-api
 */
const getWindowSpeech = (): Promise<SpeechSynthesisVoice[]> =>
  new Promise<SpeechSynthesisVoice[]>((resolve) => {
    if (window.speechSynthesis.getVoices().length !== 0) {
      resolve(window.speechSynthesis.getVoices());
    }

    const listener = () => {
      resolve(window.speechSynthesis.getVoices());
      window.speechSynthesis.removeEventListener(`voiceschanged`, listener);
    };

    window.speechSynthesis.addEventListener(`voiceschanged`, listener);
  });

interface Props {
  volume: number;
}

type SpeakParam = {
  username: string;
  message: string;
  'msg-id': string;
};

export const useSpeech = (props: Props) => {
  const { volume } = props;
  const [currentSpeech, setCurrentSpeech] = useState<SpeakParam | null>(null);
  const [canSpeak, setCanSpeak] = useState<boolean>(false);
  const [speechVoices, setSpeechVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [endCallback, setEndCallback] = useState<(() => void) | null>(null);

  const getSpeeches = async () => {
    const windowSpeech = await getWindowSpeech();
    setSpeechVoices(windowSpeech);
  };

  useEffect(() => {
    if (typeof window !== `undefined` && window.speechSynthesis) {
      setCanSpeak(true);
      getSpeeches();
    }
  }, []);

  const onSpeechEnd = useCallback(() => {
    setCurrentSpeech(null);
    endCallback?.();
  }, [endCallback]);

  /**
   * Listens to update on currentSpeech state
   * Volume is not added to useEffect dependency since volume updates should not
   * trigger speech. This logic should probably be cleaned in the future.
   */
  useEffect(() => {
    if (canSpeak && currentSpeech) {
      const text = `${currentSpeech.username} said: ${currentSpeech.message}`;
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.volume = volume;
      utterance.onend = onSpeechEnd;
      window.speechSynthesis.speak(utterance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSpeak, currentSpeech, onSpeechEnd]);

  /**
   * This method stops any currently playing speech. Note that this method does not
   * set the currentSpeech state to null directly (it is set to null on utterance end),
   * hence method may be used by other component or hook by checking currentSpeech state.
   */
  const cancelCurrentSpeech = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  return {
    currentSpeech,
    setCurrentSpeech,
    cancelCurrentSpeech,
    speechVoices,
    setEndCallback,
  };
};
