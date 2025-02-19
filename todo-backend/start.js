const app = require("./server")

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
