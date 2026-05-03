import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { 
  LayoutDashboard, Search, Users, Settings, 
  CreditCard, Globe, Phone, Zap, ShieldCheck,
  TrendingUp, BarChart3, ChevronRight, Menu,
  X, Play, MousePointer2, Sparkles
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar,
  Cell, PieChart, Pie
} from 'recharts';

// --- DADOS TEMPORÁRIOS (MOCK DATA) ---
const MOCK_LEADS = [
  { id: 1, name: 'Quantum Core Systems', sector: 'Tecnologia', location: 'São Paulo', status: 'Novos Leads', phone: '(11) 98822-1000' },
  { id: 2, name: 'Aura Estética Avançada', sector: 'Saúde', location: 'Rio de Janeiro', status: 'Em Negociação', phone: '(21) 97722-5500' },
  { id: 3, name: 'Horizon Jurídico', sector: 'Advocacia', location: 'Brasília', status: 'Reunião', phone: '(61) 3322-1188' },
  { id: 4, name: 'Vertex Solar Energy', sector: 'Energia', location: 'Fortaleza', status: 'Fechado', phone: '(85) 99911-2233' },
  { id: 5, name: 'BioLab Research', sector: 'Farmacêutica', location: 'Curitiba', status: 'Novos Leads', phone: '(41) 3030-4040' },
];

const DASH_CHART_DATA = [
  { name: 'Seg', leads: 45 }, { name: 'Ter', leads: 52 }, { name: 'Qua', leads: 48 },
  { name: 'Qui', leads: 70 }, { name: 'Sex', leads: 61 }, { name: 'Sáb', leads: 34 },
  { name: 'Dom', leads: 40 },
];

// --- COMPONENTES VISUAIS ---

const CinematicBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
    {/* Luzes Cinematográficas Ambientais */}
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 10, repeat: Infinity }}
      className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-amber-500/10 blur-[120px]" 
    />
    <motion.div 
      animate={{ 
        scale: [1, 1.3, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{ duration: 15, repeat: Infinity, delay: 2 }}
      className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-amber-600/5 blur-[100px]" 
    />
    
    {/* Micropartículas de Poeira Estelar */}
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-[1px] h-[1px] bg-amber-400/40 rounded-full"
        initial={{ opacity: 0, y: Math.random() * 1000 }}
        animate={{ 
          opacity: [0, 1, 0],
          y: [null, -1000],
        }}
        transition={{ 
          duration: Math.random() * 20 + 10, 
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
      />
    ))}
  </div>
);

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
        background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(212, 175, 55, 0.08), transparent 80%)`,
      }}
    />
  );
};

const GlassCard = ({ children, className = "", delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`relative group ${className}`}
  >
    <div className="absolute -inset-0.5 bg-gradient-to-b from-amber-500/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
    <div className="relative bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl h-full overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {children}
    </div>
  </motion.div>
);

// --- TELAS PRINCIPAIS ---

const Dashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <GlassCard>
        <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-1">Leads Capturados</p>
        <h4 className="text-3xl font-black text-white italic">1.284</h4>
        <div className="flex items-center gap-1 text-green-500 text-xs mt-2">
          <TrendingUp size={12} /> <span>+12% este mês</span>
        </div>
      </GlassCard>
      
      <GlassCard>
        <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-1">Conversão</p>
        <h4 className="text-3xl font-black text-white italic">18.4%</h4>
        <div className="w-full bg-white/5 h-1.5 rounded-full mt-4">
           <motion.div initial={{width: 0}} animate={{width: '18.4%'}} className="bg-amber-500 h-full shadow-[0_0_8px_#D4AF37]" />
        </div>
      </GlassCard>

      <GlassCard className="md:col-span-2">
        <div className="flex justify-between items-center h-full">
           <div>
              <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">Créditos de Hoje</p>
              <h4 className="text-2xl font-black text-amber-500">15 / 20 <span className="text-xs text-zinc-600 ml-2 italic">RESTANTES</span></h4>
           </div>
           <div className="relative w-16 h-16">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                <motion.circle
                  cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent"
                  strokeDasharray={175.9}
                  initial={{ strokeDashoffset: 175.9 }}
                  animate={{ strokeDashoffset: 175.9 - (175.9 * 0.75) }}
                  className="text-amber-500"
                />
              </svg>
              <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-500" size={14} />
           </div>
        </div>
      </GlassCard>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <GlassCard className="md:col-span-2 min-h-[300px]">
        <h3 className="text-xs font-black tracking-[4px] uppercase text-zinc-400 mb-8 flex items-center gap-2">
          <BarChart3 size={14} className="text-amber-500"/> Fluxo de Prospecção
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DASH_CHART_DATA}>
              <defs>
                <linearGradient id="glowAmber" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="leads" stroke="#D4AF37" strokeWidth={3} fill="url(#glowAmber)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="text-xs font-black tracking-[4px] uppercase text-zinc-400 mb-6">Atividade Recente</h3>
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center gap-3 border-b border-white/5 pb-3">
              <div className="w-8 h-8 rounded bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold text-xs">
                {String.fromCharCode(64 + i)}
              </div>
              <div>
                <p className="text-xs font-bold">Novo lead capturado</p>
                <p className="text-[10px] text-zinc-500">Há {i*5} minutos</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  </div>
);

const MagicSearch = () => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(false);

  const startScan = () => {
    setScanning(true);
    setResults(false);
    setTimeout(() => {
      setScanning(false);
      setResults(true);
    }, 3500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <GlassCard className="border-amber-500/20">
        <div className="text-center mb-10">
           <motion.div 
            animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block p-3 rounded-full bg-amber-500/5 mb-4 border border-amber-500/20"
           >
              <Sparkles className="text-amber-500" size={24} />
           </motion.div>
           <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Buscador <span className="text-amber-500 underline">Mágico</span></h2>
           <p className="text-[10px] text-zinc-500 tracking-[3px] uppercase mt-2">Extração de dados em tempo real da Google Engine</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
           <input type="text" placeholder="SEGMENTO (Ex: Estética)" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none focus:border-amber-500 transition-all text-sm uppercase font-bold tracking-widest text-amber-500" />
           <input type="text" placeholder="LOCALIZAÇÃO (Ex: Curitiba, PR)" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none focus:border-amber-500 transition-all text-sm uppercase font-bold tracking-widest text-amber-500" />
        </div>

        <div className="flex justify-center gap-8 mb-8">
           <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-amber-500" />
              <span className="text-[10px] font-bold uppercase text-zinc-400">Com Telefone</span>
           </label>
           <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-amber-500" />
              <span className="text-[10px] font-bold uppercase text-zinc-400">Com Website</span>
           </label>
        </div>

        <button 
          onClick={startScan}
          disabled={scanning}
          className="w-full bg-amber-500 text-black font-black py-4 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.01] active:scale-[0.98] transition-all"
        >
          {scanning ? 'ESCANEAR DEEP WEB...' : 'INICIAR CAPTURA INTELIGENTE'}
        </button>
      </GlassCard>

      <AnimatePresence>
        {scanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20 flex flex-col items-center">
             <div className="relative">
                <div className="w-32 h-32 border-2 border-amber-500/20 rounded-full animate-ping absolute" />
                <div className="w-32 h-32 border-t-2 border-amber-500 rounded-full animate-spin" />
             </div>
             <p className="mt-6 font-mono text-amber-500 text-xs animate-pulse tracking-[4px]">CONECTANDO AOS NODES DE BUSCA...</p>
          </motion.div>
        )}

        {results && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 space-y-3">
             <p className="text-[10px] text-zinc-500 font-bold mb-4 ml-2 tracking-widest uppercase">Resultados Encontrados ({MOCK_LEADS.length})</p>
             {MOCK_LEADS.map(lead => (
               <GlassCard key={lead.id} className="p-4 py-3 hover:border-amber-500/40 transition-all cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-white">{lead.name}</h4>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-tighter mt-0.5">{lead.sector} • {lead.location}</p>
                    </div>
                    <button className="bg-white/5 p-2 rounded-lg hover:bg-amber-500 hover:text-black transition-colors">
                       <Zap size={14} />
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

// --- APP WRAPPER ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 relative">
      <CinematicBackground />
      <MouseGlow />

      {/* Sidebar Navigation */}
      <motion.aside 
        animate={{ width: sidebarOpen ? 260 : 80 }}
        className="fixed left-0 top-0 bottom-0 bg-[#080808]/80 backdrop-blur-md border-r border-white/5 z-50 flex flex-col p-4"
      >
        <div className="flex items-center gap-3 mb-10 ml-2 mt-2">
          <div className="bg-amber-500 p-2 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <Zap className="text-black" fill="black" size={20} />
          </div>
          {sidebarOpen && <h1 className="font-black text-xl italic tracking-tighter">ORUS</h1>}
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'search', label: 'Buscador', icon: Search },
            { id: 'crm', label: 'CRM Leads', icon: Users },
            { id: 'plans', label: 'Configurações', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all relative ${
                activeTab === item.id ? 'text-amber-500 bg-amber-500/5' : 'text-zinc-500 hover:text-zinc-200'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="text-[10px] font-black uppercase tracking-[2px]">{item.label}</span>}
              {activeTab === item.id && (
                <motion.div layoutId="navGlow" className="absolute left-0 w-1 h-6 bg-amber-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 bg-white/5 rounded-xl text-zinc-500 hover:text-amber-500 transition-colors flex justify-center"
        >
          <Menu size={18} />
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <main 
        className="transition-all duration-300 relative z-20 min-h-screen"
        style={{ marginLeft: sidebarOpen ? 260 : 80 }}
      >
        <div className="p-8 max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <div>
              <p className="text-[9px] font-black text-amber-500 tracking-[5px] uppercase">Nexus AI / Alpha v2</p>
              <h2 className="text-2xl font-black italic tracking-tighter uppercase">
                {activeTab === 'dashboard' && 'Central de Comando'}
                {activeTab === 'search' && 'Mineração de Dados'}
                {activeTab === 'crm' && 'Pipeline Comercial'}
                {activeTab === 'plans' && 'Portal do Cliente'}
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black uppercase">Cauã Diniz</p>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Plano Corporate</p>
               </div>
               <div className="user-badge shadow-[0_0_10px_rgba(212,175,55,0.1)]">
                  <span className="text-xs">CD</span>
               </div>
            </div>
          </header>

          <AnimatePresence mode="wait">
             {activeTab === 'dashboard' && <Dashboard key="dash" />}
             {activeTab === 'search' && <MagicSearch key="search" />}
             
             {activeTab === 'crm' && (
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-[500px]">
                  {['Novos Leads', 'Em Negociação', 'Reunião', 'Fechado'].map((col, idx) => (
                    <div key={col} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                       <h4 className="text-[9px] font-black uppercase tracking-[3px] text-zinc-500 mb-6 flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${idx === 3 ? 'bg-green-500' : 'bg-amber-500/40'}`} />
                          {col}
                       </h4>
                       <div className="space-y-3">
                          {MOCK_LEADS.filter(l => l.status === col).map(lead => (
                            <GlassCard key={lead.id} className="p-3 !bg-zinc-800/40 cursor-grab active:cursor-grabbing border-white/5">
                               <p className="font-bold text-xs">{lead.name}</p>
                               <p className="text-[9px] text-zinc-500 uppercase mt-1 italic">{lead.phone}</p>
                            </GlassCard>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
             )}

             {activeTab === 'plans' && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto py-10">
                  <GlassCard className="text-center space-y-6">
                     <p className="text-xs font-bold text-zinc-500">STARTER</p>
                     <h3 className="text-4xl font-black italic">R$ 0</h3>
                     <button className="w-full py-3 border border-white/10 rounded-xl text-[10px] font-bold uppercase hover:bg-white/5 transition-all">Plano Atual</button>
                  </GlassCard>
                  <GlassCard className="text-center space-y-6 border-amber-500/40 bg-amber-500/[0.02]">
                     <p className="text-xs font-bold text-amber-500 italic">CORPORATE PRO</p>
                     <h3 className="text-4xl font-black italic">R$ 197<span className="text-sm font-normal">/mês</span></h3>
                     <button className="w-full py-3 bg-amber-500 text-black rounded-xl text-[10px] font-black uppercase shadow-[0_0_20px_rgba(212,175,55,0.3)]">Fazer Upgrade</button>
                  </GlassCard>
               </div>
             )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
