const app = require('./server/server');

app.listen(process.env.PORT || 4000, () => {
  console.log('Listening');
});
