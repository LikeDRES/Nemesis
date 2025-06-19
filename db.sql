use nemesis;

drop table if exists login;
CREATE TABLE login (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(50) NOT NULL,
  contrasena VARCHAR(50) NOT NULL
);

INSERT INTO login (usuario, contrasena) VALUES
  ('Andres', 'Keloke12'),
  ('Arin', 'Arin12');

select * from login;

select * from users;

select * from users where usuario = 'David12';

CREATE TABLE IF NOT EXISTS users (
    usuario varchar(100) not null primary key,
    name varchar(50) not null,
    password varchar(255) not null
);

create table if not exists products (
	id int(200) unsigned auto_increment primary key,
    name varchar(100) not null,
    description varchar(200) not null,
    price int(200) unsigned not null,
    barcode int(200) unsigned not null
);

select * from products;

show create table products;

INSERT INTO products (name, description, price, barcode)
VALUES ('Medicamento A', 'Descripción del Medicamento A', 15.99, 1234567890);

INSERT INTO products (name, description, price, barcode)
VALUES ('Medicamento B', 'Descripción del Medicamento B', 12.50, 1876543210);

INSERT INTO products (name, description, price, barcode)
VALUES ('Medicamento C', 'Descripción del Medicamento C', 9.99, 1468135790);

INSERT INTO products (name, description, price, barcode)
VALUES ('Medicamento D', 'Descripción del Medicamento D', 18.75, 1357924680);

ALTER TABLE `products`
ADD COLUMN `quantify` int unsigned NOT NULL;

UPDATE products
SET quantify = 200
WHERE id = 1;

UPDATE products
SET quantify = 500
WHERE id = 2;

UPDATE products
SET quantify = 120
WHERE id = 3;

UPDATE products
SET quantify = 350
WHERE id = 4;

CREATE TABLE cart_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  quantity INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

