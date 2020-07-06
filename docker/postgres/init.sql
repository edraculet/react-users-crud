create table  users
(
    id serial not null primary key,
	name text not null,
	email text not null,
	status text not null
);
INSERT INTO users ( email, name, status) VALUES
(' gloria@test.com',' Gloria Ramos',' Inactive '),
(' barns@mail.com',' Jeremy Barns',' Active '),
(' john@mail.com',' John Doe',' Active '),
(' lopez@mail.com',' Judith Lopez',' Inactive '),
(' liam@mail.com',' Liam Walters',' Active '),
(' roberta@mail.com',' Roberta George',' Active '),
(' terra@gmail.com',' Terra Kelly',' Active '),
(' yvonne@test.mail',' Yvonne Lawrence',' Inactive ');