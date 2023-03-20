import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, message, name } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
    }

    const newMessage = {
      email,
      message,
      name,
    };

    let client;

    try {
      client = await MongoClient.connect(
        "mongodb+srv://hristijan:WWC1IupgS5loeUy6@cluster0.9lmkdlw.mongodb.net/my-site?retryWrites=true&w=majority"
      );
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed" });
      client.close();
    }

    const db = client.db();

    let result;
    try {
      result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      res.status(500).json({ message: "Could not insert message" });
      client.close();
    }

    client.close();

    res
      .status(201)
      .json({ message: "succesfuly stored in a database", newMessage });
  }
  return;
}

export default handler;
