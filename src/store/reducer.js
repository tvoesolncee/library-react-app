import {
    ADD_CASE,
    ADD_BOOK,
    EDIT_BOOK_NAME,
    EDIT_BOOK_AUTHOR,
    REMOVE_BOOK,
    DOWNLOAD_BOOKS_DATA,
    MOVE_BOOK_LEFT,
    MOVE_BOOK_RIGHT
} from './actions';

const initialState = {
    bookcase: []
};

export default function reducer(state=initialState, {type, payload}) {
    let bookToMove = null;

    switch(type) {
    case ADD_CASE:
        return {
            ...state,
            bookcase: [
                ...state.bookcase, payload
            ]
        };
    case ADD_BOOK:
        return {
            ...state,
            bookcase: state.bookcase.map((bookArr, index) => (
                index === payload.bookArrId ? {
                    ...bookArr,
                    books: [...bookArr.books, payload.book]
                }
                : bookArr
            ))
        };
    case EDIT_BOOK_NAME:
        return {
            ...state,
            bookcase: state.bookcase.map((bookArr, index) => (
                index === payload.bookArrId ? {
                    ...bookArr,
                    books: bookArr.books.map((book, indexBook) => (
                        indexBook === payload.bookId ? {
                            ...book,
                            name: payload.newName
                        }
                        : book
                    ))
                }
                : bookArr
            ))
        };
    case EDIT_BOOK_AUTHOR:
        return {
            ...state,
            bookcase: state.bookcase.map((bookArr, index) => (
                index === payload.bookArrId ? {
                    ...bookArr,
                    books: bookArr.books.map((book, indexBook) => (
                        indexBook === payload.bookId ? {
                            ...book,
                            author: payload.newAuthor
                        }
                        : book
                    ))
                }
                : bookArr
            ))
        };
    case REMOVE_BOOK:
        return {
            ...state,
            bookcase: state.bookcase.map((bookArr, index) => (
                index === payload.bookArrId ? {
                    ...bookArr,
                    books: bookArr.books.filter((book, bookIndex) => (bookIndex !== payload.bookId))
                }
                : bookArr
            ))
        };
    case DOWNLOAD_BOOKS_DATA:
        return {
            ...state,
            bookcase: payload
        }
    case MOVE_BOOK_LEFT:
        bookToMove = state.bookcase[payload.bookArrId].books[payload.bookId];

        return {
            ...state,
            bookcase: state.bookcase.map((bookArr, index) => {
                if (index === payload.bookArrId) {
                    return {
                        ...bookArr,
                        books: bookArr.books.filter((book, bookIndex) => (bookIndex !== payload.bookId))
                    };
                }
                if (index === payload.bookArrId - 1) {
                    return {
                        ...bookArr,
                        books: [...bookArr.books, bookToMove]
                    };
                }
                return bookArr;
            })
        };
    case MOVE_BOOK_RIGHT:
        bookToMove = state.bookcase[payload.bookArrId].books[payload.bookId];

        return {
            ...state,
            bookcase: state.bookcase.map((bookArr, index) => {
                if (index === payload.bookArrId) {
                    return {
                        ...bookArr,
                        books: bookArr.books.filter((book, bookIndex) => (bookIndex !== payload.bookId))
                    };
                }
                if (index === payload.bookArrId + 1) {
                    return {
                        ...bookArr,
                        books: [...bookArr.books, bookToMove]
                    };
                }
                return bookArr;
            })
        };
    default:
        return state;
    }
};
