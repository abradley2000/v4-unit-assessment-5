CREATE TABLE helo_users 
(
    id SERIAL PRIMARY KEY,
    username varchar(120) NOT NULL,
    password varchar(120) NOT NULL,
    profile_pic TEXT
);

CREATE TABLE helo_posts
(
    id SERIAL PRIMARY KEY,
    title varchar(45) NOT NULL,
    content TEXT,
    img TEXT,
    author_id INTEGER REFERENCES helo_users(id),
    date_created TIMESTAMP
);