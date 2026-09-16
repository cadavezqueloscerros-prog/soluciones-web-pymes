import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, MessageCircle, Smartphone, Palette, LayoutGrid, Stethoscope, MapPin, Wrench, ShoppingBag, Check, Clock, ShieldCheck, Sparkles, Facebook, Instagram, Mail, ArrowRight, PawPrint, Coffee, Globe } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Reveal from '@/components/Reveal';

// Datos de contacto provisionales — sustituir antes de publicar.
const WHATSAPP_NUMBER = '525633958806';
const WHATSAPP_DISPLAY = '+52 56 3395 8806';
const EMAIL = 'hola@solucioneswebpymes.mx';
const waLink = message => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
const NAV_ITEMS = [{
  label: 'Inicio',
  href: '#inicio'
}, {
  label: 'Servicios',
  href: '#servicios'
}, {
  label: 'Precios',
  href: '#precios'
}, {
  label: 'Proceso',
  href: '#proceso'
}, {
  label: 'Contacto',
  href: '#contacto'
}];
const HERO_IMG = 'https://images.hostinger.com/3b45310a-412e-4f67-a726-b7955bc6148a.png';
const PHONE_IMG = 'https://images.hostinger.com/8c9389fc-782a-4754-9cb5-e6f22cd5d669.png';
const STUDIO_IMG = 'https://images.hostinger.com/8d27609a-9d12-4ac8-bad1-4326db368b6a.png';

/* ---------- Preferencia de movimiento (pausa accesible + reduced-motion) ---------- */
function useMotionPreference() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(() => !prefersReduced);
  useEffect(() => {
    const root = document.documentElement;
    if (enabled) root.classList.remove('motion-paused');
    else root.classList.add('motion-paused');
    return () => root.classList.remove('motion-paused');
  }, [enabled]);
  return { enabled, setEnabled, toggle: () => setEnabled(v => !v) };
}

/* ---------- Barra de progreso de lectura ---------- */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[55] h-[3px] bg-transparent">
      <div
        className="h-full bg-mint transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function Header({ motionPref }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-navy/5 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:h-[72px] sm:px-8">
        <a href="#inicio" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-deepblue font-display text-sm font-extrabold text-mint">SW</span>
          <span className="font-display text-[15px] font-bold leading-tight text-deepblue">
            Soluciones Web
            <span className="block text-[11px] font-semibold tracking-wide text-slate">Pymes y Más · MX</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map(item => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-slate transition-colors hover:text-petrol">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href="/registro" className="hidden h-11 items-center rounded-xl border border-petrol px-4 text-sm font-semibold text-petrol transition-all hover:bg-petrol hover:text-white active:scale-[0.98] sm:inline-flex">
            Registrarse
          </a>
          <a
            href={waLink('Hola, quiero solicitar una cotización para mi página web.')}
            target="_blank"
            rel="noreferrer"
            className="hidden h-11 items-center gap-2 rounded-xl bg-petrol px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-deepblue active:scale-[0.98] lg:inline-flex"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
            Solicitar cotización
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-navy/10 text-deepblue lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-navy/5 bg-white px-5 pb-6 pt-3 lg:hidden">
          <nav className="flex flex-col" aria-label="Navegación móvil">
            {NAV_ITEMS.map(item => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex min-h-[48px] items-center border-b border-navy/5 text-base font-medium text-deepblue">
                {item.label}
              </a>
            ))}
            <a href="/registro" onClick={() => setOpen(false)} className="flex min-h-[48px] items-center border-b border-navy/5 text-base font-semibold text-petrol">
              Registrarse
            </a>
          </nav>
          <a
            href={waLink('Hola, quiero solicitar una cotización para mi página web.')}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex h-12 items-center justify-center gap-2 rounded-xl bg-petrol text-base font-semibold text-white active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
            Solicitar cotización
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------- Ejemplos ilustrativos para la maqueta ---------- */
const EXAMPLES = [
  {
    id: 'veterinaria',
    label: 'Veterinaria',
    icon: PawPrint,
    brand: 'Huella',
    tagline: 'Cuidado animal',
    accent: '#b7f5ce',
    accentSoft: 'rgba(183,245,206,0.18)',
    ink: '#0b2a26',
    surface: '#0f332b',
    hero: 'Cuidamos a quien te cuida',
    services: ['Consulta general', 'Vacunación', 'Estética canina', 'Cirugía'],
  },
  {
    id: 'estetica',
    label: 'Estética',
    icon: Sparkles,
    brand: 'Aura',
    tagline: 'Estudio de belleza',
    accent: '#d8b4fe',
    accentSoft: 'rgba(216,180,254,0.18)',
    ink: '#2a1546',
    surface: '#34205a',
    hero: 'Tu belleza, nuestro estudio',
    services: ['Manicura', 'Facial', 'Cejas y pestañas', 'Coloración'],
  },
  {
    id: 'negocio',
    label: 'Negocio local',
    icon: Coffee,
    brand: 'Origen',
    tagline: 'Café de barrio',
    accent: '#e7d8b5',
    accentSoft: 'rgba(231,216,181,0.18)',
    ink: '#2a2012',
    surface: '#3a2c1a',
    hero: 'El café de tu barrio',
    services: ['Café de especialidad', 'Panadería', 'Desayunos', 'Para llevar'],
  },
];

function BrowserMockup({ motionPref }) {
  const [active, setActive] = useState(0);
  const ex = EXAMPLES[active];
  const reduce = useReducedMotion();
  const animate = motionPref.enabled && !reduce;

  return (
    <div className="relative">
      {/* Halos difuminados de fondo */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-10 -z-10 overflow-hidden">
        <div className="absolute left-0 top-6 h-56 w-56 rounded-full bg-mint/20 blur-3xl" style={animate ? { animation: 'halo-drift 18s ease-in-out infinite' } : undefined} />
        <div className="absolute right-4 bottom-0 h-64 w-64 rounded-full bg-petrol/30 blur-3xl" style={animate ? { animation: 'halo-drift 22s ease-in-out infinite reverse' } : undefined} />
      </div>

      {/* Figuras geométricas giratorias */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-6 -top-8 -z-10">
        <div className="h-24 w-24 rounded-full border-2 border-mint/40" style={animate ? { animation: 'spin-slow 24s linear infinite' } : undefined} />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -left-8 bottom-10 -z-10">
        <div className="h-16 w-16 rounded-2xl border-2 border-mint/30 rotate-12" style={animate ? { animation: 'spin-slow 30s linear infinite reverse' } : undefined} />
      </div>

      {/* Selectores */}
      <div role="group" aria-label="Ejemplos ilustrativos" className="mb-4 flex flex-wrap gap-2">
        {EXAMPLES.map((e, i) => {
          const Icon = e.icon;
          const isOn = i === active;
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isOn}
              className={`inline-flex h-10 items-center gap-2 rounded-xl border px-3.5 text-xs font-semibold transition-all duration-300 active:scale-[0.98] ${
                isOn ? 'border-mint bg-mint text-deepblue' : 'border-white/20 bg-white/5 text-white/80 hover:border-mint/60 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              {e.label}
            </button>
          );
        })}
      </div>

      {/* Marco del navegador con profundidad 3D */}
      <div
        className="relative rounded-2xl bg-white p-2 shadow-2xl shadow-deepblue/50 [transform:perspective(1200px)_rotateY(-6deg)_rotateX(2deg)] sm:[transform:perspective(1400px)_rotateY(-8deg)_rotateX(2deg)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="overflow-hidden rounded-xl border border-navy/10">
          {/* Barra del navegador */}
          <div className="flex items-center gap-2 border-b border-navy/10 bg-cream px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <div className="ml-3 flex h-7 flex-1 items-center gap-2 rounded-md bg-white px-3 text-[11px] text-slate">
              <Globe className="h-3.5 w-3.5" strokeWidth={2} />
              {ex.brand.toLowerCase()}.com.mx
            </div>
          </div>

          {/* Contenido del sitio ilustrativo */}
          <AnimatePresence mode="wait">
            <motion.div
              key={ex.id}
              initial={animate ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={animate ? { opacity: 0, y: -8 } : undefined}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: ex.ink, color: '#fff' }}
            >
              {/* Mini header del sitio */}
              <div className="flex items-center justify-between px-5 py-4" style={{ background: ex.surface }}>
                <span className="font-display text-sm font-extrabold" style={{ color: ex.accent }}>{ex.brand}</span>
                <span className="text-[10px] uppercase tracking-widest text-white/60">{ex.tagline}</span>
              </div>
              {/* Mini hero */}
              <div className="px-5 py-7">
                <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: ex.accent }}>{ex.tagline}</p>
                <h3 className="mt-2 font-display text-xl font-extrabold leading-tight text-white">{ex.hero}</h3>
                <div className="mt-4 flex gap-2">
                  <span className="rounded-lg px-3 py-1.5 text-[11px] font-bold" style={{ background: ex.accent, color: ex.ink }}>Agendar cita</span>
                  <span className="rounded-lg border border-white/20 px-3 py-1.5 text-[11px] font-semibold text-white/80">Ver servicios</span>
                </div>
              </div>
              {/* Mini servicios */}
              <div className="grid grid-cols-2 gap-2 px-5 pb-6">
                {ex.services.map(s => (
                  <div key={s} className="rounded-lg px-3 py-2.5 text-[11px] font-medium text-white/85" style={{ background: ex.accentSoft }}>
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Tarjetas flotantes */}
      <div
        className="absolute -left-3 top-24 z-10 rounded-xl bg-white px-3.5 py-2.5 shadow-xl shadow-deepblue/30 sm:-left-6"
        style={animate ? { animation: 'float-y 6s ease-in-out infinite' } : undefined}
      >
        <p className="font-display text-[12px] font-bold text-deepblue">Diseño a tu medida</p>
        <p className="text-[10px] text-slate">Color, tipografía y secciones</p>
      </div>
      <div
        className="absolute -right-3 bottom-16 z-10 rounded-xl bg-mint px-3.5 py-2.5 shadow-xl shadow-deepblue/30 sm:-right-5"
        style={animate ? { animation: 'float-y 7s ease-in-out infinite 0.6s' } : undefined}
      >
        <p className="font-display text-[12px] font-bold text-deepblue">Se adapta a ti</p>
        <p className="text-[10px] text-deepblue/70">Cambia con un toque</p>
      </div>

      {/* Aviso de ejemplo ilustrativo */}
      <p className="mt-4 text-center text-[11px] text-white/50">
        Marcas ficticias con fines ilustrativos. No son clientes reales.
      </p>
    </div>
  );
}

function Hero({ motionPref }) {
  const reduce = useReducedMotion();
  const animate = motionPref.enabled && !reduce;
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
  const item = {
    hidden: animate ? { opacity: 0, y: 24 } : false,
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };
  return (
    <section id="inicio" className="relative overflow-hidden bg-deepblue">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-mint/10 blur-3xl" style={animate ? { animation: 'halo-drift 20s ease-in-out infinite' } : undefined} />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-petrol/20 blur-3xl" style={animate ? { animation: 'halo-drift 26s ease-in-out infinite reverse' } : undefined} />
      </div>
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-28 lg:pt-24">
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-6">
          <motion.p variants={item} className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-mint">
            <Sparkles className="h-3.5 w-3.5" />
            Páginas web para negocios locales
          </motion.p>
          <motion.h1 variants={item} className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            Tu negocio.{' '}
            <span className="text-mint">Su mejor versión digital.</span>
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Creamos páginas web profesionales para que tus clientes conozcan tu
            negocio, confíen en él y puedan contactarte fácilmente. Reunimos tus
            servicios, horarios, ubicación, redes sociales y WhatsApp en un solo
            lugar.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink('Hola, quiero mi página web. ¿Me pueden dar más información?')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-mint px-8 text-base font-bold text-deepblue shadow-lg shadow-mint/25 transition-all hover:brightness-105 active:scale-[0.98]"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
              Diseñemos tu página
            </a>
            <a
              href="#precios"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border-2 border-white/20 px-8 text-base font-semibold text-white transition-all hover:border-mint hover:text-mint active:scale-[0.98]"
            >
              Explorar precios
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
          <motion.p variants={item} className="mt-6 flex items-center gap-2 text-sm text-white/60">
            <ShieldCheck className="h-4 w-4 shrink-0 text-mint" />
            Sin contratos forzosos. Tus cuentas y tu dominio siempre son tuyos.
          </motion.p>
        </motion.div>

        <motion.div
          initial={animate ? { opacity: 0, scale: 0.96, y: 20 } : false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <BrowserMockup motionPref={motionPref} />
        </motion.div>
      </div>
    </section>
  );
}

const BENEFITS = [{
  icon: Palette,
  title: 'Diseño profesional',
  text: 'Una página clara y moderna que transmite confianza desde el primer vistazo y representa bien a tu negocio.'
}, {
  icon: MessageCircle,
  title: 'Contacto directo',
  text: 'Botones de WhatsApp, mapa, horarios y redes sociales siempre visibles para que te contacten sin fricción.'
}, {
  icon: Smartphone,
  title: 'Pensada para celular',
  text: 'La mayoría de tus clientes te buscará desde su teléfono. Tu página se verá y funcionará perfecto ahí.'
}];
function Trust() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-petrol">Por qué con nosotros</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-deepblue sm:text-4xl">
            Una página que trabaja para ti, sin complicaciones
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.1}>
              <div className="rounded-2xl border border-navy/8 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/10">
                <span className="font-display text-sm font-bold text-petrol">0{i + 1}</span>
                <b.icon className="mt-4 h-8 w-8 text-petrol" strokeWidth={1.8} />
                <h3 className="mt-4 font-display text-xl font-bold text-deepblue">{b.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [{
  icon: LayoutGrid,
  title: 'Sitio web informativo',
  text: 'Una página clara con tus servicios, horarios, ubicación, redes sociales y botón de WhatsApp. Todo lo que tu cliente necesita para encontrarte y contactarte.'
}, {
  icon: Stethoscope,
  title: 'Páginas para veterinarias y estéticas',
  text: 'Secciones pensadas para tu giro: catálogo de servicios, perfiles del equipo, galería, preguntas frecuentes y contacto rápido para agendar.'
}, {
  icon: MapPin,
  title: 'Integración de WhatsApp, mapa y redes',
  text: 'Conectamos tu página con WhatsApp, Google Maps y tus redes sociales para que todo apunte a un mismo lugar: tu negocio.'
}, {
  icon: Wrench,
  title: 'Mantenimiento',
  text: 'Nos encargamos de actualizaciones, respaldos y cambios de contenido para que tu página siempre esté al día y funcionando.'
}, {
  icon: ShoppingBag,
  title: 'Tiendas en línea',
  text: 'Como servicio adicional, preparamos una propuesta independiente según tu catálogo y la forma en la que quieres vender.',
  badge: 'Propuesta independiente'
}];
function Services() {
  return (
    <section id="servicios" className="bg-cream">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-petrol">Servicios</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-deepblue sm:text-4xl">
              Todo lo que tu negocio necesita para estar en línea
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate">
              Nos adaptamos al tamaño y al ritmo de tu negocio. Empiezas con lo
              esencial y creces cuando lo necesites.
            </p>
            <a href={waLink('Hola, me interesa uno de sus servicios. ¿Me pueden asesorar?')} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-petrol transition-colors hover:text-deepblue">
              Platícanos tu idea
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-navy/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/10">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mint/30">
                    <s.icon className="h-6 w-6 text-petrol" strokeWidth={1.8} />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-lg font-bold text-deepblue">{s.title}</h3>
                      {s.badge && <span className="rounded-full bg-mint/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-petrol">{s.badge}</span>}
                    </div>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PLANS = [{
  name: 'Sitio de contacto',
  price: '$3,900',
  unit: 'MXN · pago único',
  description: 'Ideal para negocios que quieren ser encontrados y contactados fácilmente.',
  features: ['Hasta 5 secciones informativas', 'Botón de WhatsApp y mapa de ubicación', 'Enlaces a tus redes sociales', 'SEO básico (títulos y descripciones)', 'Entrega típica de 2 a 3 semanas'],
  cta: 'Quiero este sitio',
  highlight: true,
  tag: 'El más pedido'
}, {
  name: 'Tienda en línea',
  price: '$5,900',
  unit: 'MXN · desde',
  description: 'Para vender tus productos en línea, con una propuesta ajustada a tu catálogo.',
  features: ['Catálogo inicial de productos', 'Configuración guiada de la tienda', 'Capacitación para administrarla', 'Alcance personalizado por escrito'],
  cta: 'Cotizar mi tienda',
  note: 'Los pagos en línea, la plataforma (por ejemplo Shopify) y las aplicaciones se cotizan por separado.'
}, {
  name: 'Mantenimiento Cuidado',
  price: '$190',
  unit: 'MXN / mes',
  description: 'Lo esencial para que tu página siga funcionando sin preocuparte.',
  features: ['Actualizaciones técnicas menores', 'Respaldo mensual de tu sitio', 'Soporte por correo'],
  cta: 'Elegir Cuidado'
}, {
  name: 'Mantenimiento Activo',
  price: '$490',
  unit: 'MXN / mes',
  description: 'Para negocios que actualizan su contenido con frecuencia.',
  features: ['Cambios de contenido cada mes', 'Monitoreo y respaldos frecuentes', 'Soporte prioritario por WhatsApp'],
  cta: 'Elegir Activo'
}];
function Pricing() {
  return (
    <section id="precios" className="bg-deepblue">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-mint">Precios claros</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Sin sorpresas ni letras chiquitas
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
            Sabes exactamente qué pagas y qué recibes. El dominio, el correo y las
            plataformas externas se contratan por separado, siempre a tu nombre.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08} className="h-full">
              <div className={`relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-lg shadow-deepblue/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${plan.highlight ? 'ring-2 ring-mint' : ''}`}>
                {plan.tag && <span className="absolute -top-3 right-5 rotate-2 rounded-lg bg-mint px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-deepblue shadow-md">{plan.tag}</span>}
                <h3 className="font-display text-lg font-bold text-deepblue">{plan.name}</h3>
                <p className="mt-1 min-h-[40px] text-[13px] leading-snug text-slate">{plan.description}</p>
                <p className="mt-4">
                  <span className="font-display text-4xl font-extrabold tracking-tight text-deepblue">{plan.price}</span>
                  <span className="ml-1.5 text-xs font-semibold uppercase tracking-wide text-slate">{plan.unit}</span>
                </p>
                <ul className="mt-5 flex-1 space-y-2.5 border-t border-navy/8 pt-5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-slate">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-petrol" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.note && <p className="mt-4 rounded-lg bg-cream p-3 text-[12px] leading-snug text-slate">{plan.note}</p>}
                <a
                  href={waLink(`Hola, me interesa el plan "${plan.name}". ¿Me pueden dar más información?`)}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-6 flex h-12 items-center justify-center rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${plan.highlight ? 'bg-petrol text-white hover:bg-deepblue' : 'border-2 border-navy/12 text-deepblue hover:border-petrol hover:text-petrol'}`}
                >
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const INCLUDED = [{
  title: 'Alcance definido por escrito',
  text: 'Antes de empezar acordamos secciones, contenido y tiempos. Sin sorpresas.'
}, {
  title: 'Hasta 5 secciones',
  text: 'Inicio, Servicios, Nosotros, Galería y Contacto, o las que tu negocio necesite.'
}, {
  title: 'Imágenes y textos optimizados',
  text: 'Preparamos tus fotos y textos para que carguen rápido y se lean bien.'
}, {
  title: 'Ubicación y contacto visibles',
  text: 'Mapa de Google, botón de WhatsApp y enlaces a tus redes sociales.'
}, {
  title: 'SEO básico',
  text: 'Títulos, descripciones y estructura correcta para que Google entienda tu página.'
}, {
  title: '2 rondas de ajustes incluidas',
  text: 'Revisamos juntos el diseño y afinamos detalles antes de publicar.'
}];
function Includes() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-petrol">Qué incluye</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-deepblue sm:text-4xl">
              Tu página completa, lista para recibir clientes
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate">
              Cada proyecto incluye lo necesario para que tu negocio se vea
              profesional y sea fácil de contactar desde el primer día.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-cream p-4">
              <Clock className="h-6 w-6 shrink-0 text-petrol" strokeWidth={1.8} />
              <p className="text-sm leading-snug text-deepblue"><span className="font-semibold">Tiempo de entrega típico:</span> de 2 a 5 dias una vez que recibimos tu contenido.</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <img src={PHONE_IMG} alt="Persona viendo la página de un negocio local con mapa y botones de contacto en su celular" className="mt-8 hidden aspect-[3/2] w-full rounded-3xl object-cover shadow-lg shadow-navy/10 lg:block" loading="lazy" />
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {INCLUDED.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="flex gap-3.5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint/40">
                    <Check className="h-4 w-4 text-petrol" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-bold text-deepblue">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [{
  title: 'Conversación inicial',
  text: 'Platicamos por WhatsApp sobre tu negocio, tus servicios y lo que quieres lograr.'
}, {
  title: 'Definición de contenido',
  text: 'Reunimos textos, fotos, horarios y datos de contacto. Te guiamos si no tienes material.'
}, {
  title: 'Diseño',
  text: 'Creamos la propuesta visual de tu página, cuidando que se vea perfecta en celular.'
}, {
  title: 'Revisión',
  text: 'La revisas con calma y hacemos los ajustes incluidos en tu paquete.'
}, {
  title: 'Publicación',
  text: 'Ponemos tu página en línea con tu dominio y verificamos que todo funcione.'
}, {
  title: 'Mantenimiento opcional',
  text: 'Si lo deseas, nos encargamos de actualizaciones y cambios mes a mes.'
}];
function Process() {
  return (
    <section id="proceso" className="bg-cream">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-petrol">Proceso</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-deepblue sm:text-4xl">
            Así de sencillo es trabajar con nosotros
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate">
            Te acompañamos en cada paso, en lenguaje claro y sin tecnicismos.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.07}>
              <div className="relative rounded-2xl border border-navy/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/10">
                <span className="font-display text-5xl font-extrabold text-mint">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-deepblue">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [{
  q: '¿El dominio y el correo están incluidos en el precio?',
  a: 'No. El dominio, el correo profesional y las plataformas externas se pagan por separado. Te ayudamos a contratarlos y siempre quedan registrados a tu nombre, para que tengas control total sobre ellos.'
}, {
  q: '¿Qué necesito para vender en línea con pagos?',
  a: 'Una tienda con pagos en línea requiere una plataforma (por ejemplo Shopify), pasarelas de pago y posiblemente aplicaciones adicionales, que se pagan por separado. Por eso la tienda con pagos se maneja con una cotización independiente, ajustada a tu catálogo y a la forma en la que quieres vender.'
}, {
  q: '¿Cuánto tiempo tarda mi página?',
  a: 'El tiempo de entrega típico es de 2 a 3 semanas una vez que recibimos tu contenido (textos, fotos y datos de contacto). Si necesitas ayuda para preparar tu material, te guiamos en el proceso.'
}, {
  q: '¿Puedo pedir cambios después de la entrega?',
  a: 'Tu proyecto incluye 2 rondas de ajustes antes de publicar. Después, puedes contratar uno de los planes de mantenimiento para cambios de contenido, actualizaciones y soporte continuo.'
}, {
  q: '¿Garantizan ventas o aparecer primero en Google?',
  a: 'No prometemos ventas ni posicionamientos garantizados: ningún proveedor serio puede hacerlo. Lo que sí hacemos es una página profesional, rápida y con SEO básico bien implementado, para que tus clientes te encuentren y te contacten fácilmente.'
}];
function Faq() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-petrol">Preguntas frecuentes</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-deepblue sm:text-4xl">
              Respuestas claras, sin letras chiquitas
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate">
              ¿Tienes otra duda? Escríbenos por WhatsApp y te respondemos con
              gusto.
            </p>
            <a href={waLink('Hola, tengo una pregunta sobre sus servicios.')} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-petrol transition-colors hover:text-deepblue">
              Hacer una pregunta
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`} className="border-b border-navy/10">
                  <AccordionTrigger className="py-5 text-left font-display text-[15px] font-bold text-deepblue hover:text-petrol hover:no-underline sm:text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[15px] leading-relaxed text-slate">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    mensaje: '',
    // Honeypot anti-spam: campo oculto para humanos, visible para bots.
    website: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const validate = () => {
    const e = {};
    const nombre = form.nombre.trim();
    const telefono = form.telefono.trim().replace(/[\s\-()]/g, '');
    const correo = form.correo.trim();
    const mensaje = form.mensaje.trim();
    if (nombre.length < 2) e.nombre = 'Escribe tu nombre completo.';
    if (!/^\d{10}$/.test(telefono)) e.telefono = 'Escribe un teléfono de 10 dígitos.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) e.correo = 'Escribe un correo electrónico válido.';
    if (mensaje.length < 10) e.mensaje = 'Cuéntanos un poco más sobre lo que necesitas.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (form.website.trim() !== '') return;
    if (!validate()) return;
    setSubmitting(true);
    const text = `Hola, soy ${form.nombre.trim()}.
Teléfono: ${form.telefono.trim()}
Correo: ${form.correo.trim()}
Mensaje: ${form.mensaje.trim()}`;
    window.open(waLink(text), '_blank', 'noopener');
    setSubmitting(false);
  };
  const update = field => e => setForm({ ...form, [field]: e.target.value });
  const inputClass = 'h-12 w-full rounded-xl border border-navy/15 bg-white px-4 text-[15px] text-deepblue placeholder:text-slate/60 outline-none transition-colors focus:border-petrol focus:ring-2 focus:ring-petrol/20';
  const inputErrClass = 'h-12 w-full rounded-xl border border-red-400 bg-white px-4 text-[15px] text-deepblue placeholder:text-slate/60 outline-none transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-200';
  const errClass = 'mt-1.5 text-xs font-medium text-red-600';
  return (
    <section id="contacto" className="relative overflow-hidden bg-deepblue">
      <img src={STUDIO_IMG} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.08]" loading="lazy" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-mint">Contacto</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Haz que tus clientes te encuentren.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">
            Cuéntanos sobre tu negocio y te respondemos con una propuesta clara,
            sin compromiso. Normalmente contestamos el mismo día.
          </p>
          <a href={waLink('Hola, quiero una cotización para la página web de mi negocio.')} target="_blank" rel="noreferrer" className="mt-8 inline-flex h-14 items-center gap-3 rounded-xl bg-whatsapp px-8 text-base font-bold text-deepblue shadow-lg shadow-whatsapp/30 transition-all hover:brightness-105 active:scale-[0.98]">
            <MessageCircle className="h-6 w-6" strokeWidth={2.2} />
            Escribir por WhatsApp
          </a>
          <p className="mt-4 text-sm text-white/60">{WHATSAPP_DISPLAY} · Ciudad de México</p>
        </Reveal>

        <Reveal delay={0.15}>
          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-2xl shadow-deepblue/50 sm:p-8">
            <h3 className="font-display text-xl font-bold text-deepblue">Cuéntanos de tu proyecto</h3>
            <p className="mt-1 text-sm text-slate">Al enviar, se abrirá WhatsApp con tu mensaje listo.</p>
            <div className="mt-6 space-y-4">
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
                <label htmlFor="website">No rellenar este campo</label>
                <input id="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} />
              </div>
              <div>
                <label htmlFor="nombre" className="mb-2 block text-sm font-semibold text-deepblue">Tu nombre</label>
                <input id="nombre" type="text" required placeholder="Ej. María López" value={form.nombre} onChange={update('nombre')} aria-invalid={!!errors.nombre} aria-describedby={errors.nombre ? 'err-nombre' : undefined} className={errors.nombre ? inputErrClass : inputClass} />
                {errors.nombre && <p id="err-nombre" className={errClass}>{errors.nombre}</p>}
              </div>
              <div>
                <label htmlFor="telefono" className="mb-2 block text-sm font-semibold text-deepblue">Teléfono</label>
                <input id="telefono" type="tel" required placeholder="Ej. 55 1234 5678" value={form.telefono} onChange={update('telefono')} aria-invalid={!!errors.telefono} aria-describedby={errors.telefono ? 'err-telefono' : undefined} className={errors.telefono ? inputErrClass : inputClass} />
                {errors.telefono && <p id="err-telefono" className={errClass}>{errors.telefono}</p>}
              </div>
              <div>
                <label htmlFor="correo" className="mb-2 block text-sm font-semibold text-deepblue">Correo electrónico</label>
                <input id="correo" type="email" required placeholder="tucorreo@ejemplo.com" value={form.correo} onChange={update('correo')} aria-invalid={!!errors.correo} aria-describedby={errors.correo ? 'err-correo' : undefined} className={errors.correo ? inputErrClass : inputClass} />
                {errors.correo && <p id="err-correo" className={errClass}>{errors.correo}</p>}
              </div>
              <div>
                <label htmlFor="mensaje" className="mb-2 block text-sm font-semibold text-deepblue">Mensaje</label>
                <textarea id="mensaje" required rows={4} placeholder="Ej. Quiero una página para mostrar mis servicios, horarios y recibir mensajes por WhatsApp." value={form.mensaje} onChange={update('mensaje')} aria-invalid={!!errors.mensaje} aria-describedby={errors.mensaje ? 'err-mensaje' : undefined} className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-deepblue placeholder:text-slate/60 outline-none transition-colors focus:ring-2 ${errors.mensaje ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-navy/15 focus:border-petrol focus:ring-petrol/20'}`} />
                {errors.mensaje && <p id="err-mensaje" className={errClass}>{errors.mensaje}</p>}
              </div>
              <button type="submit" disabled={submitting} className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-petrol text-base font-semibold text-white transition-all hover:bg-deepblue active:scale-[0.98] disabled:opacity-60">
                <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
                Enviar por WhatsApp
              </button>
              <p className="text-xs leading-relaxed text-slate">Al enviar se abre WhatsApp con tu mensaje. Tus datos se usan solo para responder tu solicitud, conforme a nuestro <a href="/aviso-privacidad" className="font-semibold text-petrol hover:underline">Aviso de Privacidad</a>.</p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-deepblue text-white/70">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 font-display text-sm font-extrabold text-mint">SW</span>
            <span className="font-display text-[15px] font-bold text-white">Soluciones Web Pymes y Más</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">Páginas web profesionales para pequeñas empresas, veterinarias, estéticas, restaurantes&nbsp; y negocios locales de México.</p>
        </div>
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={waLink('Hola, quiero más información sobre sus servicios.')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-mint">
                <MessageCircle className="h-4 w-4" />
                {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 transition-colors hover:text-mint">
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Ciudad de México, México
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Síguenos</h3>
          <div className="mt-4 flex gap-3">
            {[{ icon: Facebook, label: 'Facebook' }, { icon: Instagram, label: 'Instagram' }].map(s => (
              <a key={s.label} href="#" aria-label={s.label} className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-colors hover:bg-mint hover:text-deepblue">
                <s.icon className="h-5 w-5" strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Legal</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/aviso-privacidad" className="transition-colors hover:text-mint">Aviso de privacidad</Link></li>
            <li><Link to="/terminos-servicio" className="transition-colors hover:text-mint">Términos y condiciones</Link></li>
            <li><a href="/panel" className="transition-colors hover:text-mint">Mi panel · Agendar cita</a></li>
            <li><a href="/login" className="transition-colors hover:text-mint">Acceso administrador</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 Soluciones Web Pymes y Más. Todos los derechos reservados.</p>
          <p>Hecho con dedicación en la Ciudad de México.</p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  return (
    <a href={waLink('Hola, quiero una cotización para mi página web.')} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-deepblue shadow-xl shadow-whatsapp/40 transition-transform hover:scale-105 active:scale-95">
      <MessageCircle className="h-7 w-7" strokeWidth={2} />
    </a>
  );
}

export default function HomePage() {
  const motionPref = useMotionPreference();
  return (
    <>
      <Helmet>
        <title>Soluciones Web Pymes y Más | Páginas web profesionales en CDMX</title>
        <meta name="description" content="Creamos páginas web profesionales para pequeñas empresas, veterinarias, estéticas y negocios locales de la Ciudad de México. Servicios, horarios, ubicación, redes y WhatsApp en un solo lugar. Solicita tu cotización." />
      </Helmet>
      <ReadingProgress />
      <Header motionPref={motionPref} />
      <main>
        <Hero motionPref={motionPref} />
        <Trust />
        <Services />
        <Pricing />
        <Includes />
        <Process />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
