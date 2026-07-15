import { AI_OPTIONS } from "../data/ai";

type Props = {
  open: boolean;
  selectedAI: string;
  onChange: (id: string) => void;
  onClose: () => void;
};

export default function SettingsDialog({
  open,
  selectedAI,
  onChange,
  onClose,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <div className="settings-overlay" onClick={onClose}>
      <section
        className="card settings-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="card-title">
          設定
        </h2>

        <h3>利用するAI</h3>

        <div className="ai-grid">
          {AI_OPTIONS.map((ai) => (
            <label
              key={ai.id}
              className="ai-card"
            >
              <input
                type="radio"
                name="settings-ai"
                value={ai.id}
                checked={selectedAI === ai.id}
                onChange={() => onChange(ai.id)}
              />

              <span>{ai.label}</span>
              <span className="ai-description">{ai.description}</span>
            </label>
          ))}
        </div>

        <hr />

        <h3>テーマ</h3>

        <label>
          <input
            type="radio"
            name="theme"
            checked
            readOnly
          />
          ライト（現在）
        </label>

        <label>
          <input
            type="radio"
            name="theme"
            disabled
          />
          ダーク（Version1.1で対応予定）
        </label>

        <label>
          <input
            type="radio"
            name="theme"
            disabled
          />
          システム設定に合わせる（Version1.1で対応予定）
        </label>

        <button
          className="primary-button"
          onClick={onClose}
        >
          閉じる
        </button>
      </section>
    </div>
  );
}