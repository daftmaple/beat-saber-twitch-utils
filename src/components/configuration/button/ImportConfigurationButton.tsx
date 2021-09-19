import { ChangeEvent, useEffect, useState } from 'react';

import { ConfigurationV1 } from '../type';

type ImportConfigurationButtonProps = {
  setConfig: (config: ConfigurationV1) => void;
};

export const ImportConfigurationButton = (
  props: ImportConfigurationButtonProps,
) => {
  const { setConfig } = props;
  const [tempConfig, setTempConfig] = useState<ConfigurationV1 | null>(null);

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files.item(0);

      if (file) {
        const reader = new FileReader();
        reader.readAsText(file, `utf-8`);
        reader.onload = (e) => {
          if (typeof e.target?.result === `string`) {
            setTempConfig(JSON.parse(e.target.result));
          }
        };
      }
    }
  };

  const onClick = () => {
    if (tempConfig) {
      setConfig(tempConfig);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} accept="application/json" />
      <button onClick={onClick} type="button">
        Load configuration
      </button>
    </div>
  );
};
