# Código fuente de Soluciones Web Pymes y Más

Este directorio contiene la exportación editable de Hostinger Horizons. La raíz del repositorio contiene los archivos compilados que usa GitHub Pages.

## Funciones

- Registro e inicio de sesión en PocketBase.
- Agenda de citas y confirmación mediante WhatsApp.
- Panel administrativo con usuarios, citas, resumen de actividad y expedientes.
- Expedientes privados para el administrador con servicio, precio, estado y notas.
- Vista de horarios ocupados que solo publica fecha y hora.

## Backend necesario

GitHub Pages no ejecuta PocketBase. Antes de publicar estas funciones, hay que desplegar PocketBase en un servidor persistente con HTTPS y aplicar las migraciones de `apps/pocketbase/pb_migrations`. Configura `VITE_POCKETBASE_URL` con la URL pública del backend al compilar; en Hostinger Horizons el valor predeterminado es `/hcgi/platform`.

No subas `pb_data`, bases de datos, archivos `.env`, tokens ni el ejecutable de PocketBase. Crea la cuenta de administrador en el backend y asigna el rol `admin` desde su consola. Las migraciones antiguas que establecían una contraseña fija se neutralizaron en esta exportación. Si esa contraseña se aplicó a una cuenta existente, cámbiala antes de usar el panel.

## Compilación

```sh
npm install
npm run build --prefix apps/web
```

El resultado aparece en `dist/apps/web`. Copia `index.html` y `assets/` a la raíz del repositorio cuando el backend esté disponible y probado.
