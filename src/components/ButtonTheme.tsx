interface IButton {
  onSwitch: (theme: boolean) => void;
  theme: boolean;
}

function Button({ onSwitch, theme }: IButton) {
  return (
    <button onClick={() => onSwitch(!theme)} className="button button__theme">
      Switch on {theme ? 'dark' : 'light'}
    </button>
  );
}

export default Button;
