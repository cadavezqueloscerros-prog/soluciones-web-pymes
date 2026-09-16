# 🚀 Guía de Migración: Hostinger AI Builder → GitHub Pages

## Estado Actual
✅ Sitio compilado y listo  
📦 Archivos optimizados para producción  
🎯 Tamaño total: 668KB

---

## PASO 1: Preparar tu Computadora

### Opción A: Si usas Git desde terminal (Recomendado)

```bash
# 1. Instala Git si no lo tienes
# Windows: https://git-scm.com/download/win
# Mac: brew install git
# Linux: sudo apt install git

# 2. Configura Git con tu email de GitHub
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@ejemplo.com"
```

### Opción B: Usa GitHub Desktop
Descarga desde: https://desktop.github.com/

---

## PASO 2: Clonar tu Repositorio Existente

```bash
# En terminal/CMD, navega a una carpeta donde guardes tus proyectos
cd ~/Documentos  # o donde prefieras

# Clona tu repo actual
git clone https://github.com/cadavezqueloscerros-prog/soluciones-web-pymes.git
cd soluciones-web-pymes
```

---

## PASO 3: Descargar los Archivos Compilados

1. **Descarga el archivo `github-migration.zip`** desde esta conversación
2. **Extrae los archivos**
3. Deberías ver:
   ```
   - index.html
   - robots.txt
   - sitemap.xml
   - assets/
     ├── index-BIoT9xCS.css
     ├── index-B5bkowjf.js
   ```

---

## PASO 4: Actualizar tu Repositorio GitHub

En tu terminal (dentro de la carpeta `soluciones-web-pymes`):

```bash
# 1. Si tienes archivos viejos, los eliminas (OPCIONAL)
rm -rf *  # ⚠️ Cuidado: esto borra todo

# 2. Copia los archivos compilados aquí
# (Arrastra los archivos de `github-migration/` a esta carpeta)

# 3. Verifica los archivos
ls -la

# 4. Añade los archivos a Git
git add .

# 5. Haz commit
git commit -m "Migración desde Hostinger AI Builder a GitHub Pages"

# 6. Sube a GitHub
git push origin main
```

---

## PASO 5: Activar GitHub Pages

1. Ve a tu repositorio: https://github.com/cadavezqueloscerros-prog/soluciones-web-pymes
2. Click en **Settings** (⚙️)
3. En el menú izquierdo, busca **Pages**
4. En "Source", selecciona: **Deploy from a branch**
5. Selecciona rama: **main**
6. Selecciona carpeta: **/ (root)**
7. Click en **Save**

✅ Tu sitio estará en: `https://cadavezqueloscerros-prog.github.io/soluciones-web-pymes/`

---

## PASO 6: Apuntar tu Dominio desde Hostinger

### Opción A: Usar GitHub Pages Domain (Recomendado)

1. En **GitHub → Settings → Pages**
2. En "Custom domain", escribe tu dominio: `tudominio.com`
3. GitHub genera un CNAME automáticamente

### Opción B: Configurar DNS en Hostinger (Si quieres más control)

1. Ve a https://hpanel.hostinger.com
2. Selecciona tu dominio
3. Ve a **DNS**
4. Añade estos registros:

```
Tipo: A
Nombre: @ (o tu dominio)
Contenido: 185.199.108.153
TTL: 3600

Tipo: A
Nombre: @
Contenido: 185.199.109.153
TTL: 3600

Tipo: A
Nombre: @
Contenido: 185.199.110.153
TTL: 3600

Tipo: A
Nombre: @
Contenido: 185.199.111.153
TTL: 3600

Tipo: CNAME
Nombre: www
Contenido: cadavezqueloscerros-prog.github.io
TTL: 3600
```

5. Click en **Save**
6. Espera 5-30 minutos (propagación de DNS)

---

## PASO 7: Verificar que Funciona

```bash
# En terminal:
ping tudominio.com

# O abre en navegador:
# https://tudominio.com
# https://www.tudominio.com
```

---

## ¿Cómo Editar tu Sitio en el Futuro?

### Sin perder créditos de IA de Hostinger:

#### Opción 1: Editar HTML/CSS directamente
```bash
# Abre index.html en VS Code o un editor de texto
# Haz cambios
# Luego:
git add .
git commit -m "Actualización del sitio"
git push origin main
# Se publica automáticamente en GitHub Pages
```

#### Opción 2: Usar Claude (¡Yo!)
Simplemente comparte conmigo:
- ¿Qué quieres cambiar?
- ¿Qué sección?
- ¿Qué contenido?

Y yo edito el HTML/CSS por ti. ✨

---

## Troubleshooting

### ❌ "Mi dominio no apunta correctamente"
- Espera 24-48 horas (propagación de DNS)
- Verifica en: https://dns.google/ que tu dominio apunte a GitHub Pages

### ❌ "Veo un 404"
- Verifica en GitHub Settings → Pages que esté activado
- Asegúrate de que `index.html` está en la raíz del repo

### ❌ "Mi sitio se ve raro"
- GitHub Pages necesita `index.html` en la raíz (✅ Ya está)
- Los archivos están en `assets/` (✅ Configurado correctamente)

---

## 📞 Resumen Rápido

| Paso | Acción | Tiempo |
|------|--------|--------|
| 1 | Descarga archivos compilados | 1 min |
| 2 | Clona tu repo GitHub | 1 min |
| 3 | Copia archivos a la carpeta | 1 min |
| 4 | Git add, commit, push | 5 min |
| 5 | Activa GitHub Pages en Settings | 5 min |
| 6 | Configura dominio en Hostinger | 10 min |
| 7 | Espera propagación DNS | 30 min - 24h |

**Total: 50 minutos** (sin esperar DNS)

---

¿Preguntas? Cuéntame dónde te atascas y te ayudo. 🚀
