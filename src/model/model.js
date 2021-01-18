const hostname = 'http://localhost:9999';

const getCases = async () => {
    const response = await fetch(hostname + '/bookarr', {method: 'GET'});
    if (response.status !== 200) {
        throw new Error(`getCases returned ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
};

const addCase = async (bookArr) => {
    const response = await fetch(hostname + '/bookarr', {
        method: 'POST', 
        body: JSON.stringify(bookArr),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`addCase returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const addBook = async ({ book, bookArrId }) => {
    const response = await fetch(hostname + `/bookarr/${bookArrId}/book`, {
        method: 'POST', 
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(response);

    if (response.status !== 200) {
        throw new Error(`addBook returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const editBook = async ({ bookId, bookArrId, newName, newAuthor }) => {
    const response = await fetch(hostname + `/bookarr/${bookArrId}/book/${bookId}`, {
        method: 'PATCH', 
        body: JSON.stringify({ newName: newName, newAuthor: newAuthor }), 
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`editBookName returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const removeBook = async ({ bookId, bookArrId }) => {
    const response = await fetch(hostname + `/bookarr/${bookArrId}/book/${bookId}`, {
        method: 'DELETE'
    });

    if (response.status !== 200) {
        throw new Error(`removeBook returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const moveBook = async ({ bookId, bookArrId, destShelfId }) => {
    const response = await fetch(hostname + `/bookarr/${bookArrId}`, {
        method: 'PATCH',
        body: JSON.stringify({ bookId: bookId, destShelfId: destShelfId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`removeBook returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

export {
    getCases,
    addCase,
    addBook,
    editBook,
    removeBook,
    moveBook,
};
