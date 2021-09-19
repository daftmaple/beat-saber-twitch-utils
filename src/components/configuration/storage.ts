import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';

import { ConfigurationV1, CONFIG_NAME, defaultConfiguration } from './type';

export const useConfiguration = () => {
  const [config, setConfig] = useState<ConfigurationV1 | null>(null);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      const storedConfiguration = localStorage.getItem(CONFIG_NAME);
      const configToStore = storedConfiguration
        ? (JSON.parse(storedConfiguration) as ConfigurationV1) // TODO: do a structure validation check
        : cloneDeep(defaultConfiguration);

      setConfig(configToStore);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== `undefined` && config) {
      localStorage.setItem(CONFIG_NAME, JSON.stringify(config));
    }
  }, [config]);

  return {
    config,
    setConfig,
  };
};
