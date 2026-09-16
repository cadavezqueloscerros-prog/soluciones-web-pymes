import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, BarChart3, CalendarClock, Download, FileText, LogOut, Mail, Plus, Save, Search, Users, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import pb from '@/lib/pocketbaseClient';

const tabs = [
  { id: 'resumen', label: 'Resumen', icon: BarChart3 },
  { id: 'usuarios', label: 'Usuarios', icon: Users },
  { id: 'citas', label: 'Citas', icon: CalendarClock },
  { id: 'expedientes', label: 'Expedientes', icon: FileText },
];

const emptyForm = { owner: '', servicio: '', precio: '', status: 'prospecto', notas: '' };

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatMoney(value) {
  return Number(value || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}

export default function AdminPage() {
  const { user, isAuthed, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('resumen');
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [userList, appointmentList, fileList] = await Promise.all([
        pb.collection('users').getFullList({ sort: '-created' }),
        pb.collection('citas').getFullList({ sort: '-created', expand: 'owner' }),
        pb.collection('expedientes').getFullList({ sort: '-updated', expand: 'owner' }),
      ]);
      setUsers(userList);
      setAppointments(appointmentList);
      setFiles(fileList);
    } catch (err) {
      setError(err?.status === 403 ? 'No tienes permisos de administrador para ver esta información.' : 'No pudimos cargar la información. Verifica que las migraciones de PocketBase estén aplicadas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthed) {
      navigate('/login', { replace: true });
      return;
    }
    loadData();
  }, [isAuthed, navigate, loadData]);

  const filteredUsers = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return users;
    return users.filter((item) => (item.name || '').toLowerCase().includes(value) || (item.email || '').toLowerCase().includes(value));
  }, [query, users]);

  const totals = useMemo(() => ({
    totalUsers: users.length,
    activeAppointments: appointments.filter((item) => item.status !== 'cancelada').length,
    pendingAppointments: appointments.filter((item) => item.status === 'pendiente').length,
    activeFiles: files.filter((item) => item.status !== 'completado').length,
    pipeline: files.reduce((sum, item) => sum + Number(item.precio || 0), 0),
  }), [appointments, files, users]);

  const recentActivity = useMemo(() => [
    ...users.map((item) => ({ type: 'Registro', label: item.name || item.email, date: item.created })),
    ...appointments.map((item) => ({ type: 'Cita', label: `${item.fecha} · ${item.hora}`, date: item.created })),
    ...files.map((item) => ({ type: 'Expediente', label: item.servicio, date: item.updated || item.created })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8), [appointments, files, users]);

  const ownerName = (item) => item.expand?.owner?.name || item.expand?.owner?.email || users.find((candidate) => candidate.id === item.owner)?.name || 'Usuario';

  const startNewFile = () => {
    setEditingId(null);
    setForm({ ...emptyForm, owner: users.find((item) => item.role !== 'admin')?.id || '' });
    setTab('expedientes');
  };

  const editFile = (item) => {
    setEditingId(item.id);
    setForm({ owner: item.owner, servicio: item.servicio || '', precio: item.precio ?? '', status: item.status || 'prospecto', notas: item.notas || '' });
    setTab('expedientes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveFile = async (event) => {
    event.preventDefault();
    if (!form.owner || !form.servicio.trim()) return;
    setSaving(true);
    setError('');
    try {
      const payload = { ...form, servicio: form.servicio.trim(), precio: Number(form.precio || 0) };
      if (editingId) await pb.collection('expedientes').update(editingId, payload);
      else await pb.collection('expedientes').create(payload);
      setForm(emptyForm);
      setEditingId(null);
      await loadData();
    } catch {
      setError('No pudimos guardar el expediente. Revisa los campos y las reglas de PocketBase.');
    } finally {
      setSaving(false);
    }
  };

  const updateAppointment = async (item, status) => {
    setError('');
    try {
      await pb.collection('citas').update(item.id, { status });
      setAppointments((previous) => previous.map((entry) => entry.id === item.id ? { ...entry, status } : entry));
    } catch {
      setError('No pudimos actualizar el estado de la cita.');
    }
  };

  const logoutAndRedirect = () => { logout(); navigate('/login', { replace: true }); };

  const exportUsers = () => {
    const escapeCsv = (value) => { const text = value == null ? '' : String(value); return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text; };
    const rows = [['Nombre', 'Correo', 'Rol', 'Fecha de registro'], ...filteredUsers.map((item) => [item.name || '', item.email || '', item.role === 'admin' ? 'Administrador' : 'Usuario', formatDate(item.created)])];
    const blob = new Blob([`\uFEFF${rows.map((row) => row.map(escapeCsv).join(',')).join('\r\n')}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `usuarios_solucionesweb_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <>
      <Helmet><title>Panel de administración | Soluciones Web Pymes y Más</title></Helmet>
      <section className="min-h-[100dvh] bg-cream">
        <header className="sticky top-0 z-40 border-b border-navy/5 bg-white/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
            <Link to="/" className="flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy font-display text-sm font-extrabold text-turquoise">SW</span><span className="font-display text-[15px] font-bold leading-tight text-navy">Panel admin<span className="block text-[11px] font-semibold tracking-wide text-slate">Soluciones Web Pymes y Más</span></span></Link>
            <div className="flex items-center gap-3"><span className="hidden text-sm text-slate sm:inline">{user?.email}</span><button type="button" onClick={logoutAndRedirect} className="inline-flex h-10 items-center gap-2 rounded-xl border border-navy/15 px-4 text-sm font-semibold text-navy"><LogOut className="h-4 w-4" />Salir</button></div>
          </div>
        </header>
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-14">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><h1 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">Centro de administración</h1><p className="mt-1 text-sm text-slate">Usuarios, citas y expedientes en un solo lugar.</p></div>{isAdmin && <button type="button" onClick={startNewFile} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-petrol px-5 text-sm font-semibold text-white"><Plus className="h-4 w-4" />Crear expediente</button>}</div>
          {!isAdmin && !loading && <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">Tu cuenta no tiene permisos de administrador.</div>}
          {error && <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-red-50 p-4 text-sm text-red-700"><AlertCircle className="h-4 w-4 shrink-0" />{error}</div>}
          {isAdmin && <>
            <div className="mt-8 flex gap-2 overflow-x-auto border-b border-navy/10 pb-2">{tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setTab(id)} className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${tab === id ? 'bg-petrol text-white' : 'text-slate hover:bg-white'}`}><Icon className="h-4 w-4" />{label}</button>)}</div>
            {loading ? <div className="mt-8 space-y-3"><div className="h-28 animate-pulse rounded-2xl bg-white/60" /><div className="h-48 animate-pulse rounded-2xl bg-white/60" /></div> : <>
              {tab === 'resumen' && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Usuarios', totals.totalUsers, Users], ['Citas activas', totals.activeAppointments, CalendarClock], ['Expedientes activos', totals.activeFiles, FileText], ['Valor del pipeline', formatMoney(totals.pipeline), BarChart3]].map(([label, value, Icon]) => <div key={label} className="rounded-2xl border border-navy/8 bg-white p-5"><div className="flex items-center gap-2 text-slate"><Icon className="h-4 w-4 text-petrol" /><span className="text-xs font-semibold uppercase tracking-wide">{label}</span></div><p className="mt-2 font-display text-2xl font-extrabold text-navy">{value}</p></div>)}</div><div className="mt-6 rounded-2xl border border-navy/8 bg-white p-5"><h2 className="font-display text-lg font-bold text-navy">Actividad reciente</h2><div className="mt-4 divide-y divide-navy/5">{recentActivity.map((item, index) => <div key={`${item.type}-${item.date}-${index}`} className="flex items-center justify-between gap-4 py-3 text-sm"><div><span className="font-semibold text-petrol">{item.type}</span><span className="ml-2 text-navy">{item.label}</span></div><span className="shrink-0 text-xs text-slate">{formatDate(item.date)}</span></div>)}{recentActivity.length === 0 && <p className="py-6 text-sm text-slate">Todavía no hay movimientos registrados.</p>}</div></div></motion.div>}
              {tab === 'usuarios' && <div className="mt-8"><div className="flex flex-col gap-3 sm:flex-row"><div className="flex flex-1 items-center gap-3 rounded-xl border border-navy/15 bg-white px-4"><Search className="h-4 w-4 text-slate" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre o correo…" className="h-12 w-full bg-transparent text-sm outline-none" /></div><button type="button" onClick={exportUsers} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-petrol px-5 text-sm font-semibold text-white"><Download className="h-4 w-4" />Descargar CSV</button></div><div className="mt-6 overflow-hidden rounded-2xl border border-navy/8 bg-white"><div className="divide-y divide-navy/5">{filteredUsers.map((item) => <div key={item.id} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-navy">{item.name || 'Sin nombre'}</p><p className="flex items-center gap-1.5 text-sm text-slate"><Mail className="h-3.5 w-3.5" />{item.email}</p></div><div className="flex items-center gap-4 text-xs text-slate"><span className="rounded-full bg-navy/5 px-2.5 py-1 font-semibold">{item.role === 'admin' ? 'Administrador' : 'Usuario'}</span><span>{formatDate(item.created)}</span></div></div>)}{filteredUsers.length === 0 && <p className="p-8 text-center text-sm text-slate">No se encontraron usuarios.</p>}</div></div></div>}
              {tab === 'citas' && <div className="mt-8 rounded-2xl border border-navy/8 bg-white"><div className="divide-y divide-navy/5">{appointments.map((item) => <div key={item.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-navy">{item.fecha} · {item.hora}</p><p className="mt-1 text-sm text-slate">{ownerName(item)} · {item.servicio || 'Asesoría / cotización'}</p></div><label className="text-xs font-semibold text-slate">Estado<select aria-label={`Estado de la cita de ${ownerName(item)}`} value={item.status} onChange={(event) => updateAppointment(item, event.target.value)} className="ml-2 rounded-lg border border-navy/15 bg-white px-2 py-1.5 text-xs text-navy"><option value="pendiente">Pendiente</option><option value="confirmada">Confirmada</option><option value="cancelada">Cancelada</option></select></label></div>)}{appointments.length === 0 && <p className="p-8 text-center text-sm text-slate">No hay citas registradas.</p>}</div></div>}
              {tab === 'expedientes' && <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]"><form onSubmit={saveFile} className="rounded-2xl border border-navy/8 bg-white p-5"><div className="flex items-center justify-between"><h2 className="font-display text-lg font-bold text-navy">{editingId ? 'Editar expediente' : 'Nuevo expediente'}</h2>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="text-slate"><X className="h-4 w-4" /></button>}</div><label className="mt-5 block text-sm font-semibold text-navy">Usuario<select value={form.owner} onChange={(event) => setForm({ ...form, owner: event.target.value })} required className="mt-2 h-11 w-full rounded-xl border border-navy/15 bg-white px-3 text-sm"><option value="">Selecciona un usuario</option>{users.filter((item) => item.role !== 'admin').map((item) => <option key={item.id} value={item.id}>{item.name || item.email}</option>)}</select></label><label className="mt-4 block text-sm font-semibold text-navy">Tipo de servicio<input value={form.servicio} onChange={(event) => setForm({ ...form, servicio: event.target.value })} required className="mt-2 h-11 w-full rounded-xl border border-navy/15 px-3 text-sm" placeholder="Página web, tienda en línea…" /></label><div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="block text-sm font-semibold text-navy">Precio<input type="number" min="0" step="0.01" value={form.precio} onChange={(event) => setForm({ ...form, precio: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-navy/15 px-3 text-sm" /></label><label className="block text-sm font-semibold text-navy">Estado<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-navy/15 bg-white px-3 text-sm"><option value="prospecto">Prospecto</option><option value="en_proceso">En proceso</option><option value="pausado">Pausado</option><option value="completado">Completado</option></select></label></div><label className="mt-4 block text-sm font-semibold text-navy">Notas<textarea value={form.notas} onChange={(event) => setForm({ ...form, notas: event.target.value })} rows="5" className="mt-2 w-full rounded-xl border border-navy/15 px-3 py-2 text-sm" /></label><button type="submit" disabled={saving} className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-petrol text-sm font-semibold text-white disabled:opacity-60"><Save className="h-4 w-4" />{saving ? 'Guardando…' : 'Guardar expediente'}</button></form><div className="rounded-2xl border border-navy/8 bg-white"><div className="border-b border-navy/8 p-5"><h2 className="font-display text-lg font-bold text-navy">Expedientes registrados</h2></div><div className="divide-y divide-navy/5">{files.map((item) => <button key={item.id} type="button" onClick={() => editFile(item)} className="block w-full p-5 text-left transition-colors hover:bg-cream/40"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-navy">{item.servicio}</p><p className="mt-1 text-sm text-slate">{ownerName(item)}</p></div><span className="rounded-full bg-navy/5 px-2.5 py-1 text-xs font-semibold text-slate">{item.status?.replace('_', ' ')}</span></div><div className="mt-3 flex items-center justify-between text-sm"><span className="text-slate">Actualizado {formatDate(item.updated || item.created)}</span><span className="font-semibold text-petrol">{formatMoney(item.precio)}</span></div></button>)}{files.length === 0 && <p className="p-8 text-center text-sm text-slate">Aún no hay expedientes. Crea el primero.</p>}</div></div></div>}
            </>}</>}
        </div>
      </section>
    </>
  );
}
