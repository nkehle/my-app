// backend.js
import express, { json } from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey there feller!");
});


const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };

const deleteUser = (indexToDelete) => {
  if (indexToDelete !== -1) {
    const deletedUser = users["users_list"].splice(indexToDelete, 1)[0];
    return { success: true, deletedUser };
  }

  console.log("User not found");
  return { success: false };
};
  
  
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const id = `${Math.floor(100000 + Math.random() * 900000)}`;
  const addedUser = addUser({id: id ,...userToAdd});
  res.status(201).json(addedUser);
});
  
app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const deleteResult = deleteUser(id);

  if (deleteResult.success) {
    res.status(204).send();
  } else {
    res.status(404).send("User not found.");
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};
