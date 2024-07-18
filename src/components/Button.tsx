interface IButton {
  onSwitch: (theme: boolean) => void;
  theme: boolean;
}

function Button({ onSwitch, theme }: IButton) {
  return (
    <button onClick={() => onSwitch(!theme)} className="button button__theme">
      Swith on {theme ? 'light' : 'dark'}
    </button>
  );
}

export default Button;
