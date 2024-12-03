const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://bharatsinghsaini00:Owrvh1XYhBMAkFe1@cluster0.4vgvv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.json());
app.use(cors());

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
  price: Number,
  image: String,
});

const Book = mongoose.model("Book", bookSchema);

const seedDatabase = async () => {
  try {
    await Book.deleteMany(); // clear existing data

    const books = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        description: "A classic novel about the American Dream",
        price: 20,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110011815/sutterlin-1362879_640-(1).jpg",
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        description: "A powerful story of racial injustice and moral growth",
        price: 15,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110011854/reading-925589_640.jpg",
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        description: "A dystopian vision of a totalitarian future society",
        price: 255,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg",
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        description: "A classic novel about the American Dream",
        price: 220,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg",
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        description: "A powerful story of racial injustice and moral growth",
        price: 1115,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg",
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        description: "A dystopian vision of a totalitarian future society",
        price: 125,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg",
      },
    ];
    await Book.insertMany(books);

    console.log("Database seeded successfully");
  } catch (error) {
    console.log("Error seeding database:", error);
  }
};

seedDatabase();

app.get("/api/books", async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.json(allBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
