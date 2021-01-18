import { PureComponent } from 'react';
import { connect } from 'react-redux';
import './Case.css';

import { addBook } from '../../model/model';

import Book from '../Book/Book';
import { addBookAction } from '../../store/actions';


class Case extends PureComponent {

    onBookAdd = async () => {
        let bookName = prompt('Введите название книги', '');
        if (!bookName || !bookName.trim()) {
            alert('Невалидное название книги!');
            return;
        }
        bookName = bookName.trim();

        let bookAuthor = prompt('Введите автора', '').trim();
        if (!bookAuthor || !bookAuthor.trim()) {
            alert('Невалидный автор!');
            return;
        }

        bookAuthor = bookAuthor.trim();
        const newBookData = {
            book: {
                name: bookName,
                author: bookAuthor
            },
            bookArrId: this.props.bookArrId
        };

        await addBook(newBookData);
        this.props.addBookDispatch(newBookData);
    }

    render() {
        const bookArrId = this.props.bookArrId;
        const bookArr = this.props.bookcase[bookArrId];

        return (
        <div className="bookarr">
            <header className="bookarr-name">
                { bookArr.name }
            </header>
            <div className="bookarr-books">
                {bookArr.books.map((book, index) => (
                    <Book key={`book-${index}`} bookId={index} bookArrId={bookArrId} />
                ))}
            </div>
            <footer className="bookarr-add-task" onClick={this.onBookAdd}>
                Добавить книгу
            </footer>
        </div>
        );
    }
}

const mapStateToProps = ({ bookcase }) => ({ bookcase });

const mapDispatchToProps = dispatch => ({
    addBookDispatch: ({ book, bookArrId }) => dispatch(addBookAction({ book, bookArrId })),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Case);
