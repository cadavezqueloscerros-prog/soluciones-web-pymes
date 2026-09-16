import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const WHATSAPP_NUMBER = '525633958806';
const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await signup(form.email, form.password, { name: form.name, role: 'member' });
      navigate('/panel');
    } catch (err) {
      if (err?.status === 400 && err?.response?.data) {
        const data = err.response.data;
        if (data.email) {
          setError('Este correo ya está registrado. Intenta iniciar sesión.');
        } else {
          setError('Revisa los datos del formulario e inténtalo de nuevo.');
        }
      } else {
        setError('No pudimos completar tu registro. Inténtalo más tarde.');
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
        <title>Crear cuenta | Soluciones Web Pymes y Más</title>
        <meta
          name="description"
          content="Crea tu cuenta en Soluciones Web Pymes y Más para acceder a tu panel."
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
              <UserPlus className="h-6 w-6 text-petrol" strokeWidth={1.8} />
            </span>
            <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-navy">
              Crear cuenta
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-slate">
              Regístrate para acceder a tu panel de usuario.
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
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-navy"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Ej. María López"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
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
                  minLength={8}
                  placeholder="Mínimo 8 caracteres"
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
                {loading ? 'Creando cuenta…' : 'Crear cuenta'}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate">
              ¿Ya tienes cuenta?{' '}
              <Link
                to="/login"
                className="font-semibold text-petrol hover:text-navy"
              >
                Inicia sesión
              </Link>
            </p>
          </motion.div>

          <a
            href={waLink('Hola, quiero una cotización para mi página web.')}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate transition-colors hover:text-petrol"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
            ¿Necesitas una página web? Escríbenos
          </a>
        </div>
      </section>
    </>
  );
}
