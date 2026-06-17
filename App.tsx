/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import IqTest from "./components/IqTest";
import ArabDictionary from "./components/ArabDictionary";
import { Brain, BookOpen, GraduationCap, Compass, BookMarked, Sparkles, AlertCircle, HelpCircle } from "lucide-react";

export default function App() {
  // Tab states: 'test' | 'dictionary'
  const [activeTab, setActiveTab] = useState<"test" | "dictionary">("test");
  const [dictionaryQuery, setDictionaryQuery] = useState<string>("");

  // Handler to bridge IQ Test question vocabulary search to the Dictionary
  const handleSuggestWordForDictionary = (word: string) => {
    setDictionaryQuery(word);
    setActiveTab("dictionary");
  };

  const handleClearInitalQuery = () => {
    setDictionaryQuery("");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased pb-12" id="app-portal">
      
      {/* Decorative top header line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600" />

      {/* Main Educational Portal Navigation Header - Bento Box Style */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm ring-4 ring-emerald-50">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5 leading-none">
                ArabIQ Portal
              </h1>
              <p className="text-[11px] text-slate-500 mt-1 font-medium font-mono">
                Tes IQ & Kamus Bahasa Arab Interaktif
              </p>
            </div>
          </div>

          {/* Interactive Navigation Tab Pickers */}
          <nav className="flex bg-slate-100 p-1 rounded-2xl border border-slate-250/60 w-full sm:w-auto" id="main-navigation-tabs">
            <button
              onClick={() => setActiveTab("test")}
              id="tab-btn-test"
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === "test"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Brain className="w-4 h-4 text-emerald-600 animate-pulse" />
              Tes IQ Arab
            </button>
            <button
              onClick={() => setActiveTab("dictionary")}
              id="tab-btn-dictionary"
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === "dictionary"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              Kamus Arab-ID
            </button>
          </nav>

        </div>
      </header>

      {/* Hero Welcome Banner Section in a Bento Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6" id="hero-banner">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Main Info Card */}
          <div className="md:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-50/40 via-emerald-50/20 to-indigo-50/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Kurikulum Nasional & Logika Kognitif
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Kuasai Bahasa Arab dengan Nalar Logis
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl">
                Uji kemampuan linguistik Anda melalui <strong className="text-slate-850 font-bold text-slate-800">10 pertanyaan multi-level (SD, SMP, SMA)</strong>, serta gunakan kamus terintegrasi untuk memperluas mufrodat (kosakata) dengan cepat.
              </p>
            </div>
          </div>

          {/* Secondary Stats/Info Card */}
          <div className="md:col-span-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs relative overflow-hidden border border-slate-800">
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-500/25 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-3">
                <Compass className="w-5 h-5" id="compass-nav" />
                <span>Sistem Belajar Pintar</span>
              </div>
              <h4 className="font-extrabold text-sm text-slate-200">Asosiasi Kamus Otomatis</h4>
              <p className="text-slate-400 text-xs leading-relaxed mt-2">
                Saat memeriksa jawaban salah di akhir ujian, Anda dapat langsung mengeklik kata Arab penentu untuk mencari maknanya di kamus instan!
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>LATIHAN MANDIRI v1.2</span>
              <span className="text-emerald-400 font-semibold">• ONLINE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6" id="main-portal-content">
        
        <AnimatePresence mode="wait">
          {activeTab === "test" ? (
            <motion.div
              key="test-tab-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <IqTest onSuggestWordToDictionary={handleSuggestWordForDictionary} />
            </motion.div>
          ) : (
            <motion.div
              key="dict-tab-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <ArabDictionary 
                initialSearchQuery={dictionaryQuery} 
                onClearInitialQuery={handleClearInitalQuery} 
              />
            </motion.div>
          )}
        </AnimatePresence>        {/* Informative FAQ / Methodologies section in a distinct Bento Layout */}
        <section className="mt-8" id="faq-section">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-indigo-600" />
              Panduan Pembelajaran & Metodologi Tes IQ
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Box 1 */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 shadow-xs hover:shadow-sm transition flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 mb-2.5">
                    <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block" />
                    Estimasi Skor IQ
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Skor diakumulasi berdasarkan bobot poin dari 10 soal kognitif bahasa Arab. Klasifikasi IQ diselaraskan berdasarkan kesuksesan pengerjaan soal di tingkat kesulitan SD, SMP, dan SMA.
                  </p>
                </div>
              </div>

              {/* Box 2 */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 shadow-xs hover:shadow-sm transition flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 mb-2.5">
                    <span className="w-1.5 h-4 bg-teal-500 rounded-full inline-block" />
                    Tingkat Kesulitan
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    <strong className="text-slate-700">SD</strong> berfokus pada ingatan kosa kata visual. <strong className="text-slate-700">SMP</strong> menguji nalar subjek verba (Tasrif). <strong className="text-slate-700">SMA</strong> menguji kecerdasan i'rab analitis & silogisme.
                  </p>
                </div>
              </div>

              {/* Box 3 */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 shadow-xs hover:shadow-sm transition flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 mb-2.5">
                    <span className="w-1.5 h-4 bg-indigo-500 rounded-full inline-block" />
                    Simpan Kata Baru
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Setiap kata baru yang Anda tambahkan melalui formulir <strong className="text-teal-700">"Kosa Kata Baru"</strong> disimpan dengan aman di penyimpanan lokal (<code className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-650">localStorage</code>) browser Anda.
                  </p>
                </div>
              </div>

              {/* Box 4 */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 shadow-xs hover:shadow-sm transition flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 mb-2.5">
                    <span className="w-1.5 h-4 bg-amber-500 rounded-full inline-block" />
                    Lafal Audio TTS
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Ketuk tombol pengeras suara untuk memicu mesin ucapan asli. Unduh paket Bahasa Arab (<code className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-650">ar-SA</code>) pada perangkat untuk kualitas lafal premium!
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer Area with clear literal designations */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 border-t border-slate-800 mt-20" id="portal-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="text-white font-extrabold text-sm tracking-wide">TES IQ & KAMUS BAHASA ARAB</h4>
            <p className="text-xs text-slate-500 mt-1">Platform interaktif evaluasi kecerdasan berbahasa Arab.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
            <span>Tingkat SD, SMP, SMA</span>
            <span>•</span>
            <span>Bilingual Indonesia-Arab</span>
            <span>•</span>
            <span>Penyimpanan Mufrodat Lokal</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800/80 mt-6 pt-4 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} Tes IQ Bahasa Arab. Dibuat secara profesional untuk mempermudah pemahaman kognitif Nahwu & Sharaf.
        </div>
      </footer>

    </div>
  );
}
