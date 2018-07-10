import db from './../connection';
import log from 'fancy-log';

db.query('CREATE TABLE public.users(created_at timestamp with time zone NOT NULL,name text COLLATE pg_catalog."default" NOT NULL,email text COLLATE pg_catalog."default",phone_number text COLLATE pg_catalog."default",password text COLLATE pg_catalog."default" NOT NULL,photo text COLLATE pg_catalog."default",id uuid NOT NULL,updated_at timestamp with time zone NOT NULL) WITH(OIDS = FALSE) TABLESPACE pg_default')
    .then((res) => {
        log(res);
    })
    .catch((err) => {
        log(res);
    });