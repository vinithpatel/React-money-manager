import './index.css'

const MoneyDetails = props => {
  const {totalBalance, totalIncome, totalExpenses} = props

  return (
    <div className="money-details-container">
      <div className="balance-card green-background">
        <img
          className="balance-image"
          alt="balance"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
        />
        <div className="balance-info-card">
          <p className="balance-heading">Your Balance</p>
          <p className="balance-rs" data-testid="balanceAmount">
            Rs {totalBalance}
          </p>
        </div>
      </div>
      <div className="balance-card green-background">
        <img
          className="balance-image"
          alt="income"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
        />
        <div className="balance-info-card">
          <p className="balance-heading">Your Income</p>
          <p className="balance-rs" data-testid="incomeAmount">
            Rs {totalIncome}
          </p>
        </div>
      </div>
      <div className="balance-card green-background">
        <img
          className="balance-image"
          alt="expenses"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
        />
        <div className="balance-info-card">
          <p className="balance-heading">Your Expenses</p>
          <p className="balance-rs" data-testId="expensesAmount">
            Rs {totalExpenses}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
