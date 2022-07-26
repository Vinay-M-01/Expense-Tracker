import classes from './Expenses.module.css'
import { useRef, useState } from 'react'
import ExpensesList from './ExpensesList'

const Expenses = (props) => {
    const amoutInputRef = useRef()
    const descriptionInputRef = useRef()
    const categoryInputRef = useRef()
    const [expenses, setExpenses] = useState([])

    const submitHandler = (e) => {
        e.preventDefault()

        const enteredAmount = amoutInputRef.current.value
        const enteredDescription = descriptionInputRef.current.value
        const enteredCategory = categoryInputRef.current.value

        setExpenses([...expenses, {amount:enteredAmount, desciption: enteredDescription, category: enteredCategory}])
        
    }
    return (
        <>
        <section className={classes.auth}>
      <h1>Daily Expenses</h1>
      
      <form onSubmit={submitHandler}>

        <div className={classes.control}>
          <label htmlFor='amount'>Amount</label>
          <input type='amount' id='amount' required ref={amoutInputRef}/>
        </div>

        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea type='description' id='description' required ref={descriptionInputRef}/>
        </div>

        <div className={classes.control}>
          <label htmlFor='category'>Choose a Category</label>
          <select name="category" id="category" ref={categoryInputRef}>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Bill">Bill</option>
            <option value="others">others</option>
          </select >
        </div>

        <div className={classes.actions}>
          <button type='submit'>Add Expense</button>
{/*           
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >{isLogin ? 'Create new account' : 'Login with existing account'}
          </button> */}

        </div>
      </form>
    </section>
    <ExpensesList expenses ={expenses}></ExpensesList>
    </>
    )
}
 
export default Expenses;