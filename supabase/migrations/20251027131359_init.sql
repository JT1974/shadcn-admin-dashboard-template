-- Add users table to public schema
create table public.users (
  id uuid not null references auth.users on delete cascade,
  "createdAt" timestamp with time zone not null default now(),
  firstname text null default 'Anonymous'::text,
  lastname text null,
  email text null,
  phone text null,
  "updatedAt" timestamp with time zone null default now(),
  "isAdmin" boolean not null default false,
  roles text[] null,
  position text null,
  preferences json null,
  "updatedBy" uuid null default auth.uid (),
  constraint profiles_pkey primary key (id),
  constraint profiles_email_key unique (email),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;

-- Add function to link public.users with auth.users
create or replace function add_new_user_to_users_table()
    returns trigger
    security definer
    set search_path = ''
    as $$
    begin
      insert into public.users (id, email, firstname, lastname)
      values (new.id, new.email, new.user_metadata->>'firstname', new.user_metadata->>'lastname');
      return new;
    end;
    $$ language plpgsql;

-- Add trigger to to link public.users with auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row
execute function add_new_user_to_users_table ();