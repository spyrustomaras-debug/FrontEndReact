// types/Author.ts

export interface Book {
    id: number;
    title: string;
    author: number;
  }
  
  export interface Author {
    id: number;
    name: string;
    books: Book[];  // ✅ Add this line
  }
  