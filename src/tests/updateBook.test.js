import { describe, it, expect, beforeAll } from "vitest";
import { bookDefaultExpects } from "./utils/bookDefaultExpects";
import { errorDefaultExpects } from "./utils/errorDefaultExpects";
import { request } from "./setupFiles";
import { booksDataBase } from "../database/database";
import { firstBookMock, secondBookMock } from "./__mocks/books";

describe("update book", () => {
  beforeAll(() => {
    booksDataBase.push(firstBookMock());
    booksDataBase.push(secondBookMock());
  });

  it("should be able to update a book correctly", async () => {
    const data = await request
      .patch("/books/1")
      .send({
        pages: 450,
      })
      .expect(200)
      .then((response) => response.body);

    bookDefaultExpects(data);

    expect(data.pages).toBe(450);
  });

  it("should throw error when the id is incorrect", async () => {
    const data = await request
      .patch("/books/3")
      .send({
        pages: 450,
      })
      .expect(404)
      .then((response) => response.body);

    errorDefaultExpects(data);
    expect(data.error).toEqual("Book not found.");
  });

  it("should not be able to edit a book with the same edit a book with the same of other book", async () => {
    const data = await request
      .patch("/books/1")
      .send({
        name: "Jogos Vorazes",
      })
      .then((response) => response.body);

    errorDefaultExpects(data);
    expect(data.error).toEqual("Book already registered.");
  });
});
