package ChatCraft.ReservaHoteles;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;

import java.sql.*;

public class DatabaseInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    private static final String DB_NAME  = "reserva_hoteles";
    private static final String BASE_URL = "jdbc:postgresql://localhost:5432/";

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        ConfigurableEnvironment env = applicationContext.getEnvironment();
        String username = env.getProperty("spring.datasource.username", "postgres");
        String password = env.getProperty("spring.datasource.password", "");

        try {
            // Paso 1: crear la base de datos si no existe
            try (Connection conn = DriverManager.getConnection(BASE_URL + "postgres", username, password)) {
                ResultSet rs = conn.createStatement()
                    .executeQuery("SELECT 1 FROM pg_database WHERE datname = '" + DB_NAME + "'");
                if (!rs.next()) {
                    conn.createStatement().executeUpdate("CREATE DATABASE " + DB_NAME);
                    System.out.println(">> Base de datos '" + DB_NAME + "' creada correctamente.");
                } else {
                    System.out.println(">> Base de datos '" + DB_NAME + "' ya existe.");
                }
            }

            // Paso 2: crear tablas si no existen
            try (Connection conn = DriverManager.getConnection(BASE_URL + DB_NAME, username, password)) {

                conn.createStatement().executeUpdate("""
                    CREATE TABLE IF NOT EXISTS usuarios (
                        id_usuario       BIGSERIAL PRIMARY KEY,
                        nombre           VARCHAR(100) NOT NULL,
                        clave            VARCHAR(100) NOT NULL,
                        fecha_nacimiento DATE
                    )
                """);

                conn.createStatement().executeUpdate("""
                    CREATE TABLE IF NOT EXISTS hoteles (
                        id_hotel          BIGSERIAL PRIMARY KEY,
                        nombre            VARCHAR(100) NOT NULL,
                        direccion         VARCHAR(200) NOT NULL,
                        numero_habitacion INTEGER
                    )
                """);

                conn.createStatement().executeUpdate("""
                    CREATE TABLE IF NOT EXISTS habitaciones (
                        id_habitacion   BIGSERIAL PRIMARY KEY,
                        tiempo_alquiler INTEGER,
                        capacidad       INTEGER NOT NULL,
                        precio          DOUBLE PRECISION NOT NULL,
                        id_hotel        BIGINT NOT NULL,
                        CONSTRAINT fk_habitacion_hotel
                            FOREIGN KEY (id_hotel) REFERENCES hoteles(id_hotel)
                    )
                """);

                conn.createStatement().executeUpdate("""
                    CREATE TABLE IF NOT EXISTS alquileres (
                        id_alquiler   BIGSERIAL PRIMARY KEY,
                        id_usuario    BIGINT NOT NULL,
                        id_hotel      BIGINT NOT NULL,
                        id_habitacion BIGINT NOT NULL,
                        fecha_entrada DATE NOT NULL,
                        fecha_salida  DATE NOT NULL,
                        CONSTRAINT fk_alquiler_usuario
                            FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
                        CONSTRAINT fk_alquiler_hotel
                            FOREIGN KEY (id_hotel) REFERENCES hoteles(id_hotel),
                        CONSTRAINT fk_alquiler_habitacion
                            FOREIGN KEY (id_habitacion) REFERENCES habitaciones(id_habitacion)
                    )
                """);

                System.out.println(">> Tablas creadas/verificadas correctamente.");

                // Paso 3: insertar datos solo si están vacías
                ResultSet rs = conn.createStatement().executeQuery("SELECT COUNT(*) FROM usuarios");
                rs.next();
                if (rs.getInt(1) > 0) {
                    System.out.println(">> Ya hay datos. No se reinsertan.");
                    return;
                }

                System.out.println(">> Insertando datos de ejemplo...");

                conn.createStatement().executeUpdate("""
                    INSERT INTO usuarios (nombre, clave, fecha_nacimiento) VALUES
                        ('Carlos López',    'pass1234', '1990-05-15'),
                        ('María García',    'maria456', '1985-08-22'),
                        ('Pedro Martínez',  'pedro789', '1998-03-10'),
                        ('Lucía Fernández', 'lucia000', '2000-11-05'),
                        ('Ana Ruiz',        'ana1111',  '1993-07-30')
                """);

                conn.createStatement().executeUpdate("""
                    INSERT INTO hoteles (nombre, direccion, numero_habitacion) VALUES
                        ('Hotel Mar Azul',      'Calle del Mar 12, Valencia', 50),
                        ('Hotel Sierra Nevada', 'Av. de la Nieve 3, Granada', 30),
                        ('Hotel Ciudad Real',   'Gran Vía 88, Madrid',       120)
                """);

                conn.createStatement().executeUpdate("""
                    INSERT INTO habitaciones (tiempo_alquiler, capacidad, precio, id_hotel) VALUES
                        (3, 2,  89.99, 1),
                        (5, 4, 149.99, 1),
                        (1, 1,  59.99, 1),
                        (7, 2, 110.00, 2),
                        (2, 3,  95.50, 2),
                        (4, 2, 130.00, 3),
                        (3, 1,  75.00, 3),
                        (6, 5, 250.00, 3)
                """);

                conn.createStatement().executeUpdate("""
                    INSERT INTO alquileres (id_usuario, id_hotel, id_habitacion, fecha_entrada, fecha_salida) VALUES
                        (1, 1, 1, '2025-06-01', '2025-06-04'),
                        (2, 2, 4, '2025-07-10', '2025-07-17'),
                        (3, 3, 6, '2025-08-05', '2025-08-09'),
                        (4, 1, 2, '2025-09-20', '2025-09-25'),
                        (1, 3, 7, '2025-10-01', '2025-10-03'),
                        (5, 2, 5, '2025-11-15', '2025-11-20')
                """);

                System.out.println(">> Datos de ejemplo insertados correctamente.");
            }

        } catch (SQLException e) {
            throw new RuntimeException("Error inicializando la base de datos: " + e.getMessage(), e);
        }
    }
}
