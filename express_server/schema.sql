drop database if exists overview;
create database overview;

\c overview;

create table product (
  id serial not null,
  name varchar(255),
  slogan varchar(255),
  description text,
  category varchar(255),
  default_price varchar(255),
  primary key (id)
);


create table styles (
  id serial not null,
  product_id int not null,
  name varchar(255),
  sale_price varchar(255),
  original_price varchar(255),
  default_style boolean,
  primary key (id),
  foreign key (product_id) references product(id)
);

create table features (
  id serial not null,
  product_id int not null,
  feature varchar(255),
  value varchar(255),
  primary key (id),
  foreign key (product_id) references product(id)
);

create table related (
  id serial not null,
  current_product_id int not null,
  related_product_id int not null,
  primary key (id),
  foreign key (current_product_id) references product(id)
  -- foreign key (related_prodcut_id) references product(id)
);

create table skus (
  id serial not null,
  styleId int not null,
  size varchar(255),
  quantity varchar(255),
  primary key (id),
  foreign key (styleId) references styles(id)
);

create table photos (
  id serial not null,
  styleId int not null,
  thumbnail_url text,
  url text,
  primary key (id),
  foreign key (styleId) references styles(id)
);

create table cart (
  id serial not null,
  user_session varchar(255),
  product_id int not null,
  active boolean,
  -- sku_id serial,
  -- count varchar(255),
  primary key (id),
  foreign key (product_id) references product(id)
)
-- Aa1Aa1Aa1

\COPY product FROM './db/data/product.csv' csv header;
\COPY styles FROM './db/data/styles.csv' csv header;
\COPY features FROM './db/data/features.csv' csv header;
\COPY photos FROM './db/data/photos.csv' csv header;
\COPY related FROM './db/data/related.csv' csv header;
\COPY skus FROM './db/data/skus.csv' csv header;
\COPY cart FROM './db/data/cart.csv' csv header;

alter table styles rename column default_style to "default?";
alter table photos rename column styleid to style_id;
alter table skus rename column styleId to style_id;

