import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { 
  LayoutDashboard, Search, Users, Settings, 
  CreditCard, Globe, Phone, Zap, ShieldCheck,
  TrendingUp, BarChart3, ChevronRight, Menu
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';

// --- MOCK DATA ---
const MOCK_LEADS = [
  { id: 1, name: 'Nexus Tech', sector: 'Software', location: 'São Paulo', status: 'Novo', phone: '(11) 98822-1234' },
  { id: 2, name: 'BioGlow Estética', sector: 'Saúde', location: 'Rio de Janeiro', status: 'Negociação', phone: '(21) 97722-5566' },
  { id: 3, name: 'Apolo Advocacia', sector: 'Jurídico', location: 'Curitiba', status: 'Reunião', phone: '(41) 3322-1100' },
  { id: 4, name: 'Quantum Solar', sector: 'Energia', location: 'Fortaleza', status: 'Fechado', phone: '(85) 99911-2233' },
];

const DASHBOARD_DATA = [
  { name: 'Seg', leads: 400 }, { name: 'Ter', leads: 700 }, { name: 'Qua', leads: 500 },
  { name: 'Qui', leads: 900 }, { name: 'Sex', leads: 1100 }, { name: 'Sáb', leads: 800 },
];

// --- COMPONENTES AUXILIARES ---

// Fundo de Partículas e Luzes Cinematográficas
const CinematicBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
    {/* Luzes de Gradiente Ambiente */}
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[120px] animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-600/5 blur-[100px]" />
    
    {/* Partículas Flutuantes */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-amber-500/20 rounded-full"
        initial={{ opacity: 0, y: Math.random() * 1000 }}
        animate={{ 
          opacity: [0, 0.5, 0],
          y: [0, -1000],
          x: Math.sin(i) * 100
        }}
        transition={{ 
          duration: Math.random() * 10 + 10, 
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ left: `${Math.random() * 100}%` }}
      />
    ))}
  </div>
);

// Mouse Glow Effect
const MouseGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-10 pointer-events-none"
      style={{
        background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(212, 175, 55, 0.05), transparent 80%)`,
      }}
    />
  );
};

// Glass Card com Borda Brilhante
const GlassCard = ({ children, className = "" }) => (
  <motion.div 
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={`relative group ${className}`}
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-transparent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
    <div className="relative bg-[#121212]/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
      {children}
    </div>
  </motion.div>
);

// --- TELAS PRINCIPAIS ---

const Dashboard = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
    className="space-y-6"
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Créditos Diários - Circular Gauge */}
      <GlassCard className="col-span-1">
        <h3 className="text-amber-500 font-bold mb-4 flex items-center gap-2">
          <Zap size={18} /> CRÉDITOS DISPONÍVEIS
        </h3>
        <div className="relative flex justify-center items-center h-40">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
            <motion.circle
              cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent"
              strokeDasharray={364.4}
              initial={{ strokeDashoffset: 364.4 }}
              animate={{ strokeDashoffset: 364.4 - (364.4 * 0.75) }}
              className="text-amber-500"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-3xl font-bold">15</span>
            <p className="text-[10px] text-zinc-500">DE 20 LEADS</p>
          </div>
        </div>
      </GlassCard>

      {/* Gráfico de Leads */}
      <GlassCard className="col-span-2">
        <h3 className="text-amber-500 font-bold mb-4">PERFORMANCE SEMANAL</h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DASHBOARD_DATA}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="leads" stroke="#D4AF37" fillOpacity={1} fill="url(#colorLeads)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>

    {/* Leads Recentes */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <GlassCard>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center gap-2"><trendingUp size={18} className="text-green-500"/> TAXA DE CONVERSÃO</h3>
            <span className="text-2xl font-bold">24.8%</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
             <motion.div initial={{width:0}} animate={{width: '24.8%'}} className="bg-green-500 h-full shadow-[0_0_10px_#22c55e]"/>
          </div>
       </GlassCard>
       <GlassCard>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center gap-2"><Users size={18} className="text-blue-500"/> TOTAL CAPTURADO</h3>
            <span className="text-2xl font-bold">1,284</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
             <motion.div initial={{width:0}} animate={{width: '65%'}} className="bg-blue-500 h-full shadow-[0_0_10px_#3b82f6]"/>
          </div>
       </GlassCard>
    </div>
  </motion.div>
);

const MagicSearch = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <GlassCard className="border-amber-500/30">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black tracking-tighter mb-2 italic">BUSCADOR <span className="text-amber-500 underline">MÁGICO</span></h2>
          <p className="text-zinc-500 uppercase text-xs tracking-[4px]">Escanear Deep Web por leads qualificados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-[10px] text-amber-500 font-bold tracking-widest uppercase ml-2">Segmento</label>
            <input type="text" placeholder="Ex: Clínicas Odontológicas" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 outline-none focus:border-amber-500 transition-all text-sm"/>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-amber-500 font-bold tracking-widest uppercase ml-2">Localização</label>
            <input type="text" placeholder="Ex: São Paulo, SP" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 outline-none focus:border-amber-500 transition-all text-sm"/>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mb-8 justify-center">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="hidden" />
            <div className="w-10 h-5 bg-white/5 border border-white/10 rounded-full relative transition-colors group-hover:border-amber-500">
               <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
            </div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Exigir Telefone</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="hidden" />
            <div className="w-10 h-5 bg-white/5 border border-white/10 rounded-full relative transition-colors group-hover:border-amber-500">
               <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
            </div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Exigir Site</span>
          </label>
        </div>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          className="w-full bg-amber-500 text-black font-black py-4 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-3"
        >
          <Search size={20} /> INICIAR ESCANEAMENTO
        </motion.button>
      </GlassCard>

      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 relative"
          >
            <div className="w-48 h-48 border-4 border-amber-500/20 rounded-full absolute animate-ping" />
            <div className="w-48 h-48 border-2 border-amber-500 rounded-full flex items-center justify-center animate-spin-slow">
               <div className="w-full h-1 bg-amber-500 absolute top-1/2" />
            </div>
            <p className="mt-8 font-mono text-amber-500 animate-pulse uppercase tracking-[5px]">Injetando Scrapers...</p>
          </motion.div>
        )}

        {showResults && !isScanning && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
             {MOCK_LEADS.map(lead => (
               <GlassCard key={lead.id} className="hover:border-amber-500/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-lg">{lead.name}</h4>
                      <div className="flex gap-4 text-xs text-zinc-500 mt-1 uppercase tracking-widest">
                         <span>{lead.sector}</span>
                         <span>{lead.location}</span>
                      </div>
                    </div>
                    <button className="bg-white/5 hover:bg-amber-500 hover:text-black p-3 rounded-xl transition-all">
                       <Zap size={18} />
                    </button>
                  </div>
               </GlassCard>
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- ESTRUTURA PRINCIPAL ---

export default function OrusPlatform() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'search', label: 'Buscador', icon: Search },
    { id: 'crm', label: 'CRM Kanban', icon: Users },
    { id: 'plans', label: 'Planos', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-black">
      <CinematicBackground />
      <MouseGlow />

      {/* Sidebar */}
      <motion.aside 
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="fixed left-0 top-0 bottom-0 bg-[#0A0A0A] border-r border-white/5 z-50 flex flex-col p-4"
      >
        <div className="flex items-center gap-4 mb-12 ml-2">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <Zap className="text-black" fill="black" size={24} />
          </div>
          {sidebarOpen && <h1 className="font-black text-2xl tracking-tighter italic">ORUS</h1>}
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all relative ${
                activeTab === item.id ? 'text-amber-500 bg-amber-500/5' : 'text-zinc-500 hover:text-white'
              }`}
            >
              <item.icon size={22} />
              {sidebarOpen && <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>}
              {activeTab === item.id && (
                <motion.div layoutId="active" className="absolute left-0 w-1 h-6 bg-amber-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 text-zinc-500 hover:text-amber-500 flex justify-center"
        >
          <Menu size={20} />
        </button>
      </motion.aside>

      {/* Main Content */}
      <main 
        className="transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? 280 : 80 }}
      >
        <div className="p-8 max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-xs font-bold text-amber-500 tracking-[5px] uppercase">Nexus System / v2.0</h2>
              <h3 className="text-2xl font-black tracking-tight">{
                menuItems.find(i => i.id === activeTab).label
              }</h3>
            </div>
            <div className="flex items-center gap-6">
               <div className="text-right hidden md:block">
                  <p className="text-xs font-bold uppercase tracking-wider">Premium Access</p>
                  <p className="text-[10px] text-zinc-500">Expira em 24 dias</p>
               </div>
               <div className="user-badge shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <span className="text-sm">CD</span>
               </div>
            </div>
          </header>

          <AnimatePresence mode="wait">
             {activeTab === 'dashboard' && <Dashboard key="dash" />}
             {activeTab === 'search' && <MagicSearch key="search" />}
             {activeTab === 'crm' && (
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[70vh]">
                  {['Novos', 'Negociação', 'Reunião', 'Fechado'].map(col => (
                    <div key={col} className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-4">
                       <h4 className="text-xs font-black uppercase tracking-[3px] text-zinc-500 ml-2 mb-6">{col}</h4>
                       {MOCK_LEADS.filter(l => (col === 'Novos' && l.status === 'Novo') || l.status === col).map(lead => (
                         <GlassCard key={lead.id} className="p-4 text-sm cursor-grab active:cursor-grabbing">
                            <p className="font-bold">{lead.name}</p>
                            <p className="text-[10px] text-zinc-500 uppercase mt-1">{lead.phone}</p>
                         </GlassCard>
                       ))}
                    </div>
                  ))}
               </div>
             )}
             {activeTab === 'plans' && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto py-10">
                  <GlassCard className="text-center space-y-6 border-white/5">
                     <h4 className="text-zinc-500 font-bold">FREE TRIAL</h4>
                     <div className="text-5xl font-black">R$ 0<span className="text-sm text-zinc-500">/mês</span></div>
                     <ul className="text-xs space-y-3 text-zinc-400 uppercase tracking-widest">
                        <li>20 Leads Iniciais</li>
                        <li>Captura Básica</li>
                        <li className="line-through opacity-30">CRM Avançado</li>
                     </ul>
                     <button className="w-full py-3 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all">SELECIONAR</button>
                  </GlassCard>
                  <GlassCard className="text-center space-y-6 border-amber-500/50 scale-105 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-black text-[10px] font-black px-4 py-1 rounded-full uppercase">MAIS POPULAR</div>
                     <h4 className="text-amber-500 font-bold">ORÚS PRO</h4>
                     <div className="text-5xl font-black">R$ 197<span className="text-sm text-zinc-500">/mês</span></div>
                     <ul className="text-xs space-y-3 text-zinc-400 uppercase tracking-widest">
                        <li>Pesquisas Ilimitadas</li>
                        <li>Automação WhatsApp</li>
                        <li>IA Preditiva de Fechamento</li>
                     </ul>
                     <button className="w-full py-3 bg-amber-500 text-black rounded-xl font-black transition-all shadow-glow">ASSINAR AGORA</button>
                  </GlassCard>
               </div>
             )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
