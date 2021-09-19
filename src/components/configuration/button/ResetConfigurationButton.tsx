import { cloneDeep } from 'lodash';

import { ConfigurationV1, defaultConfiguration } from '../type';

type ResetConfigurationButtonProps = {
  setConfig: (config: ConfigurationV1) => void;
};

export const ResetConfigurationButton = (
  props: ResetConfigurationButtonProps,
) => {
  const { setConfig } = props;

  const onClick = () => {
    setConfig(cloneDeep(defaultConfiguration));
  };

  return (
    <button onClick={onClick} type="button">
      Reset local configuration
    </button>
  );
};