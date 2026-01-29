import React, { useState, useEffect } from 'react';
import { FULL_CURRICULUM } from './constants';
import { Lesson, LessonStatus } from './types';
import { SpriteSimulator } from './components/SpriteSimulator';
import { LoopGame } from './components/LoopGame';
import { EventsGame } from './components/EventsGame';
import { ConditionGame } from './components/ConditionGame';
import { QuizComponent } from './components/QuizComponent';
import { Confetti } from './components/Confetti';
import { WelcomeModal } from './components/WelcomeModal';
import { sounds } from './services/sounds';
import { LogicWorkshop } from './components/LogicWorkshop';
import logo from './assets/Million Coders Logo_DRK GRY.png';

const App: React.FC = () => {
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0); 
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [stars, setStars] = useState(0); 
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [pulseStars, setPulseStars] = useState(false);
  const [isQuestFinished, setIsQuestFinished] = useState(false);

  const currentModule = FULL_CURRICULUM[currentModuleIdx];
  const currentLevel = currentModule.lessons[currentLevelIdx];

  const handleLevelUp = () => {
    if (!completed.has(currentLevel.id)) {
      sounds.playFanfare();
      setStars(prev => prev + currentLevel.stars);
      setCompleted(prev => new Set(prev).add(currentLevel.id));
      setShowConfetti(true);
      setPulseStars(true);
      setTimeout(() => setShowConfetti(false), 4000);
      setTimeout(() => setPulseStars(false), 1000);
    }
  };

  const nextLevel = () => {
    sounds.playPop();
    if (currentLevelIdx < currentModule.lessons.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
    } else if (currentModuleIdx < FULL_CURRICULUM.length - 1) {
      setCurrentModuleIdx(prev => prev + 1);
      setCurrentLevelIdx(0);
    } else {
      setIsQuestFinished(true);
    }
  };

  const prevLevel = () => {
    sounds.playPop();
    if (currentLevelIdx > 0) {
      setCurrentLevelIdx(prev => prev - 1);
    } else if (currentModuleIdx > 0) {
      const prevModuleIdx = currentModuleIdx - 1;
      const prevModule = FULL_CURRICULUM[prevModuleIdx];
      setCurrentModuleIdx(prevModuleIdx);
      setCurrentLevelIdx(prevModule.lessons.length - 1);
    }
  };

  const restartQuest = () => {
    sounds.playFanfare();
    setCurrentModuleIdx(0);
    setCurrentLevelIdx(0);
    setCompleted(new Set());
    setStars(0);
    setIsQuestFinished(false);
    setShowWelcome(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

 // Skip text-only intro levels by automatically moving to the next
  useEffect(() => {
    if (currentLevel.type === 'content') {
      handleLevelUp();
      // This moves to the next level in 0.1 seconds (very fast!)
      const timer = setTimeout(() => {
        nextLevel();
      }, 100); 
      return () => clearTimeout(timer);
    }
  }, [currentLevel.id]);

  return (
    <div className="h-screen bg-[#6366f1] text-[#1e293b] font-['Lexend'] antialiased flex flex-col overflow-hidden selection:bg-indigo-200">
      {(showConfetti || isQuestFinished) && <Confetti />}
      {showWelcome && <WelcomeModal onClose={() => { sounds.playPop(); setShowWelcome(false); }} />}

     {isQuestFinished && (
  <div className="fixed inset-0 z-[300] bg-indigo-950/98 backdrop-blur-2xl flex items-center justify-center p-8 lg:p-16 animate-in fade-in duration-500 overflow-hidden">
    <div className="bg-white rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-8 max-w-md w-full text-center shadow-[0_50px_100px_rgba(0,0,0,0.8)] border-[3px] lg:border-[6px] border-yellow-400 relative animate-in zoom-in duration-700 flex flex-col items-center">
      <div className="text-[60px] lg:text-[80px] mb-2 lg:mb-3 animate-bounce drop-shadow-lg leading-none">👑</div>
      <h2 className="text-2xl lg:text-4xl font-black text-indigo-950 mb-1 font-kids tracking-tight uppercase leading-tight">SPRITE MASTER!</h2>
      
      {/* ADDED STAR POINTS DISPLAY */}
      <div className="mt-2 mb-4 bg-indigo-50 px-6 py-2 rounded-2xl border-2 border-indigo-100 flex items-center gap-3">
        <span className="text-2xl">⭐</span>
        <span className="text-3xl font-black text-indigo-600 tabular-nums">{stars}</span>
        <span className="text-indigo-400 font-bold uppercase text-xs tracking-widest">Points</span>
      </div>

      <button onClick={restartQuest} className="mt-2 bg-emerald-500 hover:bg-emerald-400 text-white py-3 lg:py-5 px-8 rounded-[1.75rem] shadow-[0_6px_0_0_#065f46] flex items-center gap-3 font-kids">
        <span className="text-xl font-black">START OVER!</span> 🔄
      </button>
    </div>
  </div>
)}

     <header className="bg-white/10 backdrop-blur-xl py-2 px-6 border-b border-white/20 shadow-lg z-20 shrink-0">
  <div className="max-w-[1100px] mx-auto flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2.5">
        {/* LOGO */}
        <img 
          src={logo} 
          alt="Million Coders Logo" 
          className="h-8 w-auto object-contain brightness-0 invert" 
        /> 
        
        {/* VERTICAL LINE (Moved here next to the logo) */}
        <div className="h-6 w-[2px] bg-white/20 mx-1"></div>

        {/* TITLE */}
        <h1 className="text-sm font-black text-white uppercase tracking-tighter font-kids">
          SPRITE QUEST PRO
        </h1>
      </div>
    </div>

    {/* STAR COUNTER */}
    <div className={`bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 shadow-sm border border-white transition-all duration-300 ${pulseStars ? 'scale-110' : ''}`}>
      <span className="text-base">⭐</span>
      <span className="text-base font-black text-indigo-600 tabular-nums">{stars}</span>
    </div>
  </div>
</header>

      <main className="flex-1 w-full max-w-[1100px] mx-auto grid grid-cols-12 gap-4 p-4 lg:p-6 items-stretch overflow-hidden">
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-4 overflow-hidden">
          <div className="bg-white/10 backdrop-blur-xl rounded-[1.5rem] p-4 shadow-xl border border-white/20 flex-1 flex flex-col min-h-[150px]">
            <h2 className="text-white/60 font-black mb-2.5 uppercase tracking-[0.2em] text-[7px] text-center font-kids">LEVELS</h2>
            <div className="space-y-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
              {currentModule.lessons.map((level, idx) => {
                const isCurrent = currentLevelIdx === idx;
                const isDone = completed.has(level.id);
                // Extracting name from "Level X: Name"
                const levelName = level.title.split(': ')[1] || level.title;
                return (
                  <button key={level.id} onClick={() => { sounds.playPop(); setCurrentLevelIdx(idx); }} className={`w-full p-2.5 rounded-xl transition-all border-b-2 flex items-center gap-2.5 ${isCurrent ? 'bg-yellow-400 border-yellow-600 shadow-md translate-y-[-1px]' : 'bg-white/10 border-white/5 text-white hover:bg-white/20'}`}>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-black shrink-0 ${isDone ? 'bg-emerald-500 text-white shadow-[0_1px_0_0_#065f46]' : isCurrent ? 'bg-indigo-900 text-yellow-400' : 'bg-white/10 text-white'}`}>
                      {isDone ? '✓' : idx + 1}
                    </div>
                    <span className={`text-[9px] font-bold uppercase text-left leading-tight line-clamp-1 ${isCurrent ? 'text-indigo-900' : 'text-white'}`}>
                      {levelName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="col-span-12 lg:col-span-9 flex flex-col h-full overflow-hidden">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl flex flex-col h-full border border-white overflow-hidden ring-4 ring-white/5">
            <div className="p-2.5 flex items-center justify-between px-5 shrink-0 bg-indigo-50/50 border-b border-indigo-100">
               <button onClick={prevLevel} disabled={currentModuleIdx === 0 && currentLevelIdx === 0} className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-base shadow-sm border border-indigo-100 disabled:opacity-30">⬅️</button>
               <div className="bg-indigo-100/50 px-5 py-1 rounded-full border border-indigo-200"><p className="text-indigo-900 font-black text-[10px] tracking-tight uppercase font-kids">{currentLevel.title}</p></div>
               <button onClick={nextLevel} className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-base shadow-sm border border-indigo-100">➡️</button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-5 flex flex-col min-h-0 custom-scrollbar">
              {currentLevel.content === 'COORDINATE_GAME' ? (
                <SpriteSimulator onWin={handleLevelUp} isCompleted={completed.has(currentLevel.id)} onNext={nextLevel} />
              ) : currentLevel.content === 'EVENTS_GAME' ? (
                 <EventsGame onWin={handleLevelUp} isCompleted={completed.has(currentLevel.id)} onNext={nextLevel} />
              ) : currentLevel.content === 'LOOP_GAME_EASY' ? (
                 <LoopGame onWin={handleLevelUp} isCompleted={completed.has(currentLevel.id)} onNext={nextLevel} />
              ) : currentLevel.content === 'CONDITION_GAME_EASY' ? (
                 <ConditionGame onWin={handleLevelUp} isCompleted={completed.has(currentLevel.id)} onNext={nextLevel} />
              ) : currentLevel.content === 'LOGIC_GAME_EASY' ? (
                 <LogicWorkshop mode="LOGIC" onWin={handleLevelUp} isCompleted={completed.has(currentLevel.id)} onNext={nextLevel} />
              ) : (currentLevel.content === 'FINAL_GAME_EASY' || currentLevel.content === 'FINAL_GAME_EXPERT') ? (
                 <LogicWorkshop mode="FINAL" onWin={handleLevelUp} isCompleted={completed.has(currentLevel.id)} onNext={nextLevel} />
              ) : currentLevel.content === 'PLAYGROUND_EASY' ? (
                 <LogicWorkshop mode="PLAYGROUND" onWin={handleLevelUp} isCompleted={completed.has(currentLevel.id)} onNext={nextLevel} />
              ) : currentLevel.content.includes('QUIZ') ? (
                 <QuizComponent 
                    questionsType={currentLevel.content === 'QUIZ_MODULE_3' ? 'loops' : currentLevel.content === 'QUIZ_COORDINATES' ? 'coordinates' : currentLevel.content.includes('CONDITIONS') ? 'conditions' : 'events'} 
                    onComplete={handleLevelUp} 
                    onNext={nextLevel} 
                 />
              ) : (
               <SpriteSimulator onWin={handleLevelUp} isCompleted={completed.has(currentLevel.id)} onNext={nextLevel} />
              )}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.05); border-radius: 10px; }
        body { overflow: hidden; }
      `}</style>
    </div>
  );
};

export default App;
