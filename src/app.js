const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");

// Вызываем функцию конфигурации
dotenv.config();

// Адрес сервера и порт
const {
  PORT = 3005,
  API_URL = "http://127.0.0.1",
  MONGO_URL = "mongodb://localhost:27017/backend",
} = process.env;

// Подключение к БД
try {
  mongoose.connect(MONGO_URL);
  console.log("Success connected to MongoDb");
} catch (error) {
  console.log(error);
}

const app = express();

// Функция обработки данных
const helloWorld = (request, response) => {
  response.status(200);
  response.send("Hello, World");
};

// Обработка get-запроса
app.get("/", helloWorld);

// Обработка post-pапроса
app.post("/", (request, response) => {
  response.status(200);
  response.send("Hello from post");
});

// с помощью app.use используем роутер и body-parser (помогает обрабатывать данные, которые приходят в теле сообщения)
app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});
