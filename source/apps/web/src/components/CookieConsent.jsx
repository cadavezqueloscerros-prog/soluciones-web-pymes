import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'swpymes_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* almacenamiento no disponible; ocultamos igual */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-2xl shadow-navy/20 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-turquoise/15">
          <Cookie className="h-5 w-5 text-petrol" strokeWidth={1.8} />
        </span>
        <p className="flex-1 text-sm leading-relaxed text-slate">
          Este sitio no utiliza cookies de seguimiento ni publicidad. Mantenemos tu
          sesión con almacenamiento local del navegador. Al continuar navegando aceptas
          nuestro uso de tecnologías esenciales. Consulta nuestro{' '}
          <Link to="/aviso-privacidad" className="font-semibold text-petrol hover:underline">
            Aviso de Privacidad
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => dismiss('accepted')}
            className="inline-flex h-10 items-center rounded-xl bg-petrol px-5 text-sm font-semibold text-white transition-all hover:bg-navy active:scale-[0.98]"
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={() => dismiss('rejected')}
            aria-label="Cerrar aviso"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-navy/15 text-navy transition-colors hover:border-petrol hover:text-petrol"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
