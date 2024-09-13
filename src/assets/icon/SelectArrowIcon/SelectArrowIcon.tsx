import { ReactElement } from 'react';

type IconProps = {
  status: 'open' | 'close' | 'disabled';
};

type IconType = (props: IconProps) => ReactElement;

const SelectArrowIcon: IconType = ({ status }) => {
  const svgPath =
    status === 'close' ? (
      <path
        d='m21.265 14.265-5 5a.375.375 0 0 1-.53 0l-5-5a.375.375 0 0 1 .53-.53L16 18.469l4.735-4.734a.375.375 0 0 1 .53.53Z'
        fill='#1B2438'
      />
    ) : status === 'open' ? (
      <path
        d='M21.265 18.265a.375.375 0 0 1-.53 0L16 13.531l-4.735 4.734a.375.375 0 0 1-.53-.53l5-5a.375.375 0 0 1 .53 0l5 5a.375.375 0 0 1 0 .53Z'
        fill='#1B2438'
      />
    ) : (
      status === 'disabled' && (
        <path
          d='m21.265 14.265-5 5a.375.375 0 0 1-.53 0l-5-5a.375.375 0 0 1 .53-.53L16 18.469l4.735-4.734a.375.375 0 0 1 .53.53Z'
          fill='#C2C2C2'
        />
      )
    );
  return (
    <svg width='32' height='32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      {svgPath}
    </svg>
  );
};

export default SelectArrowIcon;
