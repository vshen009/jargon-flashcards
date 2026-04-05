/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw, Info } from 'lucide-react';

interface Card {
  cat: string;
  term: string;
  cn: string;
  desc: string;
  ex: string;
}

const cardsData: Card[] = [
  { cat: '页面区块', term: 'Hero Section', cn: '英雄区', desc: '页面首屏最大最显眼的区域。第一时间告诉用户这是什么。', ex: '常见：大图背景 + “欢迎来到XX”大标题 + 主CTA按钮' },
  { cat: '页面区块', term: 'CTA (Call To Action)', cn: '行动召唤', desc: '网页/APP里催促用户点击的关键按钮或文案。', ex: '例如：“立即下单”、“免费试用”、“加入购物车”' },
  { cat: '页面区块', term: 'Modal / Popup', cn: '弹窗 / 模态框', desc: '点击后弹出的浮层，会遮住后面页面，打断当前操作。', ex: '例如：登录弹窗、二次确认删除弹窗' },
  { cat: '页面区块', term: 'Toast / Snackbar', cn: '轻提示', desc: '屏幕中间/底部短暂弹出的小字提示，不打断用户操作。', ex: '例如：“操作成功”、“请先登录”，几秒后自动消失' },
  { cat: '界面交互', term: 'UI / UX', cn: '用户界面 / 用户体验', desc: 'UI是看得见的按钮色彩布局；UX是好不好用、顺不顺手。', ex: 'UI管长得好不好看，UX管用得爽不爽' },
  { cat: '界面交互', term: 'Wireframe', cn: '线框图', desc: '黑白低保真草图，只排布功能位置，不画视觉细节。', ex: '设计初期用来和产品经理对齐功能的草稿' },
  { cat: '界面交互', term: 'Responsive', cn: '响应式设计', desc: '页面能根据屏幕大小自动调整布局结构。', ex: '在电脑上一排看四个卡片，在手机上自动变成一排看一个' },
  { cat: '前端技术', term: 'Component', cn: '组件', desc: '开发中写好的、可以到处复用的页面模块。', ex: '比如把“主按钮”写成组件，全站调用的都是同一个款式' },
  { cat: '前端技术', term: 'API', cn: '接口', desc: '前端界面和后端服务器进行数据通信的通道。', ex: '前端通过API向后端拿用户头像和昵称数据' },
  { cat: '业务数据', term: 'Landing Page', cn: '落地页', desc: '专门用来接住广告/推广流量的单页面，目标性极强。', ex: '百度搜到的广告，点进去推销课程的那一页' },
  { cat: '业务数据', term: 'Conversion Rate', cn: '转化率', desc: '达成最终目标（注册/付费）的人数除以总访问人数。', ex: '100个人点进来，只有5个人买了，转化率就是5%' }
];

export default function App() {
  const [currentCategory, setCurrentCategory] = useState('全部');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const categories = useMemo(() => ['全部', ...new Set(cardsData.map(c => c.cat))], []);

  const filteredCards = useMemo(() => {
    return currentCategory === '全部' 
      ? cardsData 
      : cardsData.filter(c => c.cat === currentCategory);
  }, [currentCategory]);

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

  const handleCategoryChange = (cat: string) => {
    setCurrentCategory(cat);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-900 font-sans selection:bg-indigo-100 relative overflow-hidden flex flex-col">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-200/40 blur-3xl" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-blue-200/40 blur-3xl" />
      </div>

      <div className="max-w-3xl w-full mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center">
        {/* Header */}
        <header className="text-center mb-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 mb-6"
          >
            <span className="text-3xl">👨‍💻</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4"
          >
            Web & App 术语闪卡
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl max-w-lg mx-auto"
          >
            提炼高频黑话，快速看懂产品/设计/前端在聊啥
          </motion.p>
        </header>

        {/* Categories */}
        <nav className="flex flex-wrap justify-center gap-3 mb-12 w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                currentCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105 ring-2 ring-indigo-600 ring-offset-2 ring-offset-slate-50'
                  : 'bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-md border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Flashcard Container */}
        <div className="w-full max-w-lg aspect-[4/3] relative perspective-1000 mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentCategory}-${currentIndex}`}
              initial={{ opacity: 0, x: 30, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -30, rotateY: 10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full cursor-pointer group"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div
                className="w-full h-full relative preserve-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-indigo-500/10 border border-white flex flex-col items-center justify-center p-8 text-center transition-transform duration-300 group-hover:scale-[1.02]">
                  <div className="absolute top-8 left-8 right-8 flex justify-between items-center opacity-60">
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
                      {currentCard.cat}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {currentIndex + 1} / {filteredCards.length}
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 to-violet-600 tracking-tight leading-tight px-4">
                    {currentCard.term}
                  </h2>
                  
                  <div className="absolute bottom-8 text-slate-300 flex flex-col items-center gap-2">
                    <RotateCcw className="w-6 h-6 animate-pulse text-indigo-300" />
                    <span className="text-xs font-medium text-slate-400">点击翻转</span>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] shadow-2xl shadow-indigo-600/20 border border-indigo-400/30 flex flex-col items-center justify-center p-8 md:p-10 text-center rotate-y-180 text-white transition-transform duration-300 group-hover:scale-[1.02]">
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-wide">
                    {currentCard.cn}
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed mb-8 text-indigo-50 font-medium">
                    {currentCard.desc}
                  </p>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 w-full text-left border border-white/10 shadow-inner">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-indigo-200" />
                      <p className="text-sm md:text-base text-indigo-50 leading-relaxed">
                        {currentCard.ex}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 md:gap-10 w-full max-w-md justify-between px-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/60 text-slate-700 hover:bg-white hover:text-indigo-600 hover:shadow-lg hover:-translate-x-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:shadow-none transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex-1 flex flex-col items-center px-4">
            <div className="w-full h-2 bg-slate-200/60 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === filteredCards.length - 1}
            className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/60 text-slate-700 hover:bg-white hover:text-indigo-600 hover:shadow-lg hover:translate-x-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:shadow-none transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
