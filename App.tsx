import React, { useState, useEffect } from 'react';
import { Section } from './components/Section';
import { GoldButton } from './components/GoldButton';
import { 
  Scroll, Lock, Shield, Star, Clock, 
  AlertTriangle, Award, Sun, BookOpen, Cross, ChevronRight,
  ThumbsUp, BadgeCheck, HelpCircle
} from './components/Icons';
import { Testimonial } from './types';

// Declare custom element to avoid TS errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': any;
      [elemName: string]: any;
    }
  }
}

const App: React.FC = () => {
  // Scarcity Logic: Dynamic countdown
  const [copiesRemaining, setCopiesRemaining] = useState(48);
  const copiesTotal = 300;

  // Initial Data for Top Testimonials
  const [topTestimonials, setTopTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      author: "Frei Gilson / Som Do Monte",
      text: "A Instrução da Água Sagrada de Moisés tem um simbolismo profundo. Ver tantas pessoas voltando-se a Deus por meio deste gesto de fé é inspirador. Que esta prática continue iluminando corações.",
      likes: 299,
      timeAgo: "27 min",
      isFamous: true,
      image: "https://i.imgur.com/PjOIic3.jpeg"
    },
    {
      id: 2,
      author: "Maria Lúcia Batista",
      text: "Comecei a fazer a Água de Moisés esta semana… senti uma paz imensa, algo que não sentia há anos. Que mais pessoas possam ser tocadas por esse movimento espiritual!",
      likes: 15,
      timeAgo: "17 min",
      image: "https://i.imgur.com/EefQCcL.jpeg"
    },
    {
      id: 3,
      author: "Padre Paulo Ricardo",
      text: "Em missão em Jerusalém, encontrei práticas semelhantes, mas ver essa instrução sendo resgatada hoje me alegra. Um mover espiritual verdadeiro está acontecendo.",
      likes: 247,
      timeAgo: "32 min",
      isFamous: true,
      image: "https://i.imgur.com/33MMVJa.jpeg"
    },
    {
      id: 4,
      author: "Marta Rocha",
      text: "Era isso que eu procurava! Só de começar a preparar a água senti um alívio enorme… e minha fé se fortaleceu.",
      likes: 23,
      timeAgo: "15 min",
      image: "https://i.imgur.com/MYkyXTy.jpeg"
    },
    {
      id: 5,
      author: "Padre Chrysitan Shankar",
      text: "Feita com fé, a Instrução da Água Sagrada abre caminhos, acalma a alma e fortalece o espírito. Deus age quando o coração está sincero.",
      likes: 139,
      timeAgo: "45 min",
      isFamous: true,
      image: "https://i.imgur.com/LHFr7uN.jpeg"
    },
    {
      id: 6,
      author: "Juliana Ferreira",
      text: "Fiz a Água Sagrada por 3 dias e consegui o emprego que orava há meses! Minha ansiedade diminuiu e sinto leveza.",
      likes: 59,
      timeAgo: "41 min",
      image: "https://i.imgur.com/9yKpM3u.jpeg"
    },
    {
      id: 7,
      author: "João Oliveira",
      text: "Minha esposa sofria com crises de ansiedade. Depois de fazermos juntos a Água de Moisés, ela descansa de verdade. Um milagre em casa!",
      likes: 11,
      timeAgo: "32 min",
      image: "https://i.imgur.com/uuVqHQB.jpeg"
    },
    {
      id: 8,
      author: "Ricardo Silva",
      text: "Preparei a água e fiz a oração… no mesmo dia meu filho dormiu a noite inteira. Não tenho palavras para agradecer a Deus!",
      likes: 47,
      timeAgo: "43 min",
      image: "https://i.imgur.com/OvDFfaV.jpeg"
    },
    {
      id: 9,
      author: "João Pereira",
      text: "Era cético, mas em duas semanas vi portas se abrindo e paz forte em casa. Recomendo totalmente.",
      likes: 158,
      timeAgo: "38 min",
      image: "https://i.imgur.com/JnjvWLT.jpeg"
    },
    {
      id: 10,
      author: "Maria de Fátima",
      text: "Desconfiada no início, mas depois de ver os depoimentos de Frei Gilson, Padre Paulo e Padre Chrysitan, decidi fazer com fé. Agora espero viver os mesmos milagres!",
      likes: 67,
      timeAgo: "29 min",
      image: "https://i.imgur.com/uKSAqqX.jpeg"
    }
  ]);

  // Initial Data for Bottom Testimonials (New)
  const [bottomTestimonials, setBottomTestimonials] = useState<Testimonial[]>([
    {
      id: 101,
      author: "Ana Clara Mendes",
      text: "Quando comecei a aplicar a Instrução do Elemento Sagrado de Moisés, senti imediatamente uma tranquilidade que há anos não sentia. Meu coração parece mais leve e minha mente mais clara. Gratidão infinita por essa revelação.",
      likes: 112,
      timeAgo: "12 min"
    },
    {
      id: 102,
      author: "Patrícia Oliveira",
      text: "Não imaginava que algo tão simples pudesse ter um efeito tão profundo. Só de preparar o Elemento Sagrado conforme indicado, senti uma proteção incrível em minha casa e em minha vida.",
      likes: 85,
      timeAgo: "9 min"
    },
    {
      id: 103,
      author: "Camila Ferreira",
      text: "Estou emocionada! Minha família estava passando por tensões constantes e, depois de seguirmos a instrução, conseguimos mais harmonia e paz em casa. É realmente um mover espiritual poderoso.",
      likes: 174,
      timeAgo: "27 min"
    },
    {
      id: 104,
      author: "Juliana Souza",
      text: "Minha ansiedade diminuiu significativamente e finalmente consegui dormir tranquila. Sinto que algo maior está guiando meu caminho e abrindo portas que antes pareciam fechadas.",
      likes: 96,
      timeAgo: "18 min"
    },
    {
      id: 105,
      author: "Letícia Ramos",
      text: "Era cética no início, mas ver os efeitos em apenas alguns dias me fez acreditar de verdade. O Elemento Sagrado trouxe clareza, força e esperança para decisões importantes da minha vida.",
      likes: 142,
      timeAgo: "34 min"
    },
    {
      id: 106,
      author: "Marina Castro",
      text: "Depois de anos carregando preocupações e bloqueios, senti uma mudança profunda. A instrução é simples, mas o efeito é transformador. Meu coração voltou a sentir fé verdadeira.",
      likes: 79,
      timeAgo: "21 min"
    },
    {
      id: 107,
      author: "Isabela Martins",
      text: "Sinto-me mais protegida e confiante. Cada passo que dou agora parece guiado, e as portas que estavam fechadas começaram a se abrir. É uma experiência espiritual única!",
      likes: 131,
      timeAgo: "15 min"
    },
    {
      id: 108,
      author: "Beatriz Lima",
      text: "Minha vida profissional estava estagnada. Ao aplicar a instrução do Elemento Sagrado, senti coragem e clareza para agir. Em poucos dias, percebi resultados que pareciam impossíveis.",
      likes: 101,
      timeAgo: "23 min"
    },
    {
      id: 109,
      author: "Renata Gomes",
      text: "Para mim, a maior surpresa foi a paz que senti dentro de casa. Conflitos diminuíram, meu sono melhorou e sinto uma conexão espiritual que não tinha há muito tempo. Obrigada por compartilhar este conhecimento!",
      likes: 88,
      timeAgo: "29 min"
    },
    {
      id: 110,
      author: "Carolina Vieira",
      text: "Cada vez que sigo a instrução sinto que algo divino atua no meu caminho. Não é apenas prática, é entrega, fé e transformação real. Recomendo a todos que desejam clareza e proteção espiritual.",
      likes: 120,
      timeAgo: "11 min"
    }
  ]);
  
  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Effect for dynamic scarcity countdown
  useEffect(() => {
    let timeoutId: number;

    const runCountdown = () => {
      // Logic: vary time between 8 seconds (8000ms) and 45 seconds (45000ms)
      // This creates the "oscillation" requested
      const delay = Math.floor(Math.random() * (45000 - 8000) + 8000);

      timeoutId = window.setTimeout(() => {
        setCopiesRemaining(prev => {
          // Logic: Don't let it go below 3 to ensure urgency remains but doesn't show "Sold Out"
          if (prev <= 3) return prev;
          return prev - 1;
        });
        runCountdown(); // Schedule next decrement
      }, delay);
    };

    runCountdown();

    return () => clearTimeout(timeoutId);
  }, []);

  // Function to handle likes
  const toggleLike = (id: number, section: 'top' | 'bottom') => {
    const updateList = (list: Testimonial[]) => {
      return list.map(t => {
        if (t.id === id) {
          const isLiked = !!t.liked;
          return {
            ...t,
            liked: !isLiked,
            likes: isLiked ? t.likes - 1 : t.likes + 1
          };
        }
        return t;
      });
    };

    if (section === 'top') {
      setTopTestimonials(prev => updateList(prev));
    } else {
      setBottomTestimonials(prev => updateList(prev));
    }
  };

  const faqs = [
    {
      q: "Como vou receber minha cópia devocional?",
      a: "Você receberá por e-mail, pronto para acessar imediatamente. Além disso, terá um link especial para entrar em contato via WhatsApp caso queira suporte ou esclarecimentos rápidos."
    },
    {
      q: "Posso usar a instrução em qualquer momento do ano?",
      a: "Sim! Ela foi desenhada para momentos de travessia, decisões importantes ou períodos de busca por proteção e direção espiritual."
    },
    {
      q: "Preciso de algum conhecimento prévio para aplicar a instrução?",
      a: "Não. A instrução é guiada passo a passo, com explicações claras para que qualquer pessoa possa aplicar com fé e confiança."
    },
    {
      q: "Quantas cópias estão disponíveis?",
      a: "A liberação foi limitada a 300 cópias por semestre para esse ano, mas não há garantias de cópias disponíveis para o próximo ano."
    },
    {
      q: "Posso compartilhar com outras pessoas?",
      a: "O acesso é individual, destinado a quem recebe a instrução oficialmente. Isso garante que o material permaneça devocional e preservado."
    }
  ];

  return (
    <div className="font-body text-sacred-cream bg-sacred-black min-h-screen selection:bg-sacred-gold selection:text-sacred-black">
      
      {/* Sticky Scarcity Bar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-sacred-wine/95 backdrop-blur-md border-b border-sacred-gold/30 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 text-sacred-gold animate-pulse-slow">
            <AlertTriangle size={18} />
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Liberação Dezembro 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-serif text-sacred-cream">Restam:</span>
            <span className="text-lg font-bold text-red-500 bg-black/50 px-2 py-0.5 rounded border border-red-900/50 transition-all duration-500">{copiesRemaining}</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: HERO */}
      <Section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-sacred-black to-sacred-black text-center">
        
        {/* Sacred Seal */}
        <div className="mx-auto mb-8 w-max relative group cursor-default">
          <div className="absolute inset-0 bg-sacred-gold blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
          <div className="relative border border-sacred-gold/50 px-4 py-1 bg-black/60 backdrop-blur-sm rounded-sm">
            <span className="text-sacred-gold text-xs font-serif tracking-[0.3em] uppercase">Liberação Oficial • Dezembro 2025</span>
          </div>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight md:leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-sacred-goldLight via-sacred-gold to-neutral-600 text-shadow-gold max-w-5xl mx-auto">
          Se você tem fé, mas sente que tudo está travado, isso aqui não chegou até você por acaso.
        </h1>

        {/* Clean Sub-headline */}
        <p className="font-body text-lg md:text-xl text-sacred-cream/80 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
          A instrução espiritual que Moisés usou para vencer escassez e bloqueios, preservada por séculos, agora revelada para ativar proteção, direção e bênçãos sobre o que você pedia em silêncio, antes que 2026 comece.
        </p>

        {/* Video VSL Warning Message */}
        <div className="w-full max-w-4xl mx-auto mb-5 bg-sacred-wine/40 border-l-4 border-red-600 p-4 md:p-5 rounded-r-lg backdrop-blur-sm text-left relative overflow-hidden group hover:bg-sacred-wine/60 transition-colors">
           <div className="absolute top-0 right-0 p-2 opacity-10">
              <AlertTriangle className="w-12 h-12 text-red-500" />
           </div>
           <p className="text-sm md:text-base text-red-100 font-body leading-relaxed pr-8">
              <span className="text-red-500 font-bold uppercase tracking-wider mr-2 text-shadow-sm flex items-center gap-2 inline-flex mb-1 md:mb-0">
                 <AlertTriangle size={16} className="animate-pulse" /> Atenção:
              </span>
              Antes de continuar, assista ao vídeo abaixo. São apenas 30 segundos, mas o recado que ele traz pode mudar a forma como você encara 2026.
           </p>
        </div>

        {/* Video VSL - Replaces Status Bar */}
        <div className="w-full max-w-4xl mx-auto mb-16 shadow-[0_0_40px_rgba(201,161,70,0.25)] rounded-lg overflow-hidden border border-sacred-gold/30 bg-black relative z-10 group">
            <div className="absolute -inset-1 bg-sacred-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            {/* @ts-ignore */}
            <wistia-player media-id="hrn6oiumch" aspect="1.7204301075268817"></wistia-player>
        </div>

        {/* Testimonials Carousel (Restored Visuals) */}
        <div className="relative w-full max-w-[95vw] mx-auto text-left mt-8 md:mt-12">
           
           {/* Restored Title */}
           <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-center mb-10 text-sacred-cream leading-tight">
             A Voz dos Que Já Vivem a <br className="md:hidden" />
             <span className="text-sacred-gold">Transformação</span>
           </h2>

           <div className="flex overflow-x-auto gap-6 pb-8 px-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-sacred-gold/30 scrollbar-track-transparent">
              {topTestimonials.map((t) => (
                <div 
                   key={t.id} 
                   className="
                     snap-center flex-shrink-0 w-[300px] md:w-[360px] 
                     bg-[#F7F7EF] text-sacred-black 
                     border border-sacred-gold rounded-lg p-6 
                     shadow-[0_4px_20px_rgba(0,0,0,0.5)]
                     hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(201,161,70,0.3)]
                     transition-all duration-300 relative group
                   "
                >
                  {/* Verified Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-sacred-gold/10 px-2 py-1 rounded-full border border-sacred-gold/30">
                     <BadgeCheck size={12} className="text-sacred-gold" />
                     <span className="text-[9px] font-bold uppercase tracking-wider text-sacred-wine">Verificado</span>
                  </div>

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                     <div className={`
                       w-10 h-10 rounded-full overflow-hidden flex-shrink-0
                       ${t.isFamous ? 'ring-2 ring-sacred-gold' : ''}
                     `}>
                       {t.image ? (
                         <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
                       ) : (
                         <div className={`w-full h-full flex items-center justify-center text-white font-serif font-bold text-base ${t.isFamous ? 'bg-sacred-wine' : 'bg-neutral-400'}`}>
                           {t.author.charAt(0)}
                         </div>
                       )}
                     </div>
                     <div>
                       <h4 className="font-serif font-bold text-xs leading-tight text-sacred-wine pr-16">{t.author}</h4>
                     </div>
                  </div>

                  {/* Body */}
                  <p className="text-xs md:text-sm leading-relaxed text-gray-800 font-body mb-4 line-clamp-4">
                    "{t.text}"
                  </p>

                  {/* Footer */}
                  <div className="flex justify-between items-center border-t border-sacred-gold/20 pt-3 select-none">
                    <button 
                      onClick={() => toggleLike(t.id, 'top')}
                      className="flex items-center gap-1.5 transition-colors duration-200 group/like hover:bg-black/5 px-2 py-1 rounded cursor-pointer"
                    >
                      <ThumbsUp 
                        size={14} 
                        className={`transition-all duration-300 ${t.liked ? 'text-sacred-gold fill-sacred-gold scale-125' : 'text-sacred-wine/70'}`} 
                      />
                      <span className={`text-[10px] font-bold ${t.liked ? 'text-sacred-gold' : ''}`}>{t.likes}</span>
                    </button>
                    <span className="text-[10px] text-gray-500 font-medium">{t.timeAgo}</span>
                  </div>
                </div>
              ))}
           </div>
           
           {/* Restored Visual Scroll Indicator */}
           <div className="flex justify-center gap-1 mt-2">
              <div className="w-16 h-1 bg-sacred-gold/30 rounded-full"></div>
              <div className="w-2 h-1 bg-sacred-gold rounded-full animate-pulse"></div>
              <div className="w-2 h-1 bg-sacred-gold/30 rounded-full"></div>
           </div>
        </div>

        <div className="mt-8 opacity-60">
           <div className="w-px h-16 bg-gradient-to-b from-sacred-gold to-transparent mx-auto"></div>
        </div>
      </Section>

      {/* SECTION 2: MYSTICAL SCARCITY */}
      <Section className="bg-sacred-wine border-y-4 border-double border-sacred-gold/20" tornTop tornBottom>
        <div className="bg-black/40 border border-sacred-gold p-8 md:p-12 relative">
          {/* Decorative Corner Icons */}
          <Scroll className="absolute top-4 left-4 text-sacred-gold/20 w-8 h-8" />
          <Scroll className="absolute bottom-4 right-4 text-sacred-gold/20 w-8 h-8 rotate-180" />

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-serif text-2xl md:text-3xl text-sacred-gold mb-4 flex items-center justify-center md:justify-start gap-3">
                <Lock className="w-6 h-6" /> Acesso Restrito
              </h2>
              <ul className="space-y-4 text-sacred-cream/90 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-sacred-gold mt-1">✦</span>
                  Apenas 300 cópias são liberadas duas vezes por ano.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sacred-gold mt-1">✦</span>
                  Uma liberação ocorreu no meio do ano; a segunda é agora.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✦</span>
                  <span className="font-bold">Não há garantia de liberação em 2026.</span>
                </li>
              </ul>
            </div>
            <div className="flex-shrink-0 bg-sacred-black p-6 border border-sacred-gold/30 text-center w-full md:w-auto min-w-[200px]">
               <div className="text-5xl font-serif font-black text-red-500 mb-1 transition-all duration-300">{copiesRemaining}</div>
               <div className="text-xs uppercase tracking-[0.2em] text-sacred-gold">Cópias Restantes</div>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 3: THE LOST REVELATION */}
      <Section className="bg-sacred-black">
        <div className="flex flex-col items-center">
          <BookOpen className="w-12 h-12 text-sacred-gold mb-6 opacity-80" />
          <h2 className="font-serif text-3xl md:text-5xl text-center mb-10 text-sacred-cream">
            Não é inspiração.<br/>
            <span className="text-sacred-gold">É a criação original de Moisés.</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg leading-relaxed text-justify opacity-90 font-light">
              <p>
                Este conhecimento não foi escrito por historiadores modernos. Foi criado pelo próprio profeta que separou as águas.
              </p>
              <p>
                Preservado por séculos em mosteiros esquecidos, mantido em segredo absoluto por líderes espirituais que compreendiam seu poder.
              </p>
              <div className="border-l-4 border-sacred-gold pl-6 py-2 italic text-sacred-goldLight">
                "Este conhecimento só é liberado quando as energias espirituais permitem. O ano de 2026 exige esta proteção."
              </div>
            </div>
            
            {/* Visual Abstract Representation of Manuscripts */}
            <div className="relative h-80 md:h-96 w-full bg-neutral-900 overflow-hidden border border-white/10 rounded-t-full p-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 sepia mix-blend-luminosity"></div>
              <div className="relative z-10 text-center">
                <p className="font-serif text-3xl text-sacred-gold/30 select-none blur-[1px]">
                  בְּרֵאשִׁית בָּרָא אֱלֹהִים
                </p>
                <p className="font-serif text-4xl text-sacred-gold/50 select-none my-4">
                  אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ
                </p>
                <p className="font-serif text-3xl text-sacred-gold/30 select-none blur-[1px]">
                  וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-sacred-black via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 4 & 5: OPENING PATHS & THE ELEMENT */}
      <Section className="bg-sacred-wine/20" tornTop>
        <div className="flex flex-col items-center">
          <div className="h-20 w-px bg-gradient-to-b from-transparent via-sacred-gold to-transparent mb-8"></div>
          
          <h2 className="font-serif text-3xl md:text-5xl text-center mb-6">
            Como Abrir Caminhos <span className="text-sacred-gold decoration-sacred-gold/30 underline decoration-1 underline-offset-8">Onde Parecia Não Existir Saída</span>
          </h2>

          <div className="max-w-3xl text-center space-y-8 mb-16">
            <p className="text-xl md:text-2xl font-serif text-sacred-goldLight">
              Assim como o Mar Vermelho cedeu ao comando sagrado, as barreiras de 2026 se abrirão diante de você.
            </p>
            <p className="text-sacred-cream/80">
              O próximo ano será energeticamente denso. Sem a chave certa, portas permanecerão trancadas. A Revelação de Moisés é o único elemento capaz de alinhar sua frequência espiritual para abrir caminhos impossíveis.
            </p>
          </div>

          <div className="bg-sacred-black border border-sacred-gold/30 p-8 md:p-12 max-w-4xl relative">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-sacred-gold"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-sacred-gold"></div>
            
            <h3 className="text-2xl font-serif text-sacred-gold mb-6 text-center">O Elemento Sagrado</h3>
            <div className="grid md:grid-cols-2 gap-8 text-sm md:text-base">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield size={16} className="text-sacred-gold shrink-0" />
                  <p>Criado originalmente por Moisés no deserto.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-sacred-gold shrink-0" />
                  <p>Guardado por 40 gerações de guardiões.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Lock size={16} className="text-sacred-gold shrink-0" />
                  <p>Mantido em silêncio absoluto pela hierarquia espiritual.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Sun size={16} className="text-sacred-gold shrink-0" />
                  <p>Só acessível quando o ciclo bíblico permite.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 6: BENEFITS */}
      <Section className="bg-sacred-black">
        <h2 className="font-serif text-3xl text-center mb-16">
          O Que Você Recebe ao Adquirir Sua Cópia
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Sun />, title: "Clareza Divina", desc: "Receba um guia devocional completo, com instruções detalhadas de como preparar o elemento sagrado de Moisés, passo a passo, para sentir alívio imediato, dissipar a ansiedade e reencontrar a direção em sua vida." },
            { icon: <Shield />, title: "Proteção de Caminhos", desc: "Aprenda a consagrar o elemento sagrado, criando um escudo espiritual que afasta energias densas, inveja e bloqueios invisíveis, proporcionando tranquilidade para você e sua família." },
            { icon: <Award />, title: "Força nas Decisões", desc: "Siga a orientação exata de Moisés para agir com confiança e fé, fortalecendo sua autoridade espiritual e clareza para tomar decisões importantes em todos os setores da sua vida." },
            { icon: <Lock />, title: "Fim das Barreiras", desc: "Vivencie a transformação real ao aplicar a instrução do elemento sagrado: conflitos se resolvem, portas se abrem e caminhos que antes pareciam impossíveis se tornam acessíveis." },
            { icon: <Star />, title: "Alinhamento 2026", desc: "Prepare-se para o próximo ciclo: sincronize sua energia com a frequência espiritual de 2026, garantindo que você entre no novo ano com clareza, proteção e oportunidade." },
            { icon: <Scroll />, title: "Sabedoria Ancestral", desc: "Acesse o conhecimento original de Moisés, transmitido por gerações de guardiões, e aplique na prática, permitindo que o sagrado transforme sua vida cotidiana." },
          ].map((benefit, i) => (
            <div key={i} className="group relative bg-neutral-900/50 p-6 border border-white/5 hover:border-sacred-gold/50 transition-colors duration-500">
              <div className="absolute inset-0 bg-sacred-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-sacred-gold mb-4 group-hover:scale-110 transition-transform duration-500 origin-left">
                {benefit.icon}
              </div>
              <h3 className="font-serif text-xl text-sacred-cream mb-2">{benefit.title}</h3>
              <p className="text-sm text-sacred-cream/60">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SECTION 7: AUTHORITY */}
      <Section className="bg-sacred-wine/10 border-y border-sacred-gold/10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 relative">
             <div className="absolute inset-0 bg-sacred-gold blur-[60px] opacity-20"></div>
             {/* Dignified Placeholder for Priest */}
             <div className="relative aspect-[3/4] overflow-hidden border-4 border-sacred-wine shadow-2xl rounded-sm">
                <img 
                  src="https://i.imgur.com/cGtOmWi.jpeg" 
                  alt="Padre João Batista" 
                  className="w-full h-full object-cover transition-all duration-1000"
                />
                <div className="absolute bottom-4 right-4 text-sacred-gold">
                   <Cross size={32} />
                </div>
             </div>
          </div>
          <div className="w-full md:w-1/2">
             <h3 className="text-sacred-gold uppercase tracking-widest text-sm font-bold mb-2">Autoridade Espiritual</h3>
             <h2 className="font-serif text-4xl mb-4">Padre João Batista</h2>
             <p className="text-xl font-serif italic text-sacred-cream/80 mb-6 border-l-2 border-sacred-gold pl-4">
               "Guardião Espiritual e Autoridade na Liberação do Elemento Sagrado"
             </p>
             <div className="space-y-4 text-lg font-light leading-relaxed">
               <p>
                 Não é apenas estudioso, mas guardião.
               </p>
               <p>
                 Após anos em isolamento estudando manuscritos sagrados, recebeu permissão espiritual e hierárquica para liberar estas cópias limitadas.
               </p>
               <p>
                 Garante pessoalmente a autenticidade energética de cada cópia semestral.
               </p>
             </div>
          </div>
        </div>
      </Section>

      {/* SECTION 9: URGENCY (NO GUARANTEE) */}
      <Section className="bg-[#2D0F0F] text-center" tornTop>
        <div className="max-w-2xl mx-auto border-2 border-red-900/50 p-8 md:p-12 bg-black/20 backdrop-blur-sm">
           <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-6 animate-pulse" />
           <h2 className="font-serif text-3xl md:text-4xl font-bold text-red-500 mb-6 uppercase">
             Atenção: Não há Garantia para 2026
           </h2>
           <p className="text-lg md:text-xl mb-6">
             A liberação pode ser encerrada a qualquer momento.
           </p>
           <p className="text-sacred-cream/70 leading-relaxed">
             Cada liberação depende de autorização espiritual. Se o ciclo se fechar hoje, esta pode ser a última chance por meses — ou anos.
           </p>
        </div>
      </Section>

      {/* SECTION 9.5: TWO PATHS (BEFORE PRICING) */}
      <Section className="bg-sacred-black border-t border-sacred-gold/10">
         <div className="max-w-5xl mx-auto">
            <h2 className="text-center font-serif text-2xl md:text-4xl mb-4 text-sacred-cream">
              Você está diante de uma <span className="text-white bg-red-900/50 px-2">bifurcação</span>
            </h2>
            <p className="text-center text-sacred-cream/60 mb-12">Duas escolhas. Apenas uma leva para o novo capítulo.</p>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
               {/* Path 1: Heavy */}
               <div className="bg-[#1a1a1a] border border-white/5 p-8 relative overflow-hidden group hover:bg-[#222] transition-colors">
                  <div className="absolute inset-0 bg-black/50 z-0"></div>
                  <div className="relative z-10 opacity-50 group-hover:opacity-70 transition-opacity">
                     <h3 className="font-serif text-xl mb-4 text-gray-400 uppercase tracking-widest">O Caminho do Peso</h3>
                     <p className="text-lg leading-relaxed mb-6 font-light">
                        Entrar em 2026 carregando as mesmas angústias, os mesmos bloqueios e a mesma sensação de estar preso.
                     </p>
                     <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2"><Cross size={14} className="rotate-45" /> Portas fechadas</li>
                        <li className="flex items-center gap-2"><Cross size={14} className="rotate-45" /> Ciclos repetitivos</li>
                        <li className="flex items-center gap-2"><Cross size={14} className="rotate-45" /> Insegurança espiritual</li>
                     </ul>
                  </div>
               </div>

               {/* Path 2: Light */}
               <div className="bg-sacred-wine/20 border-2 border-sacred-gold p-8 relative overflow-hidden group shadow-[0_0_30px_rgba(201,161,70,0.15)] transform md:-translate-y-4">
                  <div className="absolute top-0 right-0 p-4 opacity-20"><Sun size={64} className="text-sacred-gold" /></div>
                  <div className="relative z-10">
                     <h3 className="font-serif text-2xl mb-4 text-sacred-gold font-bold uppercase tracking-widest flex items-center gap-2">
                        O Caminho da Fé <ChevronRight className="animate-pulse" />
                     </h3>
                     <p className="text-lg leading-relaxed mb-6 text-sacred-cream">
                        Dar um passo de fé hoje, usar o Elemento Sagrado e entrar no novo ano com as águas abertas e proteção divina.
                     </p>
                     <ul className="space-y-3 text-base text-sacred-goldLight">
                        <li className="flex items-center gap-2"><BadgeCheck size={18} className="text-sacred-gold" /> Proteção Total</li>
                        <li className="flex items-center gap-2"><BadgeCheck size={18} className="text-sacred-gold" /> Clareza de Propósito</li>
                        <li className="flex items-center gap-2"><BadgeCheck size={18} className="text-sacred-gold" /> Benção do Guardião</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </Section>

      {/* SECTION 10: PRICING */}
      <Section id="pricing" className="bg-sacred-black">
        <div className="max-w-md mx-auto relative group">
           {/* Glow behind box */}
           <div className="absolute -inset-1 bg-gradient-to-b from-sacred-gold to-sacred-wine blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>
           
           <div className="relative bg-black border-2 border-sacred-gold p-8 md:p-12 text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sacred-black px-4">
                 <span className="text-sacred-gold uppercase tracking-widest text-xs font-bold border border-sacred-gold px-2 py-1">Valor Simbólico</span>
              </div>
              
              <h3 className="font-serif text-2xl mb-4 text-sacred-cream">Acesso à Revelação</h3>
              <p className="text-sm text-white/50 mb-8 px-4">
                Você receberá todos os materiais essenciais para aplicar o Elemento Sagrado de Moisés em sua vida:
              </p>
              
              <div className="flex justify-center items-end gap-2 mb-8">
                 <span className="text-5xl md:text-6xl font-serif font-bold text-sacred-gold text-shadow-gold">R$ 21,00</span>
              </div>
              
              <div className="space-y-3 mb-10 text-left text-sm md:text-base text-sacred-cream/80">
                 <div className="flex gap-3">
                    <span className="text-sacred-gold shrink-0">✓</span>
                    <span>
                       <strong className="text-sacred-gold">Guia Devocional Completo:</strong> Passo a passo para preparar, consagrar e usar o elemento sagrado.
                    </span>
                 </div>
                 <div className="flex gap-3">
                    <span className="text-sacred-gold shrink-0">✓</span>
                    <span>
                       <strong className="text-sacred-gold">Oração Guiada em Áudio:</strong> Para aplicar na virada do ano ou em momentos de maior necessidade, trazendo paz, proteção e abertura de caminhos.
                    </span>
                 </div>
                 <div className="flex gap-3">
                    <span className="text-sacred-gold shrink-0">✓</span>
                    <span>
                       <strong className="text-sacred-gold">Explicação Devocional do Mar Vermelho:</strong> Entenda espiritualmente o efeito da instrução e como Deus abre caminhos que pareciam impossíveis.
                    </span>
                 </div>
                 <div className="flex gap-3">
                    <span className="text-sacred-gold shrink-0">✓</span>
                    <span>
                       <strong className="text-sacred-gold">Benção do Guardião:</strong> Uma orientação espiritual oficial para garantir que o elemento seja aplicado corretamente e com proteção.
                    </span>
                 </div>
              </div>

              <GoldButton fullWidth onClick={() => window.location.href = 'https://lastlink.com/p/C997828E8/checkout-payment/'}>
                 <span>Quero receber minha cópia agora</span>
                 <span className="text-xs font-sans font-normal opacity-80 normal-case tracking-normal">Acesso Imediato • Compra Segura</span>
              </GoldButton>
              
              <div className="mt-4 text-xs text-center text-white/30">
                 Apenas para pessoas chamadas para receber.
              </div>
           </div>
        </div>
      </Section>

      {/* SECTION 10.5: SYMBOLISM (AFTER PRICING) */}
      <Section className="bg-sacred-black border-t border-sacred-gold/10 pt-0">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-center font-serif text-2xl md:text-3xl mb-12 text-sacred-cream">
              Por que <span className="text-sacred-gold">R$ 21,00?</span>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative">
               {/* Connecting Line for Mobile */}
               <div className="absolute inset-y-0 left-1/2 w-0.5 bg-sacred-gold/20 -translate-x-1/2 md:hidden"></div>
               {/* Connecting Line for Desktop */}
               <div className="absolute inset-x-0 top-1/2 h-0.5 bg-sacred-gold/20 -translate-y-1/2 hidden md:block"></div>

               {/* Box 14 */}
               <div className="relative z-10 bg-sacred-black p-4 rounded-full border border-sacred-gold/30 w-32 h-32 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(201,161,70,0.1)]">
                  <span className="text-3xl font-serif text-sacred-gold font-bold">14</span>
                  <p className="text-xs text-sacred-cream/70 mt-1 uppercase tracking-wide">Êxodo 14<br/>(A Travessia)</p>
               </div>

               {/* Plus Symbol */}
               <div className="relative z-10 bg-sacred-wine w-8 h-8 rounded-full flex items-center justify-center text-sacred-gold font-bold border border-sacred-gold">
                  +
               </div>

               {/* Box 7 */}
               <div className="relative z-10 bg-sacred-black p-4 rounded-full border border-sacred-gold/30 w-32 h-32 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(201,161,70,0.1)]">
                  <span className="text-3xl font-serif text-sacred-gold font-bold">7</span>
                  <p className="text-xs text-sacred-cream/70 mt-1 uppercase tracking-wide">Perfeição<br/>(Ciclo Divino)</p>
               </div>

               {/* Equals Symbol */}
               <div className="relative z-10 bg-sacred-wine w-8 h-8 rounded-full flex items-center justify-center text-sacred-gold font-bold border border-sacred-gold">
                  =
               </div>

               {/* Box 21 */}
               <div className="relative z-10 bg-sacred-gold/10 p-4 rounded-full border-2 border-sacred-gold w-40 h-40 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(201,161,70,0.3)] scale-110">
                  <span className="text-5xl font-serif text-sacred-gold font-black text-shadow-gold">21</span>
                  <p className="text-xs text-sacred-cream mt-1 font-bold uppercase tracking-widest">Travessia<br/>Perfeita</p>
               </div>
            </div>
            <p className="text-center mt-10 text-sm md:text-base opacity-70 max-w-xl mx-auto italic font-serif leading-relaxed">
               "Não é compra de milagre. É o valor simbólico sagrado para manter esta obra protegida e acessível."
            </p>
         </div>
      </Section>

      {/* NEW SECTION: BOTTOM TESTIMONIALS */}
      <Section className="bg-sacred-black">
        <div className="relative w-full max-w-[95vw] mx-auto text-left">
           <h2 className="font-serif text-2xl md:text-3xl text-center mb-10 text-sacred-cream leading-tight">
             Testemunhos de quem <br className="md:hidden" />
             <span className="text-sacred-gold">já acessou</span>
           </h2>

           <div className="flex overflow-x-auto gap-6 pb-8 px-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-sacred-gold/30 scrollbar-track-transparent">
              {bottomTestimonials.map((t) => (
                <div 
                   key={`bottom-${t.id}`} 
                   className="
                     snap-center flex-shrink-0 w-[300px] md:w-[360px] 
                     bg-[#F7F7EF] text-sacred-black 
                     border border-sacred-gold rounded-lg p-6 
                     shadow-[0_4px_20px_rgba(0,0,0,0.5)]
                     hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(201,161,70,0.3)]
                     transition-all duration-300 relative group
                   "
                >
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-sacred-gold/10 px-2 py-1 rounded-full border border-sacred-gold/30">
                     <BadgeCheck size={12} className="text-sacred-gold" />
                     <span className="text-[9px] font-bold uppercase tracking-wider text-sacred-wine">Verificado</span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                     <div className={`
                       w-10 h-10 rounded-full flex items-center justify-center 
                       text-white font-serif font-bold text-base
                       ${t.isFamous ? 'bg-sacred-wine ring-2 ring-sacred-gold' : 'bg-neutral-400'}
                     `}>
                       {t.author.charAt(0)}
                     </div>
                     <div>
                       <h4 className="font-serif font-bold text-xs leading-tight text-sacred-wine pr-16">{t.author}</h4>
                     </div>
                  </div>

                  <p className="text-xs md:text-sm leading-relaxed text-gray-800 font-body mb-4 line-clamp-4">
                    "{t.text}"
                  </p>

                  <div className="flex justify-between items-center border-t border-sacred-gold/20 pt-3 select-none">
                    <button 
                      onClick={() => toggleLike(t.id, 'bottom')}
                      className="flex items-center gap-1.5 transition-colors duration-200 group/like hover:bg-black/5 px-2 py-1 rounded cursor-pointer"
                    >
                      <ThumbsUp 
                        size={14} 
                        className={`transition-all duration-300 ${t.liked ? 'text-sacred-gold fill-sacred-gold scale-125' : 'text-sacred-wine/70'}`} 
                      />
                      <span className={`text-[10px] font-bold ${t.liked ? 'text-sacred-gold' : ''}`}>{t.likes}</span>
                    </button>
                    <span className="text-[10px] text-gray-500 font-medium">{t.timeAgo}</span>
                  </div>
                </div>
              ))}
           </div>
           
           <div className="flex justify-center gap-1 mt-2">
              <div className="w-16 h-1 bg-sacred-gold/30 rounded-full"></div>
              <div className="w-2 h-1 bg-sacred-gold rounded-full animate-pulse"></div>
              <div className="w-2 h-1 bg-sacred-gold/30 rounded-full"></div>
           </div>
        </div>
      </Section>

      {/* NEW SECTION: FAQ */}
      <Section className="bg-sacred-wine/5">
        <div className="max-w-3xl mx-auto">
           <div className="flex items-center justify-center gap-2 mb-10 text-sacred-gold opacity-80">
              <HelpCircle className="w-6 h-6" />
              <h2 className="font-serif text-2xl md:text-3xl text-center text-sacred-cream">
                Perguntas Frequentes
              </h2>
           </div>

           <div className="space-y-4">
             {faqs.map((faq, index) => (
               <div key={index} className="bg-sacred-black/50 border border-sacred-gold/20 p-6 rounded relative overflow-hidden group hover:border-sacred-gold/40 transition-colors">
                 <div className="absolute top-0 left-0 w-1 h-full bg-sacred-gold/30 group-hover:bg-sacred-gold transition-colors"></div>
                 <h3 className="font-serif text-lg text-sacred-gold mb-3 flex items-start gap-3">
                   <span className="text-sm opacity-50 mt-1">{index + 1}.</span>
                   {faq.q}
                 </h3>
                 <p className="text-sacred-cream/80 text-sm md:text-base leading-relaxed pl-7">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </Section>

      {/* SECTION 11: FINAL CTA */}
      <Section className="text-center pb-24 md:pb-32">
        <p className="text-red-500 font-bold uppercase tracking-widest mb-4 animate-pulse">
           ⚠️ Últimas Unidades Disponíveis
        </p>
        <h2 className="font-serif text-3xl md:text-5xl mb-8">
           Não deixe seu 2026 trancado.
        </h2>
        <div className="max-w-md mx-auto">
           <GoldButton fullWidth onClick={scrollToPricing}>
              <span className="flex items-center gap-2">
                 GARANTIR MINHA CÓPIA <ChevronRight size={20} />
              </span>
           </GoldButton>
           
           <div className="mt-6 flex justify-center items-center gap-2 opacity-60">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-sm">Liberação Limitada — {copiesRemaining} cópias restantes</span>
           </div>
        </div>
      </Section>
      
      {/* Footer */}
      <footer className="bg-black text-white/20 py-12 text-center text-xs border-t border-white/5">
         <p>Copyright © 2025. Todos os direitos reservados.</p>
         <p className="mt-2">A Revelação Perdida de Moisés</p>
      </footer>

    </div>
  );
};

export default App;