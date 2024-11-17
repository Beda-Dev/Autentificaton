"use server";
import bcrypt from "bcrypt";
import { users } from "../../../lib/users";

interface REQ {
  method: "GET" | "POST";
  headers: {
    "Content-Type": string;
  };
  body: {
    email: string;
    password: string;
    name: string;
  };
}

export default async function Sign(req: REQ, res: any) {
  if (req.method === "POST") {
    const {  email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }


    const existingUser = users.find(user => user.email === email || user.name === name);
    if (existingUser) {
      return res.status(409).json({ error: "Un utilisateur avec cet email ou nom d'utilisateur existe déjà." });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      users.push({
        id : users.length+1,
        email : email,
        password: hashedPassword,
        name : name,
      });
      res.status(201).json({ message: "Utilisateur créé", name, email });
      console.log(res.status)
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
      console.error("Erreur lors de la création de l'utilisateur:", error); 
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
