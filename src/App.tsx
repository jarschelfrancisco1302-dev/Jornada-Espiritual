import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  BarChart2, 
  Users, 
  User, 
  Share2, 
  Copy, 
  CheckCircle, 
  Heart, 
  MessageCircle, 
  PlusSquare,
  Settings,
  Award,
  Calendar,
  ChevronRight,
  BookOpen,
  Flame,
  Lock,
  X
} from 'lucide-react';
import { ORDER_BUMPS, COMMUNITY_POSTS, MESSAGES, MOCK_PROFILE } from './data';

// --- Components ---

const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-stone-900 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center space-x-2"
  >
    <CheckCircle size={18} className="text-green-400" />
    <span className="text-sm font-medium">{message}</span>
  </motion.div>
);

const TabButton = ({ active, icon: Icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
      active ? 'text-blue-900' : 'text-stone-400'
    }`}
  >
    <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-4">
    <h2 className="text-xl font-serif font-bold text-blue-900">{title}</h2>
    {subtitle && <p className="text-sm text-stone-500">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-stone-100 p-5 ${className}`}>
    {children}
  </div>
);

// --- Tabs ---

const HomeTab = ({ showToast }: { showToast: (msg: string) => void }) => {
  const [markedDone, setMarkedDone] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Texto copiado para a área de transferência!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Jornada Espiritual',
        text: 'Confira este versículo do dia!',
        url: window.location.href,
      }).catch(() => showToast("Link copiado!"));
    } else {
      handleCopy("Confira este versículo do dia!");
    }
  };

  const handleBuy = (title: string) => {
    showToast(`"${title}" adicionado ao carrinho!`);
  };

  return (
    <div className="space-y-6 pb-24 pt-6 px-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-stone-500 font-medium">20 de Fevereiro</p>
          <h1 className="text-2xl font-serif font-bold text-blue-900">A Paz do Senhor</h1>
        </div>
      </div>

      {/* Verse of the Day */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 text-white border-none shadow-blue-900/20 shadow-lg">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <BookOpen size={100} />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10">
              Versículo do Dia
            </span>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleCopy('"Porque sou eu que conheço os planos que tenho para vocês", diz o Senhor, "planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro." - Jeremias 29:11')}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Copy size={18} />
              </button>
              <button 
                onClick={handleShare}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
          <p className="text-lg font-serif leading-relaxed mb-4">
            "Porque sou eu que conheço os planos que tenho para vocês", diz o Senhor, "planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro."
          </p>
          <p className="text-sm font-medium opacity-80">Jeremias 29:11</p>
        </div>
      </Card>

      {/* Daily Devotional */}
      <div>
        <SectionHeader title="Devocional Diário" subtitle="Uma palavra para seu coração hoje" />
        <Card className="hover:shadow-md transition-shadow duration-300">
          <h3 className="font-bold text-lg text-stone-800 mb-2">Confiança em Tempos de Incerteza</h3>
          <p className="text-stone-600 text-sm leading-relaxed mb-4">
            Muitas vezes nos preocupamos com o amanhã, mas Deus já está lá. A confiança não é saber o que vai acontecer, mas saber QUEM está no controle. Hoje, entregue suas ansiedades e descanse na soberania do Pai.
          </p>
          <button 
            onClick={() => {
              setMarkedDone(!markedDone);
              if (!markedDone) showToast("Devocional concluído! +50 XP");
            }}
            className={`w-full py-3 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 ${
              markedDone 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-900 text-white shadow-md hover:bg-blue-800 hover:shadow-lg active:scale-[0.98]'
            }`}
          >
            {markedDone ? <CheckCircle size={20} /> : <div className="w-5 h-5 border-2 border-white/30 rounded-full" />}
            <span className="font-medium">{markedDone ? 'Concluído hoje' : 'Marcar como lido'}</span>
          </button>
        </Card>
      </div>

      {/* Shareable Messages */}
      <div>
        <SectionHeader title="Mensagens para Compartilhar" />
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {MESSAGES.map((msg, idx) => (
            <div key={idx} className="min-w-[260px] bg-amber-50 rounded-2xl p-5 border border-amber-100 flex flex-col justify-between h-[180px] hover:border-amber-200 transition-colors shadow-sm">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-100 px-2 py-1 rounded-md">{msg.category}</span>
                <p className="mt-3 text-stone-800 font-serif italic text-sm leading-relaxed">"{msg.text}"</p>
              </div>
              <button 
                onClick={() => handleCopy(msg.text)}
                className="self-end flex items-center space-x-1 text-amber-700 text-xs font-medium hover:bg-amber-100 px-3 py-2 rounded-lg transition-colors"
              >
                <Copy size={14} />
                <span>Copiar</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Plan */}
      <div>
        <SectionHeader title="Plano de Leitura" subtitle="Continuar: Evangelho de João" />
        <Card className="flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <BookOpen size={24} />
            </div>
            <div>
              <h4 className="font-bold text-stone-800">Dia 12</h4>
              <p className="text-xs text-stone-500">João 14-16</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-24 bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[40%]" />
            </div>
            <span className="text-xs font-bold text-blue-600">40%</span>
          </div>
        </Card>
      </div>

      {/* Order Bumps Section */}
      <div className="pt-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-1.5 bg-amber-100 rounded-lg">
            <Flame className="text-amber-500 fill-amber-500" size={20} />
          </div>
          <h2 className="text-xl font-serif font-bold text-stone-800">Aprofunde sua Jornada</h2>
        </div>
        <p className="text-sm text-stone-500 mb-4 px-1">
          Invista no seu crescimento espiritual com nossos materiais exclusivos. <span className="text-amber-600 font-bold">Oferta especial por tempo limitado!</span>
        </p>
        <div className="grid grid-cols-1 gap-4">
          {ORDER_BUMPS.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex hover:shadow-md transition-shadow duration-300">
              <div className="w-1/3 relative group aspect-[3/4]">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-stone-800 leading-tight mb-1 text-sm">{item.title}</h3>
                  <p className="text-xs text-stone-500 line-clamp-2">{item.description}</p>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="font-bold text-blue-900 text-sm">{item.price}</span>
                  <button 
                    onClick={() => handleBuy(item.title)}
                    className="bg-stone-900 text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-stone-800 transition-colors active:scale-95"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProgressTab = () => {
  return (
    <div className="space-y-6 pb-24 pt-6 px-4">
      <SectionHeader title="Meu Progresso" subtitle="Sua caminhada espiritual" />

      {/* Main Stats Card */}
      <Card className="bg-gradient-to-br from-stone-900 to-stone-800 text-white border-none shadow-xl shadow-stone-900/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
              <Award className="text-amber-400" size={24} />
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider font-medium">Nível Atual</p>
              <h3 className="text-xl font-bold">Discípulo</h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone-400 uppercase tracking-wider font-medium">Próximo</p>
            <h3 className="text-sm font-medium text-stone-300">Servo</h3>
          </div>
        </div>
        
        <div className="mb-2 flex justify-between text-xs font-medium text-stone-400">
          <span>XP Atual</span>
          <span>1250 / 2000</span>
        </div>
        <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '62%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-amber-400 to-amber-600 shadow-[0_0_10px_rgba(251,191,36,0.5)]" 
          />
        </div>
      </Card>

      {/* Streak */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="flex flex-col items-center justify-center py-6 border-orange-100 bg-orange-50/50">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-2 shadow-sm">
            <Flame size={24} className="fill-orange-600" />
          </div>
          <span className="text-3xl font-bold text-stone-800">1</span>
          <span className="text-xs text-stone-500 font-medium uppercase tracking-wide">Dias Consecutivos</span>
        </Card>
        <Card className="flex flex-col items-center justify-center py-6 border-blue-100 bg-blue-50/50">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2 shadow-sm">
            <CheckCircle size={24} />
          </div>
          <span className="text-3xl font-bold text-stone-800">5</span>
          <span className="text-xs text-stone-500 font-medium uppercase tracking-wide">Devocionais Lidos</span>
        </Card>
      </div>

      {/* Calendar Preview */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-stone-800 flex items-center gap-2">
            <Calendar size={18} className="text-blue-900" />
            Fevereiro 2026
          </h3>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
            <span key={i} className="text-stone-400 text-xs font-bold">{d}</span>
          ))}
          {Array.from({ length: 28 }).map((_, i) => {
            const day = i + 1;
            const isToday = day === 20;
            const isCompleted = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19].includes(day);
            
            return (
              <div 
                key={i} 
                className={`
                  aspect-square flex items-center justify-center rounded-full text-xs transition-all duration-300
                  ${isToday ? 'bg-blue-900 text-white font-bold shadow-md scale-110' : ''}
                  ${isCompleted && !isToday ? 'bg-green-100 text-green-700 font-medium' : ''}
                  ${!isCompleted && !isToday ? 'text-stone-300' : ''}
                `}
              >
                {day}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Badges */}
      <div>
        <SectionHeader title="Conquistas" />
        <div className="grid grid-cols-3 gap-3">
          {['Leitor Fiel', 'Oração Matinal', 'Doador', 'Evangelista', 'Sábio', 'Guerreiro'].map((badge, idx) => {
            const unlocked = idx < 3;
            return (
              <div key={idx} className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-300 ${unlocked ? 'bg-white border-stone-100 shadow-sm' : 'bg-stone-50 border-stone-100 opacity-50 grayscale'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${unlocked ? 'bg-amber-100 text-amber-600 shadow-sm' : 'bg-stone-200 text-stone-400'}`}>
                  {unlocked ? <Award size={20} /> : <Lock size={16} />}
                </div>
                <span className="text-[10px] font-medium text-center text-stone-600">{badge}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CommunityTab = ({ showToast }: { showToast: (msg: string) => void }) => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [expandedComments, setExpandedComments] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(postId => postId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
      showToast("Você curtiu este post!");
    }
  };

  const toggleComments = (id: number) => {
    if (expandedComments === id) {
      setExpandedComments(null);
    } else {
      setExpandedComments(id);
    }
  };

  return (
    <div className="space-y-4 pb-24 pt-6 bg-stone-50 min-h-screen">
      <div className="px-4 flex justify-between items-center sticky top-0 bg-stone-50/95 backdrop-blur-sm z-10 py-2 border-b border-stone-100">
        <h2 className="text-xl font-serif font-bold text-blue-900">Comunidade</h2>
        <button 
          onClick={() => showToast("Funcionalidade em desenvolvimento!")}
          className="bg-blue-900 text-white p-2 rounded-full shadow-lg hover:bg-blue-800 transition-colors active:scale-90"
        >
          <PlusSquare size={20} />
        </button>
      </div>

      <div className="px-4 space-y-4">
        {COMMUNITY_POSTS.map((post) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-0 overflow-hidden border-stone-100 shadow-sm hover:shadow-md transition-shadow">
              {/* Post Header */}
              <div className="p-4 flex items-center space-x-3">
                <div className="relative">
                  <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full object-cover border border-stone-100" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h4 className="font-bold text-stone-800 text-sm">{post.user}</h4>
                  <p className="text-xs text-stone-400">{post.time}</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-2">
                <p className="text-stone-700 text-sm leading-relaxed mb-3">{post.text}</p>
              </div>
              
              {post.image && (
                <div className="w-full h-64 bg-stone-100">
                  <img src={post.image} alt="Post content" className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}

              {/* Post Actions */}
              <div className="p-4 flex items-center justify-between border-t border-stone-50">
                <div className="flex space-x-6">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center space-x-1.5 text-sm font-medium transition-colors ${likedPosts.includes(post.id) ? 'text-red-500' : 'text-stone-500 hover:text-stone-800'}`}
                  >
                    <Heart size={20} className={`transition-transform duration-200 ${likedPosts.includes(post.id) ? 'fill-current scale-110' : ''}`} />
                    <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                  </button>
                  <button 
                    onClick={() => toggleComments(post.id)}
                    className={`flex items-center space-x-1.5 text-sm font-medium transition-colors ${expandedComments === post.id ? 'text-blue-900' : 'text-stone-500 hover:text-stone-800'}`}
                  >
                    <MessageCircle size={20} />
                    <span>{post.comments}</span>
                  </button>
                </div>
                <button 
                  onClick={() => showToast("Link copiado!")}
                  className="text-stone-400 hover:text-stone-800 transition-colors"
                >
                  <Share2 size={20} />
                </button>
              </div>

              {/* Expanded Comments Section */}
              <AnimatePresence>
                {expandedComments === post.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-stone-50 border-t border-stone-100 overflow-hidden"
                  >
                    <div className="p-4 space-y-3">
                      <div className="flex space-x-3">
                        <div className="w-8 h-8 rounded-full bg-stone-200 flex-shrink-0 overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?u=${post.id + 100}`} alt="User" />
                        </div>
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none text-xs shadow-sm flex-1">
                          <span className="font-bold block mb-1 text-stone-800">Maria Oliveira</span>
                          <p className="text-stone-600">Amém! Que palavra abençoada. 🙌</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <div className="w-8 h-8 rounded-full bg-stone-200 flex-shrink-0 overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?u=${post.id + 200}`} alt="User" />
                        </div>
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none text-xs shadow-sm flex-1">
                          <span className="font-bold block mb-1 text-stone-800">Paulo Santos</span>
                          <p className="text-stone-600">Glória a Deus! 🙏</p>
                        </div>
                      </div>
                      <button className="text-xs text-blue-900 font-medium w-full text-center mt-2 hover:underline">
                        Ver todos os {post.comments} comentários
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-stone-200">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </AnimatePresence>

      {/* Content Area */}
      <div className="h-full overflow-y-auto scrollbar-hide bg-stone-50">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <HomeTab showToast={showToast} />
            </motion.div>
          )}
          {activeTab === 'progress' && (
            <motion.div 
              key="progress"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <ProgressTab />
            </motion.div>
          )}
          {activeTab === 'community' && (
            <motion.div 
              key="community"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <CommunityTab showToast={showToast} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-stone-100 h-[80px] px-6 pb-4 pt-2 flex justify-between items-center z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <TabButton 
          active={activeTab === 'home'} 
          icon={Home} 
          label="Início" 
          onClick={() => setActiveTab('home')} 
        />
        <TabButton 
          active={activeTab === 'progress'} 
          icon={BarChart2} 
          label="Progresso" 
          onClick={() => setActiveTab('progress')} 
        />
        <TabButton 
          active={activeTab === 'community'} 
          icon={Users} 
          label="Comunidade" 
          onClick={() => setActiveTab('community')} 
        />
      </div>
    </div>
  );
}
