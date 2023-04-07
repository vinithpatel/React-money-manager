import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    transactionList: [],
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({optionId: event.target.value})
  }

  addTransaction = event => {
    event.preventDefault()
    this.setState(prevState => {
      const {
        titleInput,
        amountInput,
        optionId,
        totalBalance,
        totalExpenses,
        totalIncome,
        transactionList,
      } = prevState

      const newTransaction = {
        id: uuidv4(),
        title: titleInput,
        amount: amountInput,
        optionId,
        optionText: optionId === 'INCOME' ? 'Income' : 'Expenses',
      }

      if (optionId === 'INCOME') {
        return {
          ...prevState,
          titleInput: '',
          amountInput: '',
          optionId: transactionTypeOptions[0].optionId,
          totalBalance: totalBalance + parseInt(amountInput),
          totalIncome: totalIncome + parseInt(amountInput),
          transactionList: [...transactionList, newTransaction],
        }
      }
      return {
        ...prevState,
        titleInput: '',
        amountInput: '',
        optionId: transactionTypeOptions[0].optionId,
        totalBalance:
          totalBalance > parseInt(amountInput)
            ? totalBalance - parseInt(amountInput)
            : totalBalance,
        totalExpenses:
          totalBalance > parseInt(amountInput)
            ? totalExpenses + parseInt(amountInput)
            : totalExpenses,
        transactionList:
          totalBalance > parseInt(amountInput)
            ? [...transactionList, newTransaction]
            : transactionList,
      }
    })
  }

  updatedBalance = transaction => {
    const {totalBalance, totalIncome, totalExpenses} = this.state

    if (transaction.optionId === 'INCOME') {
      return [
        totalBalance - parseInt(transaction.amount),
        totalIncome - parseInt(transaction.amount),
        totalExpenses,
      ]
    }
    return [
      totalBalance + parseInt(transaction.amount),
      totalIncome,
      totalExpenses - parseInt(transaction.amount),
    ]
  }

  getFilteredTransactionList = id => {
    const {transactionList} = this.state

    const filteredList = transactionList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    return filteredList
  }

  onDeleteTransaction = id => {
    this.setState(prevState => {
      const {transactionList} = prevState
      const transaction = transactionList.find(
        eachTransaction => eachTransaction.id === id,
      )

      const [totalBalance, totalIncome, totalExpenses] = this.updatedBalance(
        transaction,
      )
      const filteredTransactionList = this.getFilteredTransactionList(id)

      return {
        totalBalance,
        totalExpenses,
        totalIncome,
        transactionList: filteredTransactionList,
      }
    })
  }

  render() {
    const {
      titleInput,
      amountInput,
      totalBalance,
      optionId,
      totalIncome,
      totalExpenses,
      transactionList,
    } = this.state

    return (
      <div className="bg-container">
        <div className="intro-card">
          <h1 className="intro-card-heading">Hi, Richard</h1>
          <p className="intro-card-para">
            Welcome back to your{' '}
            <span className="money-manager-text">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        <div className="transactions-container">
          <div className="add-transaction-card">
            <h1 className="transaction-heading">Add Transaction</h1>
            <form className="transaction-form">
              <div className="input-card">
                <label htmlFor="titleInput" className="title-label">
                  TITLE
                </label>
                <br />
                <input
                  className="input-title"
                  id="titleInput"
                  type="text"
                  value={titleInput}
                  placeholder="TITLE"
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="input-card">
                <label htmlFor="amountInput" className="title-label">
                  AMOUNT
                </label>
                <br />
                <input
                  className="input-title"
                  id="amountInput"
                  type="text"
                  value={amountInput}
                  placeholder="AMOUNT"
                  onChange={this.onChangeAmount}
                />
              </div>
              <div className="input-card">
                <label htmlFor="typeInput" className="title-label">
                  TYPE
                </label>
                <br />
                <select
                  id="typeInput"
                  className="input-title"
                  onChange={this.onChangeOption}
                  value={optionId}
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.optionId}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="add-button"
                onClick={this.addTransaction}
              >
                Add
              </button>
            </form>
          </div>
          <div className="history-card">
            <h1 className="transaction-heading">History</h1>
            <ul className="transaction-history-card">
              <li className="history-heading-columns">
                <p className="title-heading">Title</p>
                <p className="amount-heading">Amount</p>
                <p className="type-heading">Type</p>
              </li>
              {transactionList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  transactionDetails={eachTransaction}
                  onDeleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
