import { useState } from "react";

function App() {
  // Initial book list
  const initialBooks = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" },
  ];

  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  // Filter books by search input
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  // Add a new book
  const addBook = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;

    const newBook = {
      id: Date.now(),
      title: newTitle,
      author: newAuthor,
    };

    setBooks([...books, newBook]);
    setNewTitle("");
    setNewAuthor("");
  };

  // Remove a book
  const removeBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // ✅ Reusable component for a Library Box
  const LibraryBox = ({ title, searchValue }) => {
    const displayedBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.author.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      <div style={{ border: "1px solid black", padding: "16px", margin: "10px" }}>
        <h2>{title}</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchValue}
          readOnly
          style={{ display: "block", marginBottom: "10px", width: "60%" }}
        />

        {/* Add new book */}
        <form onSubmit={addBook} style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="New book title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ marginRight: "8px" }}
          />
          <input
            type="text"
            placeholder="New book author"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            style={{ marginRight: "8px" }}
          />
          <button type="submit">Add Book</button>
        </form>

        {/* Book List */}
        {displayedBooks.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              marginBottom: "6px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              <strong>{book.title}</strong> by {book.author}
            </span>
            <button onClick={() => removeBook(book.id)}>Remove</button>
          </div>
        ))}

        {displayedBooks.length === 0 && (
          <p style={{ color: "gray" }}>No books found.</p>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* First View: Default (no search) */}
      <LibraryBox title="Library Management" searchValue="" />

      {/* Second View: Pre-filtered with 'great' */}
      <LibraryBox title="Library Management" searchValue="great" />
    </div>
  );
}

export default App;

