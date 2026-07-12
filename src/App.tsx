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
import CopyButton from "./components/CopyButton";
import CopyComplete from "./components/CopyComplete";

import { generatePrompt } from "./utils/promptEngine";

import "./styles/global.css";

const CONSULTATION_STORAGE_KEY = "consultation";
const ANSWER_MODE_STORAGE_KEY = "answerMode";
const THEME_STORAGE_KEY = "theme";

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

  if (!setupComplete) {
    return (
      <>
        <Header
          selectedAI={selectedAI}
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
        onOpenSettings={() => setSettingsOpen(true)}
        onToggleTheme={handleToggleTheme}
      />

      <SettingsDialog
        open={settingsOpen}
        selectedAI={selectedAI}
        onChange={handleSelectAI}
        onClose={() => setSettingsOpen(false)}
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
      </main>
    </div>
  );
}

export default App;
