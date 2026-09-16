// Soluciones Web Pymes y Más — cliente Supabase compartido
// Usado por index.html (registro/login), agenda.html y admin.html

const SUPABASE_URL = 'https://puvxdefhssfcadnrzfcf.supabase.co';
const SUPABASE_KEY = 'sb_publishable_-YFIHtYcyN4tRg41cLYQlw_1YsTZ9Fa';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const SWApp = {
  client: sb,

  async getSession(){
    const { data } = await sb.auth.getSession();
    return data.session;
  },

  async getProfile(){
    const session = await this.getSession();
    if(!session) return null;
    const { data, error } = await sb
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    if(error){ console.error(error); return null; }
    return data;
  },

  async signUp({ nombre, telefono, correo, password }){
    return sb.auth.signUp({
      email: correo,
      password,
      options: { data: { nombre, telefono } }
    });
  },

  async signIn({ correo, password }){
    return sb.auth.signInWithPassword({ email: correo, password });
  },

  async signOut(){
    await sb.auth.signOut();
    window.location.href = 'index.html';
  },

  // Redirige si no hay sesión (o si se exige un rol distinto). Devuelve el
  // perfil cuando todo está en orden, o null si ya redirigió.
  async requireAuth({ role } = {}){
    const session = await this.getSession();
    if(!session){
      window.location.href = 'index.html?auth=login';
      return null;
    }
    const profile = await this.getProfile();
    if(role && profile && profile.role !== role){
      window.location.href = profile.role === 'admin' ? 'admin.html' : 'agenda.html';
      return null;
    }
    return profile;
  },

  fmtFecha(d){
    return d.toLocaleDateString('es-MX', { weekday:'short', day:'numeric', month:'short' });
  },

  waLink(numero, texto){
    return 'https://wa.me/' + numero + '?text=' + encodeURIComponent(texto);
  }
};

window.SWApp = SWApp;

