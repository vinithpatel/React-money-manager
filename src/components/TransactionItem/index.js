import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDeleteTransaction} = props
  const {id, title, amount, optionText} = transactionDetails

  const onClickDelete = () => {
    onDeleteTransaction(id)
  }

  return (
    <li className="transaction-item">
      <p className="title">{title}</p>
      <p className="amount">{amount}</p>
      <p className="type">{optionText}</p>

      <button
        className="delete-button"
        type="button"
        onClick={onClickDelete}
        data-testid="delete"
      >
        <img
          className="delete-image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
