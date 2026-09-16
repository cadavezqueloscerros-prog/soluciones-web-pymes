import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
export default function TerminosServicioPage() {
  return <>
      <Helmet>
        <title>Términos y Condiciones | Soluciones Web Pymes y Más</title>
        <meta name="description" content="Términos y Condiciones del servicio de Soluciones Web Pymes y Más: alcance, pagos, dominio y obligaciones de las partes." />
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
            <Link to="/" className="inline-flex h-10 items-center gap-2 rounded-xl border border-navy/15 px-4 text-sm font-semibold text-navy transition-colors hover:border-petrol hover:text-petrol">
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              Inicio
            </Link>
          </div>
        </header>

        <article className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 lg:py-16">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-turquoise/15">
              <FileText className="h-6 w-6 text-petrol" strokeWidth={1.8} />
            </span>
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                Términos y Condiciones
              </h1>
              <p className="text-sm text-slate">Última actualización: septiembre 2026</p>
            </div>
          </div>

          <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-slate">
            <p>
              Al usar este sitio web o contratar los servicios de{' '}
              <strong className="text-navy">Soluciones Web Pymes y Más</strong>, aceptas
              los presentes términos y condiciones.
            </p>

            <section>
              <h2 className="font-display text-lg font-bold text-navy">
                1. Alcance del servicio
              </h2>
              <p className="mt-2">
                Diseñamos y mantenemos páginas web para pequeños negocios. El alcance
                específico de cada proyecto (secciones, contenido y tiempos) se define
                por escrito antes de iniciar el trabajo.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-navy">
                2. Dominio, correo y plataformas externas
              </h2>
              <p className="mt-2">El dominio, el correo profesional y las plataformas externas (por ejemplo Shopify) se contratan y pagan por separado.&nbsp;</p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-navy">
                3. Pagos y cotizaciones
              </h2>
              <p className="mt-2">
                Los precios publicados son informativos. La tienda en línea con pagos y
                los servicios adicionales se cotizan de forma independiente. Las citas
                se apartan al recibir el comprobante de pago correspondiente.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-navy">
                4. Entregas y ajustes
              </h2>
              <p className="mt-2">El tiempo de entrega típico es de 2 a 5 dias una vez recibido el contenido. Cada proyecto incluye 2 rondas de ajustes antes de publicar. Cambios adicionales se cubren con los planes de mantenimiento.</p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-navy">
                5. Uso aceptable
              </h2>
              <p className="mt-2">
                No está permitido usar el sitio para actividades ilícitas, difundir
                contenido ofensivo o intentar comprometer la seguridad de la plataforma.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-navy">
                6. Limitación de responsabilidad
              </h2>
              <p className="mt-2">
                No garantizamos ventas ni posiciones específicas en buscadores. Ofrecemos
                un trabajo profesional, con SEO básico bien implementado, pero los
                resultados comerciales dependen de múltiples factores ajenos al diseño.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-navy">
                7. Modificaciones
              </h2>
              <p className="mt-2">
                Podemos actualizar estos términos en cualquier momento. Te recomendamos
                revisar esta página periódicamente.
              </p>
            </section>
          </div>

          <div className="mt-10 border-t border-navy/10 pt-6 text-sm text-slate">
            <Link to="/aviso-privacidad" className="font-semibold text-petrol hover:underline">
              Ver Aviso de Privacidad
            </Link>
          </div>
        </article>
      </section>
    </>;
}