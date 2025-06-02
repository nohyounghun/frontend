import { createContext, useState } from "react";

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [question, setQuestionCount] = useState(0);
  const [goodsCount, setGoodsCount] = useState(0);
  const [booksCount, setBooksCount] = useState(0);
  const [fruitsCount, setFruitsCount] = useState(0);

  return (
    <AlertContext.Provider value={{ question, setQuestionCount, goodsCount, setGoodsCount, booksCount, setBooksCount, fruitsCount, setFruitsCount }}>
      {children}
    </AlertContext.Provider>
  );
}