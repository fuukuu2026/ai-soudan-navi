type Props = {
  onClick: () => void;
};

function CopyButton({ onClick }: Props) {
  return (
    <button
      className="copy-button"
      onClick={onClick}
    >
      AIへコピー
    </button>
  );
}

export default CopyButton;
