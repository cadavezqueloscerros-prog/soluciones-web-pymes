# 🔗 Configuración de Dominio (Completa)

Guía detallada sobre cómo apuntar tu dominio de Hostinger a GitHub Pages.

---

## 🎯 Resumen Rápido

| Acción | Tiempo | Dificultad |
|--------|--------|-----------|
| Cambiar DNS en Hostinger | 10 min | ⭐ Fácil |
| Verificar propagación | 5-30 min | ⭐ Automático |
| Configurar CNAME en GitHub | 5 min | ⭐ Fácil |

---

## 📋 Opción A: Dejar que GitHub lo Haga (MÁS FÁCIL)

### Paso 1: Ir a GitHub Settings

1. Ve a: https://github.com/cadavezqueloscerros-prog/soluciones-web-pymes
2. Click en **Settings** (⚙️) arriba a la derecha
3. En el menú izquierdo, busca **Pages**

### Paso 2: Agregar Dominio Custom

1. Scroll hasta **"Custom domain"**
2. Escribe tu dominio: `tudominio.com`
   - ⚠️ SIN `www` al principio
   - Ejemplo correcto: `miagencia.com`
   - Ejemplo incorrecto: `www.miagencia.com`
3. Click en **Save**

### Paso 3: GitHub Crea el CNAME

GitHub automáticamente:
- ✅ Crea un archivo `CNAME` en tu repo
- ✅ Te dice qué registros DNS agregar
- ✅ Genera un certificado HTTPS

### Paso 4: Actualizar DNS en Hostinger

1. Ve a: https://hpanel.hostinger.com
2. Selecciona tu dominio
3. Click en **DNS**
4. Busca los registros **A**
5. Edita o agrega:

```
Tipo: A
Nombre: @
TTL: 3600
Contenido: 185.199.108.153

Tipo: A
Nombre: @
TTL: 3600
Contenido: 185.199.109.153

Tipo: A
Nombre: @
TTL: 3600
Contenido: 185.199.110.153

Tipo: A
Nombre: @
TTL: 3600
Contenido: 185.199.111.153
```

6. Para el www (opcional pero recomendado):

```
Tipo: CNAME
Nombre: www
TTL: 3600
Contenido: cadavezqueloscerros-prog.github.io
```

7. Click en **Save**
8. **Espera 5-30 minutos** (propagación de DNS)

### Paso 5: Verificar

```bash
# En terminal:
nslookup tudominio.com

# Deberías ver las IPs de GitHub
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

---

## 📋 Opción B: DNS Manual (Más Control)

Si prefieres hacer todo manualmente:

### Paso 1: No agregues dominio en GitHub aún

### Paso 2: Actualizar DNS en Hostinger

1. Ve a: https://hpanel.hostinger.com
2. Dominio → DNS

**Agrega estos registros:**

```
TIPO: A
Nombre: @
Contenido: 185.199.108.153
TTL: 3600

TIPO: A
Nombre: @
Contenido: 185.199.109.153
TTL: 3600

TIPO: A
Nombre: @
Contenido: 185.199.110.153
TTL: 3600

TIPO: A
Nombre: @
Contenido: 185.199.111.153
TTL: 3600

TIPO: CNAME
Nombre: www
Contenido: cadavezqueloscerros-prog.github.io
TTL: 3600
```

3. Click **Save**

### Paso 3: Agregar CNAME en GitHub

1. En tu repo, crea un archivo llamado `CNAME` (sin extensión)
2. Contenido:
   ```
   tudominio.com
   ```
3. Haz commit y push:
   ```bash
   git add CNAME
   git commit -m "Agregar configuración de dominio custom"
   git push origin main
   ```

### Paso 4: GitHub Detecta el CNAME

- GitHub automáticamente ve el archivo `CNAME`
- Genera un certificado HTTPS
- Tu dominio apunta correctamente

### Paso 5: Esperar y Verificar

- Espera 5-30 minutos
- Abre: https://tudominio.com
- Deberías ver tu sitio ✅

---

## 🔍 Verificar Que Todo Funciona

### Verificación 1: DNS

**En línea (más fácil):**
- Ve a: https://dns.google/
- Escribe tu dominio
- Verifica que apunta a GitHub (185.199.108.x)

**En terminal:**
```bash
nslookup tudominio.com

# Resultado esperado:
# Address: 185.199.108.153
# Address: 185.199.109.153
# ...
```

### Verificación 2: HTTPS

```bash
curl -I https://tudominio.com

# Deberías ver:
# HTTP/2 200
# (Significa que HTTPS funciona)
```

### Verificación 3: Navegador

1. Abre: `https://tudominio.com`
2. ¿Ves tu sitio? ✅ Sí
3. ¿Hay un candado 🔒? ✅ Sí
4. ¿El contenido es correcto? ✅ Sí

---

## 🚨 Si Algo No Funciona

### ❓ "Mi dominio muestra un ERROR 404"

**Causa posible 1**: DNS no ha propagado
- **Solución**: Espera 24 horas y vuelve a intentar

**Causa posible 2**: GitHub Pages no está activado
- **Solución**: Ve a Settings → Pages y verifica que esté activado

**Causa posible 3**: El CNAME en GitHub es incorrecto
- **Solución**: Edita el archivo `CNAME` y asegúrate de que dice tu dominio sin "www"

### ❓ "Veo HTTPS pero el sitio es lento"

**Causa**: El certificado se está generando
- **Solución**: Espera 2-3 minutos más

### ❓ "Mi dominio www no funciona, solo el principal"

**Solución**: Agrega el registro CNAME para www:
```
Tipo: CNAME
Nombre: www
Contenido: cadavezqueloscerros-prog.github.io
```

### ❓ "Tengo un dominio viejo que apuntaba a otro lado"

**Solución**: 
1. Espera a que expire el viejo DNS (TTL)
2. Actualiza los registros A
3. Espera 24-48 horas

---

## 📊 Registros DNS Correctos

| Tipo | Nombre | Contenido | TTL |
|------|--------|-----------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| CNAME | www | cadavezqueloscerros-prog.github.io | 3600 |

**Nota**: El `@` significa "tu dominio principal"

---

## ⏱️ Tiempos de Propagación

| ISP / Servicio | Tiempo |
|---|---|
| Google (8.8.8.8) | 5 minutos |
| CloudFlare | 15 minutos |
| Tu ISP local | 30 minutos - 2 horas |
| Global | 24-48 horas (máximo) |

**Realidad**: Generalmente funciona en 30 minutos.

---

## 🔐 Certificado HTTPS

GitHub Pages **automáticamente**:
- ✅ Genera certificado HTTPS para tu dominio
- ✅ Lo renueva cada 3 meses
- ✅ Configura redirección automática (HTTP → HTTPS)

**Tiempo**: Hasta 24 horas desde que apuntas el dominio

**Verificación**: Busca un candado 🔒 en la barra de direcciones

---

## 💡 Mejores Prácticas

### ✅ Recomendado:

- Agrega ambos: `tudominio.com` y `www.tudominio.com`
- Usa TTL bajo (3600) durante cambios
- Verifica DNS con https://dns.google/
- Espera antes de cancelar el hosting anterior

### ❌ No hagas:

- No cambies DNS sin hacer backup
- No uses TTL muy alto (>86400) durante cambios
- No borres archivos sin antes hacer push
- No canceles Hostinger hasta que DNS funcione

---

## 🆘 Contacto

Si algo no funciona después de seguir estos pasos:

1. Verifica los registros DNS son exactos
2. Espera 24 horas
3. Si aún no funciona, cuéntame:
   - ¿Qué ves en el navegador?
   - ¿Qué dice `nslookup tudominio.com`?
   - ¿GitHub Pages está activado?

Y lo arreglamos juntos. 🔧

---

**Status**: ✅ Listo para configurar  
**Tiempo estimado**: 15 minutos  
**Dificultad**: ⭐ Fácil (solo copiar registros)
