import db from './../connection';
import log from 'fancy-log';

db.query('CREATE TABLE public.ride_offer_requests(id uuid NOT NULL,ride_id uuid NOT NULL,user_id uuid NOT NULL,created_at text COLLATE pg_catalog."default" NOT NULL,status request_status NOT NULL,updated_at timestamp with time zone NOT NULL) WITH(OIDS = FALSE) TABLESPACE pg_default;')
    .then((res) => {
        log(res);
    })
    .catch((err) => {
        log(err);
    });