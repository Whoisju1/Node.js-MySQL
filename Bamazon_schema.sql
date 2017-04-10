USE Bamazon;
CREATE table products (
	item_id integer (20) not null auto_increment,
    product_name varchar (100),
    department_name varchar (100),
    price decimal (65),
    stock_quanitiy decimal (65),
    primary key (item_id)
    );
    
    