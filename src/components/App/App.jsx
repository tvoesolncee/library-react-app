import { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import Case from '../Case/Case';

import { getCases, addCase } from '../../model/model';

import { downloadBooksDataAction, addCaseAction } from '../../store/actions';
import './App.css';

class App extends PureComponent {

    state = {
        isInputActive: false,
        inputValue: ''
    };

    async componentDidMount() {
        const bookcase = await getCases();
        this.props.downloadBooksDataDispatch(bookcase);
    }

    inputCase = () => {
        this.setState({
            isInputActive: true
        });
    }

    onKeyDown = async (event) => {
        if (event.key === 'Escape') {
          this.setState({
            isInputState: false,
            inputValue: ''
          });
        }
    
        if (event.key === 'Enter') {
            const bookArrName = this.state.inputValue;

            this.setState({
                isInputState: false,
                inputValue: ''
            })
            const bookArr = { name: bookArrName, books: [] };
            await addCase(bookArr);
            this.props.addCaseDispatch(bookArr);
        }
    }
    
    onInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }

    render() {
        const { inputValue, isInputActive } = this.state;

        return (
            <Fragment>
                <header id="main-header">
                    Библиотека
                </header>
                <main id="main-container">
                    {this.props.bookcase.map((bookArr, index) => (
                        <Case key={`bookarr-${index}`} bookArrId={index}/>
                    ))}
                    <div className="bookarr">
                    {isInputActive && <input
                        type="text"
                        id="add-bookarr-input"
                        placeholder="Название шкафа"
                        value={inputValue}
                        onChange={this.onInputChange}
                        onKeyDown={this.onKeyDown}
                    />}
                    {!isInputActive && <header className="bookarr-name" onClick={this.inputCase}>
                        Добавить книжный шкаф
                    </header>}
                    </div>
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ bookcase }) => ({ bookcase });

const mapDispatchToProps = dispatch => ({
    addCaseDispatch: (bookArr) => dispatch(addCaseAction(bookArr)),
    downloadBooksDataDispatch: (bookcase) => dispatch(downloadBooksDataAction(bookcase)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
