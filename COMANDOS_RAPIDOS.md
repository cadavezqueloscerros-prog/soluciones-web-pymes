# ⚡ Comandos Rápidos (Copy-Paste)

Si eres de terminal, copia y pega estos comandos en orden.

---

## 🖥️ En Windows (PowerShell)

```powershell
# 1. Navega a donde guardes tus proyectos
cd ~/Documents

# 2. Clona tu repo
git clone https://github.com/cadavezqueloscerros-prog/soluciones-web-pymes.git
cd soluciones-web-pymes

# 3. Borra archivos viejos (si los hay)
Remove-Item -Path * -Force -Recurse
Remove-Item -Path .git -Force -Recurse  # ⚠️ Cuidado: esto borra .git también!

# 4. Re-inicializa Git
git init
git remote add origin https://github.com/cadavezqueloscerros-prog/soluciones-web-pymes.git
git branch -M main

# 5. Copia los archivos compilados aquí
# (Arrastra los archivos de la carpeta "github-migration" aquí)

# 6. Verifica que están
dir

# 7. Sube a GitHub
git add .
git commit -m "Migración desde Hostinger AI Builder a GitHub Pages"
git push -u origin main
```

---

## 🍎 En Mac/Linux

```bash
# 1. Navega a donde guardes tus proyectos
cd ~/Documentos
# O en Linux:
# cd ~/Documents

# 2. Clona tu repo
git clone https://github.com/cadavezqueloscerros-prog/soluciones-web-pymes.git
cd soluciones-web-pymes

# 3. Borra archivos viejos (si los hay)
rm -rf * .git

# 4. Re-inicializa Git
git init
git remote add origin https://github.com/cadavezqueloscerros-prog/soluciones-web-pymes.git
git branch -M main

# 5. Copia los archivos compilados aquí
# (Arrastra los archivos de la carpeta "github-migration" aquí)

# 6. Verifica que están
ls -la

# 7. Sube a GitHub
git add .
git commit -m "Migración desde Hostinger AI Builder a GitHub Pages"
git push -u origin main
```

---

## 📲 Alternativamente: Si prefieres NO usar Terminal

### Opción 1: GitHub Desktop (Interfaz gráfica)
1. Descarga: https://desktop.github.com/
2. Clona: `https://github.com/cadavezqueloscerros-prog/soluciones-web-pymes.git`
3. Copia los archivos compilados a la carpeta del proyecto
4. En GitHub Desktop: "Publish branch"
5. Listo ✅

### Opción 2: GitHub Web (Cero instalación)
1. Ve a: https://github.com/cadavezqueloscerros-prog/soluciones-web-pymes
2. Click en `Add file` → `Upload files`
3. Arrastra los archivos compilados
4. Click en `Commit changes`
5. Listo ✅

---

## 🔐 Si Git te pide Credenciales

### Opción A: Token de GitHub (Recomendado)

1. Ve a GitHub: Configuración → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Dale permisos: `repo`, `workflow`
4. Copia el token
5. Cuando Git pida contraseña, pega el token

### Opción B: SSH Key

```bash
# Genera clave SSH
ssh-keygen -t ed25519 -C "cadavezqueloscerros@gmail.com"

# Sigue las instrucciones y presiona Enter

# Copia la clave pública
cat ~/.ssh/id_ed25519.pub

# Ve a GitHub: Settings → SSH keys → New SSH key
# Pega la clave

# Luego, cambia tu repo URL de HTTPS a SSH:
git remote set-url origin git@github.com:cadavezqueloscerros-prog/soluciones-web-pymes.git
```

---

## ✅ Verificar que todo Funcionó

```bash
# Ver estado actual
git status

# Ver últimos commits
git log --oneline

# Ver qué rama estamos
git branch

# Ver URL remoto
git remote -v
```

---

## 🌐 Cambiar DNS en Hostinger (Terminal - Avanzado)

Si ya tienes acceso a tu VPS/hosting de Hostinger:

```bash
# SSH a tu servidor
ssh usuario@tudominio.com

# Ver DNS actual
nslookup tudominio.com

# Actualizar DNS (requiere acceso root)
# [Esto depende de tu hosting específico - mejor hazlo desde panel web]
```

**Más fácil**: Hazlo desde https://hpanel.hostinger.com directamente (no necesita terminal)

---

## 🆘 Si Algo Sale Mal

### Error: "fatal: destination path already exists"
```bash
# Solución:
rm -rf soluciones-web-pymes
git clone https://github.com/cadavezqueloscerros-prog/soluciones-web-pymes.git
```

### Error: "Permission denied (publickey)"
```bash
# Solución: Usa HTTPS en lugar de SSH
git remote set-url origin https://github.com/cadavezqueloscerros-prog/soluciones-web-pymes.git
git push -u origin main
```

### Error: "rejected because the tip of your current branch is behind"
```bash
# Solución:
git pull origin main
# Luego:
git push origin main
```

### Sitio no aparece en GitHub Pages
```bash
# Solución: Verifica que index.html está en la raíz
ls -la | grep index.html

# Y que GitHub Pages está activado en Settings (no puede ser rama vacía)
git log --all
```

---

## 📞 Resumen de Comandos Principales

| Comando | Qué hace |
|---------|----------|
| `git clone URL` | Descarga el repo |
| `git add .` | Prepara cambios |
| `git commit -m "mensaje"` | Guarda cambios localmente |
| `git push` | Sube a GitHub |
| `git pull` | Descarga últimos cambios |
| `git status` | Ver estado actual |
| `git log` | Ver historial |

---

## 🎯 Si Copias y Pegas Todo en Orden:

**Tiempo total: 10 minutos** ⚡

1. Terminal: Comandos de clonación
2. Explorador: Copiar archivos compilados
3. Terminal: Git add, commit, push
4. Web: Activar GitHub Pages en Settings
5. Web: Cambiar DNS en Hostinger
6. Esperar 30 minutos
7. ✅ Listo

---

¿Necesitas ayuda con algún comando? Cuéntame exactamente cuál es el error. 🔧
