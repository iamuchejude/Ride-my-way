const date_provided = Date.parse('10-10-2018');
const current_date = Date.parse(new Date());

if(date_provided < current_date) {
  console.log('Please provide a future date');
}