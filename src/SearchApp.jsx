import { useCallback, useMemo, useRef, useState } from "react";
import useUsers from "./useUsers";

export default function SearchApp() {
  const { users, loading } = useUsers();
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  const filterUsers = useCallback((list, value) => {
    const normalizedValue = value.toLowerCase().trim();

    if (!normalizedValue) {
      return list;
    }

    return list.filter((user) =>
      user.name.toLowerCase().includes(normalizedValue)
    );
  }, []);

  const filteredUsers = useMemo(() => {
    return filterUsers(users, search);
  }, [users, search, filterUsers]);

  const focusSearch = () => {
    searchInput.current?.focus();
  };

  return (
    <main className="page">
      <section className="search-card">
        <div className="logo">R</div>
        <p className="eyebrow">REACT • ПРАКТИЧНЕ ЗАВДАННЯ</p>
        <h1>Пошук користувачів</h1>
        <p className="subtitle">
          Знайдіть потрібну людину за її ім’ям у списку користувачів.
        </p>

        <div className="search-area">
          <label htmlFor="user-search">Ім’я користувача</label>
          <div className="input-wrap">
            <span className="search-icon">⌕</span>
            <input
              id="user-search"
              ref={searchInput}
              type="text"
              placeholder="Наприклад, Марія..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button
                className="clear-button"
                type="button"
                onClick={() => {
                  setSearch("");
                  focusSearch();
                }}
                aria-label="Очистити пошук"
              >
                ×
              </button>
            )}
          </div>
          <div className="hint">Пошук виконується за ім’ям без урахування регістру.</div>
        </div>

        <div className="list-heading">
          <h2>Список користувачів</h2>
          {!loading && (
            <span className="count">
              {filteredUsers.length} з {users.length}
            </span>
          )}
        </div>

        {loading ? (
          <div className="status">
            <div className="spinner"></div>
            <span>Завантаження користувачів...</span>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="users-list">
            {filteredUsers.map((user) => (
              <article className="user-row" key={user.id}>
                <div className="avatar">{user.name.charAt(0)}</div>
                <div className="user-info">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
                <span className="age">{user.age} років</span>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">⌕</div>
            <strong>Нічого не знайдено</strong>
            <span>Спробуйте змінити пошуковий запит.</span>
          </div>
        )}

        <footer>Демонстрація useRef, useMemo, useCallback та власного хука useUsers</footer>
      </section>
    </main>
  );
}