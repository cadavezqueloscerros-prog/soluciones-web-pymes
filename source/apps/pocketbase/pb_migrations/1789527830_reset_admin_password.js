/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    // Migración histórica neutralizada: nunca restablecer contraseñas desde código.
  },
  (app) => {
    // No-op: no revertimos el restablecimiento de contraseña.
  },
);
