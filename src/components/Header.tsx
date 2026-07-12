import { AI_OPTIONS } from "../data/ai";

type HeaderProps = {
  selectedAI: string;
  onOpenSettings?: () => void;
  onToggleTheme?: () => void;
};

export default function Header({
  selectedAI,
  onOpenSettings,
  onToggleTheme,
}: HeaderProps) {
  const ai =
    AI_OPTIONS.find((item) => item.id === selectedAI) ??
    AI_OPTIONS[0];

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">
          AI相談ナビ
        </h1>
      </div>

      <div className="header-right">

        <button
          className="ai-badge"
          aria-label="利用中のAI"
          onClick={onOpenSettings}
        >
          {ai.label} ▼
        </button>

        <button
          className="icon-button"
          aria-label="ダークモード"
          onClick={onToggleTheme}
        >
          🌙
        </button>

        <button
          className="icon-button"
          aria-label="設定"
          onClick={onOpenSettings}
        >
          ⚙
        </button>

      </div>
    </header>
  );
}
