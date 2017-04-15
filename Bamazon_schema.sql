USE Bamazon;
CREATE table products (
	item_id integer (20) auto_increment,
    product_name varchar (100),
    department_name varchar (100),
    price decimal (65, 2),
    stock_quanitiy integer (65),
    primary key (item_id)
    );
    
INSERT INTO products VALUES (1, "ESV Study Bible", "Books", 60.00, 57);
INSERT INTO products VALUES (2, "Sol de Janeiro Brazilian Crush Body Fragrance Mist", "Beauty", 65.00, 3);
INSERT INTO products VALUES (3, "Cuties Baby Diapers", "Baby", 18.80, 51);
INSERT INTO products VALUES (4, "Eloquent Javascript", "Books", 29.99, 65);
INSERT INTO products VALUES (5, "Pulleez Sliding Hair Tiesd", "Kids", 45.00, 49);
INSERT INTO products VALUES (6, "Viva Naturals Premium Non-GMO Vitamin C ", "Health", 41.00, 1);
INSERT INTO products VALUES (7, "Flutter & Link Friend Take-Along Toy", "Kids", 11.00, 23);
INSERT INTO products VALUES (8, "For Honor", "Games", 99.00, 61);
INSERT INTO products VALUES (9, "Alalisien-R", "Shoes", 125.00, 38);
INSERT INTO products VALUES (10, "Kong: Skull Island", "Movies", 11.95, 38);







