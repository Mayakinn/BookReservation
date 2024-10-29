export enum BookType {
  NormalBook = 1, 
  Audiobook = 2,  
}
export const bookTypeToString: Record<BookType, string> = {
  [BookType.NormalBook]: "Normal Book",
  [BookType.Audiobook]: "Audiobook",
};