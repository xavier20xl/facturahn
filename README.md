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

## Endpoints

### Productos

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/api/v1/products` | ✗ | Lista productos activos |
| POST | `/api/v1/products` | ✓ | Crear producto (Admin) |
| PATCH | `/api/v1/products/:id/stock` | ✓ | Actualizar stock (Admin) |
