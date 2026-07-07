import { useState, useEffect } from "react";
import BmiQuiz from "./BmiQuiz";

const QUIZ_SEEN_KEY = "bmi_quiz_seen";
const GUIDE_PDF_HREF = "/assets/guides/lekha-ai-readiness-guide-2026.pdf";

export default function QuizPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(QUIZ_SEEN_KEY)) return;
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  function close() {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(QUIZ_SEEN_KEY, "1");
    }, 300);
  }

  if (!visible) return null;

  return <BmiQuiz mode="modal" source="popup" pdfHref={GUIDE_PDF_HREF} onClose={close} closing={closing} />;
}
