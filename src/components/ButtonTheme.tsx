interface IButton {
  onSwitch: (theme: boolean) => void;
  theme: boolean;
}

function ButtonTheme({ onSwitch, theme }: IButton) {
  return (
    <button role="button-theme" onClick={() => onSwitch(!theme)} className="button button__theme">
      Switch on {theme ? 'dark' : 'light'}
    </button>
  );
}

export default ButtonTheme;
