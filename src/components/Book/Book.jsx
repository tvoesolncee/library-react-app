import { PureComponent } from 'react';
import { connect } from 'react-redux';
import './Book.css';

import { editBook, removeBook, moveBook } from '../../model/model';

import { 
    editBookNameAction,
    editBookAuthorAction,
    removeBookAction,
    moveBookLeftAction,
    moveBookRightAction
} from '../../store/actions';


class Book extends PureComponent {

    moveLeft = async () => {
        const moveData = {
            bookId: this.props.bookId,
            bookArrId: this.props.bookArrId
        };
        await moveBook({
            ...moveData,
            destShelfId: moveData.bookArrId - 1
        });
        this.props.moveBookLeftDispatch(moveData);
    }

    moveRight = async () => {
        const moveData = {
            bookId: this.props.bookId,
            bookArrId: this.props.bookArrId
        };
        await moveBook({
            ...moveData,
            destShelfId: moveData.bookArrId + 1
        });
        this.props.moveBookRightDispatch(moveData);
    }

    onRemove = async () => {
        const ok = window.confirm('Удалить книгу?');
        if (!ok) {
            return;
        }

        const removeData = {
            bookId: this.props.bookId,
            bookArrId: this.props.bookArrId
        };
        await removeBook(removeData);
        this.props.removeBookDispatch(removeData);
    }

    onAuthorEdit = async () => {
        let newAuthor = prompt('Введите нового автора');
        if (!newAuthor || !newAuthor.trim()) {
            alert('Невалидный автор');
            return;
        }

        newAuthor = newAuthor.trim();

        const book = this.props.bookcase[this.props.bookArrId].books[this.props.bookId];
        const bookEditData = {
            bookId: this.props.bookId,
            bookArrId: this.props.bookArrId,
            newAuthor: newAuthor
        };
        await editBook({
            ...bookEditData,
            newName: book.name
        });
        this.props.editBookAuthorDispatch(bookEditData);
    }

    onNameEdit = async () => {
        let newName = prompt('Введите новоe название книги');
        if (!newName || !newName.trim()) {
            alert('Невалидное название');
            return;
        }
        
        newName = newName.trim();

        const book = this.props.bookcase[this.props.bookArrId].books[this.props.bookId];
        const bookEditData = {
            bookId: this.props.bookId,
            bookArrId: this.props.bookArrId,
            newName: newName,
        };
        await editBook({
            ...bookEditData,
            newAuthor: book.author
        });
        this.props.editBookNameDispatch(bookEditData);
    }

    render() {
        const { bookId, bookArrId } = this.props;
        const book = this.props.bookcase[bookArrId].books[bookId];

        return (
            <div className="bookarr-book">
                <div className="bookarr-book-description">
                <div className="bookarr-book-name">
                    { book.name }
                </div>
                <div className="bookarr-book-author">
                    { book.author }
                </div>
                </div>
                
                <div className="bookarr-book-controls">
                <div className="bookarr-book-controls-row">
                    <div className="bookarr-book-controls-icon left-arrow-icon" onClick={this.moveLeft}></div>
                    <div className="bookarr-book-controls-icon right-arrow-icon" onClick={this.moveRight}></div>
                </div>
                <div className="bookarr-book-controls-row">
                    <div className="bookarr-book-controls-icon delete-icon" onClick={this.onRemove}></div>
                </div>
                <div className="bookarr-book-controls-row">
                    <div className="bookarr-book-controls-icon editcust-icon" onClick={this.onAuthorEdit}></div>
                    <div className="bookarr-book-controls-icon editdesc-icon" onClick={this.onNameEdit}></div>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ bookcase }) => ({ bookcase });

const mapDispatchToProps = dispatch => ({
    editBookNameDispatch: ({ bookId, bookArrId, newName }) => dispatch(editBookNameAction({ bookId, bookArrId, newName })),
    editBookAuthorDispatch: ({ bookId, bookArrId, newAuthor }) => dispatch(editBookAuthorAction({ bookId, bookArrId, newAuthor })),
    removeBookDispatch: ({ bookId, bookArrId }) => dispatch(removeBookAction({ bookId, bookArrId })),
    moveBookLeftDispatch: ({ bookId, bookArrId }) => dispatch(moveBookLeftAction({ bookId, bookArrId })),
    moveBookRightDispatch: ({ bookId, bookArrId }) => dispatch(moveBookRightAction({ bookId, bookArrId })),
});
  
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Book);
