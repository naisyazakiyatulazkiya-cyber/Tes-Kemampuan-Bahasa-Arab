/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type StudyLevel = "SD" | "SMP" | "SMA";

export interface IQQuestion {
  id: number;
  level: StudyLevel;
  questionArabic: string;
  questionIndonesian: string;
  isTranslationQuestion?: boolean;
  options: {
    arabic: string;
    indonesian: string;
  }[];
  correctAnswerIndex: number;
  explanation: string;
  points: number;
}

export type DictionaryCategory = 
  | "Isim (Kata Benda)" 
  | "Fi'il (Kata Kerja)" 
  | "Harf (Kata Sandang/Tugas)" 
  | "Sifat (Kata Sifat)"
  | "Percakapan Praktis";

export interface DictionaryEntry {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  category: DictionaryCategory;
  rootWord?: string;
  exampleArabic: string;
  exampleTranslation: string;
}

export interface UserScoreResult {
  totalScore: number;
  correctCount: number;
  incorrectCount: number;
  levelBreakdown: {
    SD: { correct: number; total: number; pointsObtained: number };
    SMP: { correct: number; total: number; pointsObtained: number };
    SMA: { correct: number; total: number; pointsObtained: number };
  };
  iqCategory: string;
  iqScoreEstimate: number;
  answers: {
    questionId: number;
    selectedOptionIndex: number;
    isCorrect: boolean;
  }[];
}
