# ✅ Checklist de Migración

Usa este checklist para no olvidar nada en el proceso de migración.

---

## 📦 FASE 1: Descargar y Preparar (5 minutos)

- [ ] **Descargar** todos los archivos de `github-migration/`
- [ ] **Verificar** que tienes:
  - [ ] `index.html`
  - [ ] `assets/` (carpeta con CSS y JS)
  - [ ] `robots.txt`
  - [ ] `sitemap.xml`
  - [ ] `README.md`
  - [ ] Documentos `.md` (guías)
- [ ] **Guardar** en una carpeta fácil de acceder
- [ ] **Leer** RESUMEN_EJECUTIVO.md

---

## 🔧 FASE 2: Git y GitHub (10 minutos)

### Preparación de Git

- [ ] **Instalar Git** (si no lo tienes)
  - Windows: https://git-scm.com/download/win
  - Mac: `brew install git`
  - Linux: `sudo apt install git`

- [ ] **Configurar Git**
  ```bash
  git config --global user.name "Tu Nombre"
  git config --global user.email "tu-correo@ejemplo.com"
  ```

### Clonar Repo Existente

- [ ] **Clonar** tu repositorio
  ```bash
  git clone https://github.com/cadavezqueloscerros-prog/soluciones-web-pymes.git
  cd soluciones-web-pymes
  ```

- [ ] **Verificar** que estás en la rama correcta
  ```bash
  git branch
  # Deberías ver: * main
  ```

### Actualizar Archivos

- [ ] **Copiar** todos los archivos compilados a esta carpeta
- [ ] **Verificar** que `index.html` está en la raíz
  ```bash
  ls -la | grep index.html
  ```

---

## 📤 FASE 3: Subir a GitHub (10 minutos)

- [ ] **Stage de cambios**
  ```bash
  git add .
  ```

- [ ] **Verificar** cambios preparados
  ```bash
  git status
  # Deberías ver: "Changes to be committed"
  ```

- [ ] **Crear commit**
  ```bash
  git commit -m "Migración desde Hostinger AI Builder a GitHub Pages"
  ```

- [ ] **Hacer push**
  ```bash
  git push origin main
  ```

- [ ] **Verificar** que se subió
  - Ve a: https://github.com/cadavezqueloscerros-prog/soluciones-web-pymes
  - Verifica que ves `index.html` en la raíz

---

## 🌐 FASE 4: Activar GitHub Pages (5 minutos)

- [ ] **Ir a Settings**
  - URL: https://github.com/cadavezqueloscerros-prog/soluciones-web-pymes/settings

- [ ] **Buscar "Pages"** en el menú izquierdo

- [ ] **Configurar Source**
  - [ ] Selecciona: "Deploy from a branch"
  - [ ] Rama: `main`
  - [ ] Carpeta: `/ (root)`
  - [ ] Click en "Save"

- [ ] **Esperar** a que GitHub procese
  - Pueden ser 30 segundos a 2 minutos

- [ ] **Verificar** que tu sitio está en vivo
  - URL: https://cadavezqueloscerros-prog.github.io/soluciones-web-pymes/
  - ¿Se ve el sitio? ✅ Sí / ❌ No

---

## 🔗 FASE 5: Apuntar Dominio (10 minutos)

### Opción A: Usar GitHub (Más Fácil)

- [ ] **En GitHub Settings → Pages**
  - [ ] Scroll hasta "Custom domain"
  - [ ] Escribe: `tudominio.com` (sin www)
  - [ ] Click en "Save"
  - [ ] GitHub crea `CNAME` automáticamente

### Opción B: Usar Hostinger (Más Control)

- [ ] **Ir a Hostinger Panel**
  - URL: https://hpanel.hostinger.com

- [ ] **Seleccionar dominio**

- [ ] **Ir a DNS**

- [ ] **Agregar/Editar registros**
  - [ ] Tipo: A, Nombre: @, Contenido: 185.199.108.153
  - [ ] Tipo: A, Nombre: @, Contenido: 185.199.109.153
  - [ ] Tipo: A, Nombre: @, Contenido: 185.199.110.153
  - [ ] Tipo: A, Nombre: @, Contenido: 185.199.111.153
  - [ ] Tipo: CNAME, Nombre: www, Contenido: cadavezqueloscerros-prog.github.io

- [ ] **Guardar cambios**

- [ ] **Agregar CNAME en GitHub** (si no lo creó automáticamente)
  - Ve a Settings → Pages → Custom domain
  - Escribe: `tudominio.com`
  - Click en "Save"

---

## ⏳ FASE 6: Esperar y Verificar (30 min - 24 horas)

- [ ] **Esperar propagación de DNS**
  - Generalmente: 5-30 minutos
  - Máximo: 24-48 horas

- [ ] **Verificar propagación**
  ```bash
  # En terminal
  nslookup tudominio.com
  # O usa: https://dns.google/
  ```

- [ ] **Probar en navegador**
  - [ ] Abre: https://tudominio.com
  - [ ] ¿Funciona? ✅ Sí / ❌ No

- [ ] **Probar con www**
  - [ ] Abre: https://www.tudominio.com
  - [ ] ¿Funciona? ✅ Sí / ❌ No

- [ ] **Verificar HTTPS**
  - ¿Ves el candado 🔒? ✅ Sí / ❌ No

---

## 🎉 FASE FINAL: Limpiar y Actualizar

- [ ] **Verificar que todo funciona**
  - [ ] Página carga en 2-3 segundos
  - [ ] Botones funcionan
  - [ ] Links funcionan
  - [ ] Imágenes cargan

- [ ] **En Hostinger**
  - [ ] Cancela o cambia el plan de AI Builder
  - [ ] Mantén el dominio activo

- [ ] **Guarda esto para referencia**
  - [ ] Guarda este checklist
  - [ ] Guarda EDITAR_FUTURO.md
  - [ ] Guarda COMANDOS_RAPIDOS.md

- [ ] **Celébra** 🎊
  - ¡Tu sitio ya está en GitHub Pages!

---

## 🆘 Si Algo Falla

| Problema | Solución |
|----------|----------|
| ❌ "Git no está instalado" | Instala desde https://git-scm.com/ |
| ❌ "No puedo hacer push" | Verifica tu GitHub token/SSH key |
| ❌ "Mi sitio muestra 404" | Verifica que GitHub Pages está activado |
| ❌ "Dominio no apunta" | Espera 24 horas, verifica DNS |
| ❌ "Se ve roto el sitio" | Recarga (Ctrl+F5), limpia cache |

**Para cada problema**: Lee INSTRUCCIONES_GITHUB_PAGES.md (Troubleshooting)

---

## 📝 Notas Importantes

- ⚠️ **NO borres** tu repositorio GitHub anterior
- ⚠️ **Espera** a que DNS se propague antes de cancelar Hostinger
- ✅ **GitHub Pages es gratis** y no tiene límite de bandwidth
- ✅ **Mantén** tu dominio de Hostinger activo (cuesta poco)
- ✅ **Los cambios** se publican en 30 segundos después de push

---

## 📞 Contacto

Si te atascas en algo:

1. Lee el documento correspondiente (INSTRUCCIONES, EDITAR_FUTURO, etc.)
2. Verifica troubleshooting
3. Si aún tienes duda: cuéntame exactamente:
   - ¿En qué paso?
   - ¿Qué error ves?
   - ¿Qué has intentado?

Y lo arreglamos juntos. 🔧

---

**Estado**: ✅ Listo para migrar  
**Fecha de inicio recomendada**: Hoy  
**Tiempo total estimado**: 45 minutos

¡Vamos! 🚀
