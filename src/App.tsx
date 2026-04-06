/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Card {
  id: string;
  parentCatEn: string;
  parentCatCn: string;
  cat: string;
  term: string;
  cn: string;
  pinyin?: string;
  desc: string;
  ex: string;
  level?: string;
  tags?: string[];
  source?: string;
}

import cardsDataRaw from './data/cards.json';

const cardsData = cardsDataRaw as Card[];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function App() {
  const [deck] = useState<Card[]>(() => shuffleArray(cardsData));
  const [selectedParent, setSelectedParent] = useState('全部');
  const [selectedSub, setSelectedSub] = useState('全部');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const parentCategories = useMemo(() => {
    const categories = cardsData.map(c => ({ en: c.parentCatEn, cn: c.parentCatCn }));
    const unique = Array.from(new Set(categories.map(c => c.en))).map(en => {
      return categories.find(c => c.en === en)!;
    });
    return [{ en: '全部', cn: '全部' }, ...unique];
  }, []);

  const subCategories = useMemo(() => {
    if (selectedParent === '全部') return [];
    return ['全部', ...new Set(cardsData.filter(c => c.parentCatEn === selectedParent).map(c => c.cat))];
  }, [selectedParent]);

  const filteredCards = useMemo(() => {
    let filtered = deck;
    if (selectedParent !== '全部') {
      filtered = filtered.filter(c => c.parentCatEn === selectedParent);
      if (selectedSub !== '全部') {
        filtered = filtered.filter(c => c.cat === selectedSub);
      }
    }
    return filtered;
  }, [selectedParent, selectedSub, deck]);

  const currentCard = filteredCards[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), isFlipped ? 300 : 0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), isFlipped ? 300 : 0);
    }
  };

  const handleParentChange = (parent: string) => {
    setSelectedParent(parent);
    setSelectedSub('全部');
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleSubChange = (sub: string) => {
    setSelectedSub(sub);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans selection:bg-surface-container-low relative flex flex-col">
      <div className="max-w-4xl w-full mx-auto px-6 py-16 md:py-24 flex-1 flex flex-col items-center justify-center">
        {/* Editorial Header */}
        <header className="text-center mb-16 w-full flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif tracking-tight text-on-surface mb-6 text-balance"
          >
            The AI Fullstack Codex
            <span className="block text-2xl md:text-3xl text-primary mt-2 font-sans font-light">Engineering the Generative Future</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary-dim text-lg max-w-lg mx-auto leading-relaxed"
          >
            A curated exhibition of essential terminology for the AIGC era. Master the intersection of traditional fullstack engineering and generative intelligence.
          </motion.p>
        </header>

        {/* Categories - Two-level Hierarchy */}
        <div className="w-full mb-16 space-y-6">
          {/* Parent Categories */}
          <nav className="flex flex-wrap justify-center gap-3">
            {parentCategories.map((parent) => (
              <button
                key={parent.en}
                onClick={() => handleParentChange(parent.en)}
                className={`px-5 py-2.5 rounded-[1.25rem] text-sm font-medium transition-all duration-300 ${
                  selectedParent === parent.en
                    ? 'bg-gradient-to-b from-primary to-primary-dim text-white shadow-ambient'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                {parent.cn}
                {parent.en !== '全部' && (
                  <span className="ml-1.5 opacity-60 text-[10px] font-sans uppercase tracking-wider font-bold">
                    {parent.en}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Sub Categories (Contextual) */}
          <AnimatePresence mode="wait">
            {selectedParent !== '全部' && subCategories.length > 0 && (
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap justify-center gap-2"
              >
                {subCategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleSubChange(sub)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                      selectedSub === sub
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-transparent border-on-surface/10 text-on-surface/60 hover:border-on-surface/30'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>

        {/* Flashcard Container */}
        <div className="w-full max-w-2xl h-[420px] sm:h-[450px] md:h-[480px] relative perspective-1000 mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedParent}-${selectedSub}-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full cursor-pointer group"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div
                className="w-full h-full relative preserve-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden bg-surface-container-lowest rounded-[2rem] shadow-ambient flex flex-col p-8 sm:p-10 md:p-16 transition-transform duration-500 group-hover:-translate-y-2 overflow-hidden">
                  {/* Asymmetric layout: Category top right, Term bottom left */}
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-mono text-primary-dim tracking-widest uppercase">
                      No. {String(currentIndex + 1).padStart(3, '0')}
                    </span>
                    <span className="text-sm font-medium text-primary bg-surface-container-low px-4 py-1.5 rounded-full shrink-0 ml-4">
                      {currentCard.cat}
                    </span>
                  </div>

                  <div className="flex-1 flex items-end pb-2 sm:pb-4 w-full">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-on-surface leading-[1.1] break-words w-full text-balance">
                      {currentCard.term}
                    </h2>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 backface-hidden bg-surface-container-lowest rounded-[2rem] shadow-ambient flex flex-col p-8 sm:p-10 md:p-16 rotate-y-180 transition-transform duration-500 group-hover:-translate-y-2 overflow-y-auto">
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-serif tracking-tight text-on-surface mb-1">
                          {currentCard.cn}
                        </h3>
                        {currentCard.pinyin && (
                          <p className="text-primary text-xs font-sans font-medium tracking-wide opacity-70">
                            {currentCard.pinyin}
                          </p>
                        )}
                      </div>
                      {currentCard.level && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-sans font-bold rounded border border-primary/20">
                          {currentCard.level}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-base sm:text-lg md:text-xl leading-[1.6] text-primary-dim mb-6 sm:mb-8 max-w-lg">
                      {currentCard.desc}
                    </p>
                    
                    {currentCard.ex && (
                      <div className="bg-surface-container-low rounded-[1.5rem] p-5 sm:p-6 w-full text-left mb-6">
                        <p className="text-sm md:text-base text-primary leading-relaxed flex gap-3">
                          <span className="font-serif italic text-primary-dim shrink-0">e.g.</span>
                          {currentCard.ex}
                        </p>
                      </div>
                    )}

                    {currentCard.tags && currentCard.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {currentCard.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-sans font-medium text-primary-dim/60 bg-surface-container-low px-2 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-on-surface/5 flex justify-between items-center text-[10px] text-primary-dim/40 font-sans font-medium">
                    <span>{currentCard.parentCatCn} · {currentCard.cat}</span>
                    {currentCard.source && <span>Source: {currentCard.source}</span>}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-8 w-full max-w-md justify-between px-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-4 rounded-[1.5rem] bg-surface-container-lowest shadow-ambient text-on-surface hover:bg-surface-container-low disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
          </button>

          <div className="flex-1 flex flex-col items-center">
            <div className="w-full h-1 bg-surface-container-low rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === filteredCards.length - 1}
            className="p-4 rounded-[1.5rem] bg-surface-container-lowest shadow-ambient text-on-surface hover:bg-surface-container-low disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

