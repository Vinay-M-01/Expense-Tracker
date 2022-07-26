const ExpensesList = (props) => {

    const myExpenses = props.expenses.map(item => {
        return (
            <li key={Math.random().toString()}>
                {item.amount}{' - '}
                {item.desciption}{' - '}
                {item.category}
            </li>
        )
    })
    return(
        <ul>
            {myExpenses}
        </ul>
    )
}
 
export default ExpensesList;