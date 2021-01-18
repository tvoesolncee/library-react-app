const ADD_CASE = 'ADD_CASE';
const ADD_BOOK = 'ADD_BOOK';
const EDIT_BOOK_NAME = 'EDIT_BOOK_NAME';
const EDIT_BOOK_AUTHOR = 'EDIT_BOOK_AUTHOR';
const REMOVE_BOOK = 'REMOVE_BOOK';
const DOWNLOAD_BOOKS_DATA = 'DOWNLOAD_BOOKS_DATA';
const MOVE_BOOK_LEFT = 'MOVE_BOOK_LEFT';
const MOVE_BOOK_RIGHT = 'MOVE_BOOK_RIGHT';


const addCaseAction = (bookArr) => ({
    type: ADD_CASE,
    payload: bookArr
});

const addBookAction = ({ book, bookArrId }) => ({
    type: ADD_BOOK,
    payload: { book, bookArrId }
});

const editBookNameAction = ({ bookId, bookArrId, newName }) => ({
    type: EDIT_BOOK_NAME,
    payload: { bookId, bookArrId, newName }
});

const editBookAuthorAction = ({ bookId, bookArrId, newAuthor }) => ({
    type: EDIT_BOOK_AUTHOR,
    payload: { bookId, bookArrId, newAuthor }
});

const removeBookAction = ({ bookId, bookArrId }) => ({
    type: REMOVE_BOOK,
    payload: { bookId, bookArrId }
});

const downloadBooksDataAction = (bookcase) => ({
    type: DOWNLOAD_BOOKS_DATA,
    payload: bookcase
});

const moveBookLeftAction = ({ bookId, bookArrId }) => ({
    type: MOVE_BOOK_LEFT,
    payload: { bookId, bookArrId }
});

const moveBookRightAction = ({ bookId, bookArrId  }) => ({
    type: MOVE_BOOK_RIGHT,
    payload: { bookId, bookArrId }
});

export {
    ADD_CASE,
    ADD_BOOK,
    EDIT_BOOK_NAME,
    EDIT_BOOK_AUTHOR,
    REMOVE_BOOK,
    DOWNLOAD_BOOKS_DATA,
    MOVE_BOOK_LEFT,
    MOVE_BOOK_RIGHT,
    addCaseAction,
    addBookAction,
    editBookNameAction,
    editBookAuthorAction,
    removeBookAction,
    downloadBooksDataAction,
    moveBookLeftAction,
    moveBookRightAction
};
