import log from 'fancy-log';
import db from './../connection';

db.query('CREATE TABLE public.ride_offer_requests(id text NOT NULL,ride_id text NOT NULL,user_id text NOT NULL,user_name text NOT NULL,created_at text COLLATE pg_catalog."default" NOT NULL,status request_status NOT NULL,updated_at timestamp with time zone NOT NULL) WITH(OIDS = FALSE) TABLESPACE pg_default')
  .then((res) => {
    log(res);
  })
  .catch((err) => {
    log(err);
  });
