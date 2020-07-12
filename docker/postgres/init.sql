create extension if not exists "pgcrypto";


CREATE ROLE anonymous;
GRANT anonymous TO current_user;

create table  users
(
    id serial not null primary key,
    name text not null,
    email text not null,
    status text not null,
    password text null,
    token text not null default 'token123',
    role text not null default 'user'
);

INSERT INTO users (email, name, status, password, role) VALUES
('admin@test.com','Super','Active', crypt('password', gen_salt('bf')), 'admin'),
('gloria@test.com','Gloria Ramos','Inactive', crypt('password', gen_salt('bf')), 'user'),
('barns@mail.com','Jeremy Barns','Active', crypt('password', gen_salt('bf')), 'user'),
('john@mail.com','John Doe','Active', crypt('password', gen_salt('bf')), 'user'),
('lopez@mail.com','Judith Lopez','Inactive', crypt('password', gen_salt('bf')), 'user'),
('liam@mail.com','Liam Walters','Active', crypt('password', gen_salt('bf')), 'user'),
('roberta@mail.com','Roberta George','Active', crypt('password', gen_salt('bf')), 'user'),
('terra@gmail.com','Terra Kelly','Active', crypt('password', gen_salt('bf')), 'user'),
('yvonne@test.mail','Yvonne Lawrence',' Inactive', crypt('password', gen_salt('bf')), 'user');

CREATE FUNCTION login(email TEXT, password TEXT) RETURNS TEXT AS
$$
DECLARE
       jwt_token TEXT;
BEGIN
        SELECT token
               INTO jwt_token
               FROM users
               WHERE users.email = $1
                    AND users.password = crypt($2, users.password)
                    AND users.status = 'Active'
                    ;
       RETURN jwt_token::TEXT;
end;
$$ LANGUAGE PLPGSQL VOLATILE STRICT SECURITY DEFINER;
GRANT EXECUTE ON FUNCTION login(email TEXT, password TEXT) TO anonymous;


-- Create the function named `search_users` with a text argument named `search`.
-- This will expose `Query.searchUsers(search: String!, ...)` to GraphQL.
create function search_users(search text)
  -- This function will return a set of users from the `users` table. The
  -- `setof` part is important to PostGraphile, check out our Functions article
  -- to learn why.
  returns setof users as $$
    -- Write our advanced query as a SQL query!
    select *
    from users
    where
      name ilike ('%' || search || '%')
  -- End the function declaring the language we used as SQL and add the
    -- `STABLE` marker so PostGraphile knows its a query and not a mutation.
    $$ LANGUAGE sql stable;

