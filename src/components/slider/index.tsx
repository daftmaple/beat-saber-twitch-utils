import { ChangeEvent, ReactElement } from 'react';

interface Props {
  value: number;
  setValue: (value: number) => void;
}

/**
 * Slider component which takes value between 0 and 100
 */
export const Slider = (props: Props): ReactElement => {
  const { value, setValue } = props;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <input type="range" min={0} max={100} value={value} onChange={onChange} />
    </div>
  );
};
