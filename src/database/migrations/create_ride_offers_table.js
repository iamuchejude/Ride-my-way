import db from './../connection';
import log from 'fancy-log';

db.query('CREATE TABLE public.ride_offers(id uuid NOT NULL,user_id uuid NOT NULL,start_from text COLLATE pg_catalog."default" NOT NULL,destination text COLLATE pg_catalog."default" NOT NULL,price integer NOT NULL DEFAULT 0,seat numeric NOT NULL DEFAULT 1,departure_date "char" NOT NULL,departure_time "char" NOT NULL,created_at timestamp with time zone NOT NULL,updated_at timestamp with time zone NOT NULL,CONSTRAINT ride_offers_pkey PRIMARY KEY(id)) WITH(OIDS = FALSE) TABLESPACE pg_default')
    .then((res) => {
        log(res);
    })
    .catch((err) => {
        log(res);
    });