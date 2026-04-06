/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Card {
  parentCat: string;
  cat: string;
  term: string;
  cn: string;
  desc: string;
  ex: string;
}

const cardsData: Card[] = [
  // AI Model Fundamentals
  { parentCat: 'AI Model Fundamentals', cat: 'Model Types', term: 'LLM', cn: '大语言模型', desc: 'Large Language Model，基于海量文本数据训练的深度学习模型。', ex: '如 GPT-4, Claude 3, Llama 3' },
  { parentCat: 'AI Model Fundamentals', cat: 'Model Types', term: 'SLM', cn: '小语言模型', desc: 'Small Language Model，参数量较小但针对特定任务优化的模型。', ex: '如 Phi-3, Gemma' },
  { parentCat: 'AI Model Fundamentals', cat: 'Model Capabilities & Paradigms', term: 'Zero-shot', cn: '零样本学习', desc: '模型在没有见过任何示例的情况下直接执行任务。', ex: '' },
  { parentCat: 'AI Model Fundamentals', cat: 'Training & Fine-Tuning', term: 'SFT', cn: '有监督微调', desc: 'Supervised Fine-Tuning，使用高质量指令数据对预训练模型进行微调。', ex: '' },
  { parentCat: 'AI Model Fundamentals', cat: 'Embeddings & Retrieval', term: 'Vector Embedding', cn: '向量嵌入', desc: '将文本、图像等非结构化数据转换为数值向量的过程。', ex: '' },

  // AI Engineering
  { parentCat: 'AI Engineering', cat: 'Prompt Engineering', term: 'CoT', cn: '思维链', desc: 'Chain of Thought，引导模型进行分步骤推理的提示技术。', ex: '' },

  // Frontend
  { parentCat: 'Frontend', cat: 'UI/Interaction', term: 'CTA', cn: '行动召唤', desc: 'Call To Action，引导用户执行操作的按钮或文案。', ex: '如立即购买、注册、提交' },
  { parentCat: 'Frontend', cat: 'UI/Interaction', term: 'UI', cn: '用户界面', desc: 'User Interface，用户看得见的界面元素。', ex: '包括布局、按钮、图标、样式等' },
  { parentCat: 'Frontend', cat: 'UI/Interaction', term: 'UX/UE', cn: '用户体验', desc: 'User Experience，产品使用过程中的感受、流程合理性与易用性。', ex: '' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'Hero Section', cn: '英雄区', desc: '页面首屏最显眼的大区域。', ex: '通常包含大图、标题、副标题与主CTA' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'Header', cn: '头部导航栏', desc: '页面最顶部区域。', ex: '包含Logo、导航菜单、搜索、登录、购物车等' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'Footer', cn: '页脚', desc: '页面最底部区域。', ex: '包含版权信息、联系方式、链接、备案信息等' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'Banner', cn: '横幅', desc: '横向长条区域。', ex: '用于广告、活动公告或重要提示' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'Card', cn: '卡片', desc: '模块化容器。', ex: '用于包裹图片、标题、简介、操作按钮等内容' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'Grid', cn: '网格布局', desc: '将内容按行列整齐排列的布局方式。', ex: '常用于卡片列表' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'Sidebar', cn: '侧边栏', desc: '页面左侧或右侧的垂直菜单区域。', ex: '常见于后台管理系统' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'Tab', cn: '标签页', desc: '可点击切换不同内容的分组控件。', ex: '如全部、待付款、已完成' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'Carousel/Slider', cn: '轮播图', desc: '可自动或手动切换的图片/内容组件。', ex: '多用于首页展示' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'Modal/Popup', cn: '模态框/弹窗', desc: '点击后弹出并覆盖原页面的浮层。', ex: '用于登录、确认、详情等' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'Toast/Snackbar', cn: '轻提示', desc: '屏幕底部或中间短暂弹出的文字提示。', ex: '如操作成功、请先登录' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'Placeholder', cn: '占位区', desc: '内容加载前显示的灰色占位块。', ex: '提升加载体验' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'Empty State', cn: '空状态', desc: '列表无数据时展示的页面。', ex: '如暂无订单、暂无消息' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'Feature Section', cn: '功能区', desc: '专门展示产品核心功能、优势、特点的区域。', ex: '' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'Testimonial/Review Section', cn: '评价区', desc: '展示用户评论、口碑、客户反馈的区域。', ex: '' },
  { parentCat: 'Frontend', cat: 'Page Sections', term: 'CTA Section', cn: '行动召唤区', desc: '页面中专门引导用户执行关键操作的大区域。', ex: '' },
  { parentCat: 'Frontend', cat: 'Design Process', term: 'Wireframe', cn: '线框图', desc: '低保真黑白草图。', ex: '用于规划页面结构与元素位置' },
  { parentCat: 'Frontend', cat: 'Design Process', term: 'Mockup', cn: '高保真原型', desc: '接近最终视觉效果的设计稿。', ex: '通常不可交互' },
  { parentCat: 'Frontend', cat: 'Design Process', term: 'Prototype', cn: '可交互原型', desc: '可点击、可跳转页面。', ex: '用于演示产品流程的demo' },
  { parentCat: 'Frontend', cat: 'Design Process', term: 'Responsive', cn: '响应式', desc: '页面可自适应手机、平板、电脑等不同屏幕尺寸。', ex: '' },
  { parentCat: 'Frontend', cat: 'Design Process', term: 'Breakpoint', cn: '断点', desc: '响应式布局中，屏幕宽度触发布局变化的临界值。', ex: '' },
  { parentCat: 'Frontend', cat: 'Design Process', term: 'Palette', cn: '色彩规范', desc: '产品的主色、辅助色、中性色等颜色体系。', ex: '' },
  { parentCat: 'Frontend', cat: 'Design Process', term: 'Typography', cn: '字体规范', desc: '产品的字体、字号、字重、行高、间距等文字规则。', ex: '' },
  { parentCat: 'Frontend', cat: 'Fundamentals', term: 'Landing Page', cn: '落地页', desc: '广告或推广链接跳转进来的单独宣传页面。', ex: '' },
  { parentCat: 'Frontend', cat: 'Fundamentals', term: 'Homepage', cn: '首页', desc: '产品的主页面。', ex: '用户进入后看到的第一个页面' },
  { parentCat: 'Frontend', cat: 'Fundamentals', term: 'Dashboard', cn: '数据看板', desc: '后台系统首页。', ex: '集中展示数据统计、核心指标与快捷操作' },
  { parentCat: 'Frontend', cat: 'Fundamentals', term: 'Onboarding', cn: '新用户引导', desc: '首次打开APP时的新手教程、功能介绍流程。', ex: '' },
  { parentCat: 'Frontend', cat: 'Fundamentals', term: 'Paywall', cn: '付费墙', desc: '限制未付费用户查看完整内容的机制。', ex: '' },
  { parentCat: 'Frontend', cat: 'Fundamentals', term: 'AB Test', cn: 'A/B测试', desc: '同时上线两个版本，对比数据以选择更优方案。', ex: '' },
  { parentCat: 'Frontend', cat: 'Visual Design', term: 'White Space', cn: '留白', desc: '页面中无内容的空白区域。', ex: '提升界面呼吸感与可读性' },
  { parentCat: 'Frontend', cat: 'Visual Design', term: 'Hierarchy', cn: '视觉层级', desc: '通过大小、颜色、间距引导用户视线的主次顺序。', ex: '' },
  { parentCat: 'Frontend', cat: 'Visual Design', term: 'Consistency', cn: '一致性', desc: '全产品保持统一的视觉风格与交互逻辑。', ex: '' },
  { parentCat: 'Frontend', cat: 'Visual Design', term: 'Asset', cn: '设计素材', desc: '图标、图片、插画、动效等设计资源。', ex: '' },
  { parentCat: 'Frontend', cat: 'Frontend Techniques', term: 'Component', cn: '组件', desc: '可复用的UI模块。', ex: '如按钮、输入框、卡片、列表等' },
  { parentCat: 'Frontend', cat: 'Frontend Techniques', term: 'State', cn: '状态', desc: '界面或组件的不同形态。', ex: '如加载中、成功、失败、禁用' },
  { parentCat: 'Frontend', cat: 'Frontend Techniques', term: 'API', cn: '接口', desc: '前后端数据交互的通信方式。', ex: '' },
  { parentCat: 'Frontend', cat: 'Frontend Techniques', term: 'Fetch/Load', cn: '数据加载', desc: '从服务器获取并展示数据的过程。', ex: '' },
  { parentCat: 'Frontend', cat: 'Frontend Techniques', term: 'Cache', cn: '缓存', desc: '临时存储数据以加快加载速度、节省流量。', ex: '' },
  { parentCat: 'Frontend', cat: 'Frontend Techniques', term: 'Render', cn: '渲染', desc: '将代码转换为用户可见界面的过程。', ex: '' },
  { parentCat: 'Frontend', cat: 'Frontend Techniques', term: 'Performance', cn: '性能', desc: '页面加载速度、交互流畅度、资源占用等指标。', ex: '' },
  { parentCat: 'Frontend', cat: 'Deployment & Release', term: 'PV', cn: '页面浏览量', desc: 'Page View，页面被访问的次数。', ex: '刷新计为一次' },
  { parentCat: 'Frontend', cat: 'Deployment & Release', term: 'UV', cn: '独立用户', desc: 'Unique Visitor，一定时间内访问产品的独立用户数。', ex: '' },
  { parentCat: 'Frontend', cat: 'Deployment & Release', term: 'Retention', cn: '留存', desc: '用户在一段时间后仍继续使用产品的比例。', ex: '' },
  { parentCat: 'Frontend', cat: 'Deployment & Release', term: 'Conversion Rate', cn: '转化率', desc: '用户从访问到完成目标行为（注册、付费等）的比例。', ex: '' },
  { parentCat: 'Frontend', cat: 'Deployment & Release', term: 'Bounce Rate', cn: '跳出率', desc: '只访问一个页面就离开的用户占总访问的比例。', ex: '' }
];

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

  const parentCategories = useMemo(() => ['全部', ...new Set(cardsData.map(c => c.parentCat))], []);

  const subCategories = useMemo(() => {
    if (selectedParent === '全部') return [];
    return ['全部', ...new Set(cardsData.filter(c => c.parentCat === selectedParent).map(c => c.cat))];
  }, [selectedParent]);

  const filteredCards = useMemo(() => {
    let filtered = deck;
    if (selectedParent !== '全部') {
      filtered = filtered.filter(c => c.parentCat === selectedParent);
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
            The Digital Gallery
            <span className="block text-2xl md:text-3xl text-primary mt-2 font-sans font-light">Web & App Terminology</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary-dim text-lg max-w-lg mx-auto leading-relaxed"
          >
            A curated exhibition of high-frequency product, design, and engineering lexicon.
          </motion.p>
        </header>

        {/* Categories - Two-level Hierarchy */}
        <div className="w-full mb-16 space-y-6">
          {/* Parent Categories */}
          <nav className="flex flex-wrap justify-center gap-3">
            {parentCategories.map((parent) => (
              <button
                key={parent}
                onClick={() => handleParentChange(parent)}
                className={`px-5 py-2.5 rounded-[1.25rem] text-sm font-medium transition-all duration-300 ${
                  selectedParent === parent
                    ? 'bg-gradient-to-b from-primary to-primary-dim text-white shadow-ambient'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                {parent}
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
                    <h3 className="text-3xl md:text-4xl font-serif tracking-tight text-on-surface mb-4 sm:mb-6">
                      {currentCard.cn}
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl leading-[1.6] text-primary-dim mb-6 sm:mb-8 max-w-lg">
                      {currentCard.desc}
                    </p>
                    {currentCard.ex && (
                      <div className="bg-surface-container-low rounded-[1.5rem] p-5 sm:p-6 w-full text-left">
                        <p className="text-sm md:text-base text-primary leading-relaxed flex gap-3">
                          <span className="font-serif italic text-primary-dim shrink-0">e.g.</span>
                          {currentCard.ex}
                        </p>
                      </div>
                    )}
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

