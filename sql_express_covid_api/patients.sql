CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    status ENUM('recovered', 'positive', 'dead') NOT NULL,
    in_date_at DATE NOT NULL,
    out_date_at DATE
);
