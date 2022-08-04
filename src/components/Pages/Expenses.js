import classes from './Expenses.module.css'
import { useEffect, useRef, useState} from 'react'
import ExpensesList from './ExpensesList'
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../../store'
import { CSVLink } from 'react-csv';

const Expenses = (props) => {
    const dispatch = useDispatch()
    const myExpensesDetails = useSelector(state => state.expenses.expensesState)

    const loggedEmail = localStorage.getItem('email')
    const amoutInputRef = useRef()
    const descriptionInputRef = useRef()
    const categoryInputRef = useRef()
    // const [expenses, setExpenses] = useState([])
    const [premium, setPremium] = useState(false)
    const [activatePremium, setActivatePremium] = useState(false)
    let ExpensesLIST = ExpensesList
    const totalExpense = myExpensesDetails.reduce((accumulator,curValue)=>parseInt(curValue.Amount) + accumulator,0)

    const headers = [
        {label: 'Amount' ,key: 'Amount'},
        {label: 'Description' ,key: 'Description'},
        {label: 'Category' ,key: 'Category'}
    ];

    const csvReport = {
        filename: 'Expense_Report.csv',
        headers: headers,
        data: myExpensesDetails
    };

    // On reload get all the data from the backend 
    useEffect(()=>{
        
        fetch(`https://expense-tracker-3cdd6-default-rtdb.firebaseio.com/${loggedEmail}.json`)
            .then((res) =>{
                if(res.ok){
                    return res.json()
                }else{
                    return res.json().then((data) =>{
                        let errorMessage = 'Get Request Failed';
                        if(data && data.error && data.error.message){
                            errorMessage = data.error.message
                        }
                        throw new Error(errorMessage);
                    })
                }
            }).then((data) =>{
    
                let initialData =[]
                for(let val of Object.values(data)){       
                    initialData.push(val)
                    // console.log(initialData)
                    // setExpenses(expenses => [...expenses, {name: key, amount: val.Amount, desciption: val.Description, category: val.Category}])
                }
                dispatch(expenseActions.reloadUserDetails(initialData))
            })
            if(totalExpense > 800){
                setActivatePremium(true)
                dispatch(expenseActions.togglePremiumState())
            }
            // console.log(initialData)
    },[loggedEmail, ExpensesLIST, dispatch, totalExpense])
 

    const submitHandler = (e) => {
        e.preventDefault()

        const enteredAmount = amoutInputRef.current.value
        const enteredDescription = descriptionInputRef.current.value
        const enteredCategory = categoryInputRef.current.value
        // let fetchedName;

        // setExpenses([...expenses, {amount:enteredAmount, desciption: enteredDescription, category: enteredCategory}])
        if(parseInt(enteredAmount) + totalExpense < 800 || activatePremium){
            fetch(`https://expense-tracker-3cdd6-default-rtdb.firebaseio.com/${loggedEmail}.json`,{
                method:"POST",
                body:JSON.stringify({
                    Amount: enteredAmount,
                    Description: enteredDescription,
                    Category: enteredCategory,
                })
            }).then(res =>{
                console.log(res)
                if(res.ok){
                    return res.json()
                }else{
                    return res.json().then(data =>{
                        let errorMessage = 'Authentication Request Failed';
                        if(data && data.error && data.error.message){
                            errorMessage = data.error.message
                        }
                        throw new Error(errorMessage);
                    })
                }
            }).then((data) => {
                // fetchedName = data.name
                // console.log('name= ' + fetchedName)
                
                    alert('Data is sent to Backend successfully!!!')
                    // setExpenses([...expenses, {name: data.name, amount:enteredAmount, desciption: enteredDescription, category: enteredCategory}])
                    dispatch(expenseActions.addUser({name: data.name, Amount:enteredAmount, Description: enteredDescription, Category: enteredCategory}))
                
            }).catch(err =>{
                alert(err.errorMessage)
            })
        }else{
            return setPremium(true)
        }
          
    }
    const activatePremiumHandler = () =>{
        alert('Activate Premium ?')
        setActivatePremium(true)
        dispatch(expenseActions.togglePremiumState())
    }
    
    return (
        <>
        {activatePremium && <button><CSVLink {...csvReport}>Download_Expense</CSVLink></button> }
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
            <option value="Movies">Movies</option>
            <option value="Salary">Salary</option>
            <option value="Bill">Bill</option>
            <option value="others">others</option>
          </select >
        </div>

        <div className={classes.actions}>
          <button type='submit'>Add Expense</button>
          {premium && <button onClick={activatePremiumHandler}>Activate Premium </button> }
          
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
    <ExpensesList expenses ={myExpensesDetails} ></ExpensesList>
    
    </>
    )
}
 
export default Expenses;