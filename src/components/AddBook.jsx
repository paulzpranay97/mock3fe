import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";

export const AddBook =() => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("Fiction");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const book = {
      title,
      author,
      genre,
      description,
      price,
    };

    // Send book data to backend
   await fetch("https://bookm3.onrender.com/book/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    }).then((res)=>{
        
        console.log(res.data);
    })

  
    

    // Clear form fields
    setTitle("");
    setAuthor("");
    setGenre("Fiction");
    setDescription("");
    setPrice("");

    
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="title">
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </FormControl>

      <FormControl id="author">
        <FormLabel>Author</FormLabel>
        <Input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </FormControl>

      <FormControl id="genre">
        <FormLabel>Genre</FormLabel>
        <Select value={genre} onChange={(event) => setGenre(event.target.value)}>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="Comic">Comic</option>
        </Select>
      </FormControl>

      <FormControl id="description">
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </FormControl>

      <FormControl id="price">
        <FormLabel>Price</FormLabel>
        <Input
          type="text"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </FormControl>

      <Button type="submit">Add Book</Button>
    </form>
  );
}