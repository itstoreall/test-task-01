const CheckboxIcon = ({ isChecked }: { isChecked: boolean }) => (
  <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path fill='#000' d='M.5.5h23v23H.5z' />
    {isChecked ? (
      <path fill='#000' d='M.5.5h23v23H.5z' />
    ) : (
      <path fill='#fff' d='M.5.5h23v23H.5z' />
    )}
    <path stroke='#000' d='M.5.5h23v23H.5z' />
    <path
      d='m18.265 8.765-8 8a.375.375 0 0 1-.53 0l-3.5-3.5a.375.375 0 0 1 .53-.53L10 15.969l7.735-7.734a.375.375 0 0 1 .53.53Z'
      fill='#fff'
    />
  </svg>
);

export default CheckboxIcon;
