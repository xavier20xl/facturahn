# PROYECTO - IS711 II PAC 2026

API de facturación electrónica y control de ventas **(FacturaHN)**

## Responsable

Carlos Xavier López Mendoza — 20182030892

## Recursos necesarios

- VS Code
- Git
- Node.js (v24+)
- Docker Desktop

## Para clonar el repositorio

Ejecutar el siguiente comando desde la consola de su computadora (después de haber instalado git):

```bash
git clone https://github.com/xavier20xl/facturahn.git
```

## Para correr el servidor (con Docker)

Paso 1 — Abrir Docker Desktop y esperar a que esté corriendo.

Paso 2 — Levantar el contenedor de MySQL:

```bash
cd db-facturahn
docker compose up -d
cd ..
```

Paso 3 — Instalar dependencias:

```bash
cd api-facturahn
npm install
```

Paso 4 — Configurar las variables de entorno:

```bash
cp .env.example .env
```

Luego editar el archivo `.env` con los valores necesarios. Para el `JWT_SECRET`, generar una clave aleatoria con el siguiente comando y pegarla en el archivo:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

```env
PORT=3000

DB_HOST=localhost
DB_USER=facturahn
DB_PASSWORD=facturahn2026
DB_NAME=facturahn_db
DB_PORT=3309

JWT_SECRET=facturahn_secret_key_2026
```

Paso 5 — Arrancar el servidor en modo desarrollo:

```bash
npm run dev
```

## Endpoints disponibles

### Productos

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/v1/products` | ✗ | Listar productos activos |
| POST | `/api/v1/products` | ✓ | Crear un producto (Admin) |
| PATCH | `/api/v1/products/:id/stock` | ✓ | Actualizar stock (Admin) |

### Facturas

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/v1/invoices` | ✓ | Listar facturas |
| GET | `/api/v1/invoices/:id` | ✓ | Obtener factura por ID con detalle |
| POST | `/api/v1/invoices` | ✓ | Crear una factura (transacción SQL) |
| PATCH | `/api/v1/invoices/:id/void` | ✓ | Anular factura y restituir stock (Admin) |

### Autenticación

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/v1/auth/login` | ✗ | Iniciar sesión |
| POST | `/api/v1/auth/register` | ✗ | Registrar nuevo usuario (CASHIER) |

## Arquitectura del proyecto

El proyecto sigue el patrón **MVC** (Model-View-Controller):

```
FacturaHN/
├── api-facturahn/            # API REST (Express + MVC + Zod)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── middlewares/
│   │   ├── helpers/
│   │   └── db/
│   └── index.js
├── db-facturahn/             # Base de datos MySQL (Docker)
│   ├── init/
│   │   ├── 01-init.sql               # Estructura y semillas
│   │   └── 02-seed-data.sql           # Datos adicionales
│   └── docker-compose.yml
├── .gitignore
└── README.md
```

## Códigos de Estado HTTP

### Códigos de Éxito (2xx)

- **200 OK** — Solicitud exitosa, datos devueltos
- **201 Created** — Recurso creado exitosamente

### Códigos de Error del Cliente (4xx)

- **400 Bad Request** — Datos de entrada inválidos o faltantes
- **401 Unauthorized** — Token de autenticación faltante o inválido
- **404 Not Found** — Recurso no encontrado
- **409 Conflict** — Conflicto (ej: factura ya anulada)

### Códigos de Error del Servidor (5xx)

- **500 Internal Server Error** — Error interno del servidor

## Tecnologías utilizadas

- **Express** — Framework web para Node.js
- **dotenv** — Manejo de variables de entorno
- **Zod** — Validación de esquemas
- **bcrypt** — Hash de contraseñas
- **jsonwebtoken** — Tokens JWT
- **MySQL2** — Conexión a base de datos
- **Docker** — Contenedor para MySQL

## Validaciones

Todos los recursos validan sus datos con **Zod** antes de llegar al modelo:

- **Productos:** `code`, `name`, `price` (positivo), `stock` (entero >= 0). Esquemas `.strict()`: campos extra son rechazados.
- **Facturas:** `customer_name`, `items` (mínimo 1), cada item con `product_id` y `quantity` (enteros positivos).
- **Stock:** `stock_to_add` debe ser un número entero.

## Reglas de negocio

- **Transacción Atómica:** La creación de facturas se procesa dentro de una transacción SQL (BEGIN...COMMIT/ROLLBACK).
- **Validación de Stock:** Antes de emitir una factura se verifica que cada producto tenga stock suficiente.
- **Cálculo en Servidor:** Subtotal, ISV (15%) y Total se calculan automáticamente en el servidor.
- **Anulación y Restitución:** Al anular una factura se restituye el stock de cada producto mediante una transacción SQL.

## Middlewares

### isAuth

Middleware de autenticación que valida la presencia de encabezados de autorización en las peticiones. Requerido para endpoints de escritura (POST, PATCH).
