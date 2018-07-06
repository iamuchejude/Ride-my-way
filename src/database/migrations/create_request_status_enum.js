import db from './../connection';
import log from 'fancy-log';

db.query("CREATE TYPE public.request_status AS ENUM ('accepted', 'rejected', 'pending')")
    .then((res) => {
        log(res);
    })
    .catch((err) => {
        log(res);
    });