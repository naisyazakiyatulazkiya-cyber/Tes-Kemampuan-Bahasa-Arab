
export interface PlantInfo {
  name: string;
  scientificName: string;
  family: string;
  origin: string;
  history: string;
  characteristics: string[];
  usage: string;
  funFact: string;
  plantingSteps: string[];
  careTips: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export enum AppView {
  Home = 'home',
  Search = 'search',
  Quiz = 'quiz',
  AI = 'ai',
  Game = 'game',
  Map = 'map',
  About = 'about'
}
