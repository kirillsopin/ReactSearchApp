import { useEffect, useState } from "react";

const usersData = [
  { id: 1, name: "Олександр Петренко", age: 21, email: "oleksandr@gmail.com" },
  { id: 2, name: "Марія Коваленко", age: 19, email: "maria@gmail.com" },
  { id: 3, name: "Андрій Шевченко", age: 23, email: "andrii@gmail.com" },
  { id: 4, name: "Анна Бондар", age: 20, email: "anna@gmail.com" },
  { id: 5, name: "Максим Мельник", age: 22, email: "maksym@gmail.com" },
  { id: 6, name: "Ірина Ткаченко", age: 18, email: "iryna@gmail.com" },
  { id: 7, name: "Дмитро Савченко", age: 24, email: "dmytro@gmail.com" },
  { id: 8, name: "Софія Мороз", age: 21, email: "sofia@gmail.com" },
  { id: 9, name: "Владислав Лисенко", age: 20, email: "vlad@gmail.com" },
  { id: 10, name: "Катерина Романюк", age: 22, email: "kateryna@gmail.com" }
];

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(usersData);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return { users, loading };
}