import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/panel');
    } catch (err) {
      if (err?.status === 400) {
        setError('Correo o contraseña incorrectos.');
      } else {
        setError('No pudimos iniciar sesión. Inténtalo más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'h-12 w-full rounded-xl border border-navy/15 bg-white px-4 text-[15px] text-navy placeholder:text-slate/60 outline-none transition-colors focus:border-petrol focus:ring-2 focus:ring-petrol/20';

  return (
    <>
      <Helmet>
        <title>Iniciar sesión | Soluciones Web Pymes y Más</title>
        <meta
          name="description"
          content="Inicia sesión en tu cuenta de Soluciones Web Pymes y Más."
        />
      </Helmet>
      <section className="min-h-[100dvh] bg-cream">
        <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col justify-center px-5 py-12 sm:px-8">
          <Link to="/" className="mb-8 flex items-center gap-2.5 self-start">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy font-display text-sm font-extrabold text-turquoise">
              SW
            </span>
            <span className="font-display text-[15px] font-bold leading-tight text-navy">
              Soluciones Web
              <span className="block text-[11px] font-semibold tracking-wide text-slate">
                Pymes y Más · MX
              </span>
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-white p-6 shadow-xl shadow-navy/10 sm:p-8"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise/15">
              <LogIn className="h-6 w-6 text-petrol" strokeWidth={1.8} />
            </span>
            <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-navy">
              Iniciar sesión
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-slate">
              Accede a tu panel para agendar citas y dar seguimiento.
            </p>

            {error && (
              <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-red-50 p-3.5 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-navy"
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="tucorreo@ejemplo.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-navy"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Tu contraseña"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-petrol text-base font-semibold text-white transition-all hover:bg-navy active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? 'Entrando…' : 'Entrar'}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate">
              ¿No tienes cuenta?{' '}
              <Link
                to="/registro"
                className="font-semibold text-petrol hover:text-navy"
              >
                Regístrate
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
