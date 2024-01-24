const app = require("./app");

const port = process.env.PORT || 5000;
app.listen(port, () => {
  process.env.NODE_ENV = "development"
    ? console.log(`Local: http://localhost:${port}`)
    : null;
});
