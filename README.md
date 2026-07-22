# FacturaHN

API de facturación electrónica y control de ventas.

## Estructura del proyecto

```
FacturaHN/
├── api-facturahn/    # API REST con Express
└── db-facturahn/     # Base de datos MySQL (Docker)
```

## Configuración

### Base de datos

```bash
cd db-facturahn
docker compose up -d
```

### Variables de entorno

Copiar `.env.example` a `.env` y configurar:

```
PORT=3000
DB_HOST=localhost
DB_USER=facturahn
DB_PASSWORD=facturahn2026
DB_NAME=facturahn_db
DB_PORT=3309
JWT_SECRET=facturahn_secret_key_2026
```

### Ejecutar

```bash
cd api-facturahn
npm install
npm run dev
```
