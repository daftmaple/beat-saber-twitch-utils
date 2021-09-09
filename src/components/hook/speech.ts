import { useCallback, useEffect, useMemo, useState } from 'react';

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

type SpeakParam = {
  username: string;
  message: string;
};

export const useSpeech = () => {
  const [currentSpeech, setCurrentSpeech] = useState<SpeakParam | null>(null);
  const [canSpeak, setCanSpeak] = useState<boolean>(false);
  const [speech, setSpeech] = useState<SpeechSynthesisVoice[]>([]);
  const [endCallback, setEndCallback] = useState<(() => void) | null>(null);

  const getSpeeches = async () => {
    const windowSpeech = await getWindowSpeech();
    setSpeech(windowSpeech);
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

  const speak = useCallback(
    (arg: SpeakParam) => {
      if (canSpeak) {
        const text = `${arg.username} said: ${arg.message}`;
        const utterance = new window.SpeechSynthesisUtterance(text);
        utterance.onend = onSpeechEnd;
        setCurrentSpeech(arg);
        window.speechSynthesis.speak(utterance);
      }
    },
    [canSpeak, onSpeechEnd],
  );

  return useMemo(
    () => ({
      currentSpeech,
      speech,
      speak,
      setEndCallback,
    }),
    [currentSpeech, speech, speak],
  );
};
