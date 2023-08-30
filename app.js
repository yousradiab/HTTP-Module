import http from "node:http";

import fs from "fs/promises";

const app = http.createServer(async (request, response) => {
  if (request.url === "/" && request.method === "GET") {
    response.statusCode = 200;

    response.setHeader("Content-Type", "text/plain");
    response.end("Working with HTTP Module and routing");
  } else if (request.url === "/users" && request.method === "GET") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");

    const json = await fs.readFile("users.json");
    response.end(json);
  } else if (request.url === "/users" && request.method === "POST") {
    const user = {
      id: new Date().getTime(),
      image: "https://e1.pngegg.com/pngimages/727/616/png-clipart-hamtaro-brown-and-white-rodent-illustration.png",
      mail: "test@test.dk",
      name: "Hamtaro Test",
      title: "Senior Hamster",
    };
    const json = await fs.readFile("./users.json");
    console.log(json);

    const users = JSON.parse(json);
    console.log(users);
    users.push(user);

    const usersJSON = JSON.stringify(users);
    await fs.writeFile("./users.json", usersJSON);

    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(usersJSON);
  } else if (request.url === "/posts" && request.method === "GET") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");

    const json = await fs.readFile("posts.json");
    response.end(json);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Serveren kører på http:/localhost:${port}`);
});
