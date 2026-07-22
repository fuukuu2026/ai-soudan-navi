import { useState } from "react";

import "./ConfirmDialog.css";

type ConfirmDialogProps = {
  /** 表示するかどうか */
  open: boolean;
  /** タイトル */
  title: string;
  /** 本文メッセージ */
  message: string;
  /** 確定ボタンの文言（省略時は "OK"） */
  confirmLabel?: string;
  /**
   * キャンセルボタンの文言。
   * 省略した場合は「通知（alert代替）」モードとなり、
   * 確定ボタンのみを表示する。
   * 指定した場合は「確認（confirm代替）」モードとなり、
   * 確定・キャンセルの両方を表示する。
   */
  cancelLabel?: string;
  /** 確定ボタン押下時の処理 */
  onConfirm: () => void;
  /**
   * キャンセルボタン押下時の処理。
   * confirmLabelのみでcancelLabelがない「通知」モードでは使用しない。
   */
  onCancel?: () => void;
  /** タイトル左側に表示するアイコン画像のパス（省略時はpublic/icons/icon-192.pngを使用） */
  iconSrc?: string;
  /** アイコンのalt属性（省略時は空文字＝装飾目的として扱う） */
  iconAlt?: string;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "OK",
  cancelLabel,
  onConfirm,
  onCancel,
  iconSrc = `${import.meta.env.BASE_URL}icons/icon-192.png`,
  iconAlt = "",
}: ConfirmDialogProps) {
  // アイコン画像が読み込めなかった場合はタイトルのみ表示するためのフラグ
  const [iconFailed, setIconFailed] = useState(false);

  if (!open) {
    return null;
  }

  // キャンセルボタンの有無で「通知」か「確認」かを判定する
  const isConfirmMode = Boolean(cancelLabel);

  const handleOverlayClick = () => {
    // 通知モード（OKのみ）ではオーバーレイクリックでは閉じない。
    // 確認モードではオーバーレイクリックをキャンセル操作として扱う。
    if (isConfirmMode) {
      onCancel?.();
    }
  };

  return (
    <div
      className="confirm-dialog-overlay"
      onClick={handleOverlayClick}
    >
      <section
        className="card confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-dialog-header">
          {!iconFailed && (
            <img
              src={iconSrc}
              alt={iconAlt}
              className="confirm-dialog-icon"
              onError={() => setIconFailed(true)}
            />
          )}

          <h2
            id="confirm-dialog-title"
            className="card-title confirm-dialog-title"
          >
            {title}
          </h2>
        </div>

        <p
          id="confirm-dialog-message"
          className="confirm-dialog-message"
        >
          {message}
        </p>

        <div className="confirm-dialog-actions">
          {isConfirmMode && (
            <button
              type="button"
              className="confirm-dialog-cancel-button"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
          )}

          <button
            type="button"
            className="primary-button confirm-dialog-confirm-button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
