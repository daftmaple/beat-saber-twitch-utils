import {
  ExportConfigurationButton,
  ImportConfigurationButton,
  ResetConfigurationButton,
  useConfiguration,
} from '~/components';

const Test = () => {
  const { config, setConfig } = useConfiguration();

  return (
    <>
      <ExportConfigurationButton config={config} />
      <ImportConfigurationButton setConfig={setConfig} />
      <ResetConfigurationButton setConfig={setConfig} />
    </>
  );
};

export default Test;
