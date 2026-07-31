import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  Trophy,
  Timer,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Zap,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_QUIZ_QUESTIONS } from '../data/quizQuestions';
import { QuizQuestion, QuizResult } from '../types';

export const QuizView: React.FC = () => {
  const { showToast } = useApp();

  const [selectedMode, setSelectedMode] = useState<'Easy' | 'Medium' | 'Hard' | 'Timed'>('Easy');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>(() => {
    try {
      const saved = localStorage.getItem('ak_quiz_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter questions by mode
  const startQuiz = (mode: 'Easy' | 'Medium' | 'Hard' | 'Timed') => {
    setSelectedMode(mode);
    const filtered = INITIAL_QUIZ_QUESTIONS.filter((q) => mode === 'Timed' ? true : q.mode === mode);
    setQuestions(filtered.length > 0 ? filtered : INITIAL_QUIZ_QUESTIONS);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setIsSubmitted(false);
    setQuizFinished(false);
    setTimeLeft(15);
  };

  useEffect(() => {
    startQuiz('Easy');
  }, []);

  // Timer logic for Timed Mode
  useEffect(() => {
    if (selectedMode !== 'Timed' || isSubmitted || quizFinished) return;

    if (timeLeft <= 0) {
      // Auto submit wrong answer
      setIsSubmitted(true);
      setStreak(0);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, selectedMode, isSubmitted, quizFinished]);

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isSubmitted) return;

    const currentQ = questions[currentIndex];
    const isCorrect = selectedOption === currentQ.correctAnswerIndex;

    setIsSubmitted(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      showToast('Correct answer! +1 Point', 'success');
    } else {
      setStreak(0);
      showToast('Incorrect answer', 'error');
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setTimeLeft(15);
    } else {
      // Quiz completed!
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    const finalScore = score + (selectedOption === questions[currentIndex].correctAnswerIndex ? 1 : 0);
    const percentage = Math.round((finalScore / questions.length) * 100);

    const result: QuizResult = {
      score: finalScore,
      total: questions.length,
      percentage,
      mode: selectedMode,
      date: new Date().toLocaleDateString(),
      timeSpentSeconds: 0
    };

    setQuizHistory((prev) => [result, ...prev].slice(0, 10));
    try {
      localStorage.setItem('ak_quiz_history', JSON.stringify([result, ...quizHistory]));
    } catch (e) {
      console.warn('Failed quiz save', e);
    }

    if (percentage >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="space-y-8 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
          <HelpCircle className="w-3.5 h-3.5" /> Interactive Wildlife Challenge
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Animal Kingdom Quiz
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Test your knowledge on dog breeds, cat characteristics, and wild animal habitats!
        </p>
      </div>

      {/* Mode Selector */}
      <div className="flex items-center justify-center gap-2 text-xs">
        {['Easy', 'Medium', 'Hard', 'Timed'].map((mode) => (
          <button
            key={mode}
            onClick={() => startQuiz(mode as any)}
            className={`px-4 py-2 rounded-2xl font-bold transition-all cursor-pointer ${
              selectedMode === mode
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
            }`}
          >
            {mode} Mode
          </button>
        ))}
      </div>

      {/* Quiz Card or Finish Screen */}
      {quizFinished ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Quiz Completed!
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              You scored <strong className="text-amber-500">{score}</strong> out of {questions.length} ({Math.round((score / questions.length) * 100)}%)
            </p>
          </div>

          <button
            onClick={() => startQuiz(selectedMode)}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
        </div>
      ) : currentQ ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-amber-500">
                <Zap className="w-3.5 h-3.5" /> Streak: {streak}
              </span>
              {selectedMode === 'Timed' && (
                <span className="flex items-center gap-1 text-rose-500 font-mono">
                  <Timer className="w-3.5 h-3.5" /> {timeLeft}s
                </span>
              )}
            </div>
          </div>

          {/* Question Title */}
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {currentQ.question}
          </h2>

          {/* Question Image if available */}
          {currentQ.imageUrl && (
            <div className="aspect-16/9 rounded-2xl overflow-hidden bg-zinc-200">
              <img src={currentQ.imageUrl} alt="Quiz" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Options Grid */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOpt = idx === currentQ.correctAnswerIndex;

              let btnClass = 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100';
              if (isSelected) {
                btnClass = 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 font-bold';
              }
              if (isSubmitted) {
                if (isCorrectOpt) {
                  btnClass = 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
                } else if (isSelected) {
                  btnClass = 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <span>{opt}</span>
                  {isSubmitted && isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {isSubmitted && isSelected && !isCorrectOpt && <XCircle className="w-4 h-4 text-rose-500" />}
                </button>
              );
            })}
          </div>

          {/* Explanation if submitted */}
          {isSubmitted && (
            <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 text-xs text-zinc-700 dark:text-zinc-300 space-y-1">
              <strong className="text-amber-500 block">Explanation:</strong>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                {currentIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question →'}
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
