-- Enriquecimiento de la base de datos
-- Datos adicionales para pruebas

-- Usuarios adicionales
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`) VALUES
(4, 'Carlos Mendoza', 'carlos@factura.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'CASHIER'),
(5, 'Ana García', 'ana@factura.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'CASHIER'),
(6, 'Pedro Martínez', 'pedro@factura.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'ADMIN'),
(7, 'María López', 'maria.lopez@factura.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'CASHIER'),
(8, 'José Hernández', 'jose@factura.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'CASHIER'),
(9, 'Lucía Ramírez', 'lucia@factura.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'CASHIER'),
(10, 'Roberto Díaz', 'roberto@factura.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'CASHIER'),
(11, 'Sofía Torres', 'sofia@factura.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'CASHIER'),
(12, 'Diego Castillo', 'diego@factura.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'ADMIN'),
(13, 'Valentina Flores', 'valentina@factura.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'CASHIER'),
(14, 'Andrés Rivera', 'andres@factura.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'CASHIER'),
(15, 'Camila Ortiz', 'camila@factura.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'CASHIER'),
(16, 'Fernando Vega', 'fernando@factura.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'ADMIN'),
(17, 'Gabriela Cruz', 'gabriela@factura.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'CASHIER'),
(18, 'Héctor Medina', 'hector@factura.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'CASHIER');

-- Productos adicionales
INSERT INTO `products` (`id`, `code`, `name`, `price`, `stock`, `is_active`) VALUES
(4, 'PROD-004', 'Monitor LED 24"', 185.00, 8, TRUE),
(5, 'PROD-005', 'Webcam HD 1080p', 45.00, 20, TRUE),
(6, 'PROD-006', 'Audífonos Bluetooth', 35.00, 15, TRUE),
(7, 'PROD-007', 'Hub USB 4 Puertos', 12.00, 30, TRUE),
(8, 'PROD-008', 'Silla Ergonómica', 220.00, 3, TRUE),
(9, 'PROD-009', 'Escritorio Eléctrico', 350.00, 2, TRUE),
(10, 'PROD-010', 'Tablet 10"', 280.00, 6, TRUE),
(11, 'PROD-011', 'Impresora Láser', 190.00, 4, TRUE),
(12, 'PROD-012', 'Cable HDMI 2m', 8.00, 100, TRUE),
(13, 'PROD-013', 'Mousepad XXL', 15.00, 40, TRUE),
(14, 'PROD-014', 'UPS 850VA', 130.00, 7, TRUE),
(15, 'PROD-015', 'Disco SSD 1TB', 95.00, 12, TRUE),
(16, 'PROD-016', 'Router WiFi 6', 75.00, 10, TRUE),
(17, 'PROD-017', 'Base para Laptop', 25.00, 25, TRUE),
(18, 'PROD-018', 'Teclado Inalámbrico', 40.00, 18, TRUE);

-- Facturas
INSERT INTO `invoices` (`id`, `invoice_number`, `user_id`, `customer_name`, `customer_rtn_id`, `subtotal`, `tax`, `total`, `status`) VALUES
(1, 'FAC-0001', 1, 'Juan Pérez', '08011990123456', 465.00, 69.75, 534.75, 'ISSUED'),
(2, 'FAC-0002', 2, 'María García', '05011985123457', 450.00, 67.50, 517.50, 'ISSUED'),
(3, 'FAC-0003', 3, 'Carlos Rodríguez', '08021992123458', 23.00, 3.45, 26.45, 'ISSUED'),
(4, 'FAC-0004', 1, 'Ana Martínez', '15011988123459', 450.00, 67.50, 517.50, 'ISSUED'),
(5, 'FAC-0005', 2, 'Pedro Sánchez', '08031995123460', 65.00, 9.75, 74.75, 'VOIDED'),
(6, 'FAC-0006', 4, 'Luisa Fernández', '06011993123461', 235.00, 35.25, 270.25, 'ISSUED'),
(7, 'FAC-0007', 5, 'Diego Morales', '08041994123462', 500.00, 75.00, 575.00, 'ISSUED'),
(8, 'FAC-0008', 6, 'Sofía Herrera', '03011986123463', 90.00, 13.50, 103.50, 'ISSUED'),
(9, 'FAC-0009', 7, 'José Vargas', '08051996123464', 350.00, 52.50, 402.50, 'ISSUED'),
(10, 'FAC-0010', 8, 'Gabriela Rivas', '07011997123465', 130.00, 19.50, 149.50, 'ISSUED'),
(11, 'FAC-0011', 9, 'Roberto Pineda', '08061998123466', 280.00, 42.00, 322.00, 'ISSUED'),
(12, 'FAC-0012', 10, 'Camila Suazo', '04011989123467', 185.00, 27.75, 212.75, 'ISSUED'),
(13, 'FAC-0013', 11, 'Fernando Paz', '08071999123468', 95.00, 14.25, 109.25, 'VOIDED'),
(14, 'FAC-0014', 12, 'Valentina Rivas', '02011990123469', 220.00, 33.00, 253.00, 'ISSUED'),
(15, 'FAC-0015', 13, 'Héctor Luna', '08082000123470', 75.00, 11.25, 86.25, 'ISSUED');

-- Detalles de facturas
INSERT INTO `invoice_details` (`id`, `invoice_id`, `product_id`, `quantity`, `unit_price`, `subtotal`) VALUES
(1, 1, 1, 1, 450.00, 450.00),
(2, 1, 2, 1, 15.00, 15.00),
(3, 2, 1, 1, 450.00, 450.00),
(4, 3, 2, 1, 15.00, 15.00),
(5, 3, 12, 1, 8.00, 8.00),
(6, 4, 1, 1, 450.00, 450.00),
(7, 5, 3, 1, 65.00, 65.00),
(8, 6, 4, 1, 185.00, 185.00),
(9, 6, 5, 1, 45.00, 45.00),
(10, 6, 12, 1, 5.00, 5.00),
(11, 7, 1, 1, 450.00, 450.00),
(12, 7, 5, 1, 45.00, 45.00),
(13, 7, 12, 1, 5.00, 5.00),
(14, 8, 2, 1, 15.00, 15.00),
(15, 8, 3, 1, 65.00, 65.00),
(16, 8, 12, 2, 5.00, 10.00),
(17, 9, 8, 1, 350.00, 350.00),
(18, 10, 14, 1, 130.00, 130.00),
(19, 11, 10, 1, 280.00, 280.00),
(20, 12, 4, 1, 185.00, 185.00),
(21, 13, 15, 1, 95.00, 95.00),
(22, 14, 9, 1, 220.00, 220.00),
(23, 15, 17, 3, 25.00, 75.00);
