import { useEffect, useState } from "react";

import Header from "./components/Header";
import InitialSetup from "./components/InitialSetup";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import SupplementSection from "./components/SupplementSection";
import ReferenceSection from "./components/ReferenceSection";
import AnswerMode from "./components/AnswerMode";
import AdditionalSection from "./components/AdditionalSection";
import SettingsDialog from "./components/SettingsDialog";
import ConfirmDialog from "./components/ConfirmDialog";
import CopyButton from "./components/CopyButton";
import CopyComplete from "./components/CopyComplete";

import { generatePrompt } from "./utils/promptEngine";

import "./styles/global.css";

const CONSULTATION_STORAGE_KEY = "consultation";
const ANSWER_MODE_STORAGE_KEY = "answerMode";
const THEME_STORAGE_KEY = "theme";

// window.alert / window.confirm の代わりに表示するConfirmDialogの状態。
// cancelLabelを渡さない場合は「通知」（OKのみ）、渡す場合は「確認」（OK/キャンセル）になる。
type ConfirmDialogState = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

const INITIAL_CONFIRM_DIALOG_STATE: ConfirmDialogState = {
  open: false,
  title: "",
  message: "",
  onConfirm: () => {},
};

function App() {
  const [selectedAI, setSelectedAI] = useState(() => {
    return localStorage.getItem("selected-ai") || "chatgpt";
  });

  const [settingsOpen, setSettingsOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) || "dark";
  });

  const [setupComplete, setSetupComplete] = useState(
    localStorage.getItem("initial-setup-complete") === "true"
  );

  const [consultation, setConsultation] = useState(() => {
    try {
      const saved = localStorage.getItem(CONSULTATION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          topic: parsed.topic ?? "",
          situation: parsed.situation ?? "",
          trouble: parsed.trouble ?? "",
        };
      }
    } catch {
      // ignore broken storage
    }

    return {
      topic: "",
      situation: "",
      trouble: "",
    };
  });

  const [supplement, setSupplement] = useState(() => {
    try {
      const saved = localStorage.getItem(CONSULTATION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.supplement ?? "";
      }
    } catch {
      // ignore broken storage
    }

    return "";
  });

  const [hasReference, setHasReference] =
    useState(false);

  const [answerMode, setAnswerMode] = useState(() => {
    return localStorage.getItem(ANSWER_MODE_STORAGE_KEY) || "recommended";
  });

  const [generatedPrompt, setGeneratedPrompt] =
    useState("");

  const [copied, setCopied] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>(
    INITIAL_CONFIRM_DIALOG_STATE
  );

  const closeConfirmDialog = () => {
    setConfirmDialog((prev) => ({ ...prev, open: false }));
  };

const hasConsultationData =
  consultation.topic.trim() !== "" ||
  consultation.situation.trim() !== "" ||
  consultation.trouble.trim() !== "" ||
  supplement.trim() !== "" ||
  hasReference;
  useEffect(() => {
    localStorage.setItem(
      CONSULTATION_STORAGE_KEY,
      JSON.stringify({ ...consultation, supplement })
    );
  }, [consultation, supplement]);

  useEffect(() => {
    localStorage.setItem(ANSWER_MODE_STORAGE_KEY, answerMode);
  }, [answerMode]);

  useEffect(() => {
    document.body.classList.toggle("theme-light", theme === "light");
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const handleGeneratePrompt = () => {

if (
  consultation.topic.trim() === "" &&
  consultation.situation.trim() === "" &&
  consultation.trouble.trim() === "" &&
  supplement.trim() === "" &&
  !hasReference
) {
  setConfirmDialog({
    open: true,
    title: "相談内容が入力されていません",
    message:
      "STEP1～STEP3のいずれかを入力してから、AIへ送る相談文を作成してください。",
    confirmLabel: "OK",
    onConfirm: closeConfirmDialog,
  });
  return;
}
    const result = generatePrompt({
      consultation,
      supplement,
      answerMode,
      hasReference,
      selectedAI,
    });

    setGeneratedPrompt(result);
    setCopied(false);
  };

  const handleSelectAI = (id: string) => {
    setSelectedAI(id);
    localStorage.setItem("selected-ai", id);
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleCopy = async () => {
   

    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
    } catch {
      // クリップボードへのアクセスが許可されていない場合は何もしない
    }
  };
const handleNewConsultation = () => {
  setConfirmDialog({
    open: true,
    title: "新しい相談を始める",
    message:
      "現在入力中の相談内容を削除して、新しい相談を始めます。\n\nAI設定・回答モード・テーマは保持されます。",
    confirmLabel: "OK",
    cancelLabel: "キャンセル",
    onConfirm: () => {
      setConsultation({
        topic: "",
        situation: "",
        trouble: "",
      });

      setSupplement("");
      setHasReference(false);

      setGeneratedPrompt("");
      setCopied(false);

      localStorage.removeItem(CONSULTATION_STORAGE_KEY);

      closeConfirmDialog();
    },
    onCancel: closeConfirmDialog,
  });
};
  if (!setupComplete) {
    return (
      <>
       <Header
  selectedAI={selectedAI}
  theme={theme}
  onToggleTheme={handleToggleTheme}
/>

        <InitialSetup
          onComplete={() => {
            localStorage.setItem(
              "initial-setup-complete",
              "true"
            );

            setSelectedAI(
              localStorage.getItem("selected-ai") || "chatgpt"
            );

            setSetupComplete(true);
          }}
        />
      </>
    );
  }

  return (
    <div className="app">
     <Header
  selectedAI={selectedAI}
  theme={theme}
  onOpenSettings={() => setSettingsOpen(true)}
  onToggleTheme={handleToggleTheme}
/>

      <SettingsDialog
        open={settingsOpen}
        selectedAI={selectedAI}
        onChange={handleSelectAI}
        onClose={() => setSettingsOpen(false)}
      />

      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel}
        cancelLabel={confirmDialog.cancelLabel}
        onConfirm={confirmDialog.onConfirm}
        onCancel={confirmDialog.onCancel}
      />

      <main className="main-container">
        <Step1
          value={consultation.topic}
          onChange={(value) =>
            setConsultation({
              ...consultation,
              topic: value,
            })
          }
        />

        <Step2
          value={consultation.situation}
          onChange={(value) =>
            setConsultation({
              ...consultation,
              situation: value,
            })
          }
        />

        <Step3
          value={consultation.trouble}
          onChange={(value) =>
            setConsultation({
              ...consultation,
              trouble: value,
            })
          }
        />

        <AdditionalSection />

        <SupplementSection
          value={supplement}
          onChange={setSupplement}
        />

        <ReferenceSection
          value={hasReference}
          onChange={setHasReference}
        />

        <AnswerMode
          answerMode={answerMode}
          setAnswerMode={setAnswerMode}
        />

        <p className="generate-note">
          入力した内容から、AIへ送る相談文を作成します。
        </p>

        <button
          className="primary-button"
          onClick={handleGeneratePrompt}
        >
          AIへ送る相談文を作成
        </button>

        {generatedPrompt && (
          <section className="card">
            <h3 className="card-title">
              生成された相談文
            </h3>

            <textarea
              className="qa-input generated-output"
              value={generatedPrompt}
              readOnly
              rows={12}
            />

            <CopyButton onClick={handleCopy} />
          </section>
        )}

        {copied && <CopyComplete />}
        {hasConsultationData && (
<div className="new-consultation-area">
  <button
    className="new-consultation-button"
    onClick={handleNewConsultation}
  >
    ✨ 新しい相談を始める
  </button>
</div>
)}
      </main>
    </div>
  );
}

export default App;
