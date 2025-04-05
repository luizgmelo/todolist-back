import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDB() {
  return open({
    filename: "./tasks.db",
    driver: sqlite3.Database,
  });
}

export async function createTable() {
  openDB().then((db) =>
    db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            isCompleted INTEGER CHECK(isCompleted IN (0,1)) DEFAULT 0 NOT NULL
        );
    `)
  );
}
