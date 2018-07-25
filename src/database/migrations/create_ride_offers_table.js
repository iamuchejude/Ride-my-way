import log from 'fancy-log';
import db from './../connection';

db.query('CREATE TABLE public.ride_offers(id text NOT NULL,user_id text NOT NULL,start_from text COLLATE pg_catalog."default" NOT NULL,destination text COLLATE pg_catalog."default" NOT NULL,seat numeric NOT NULL DEFAULT 1,departure_date text NOT NULL,departure_time text NOT NULL,created_at timestamp with time zone NOT NULL,updated_at timestamp with time zone NOT NULL,CONSTRAINT ride_offers_pkey PRIMARY KEY(id)) WITH(OIDS = FALSE) TABLESPACE pg_default')
  .then((res) => {
    log(res);
  })
  .catch((err) => {
    log(err);
  });
