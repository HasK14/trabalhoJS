const app = require("./server");

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
