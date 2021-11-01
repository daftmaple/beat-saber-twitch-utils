import { useEffect, useState } from 'react';

import { ConfigurationV1, defaultConfiguration } from '../type';

interface ExportConfigurationButtonProps {
  config: ConfigurationV1 | null;
}

const parseHref = (config: ConfigurationV1): string =>
  `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(config))}`;

export const ExportConfigurationButton = (
  props: ExportConfigurationButtonProps,
) => {
  const { config } = props;
  const [configHref, setConfigHref] = useState<string>(
    parseHref(config ?? defaultConfiguration),
  );

  useEffect(() => {
    if (config) {
      setConfigHref(parseHref(config));
    }
  }, [config]);

  return (
    <a download="twitchchat-config.json" href={configHref}>
      <button type="button">Export configuration</button>
    </a>
  );
};
