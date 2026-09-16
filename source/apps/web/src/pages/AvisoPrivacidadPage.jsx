import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const WHATSAPP_NUMBER = '525633958806';
const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export default function AvisoPrivacidadPage() {
  return (
    <>
      <Helmet>
        <title>Aviso de Privacidad | Soluciones Web Pymes y Más</title>
        <meta
          name="description"
          content="Aviso de Privacidad de Soluciones Web Pymes y Más: qué datos recabamos, cómo los usamos y cuáles son tus derechos ARCO."
        />
      </Helmet>
      <section className="min-h-[100dvh] bg-cream">
        <header className="sticky top-0 z-40 border-b border-navy/5 bg-white/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-5 sm:px-8">
            <Link to="/" className="flex items-center gap-2.5">
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
            <Link
              to="/"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-navy/15 px-4 text-sm font-semibold text-navy transition-colors hover:border-petrol hover:text-petrol"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              Inicio
            </Link>
          </div>
        </header>

        <article className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 lg:py-16">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-turquoise/15">
              <ShieldCheck className="h-6 w-6 text-petrol" strokeWidth={1.8} />
            </span>
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                Aviso de Privacidad
              </h1>
              <p className="text-sm text-slate">Última actualización: septiembre 2026</p>
            </div>
          </div>

          <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-slate">
            <p>
              <strong className="text-navy">Soluciones Web Pymes y Más</strong>, con
              domicilio en la Ciudad de México, México, es responsable del tratamiento
              de tus datos personales conforme a la Ley Federal de Protección de Datos
              Personales en Posesión de los Particulares.
            </p>

            <section>
              <h2 className="font-display text-lg font-bold text-navy">
                1. Datos que recabamos
              </h2>
              <p className="mt-2">
                A través del formulario de contacto y del registro de usuarios
                recabamos: nombre, correo electrónico, teléfono y el mensaje que nos
                envías. Al agendar una cita almacenamos además la fecha, hora y servicio
                solicitados.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-navy">
                2. Finalidad del tratamiento
              </h2>
              <p className="mt-2">
                Utilizamos tus datos únicamente para responder tu solicitud de
                cotización, agendar y dar seguimiento a tus citas, y enviarte
                información relacionada con el servicio que contrataste. No compartimos
                ni vendemos tus datos con terceros con fines comerciales.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-navy">
                3. Almacenamiento y seguridad
              </h2>
              <p className="mt-2">
                Tus datos se almacenan en servidores protegidos. Las contraseñas se
                guardan cifradas (hash) y no es posible mostrarlas en texto plano.
                Aplicamos medidas técnicas razonables para proteger tu información
                contra acceso no autorizado.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-navy">
                4. Cookies y tecnologías similares
              </h2>
              <p className="mt-2">
                Este sitio no utiliza cookies de seguimiento ni publicidad. La sesión
                de usuario se mantiene mediante almacenamiento local del navegador
                (localStorage), no mediante cookies. Si en el futuro se añaden cookies,
                solicitaremos tu consentimiento previo.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-navy">
                5. Tus derechos ARCO
              </h2>
              <p className="mt-2">
                Puedes ejercer tus derechos de acceso, rectificación, cancelación y
                oposición enviando un mensaje a través de WhatsApp o al correo de
                contacto. Atenderemos tu solicitud en un plazo razonable.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-navy">
                6. Contacto
              </h2>
              <p className="mt-2">
                Para cualquier duda sobre este aviso, escríbenos por WhatsApp al +52 56
                3395 8806.
              </p>
              <a
                href={waLink('Hola, tengo una duda sobre el Aviso de Privacidad.')}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex h-11 items-center gap-2 rounded-xl bg-petrol px-5 text-sm font-semibold text-white transition-all hover:bg-navy active:scale-[0.98]"
              >
                Contactar por WhatsApp
              </a>
            </section>
          </div>

          <div className="mt-10 border-t border-navy/10 pt-6 text-sm text-slate">
            <Link to="/terminos-servicio" className="font-semibold text-petrol hover:underline">
              Ver Términos y condiciones
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
