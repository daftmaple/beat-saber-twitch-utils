import { ChangeEvent, useState } from 'react';

import { ConfigurationV1 } from '../type';

interface ImportConfigurationButtonProps {
  setConfig: (config: ConfigurationV1) => void;
}

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
      <input accept="application/json" type="file" onChange={handleFileInput} />
      <button type="button" onClick={onClick}>
        Load configuration
      </button>
    </div>
  );
};
