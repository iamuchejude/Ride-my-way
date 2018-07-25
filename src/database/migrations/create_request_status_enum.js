import log from 'fancy-log';
import db from './../connection';

db.query("CREATE TYPE public.request_status AS ENUM ('accepted', 'rejected', 'pending')")
  .then((res) => {
    log(res);
  })
  .catch((err) => {
    log(err);
  });
