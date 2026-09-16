import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format, isPast, isSunday, startOfDay, parseISO } from 'date-fns';
import {
  CalendarDays,
  Clock,
  MessageCircle,
  LogOut,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  CalendarCheck,
  ShieldCheck,
  Receipt,
} from 'lucide-react';
import 'react-day-picker/style.css';

import { useAuth } from '@/contexts/AuthContext';
import pb from '@/lib/pocketbaseClient';

const WHATSAPP_NUMBER = '525633958806';
const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const TIME_SLOTS = [
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
];

const STATUS_META = {
  pendiente: {
    label: 'Pendiente',
    cls: 'bg-amber-100 text-amber-800',
    Icon: Clock,
  },
  confirmada: {
    label: 'Confirmada',
    cls: 'bg-turquoise/15 text-petrol',
    Icon: CheckCircle2,
  },
  cancelada: {
    label: 'Cancelada',
    cls: 'bg-navy/5 text-slate',
    Icon: XCircle,
  },
};

function toISODate(date) {
  return format(date, 'yyyy-MM-dd');
}

function longDate(date) {
  return format(date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
}

export default function UserPanel() {
  const { user, isAuthed, logout } = useAuth();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [servicio, setServicio] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const [myBookings, setMyBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [error, setError] = useState('');
  const [booking, setBooking] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  const isAdmin = user?.role === 'admin';

  const loadMyBookings = useCallback(async () => {
    setBookingsLoading(true);
    try {
      const list = await pb
        .collection('citas')
        .getFullList({ sort: '-created' });
      setMyBookings(list);
    } catch (err) {
      setError('No pudimos cargar tus citas. Inténtalo más tarde.');
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthed) {
      navigate('/login', { replace: true });
      return;
    }
    loadMyBookings();
  }, [isAuthed, navigate, loadMyBookings]);

  // Cargar horarios ya ocupados para la fecha seleccionada.
  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }
    const iso = toISODate(selectedDate);
    let active = true;
    setSlotsLoading(true);
    setSelectedSlot(null);
    pb
      .collection('horarios_ocupados')
      .getFullList({
        filter: pb.filter('fecha = {:d}', {
          d: iso,
        }),
      })
      .then((rows) => {
        if (!active) return;
        setBookedSlots(rows.map((r) => r.hora));
      })
      .catch(() => {
        if (active) setBookedSlots([]);
      })
      .finally(() => {
        if (active) setSlotsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [selectedDate]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleAgendar = async () => {
    if (!selectedDate || !selectedSlot) return;
    setBooking(true);
    setError('');
    const iso = toISODate(selectedDate);
    try {
      await pb.collection('citas').create({
        fecha: iso,
        hora: selectedSlot,
        servicio: servicio.trim() || 'Asesoría / cotización',
        status: 'pendiente',
        owner: pb.authStore.record.id,
      });

      const nombre = user?.name || user?.email || '';
      const fechaTxt = longDate(selectedDate);
      const msg =
        `Hola, soy ${nombre}. ` +
        `Quiero agendar una cita para el *${fechaTxt}* a las *${selectedSlot}* ` +
        `(servicio: ${servicio.trim() || 'asesoría / cotización'}). ` +
        `Adjunto en este chat mi *comprobante de pago* para apartar el día y la hora. ` +
        `Quedo atento a la confirmación. ¡Gracias!`;

      setSelectedSlot(null);
      setServicio('');
      await loadMyBookings();
      window.location.assign(waLink(msg));
    } catch (err) {
      if (err?.status === 400) {
        setError(
          'Ese horario acaba de ser reservado. Elige otro día u hora disponible.',
        );
        setBookedSlots((prev) =>
          prev.includes(selectedSlot) ? prev : [...prev, selectedSlot],
        );
        setSelectedSlot(null);
      } else {
        setError('No pudimos registrar tu cita. Inténtalo de nuevo.');
      }
    } finally {
      setBooking(false);
    }
  };

  const handleCancel = async (id) => {
    setCancellingId(id);
    try {
      await pb.collection('citas').update(id, { status: 'cancelada' });
      setMyBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: 'cancelada' } : b)),
      );
    } catch (err) {
      setError('No pudimos cancelar la cita. Inténtalo más tarde.');
    } finally {
      setCancellingId(null);
    }
  };

  const disabledDays = useMemo(
    () => (date) => {
      const today = startOfDay(new Date());
      const d = startOfDay(date);
      return d < today || isSunday(date);
    },
    [],
  );

  const activeBookings = myBookings.filter((b) => b.status !== 'cancelada');

  return (
    <>
      <Helmet>
        <title>Mi panel · Agenda tu cita | Soluciones Web Pymes y Más</title>
        <meta
          name="description"
          content="Agenda tu cita en el calendario de disponibles y confirma por WhatsApp con tu comprobante de pago."
        />
      </Helmet>
      <section className="min-h-[100dvh] bg-cream">
        <style>{`
          .rdp-root { --rdp-accent-color: #176B87; --rdp-accent-background-color: rgba(44,191,174,0.15); --rdp-day_button-border-radius: 0.75rem; }
          .rdp-root button { font-family: "Inter", system-ui, sans-serif; }
          .rdp-root .rdp-day_button { width: 2.5rem; height: 2.5rem; }
          .rdp-root .rdp-selected .rdp-day_button { background: #176B87; color: #fff; }
          .rdp-root .rdp-today .rdp-day_button { border: 1px solid #2CBFAE; }
        `}</style>

        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-navy/5 bg-white/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy font-display text-sm font-extrabold text-turquoise">
                SW
              </span>
              <span className="font-display text-[15px] font-bold leading-tight text-navy">
                Mi panel
                <span className="block text-[11px] font-semibold tracking-wide text-slate">
                  Soluciones Web Pymes y Más
                </span>
              </span>
            </Link>
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="hidden h-10 items-center gap-2 rounded-xl border border-navy/15 px-4 text-sm font-semibold text-navy transition-colors hover:border-petrol hover:text-petrol sm:inline-flex"
                >
                  <ShieldCheck className="h-4 w-4" strokeWidth={2} />
                  Panel admin
                </Link>
              )}
              <span className="hidden text-sm text-slate sm:inline">
                {user?.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-navy/15 px-4 text-sm font-semibold text-navy transition-colors hover:border-petrol hover:text-petrol active:scale-[0.98]"
              >
                <LogOut className="h-4 w-4" strokeWidth={2} />
                Salir
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-turquoise/15">
                <CalendarCheck className="h-6 w-6 text-petrol" strokeWidth={1.8} />
              </span>
              <div>
                <h1 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                  Agenda tu cita
                </h1>
                <p className="text-sm text-slate">
                  Elige un día y hora disponibles, luego confirma por WhatsApp
                  enviando tu comprobante de pago.
                </p>
              </div>
            </div>
          </motion.div>

          {error && (
            <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-navy/8 bg-white p-5 sm:p-7"
            >
              <div className="flex items-center gap-2 text-navy">
                <CalendarDays className="h-5 w-5 text-petrol" strokeWidth={2} />
                <h2 className="font-display text-lg font-bold">Calendario</h2>
              </div>
              <p className="mt-1 text-sm text-slate">
                Disponibles de lunes a sábado (se excluyen domingos y fechas
                pasadas).
              </p>
              <div className="mt-5 flex justify-center">
                <DayPicker
                  mode="single"
                  locale={es}
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={disabledDays}
                  fromMonth={new Date()}
                  toDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 75)}
                  weekStartsOn={1}
                  classNames={{ root: 'rdp-root' }}
                />
              </div>
            </motion.div>

            {/* Slots + booking */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-navy/8 bg-white p-5 sm:p-7"
            >
              <div className="flex items-center gap-2 text-navy">
                <Clock className="h-5 w-5 text-petrol" strokeWidth={2} />
                <h2 className="font-display text-lg font-bold">Horarios</h2>
              </div>

              {!selectedDate && (
                <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy/15 bg-cream/60 px-6 py-12 text-center">
                  <CalendarDays className="h-8 w-8 text-slate/50" strokeWidth={1.6} />
                  <p className="mt-3 text-sm text-slate">
                    Selecciona una fecha en el calendario para ver los horarios
                    disponibles.
                  </p>
                </div>
              )}

              {selectedDate && (
                <>
                  <p className="mt-2 text-sm text-slate">
                    {longDate(selectedDate)}
                  </p>

                  {slotsLoading ? (
                    <div className="mt-5 flex items-center gap-2 text-sm text-slate">
                      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                      Cargando horarios…
                    </div>
                  ) : (
                    <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {TIME_SLOTS.map((slot) => {
                        const taken = bookedSlots.includes(slot);
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={taken}
                            onClick={() => setSelectedSlot(slot)}
                            className={`flex h-12 items-center justify-center rounded-xl border text-sm font-semibold transition-all active:scale-[0.98] ${
                              taken
                                ? 'cursor-not-allowed border-navy/5 bg-navy/5 text-slate/40 line-through'
                                : isSelected
                                  ? 'border-petrol bg-petrol text-white'
                                  : 'border-navy/15 bg-white text-navy hover:border-petrol hover:text-petrol'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {selectedSlot && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 rounded-2xl border border-petrol/15 bg-petrol/5 p-4"
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold text-petrol">
                        <Receipt className="h-4 w-4" strokeWidth={2} />
                        Resumen de tu cita
                      </div>
                      <dl className="mt-3 space-y-1.5 text-sm text-navy">
                        <div className="flex justify-between gap-3">
                          <dt className="text-slate">Fecha</dt>
                          <dd className="font-semibold capitalize">
                            {longDate(selectedDate)}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-slate">Hora</dt>
                          <dd className="font-semibold">{selectedSlot}</dd>
                        </div>
                      </dl>

                      <label
                        htmlFor="servicio"
                        className="mt-4 block text-xs font-semibold uppercase tracking-wide text-slate"
                      >
                        Servicio (opcional)
                      </label>
                      <input
                        id="servicio"
                        type="text"
                        value={servicio}
                        onChange={(e) => setServicio(e.target.value)}
                        placeholder="Ej. Página de contacto, Tienda en línea…"
                        className="mt-2 h-11 w-full rounded-xl border border-navy/15 bg-white px-3.5 text-sm text-navy placeholder:text-slate/60 outline-none transition-colors focus:border-petrol focus:ring-2 focus:ring-petrol/20"
                      />

                      <button
                        type="button"
                        onClick={handleAgendar}
                        disabled={booking}
                        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-whatsapp text-base font-semibold text-white transition-all hover:brightness-95 active:scale-[0.98] disabled:opacity-60"
                      >
                        {booking ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                            Agendando…
                          </>
                        ) : (
                          <>
                            <MessageCircle className="h-5 w-5" strokeWidth={2} />
                            Agendar y confirmar por WhatsApp
                          </>
                        )}
                      </button>
                      <p className="mt-3 text-xs leading-relaxed text-slate">
                        Al agendar se abrirá WhatsApp con un mensaje listo para
                        enviar. Adjunta ahí tu <strong>comprobante de pago</strong>{' '}
                        para apartar el día y la hora; la cita se confirma al
                        recibirlo.
                      </p>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          </div>

          {/* Mis citas */}
          <div className="mt-12">
            <div className="flex items-center gap-2 text-navy">
              <CalendarCheck className="h-5 w-5 text-petrol" strokeWidth={2} />
              <h2 className="font-display text-xl font-bold">Mis citas</h2>
            </div>

            {bookingsLoading ? (
              <div className="mt-5 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 animate-pulse rounded-2xl bg-white/60"
                  />
                ))}
              </div>
            ) : myBookings.length === 0 ? (
              <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy/15 bg-white px-6 py-12 text-center">
                <CalendarDays className="h-8 w-8 text-slate/50" strokeWidth={1.6} />
                <p className="mt-3 text-sm text-slate">
                  Aún no tienes citas agendadas. Elige una fecha arriba para
                  empezar.
                </p>
              </div>
            ) : (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {myBookings.map((b) => {
                  const meta = STATUS_META[b.status] || STATUS_META.pendiente;
                  const Icon = meta.Icon;
                  return (
                    <div
                      key={b.id}
                      className="rounded-2xl border border-navy/8 bg-white p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-base font-bold capitalize text-navy">
                            {(() => {
                              try {
                                return longDate(parseISO(b.fecha));
                              } catch {
                                return b.fecha;
                              }
                            })()}
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate">
                            <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                            {b.hora}
                          </p>
                          {b.servicio && (
                            <p className="mt-1 text-sm text-slate">
                              {b.servicio}
                            </p>
                          )}
                        </div>
                        <span
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.cls}`}
                        >
                          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                          {meta.label}
                        </span>
                      </div>

                      {b.status === 'pendiente' && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          <a
                            href={waLink(
                              `Hola, confirmo mi cita del ${(() => {
                                try {
                                  return longDate(parseISO(b.fecha));
                                } catch {
                                  return b.fecha;
                                }
                              })()} a las ${b.hora}. Adjunto mi comprobante de pago.`,
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-whatsapp px-3 text-xs font-semibold text-white transition-all hover:brightness-95 active:scale-[0.98]"
                          >
                            <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
                            Enviar comprobante
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCancel(b.id)}
                            disabled={cancellingId === b.id}
                            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-navy/15 px-3 text-xs font-semibold text-slate transition-colors hover:border-red-300 hover:text-red-600 disabled:opacity-60"
                          >
                            {cancellingId === b.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
                            ) : (
                              <XCircle className="h-3.5 w-3.5" strokeWidth={2} />
                            )}
                            Cancelar
                            </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {activeBookings.length > 0 && (
              <p className="mt-4 text-xs text-slate">
                Tienes {activeBookings.length}{' '}
                {activeBookings.length === 1 ? 'cita activa' : 'citas activas'}.
                Las citas pendientes se confirman al recibir tu comprobante de
                pago por WhatsApp.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
