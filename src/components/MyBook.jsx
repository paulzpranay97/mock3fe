import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Select,
} from "@chakra-ui/react";
import { AddBook } from "./AddBook";

export const MyBook = ()=> {
  const [books, setBooks] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("https://bookm3.onrender.com/book");
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, [books]);

  const handleDeleteBook = async (bookId) => {
    const response = await fetch(`https://bookm3.onrender.com/book/del/${bookId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } else {
      console.error("Error deleting book");
    }
  };

  const filteredBooks = genreFilter
    ? books.filter((book) => book.genre === genreFilter)
    : books;

  const sortedBooks = sortBy
    ? [...filteredBooks].sort((a, b) => {
        if (sortBy === "Price: Low to High") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      })
    : filteredBooks;

  return (
    <>
    <AddBook/>
    <br /><br /><br />
      <Heading as="h2" size="lg" mb={4}>
        My Books
      </Heading>

      <Box>
        <Select
          placeholder="Filter by Genre"
          value={genreFilter}
          onChange={(event) => setGenreFilter(event.target.value)}
          mb={4}
        >
          <option value="">All</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="Comic">Comic</option>
        </Select>

        <Select
          placeholder="Sort by Price"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          mb={4}
        >
          <option value="">None</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
        </Select>

        <Stack spacing={4} style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"20px"}}>
          {sortedBooks.map((book) => (
            <Box
              key={book._id}
              borderWidth="1px"
              borderRadius="lg"
              padding={4} style={{boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"}}
            >
              <Heading as="h3" size="md" mb={2}>
                {book.title} ({book.genre})
              </Heading>
              <Text mb={2}>
                By {book.author} | ${book.price}
              </Text>
              <Text>{book.description}</Text>
              <Button
                mt={4}
                colorScheme="red"
                onClick={() => handleDeleteBook(book._id)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
}


