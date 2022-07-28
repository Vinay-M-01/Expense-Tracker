
import { useSelector } from 'react-redux';


const ExpensesList = (props) => {
    
  const loggedEmail = localStorage.getItem('email')

  const myexpenses = useSelector(state => state.expenses.expensesState)
  
  console.log(myexpenses)

  const myExpenses = myexpenses.map((item) => {
    

    // Edit User/Expense details on click the edit button 
    const editButtonHandler = (item) =>{
        let NewAmount = prompt('Enter the New Amount: ',item.Amount)
        let NewDescriptioin = prompt(' Enter the New Desription: ', item.Description)
        let NewCategory = prompt(' Enter the New Category: ', item.Category)

        // console.log(item)
        fetch(`https://expense-tracker-3cdd6-default-rtdb.firebaseio.com/${loggedEmail}.json`, {
            method:"GET"
        }).then(res => {
            if(res.ok){
                return res.json()
            }else{
                return res.json().then((data => {
                    let errorMessage = 'Get Request Failed';
                    throw new Error(errorMessage)
                }))
            }
        }).then((data) =>{
            console.log(data)
            let mainkey;

            for (let [key,val] of Object.entries(data)){
                if(val.Description === item.Description){
                    mainkey=  key
                }
               
            }
            console.log(mainkey)   
            reqPATCH(mainkey, NewAmount, NewCategory, NewDescriptioin)
        }).catch(err =>{
            alert(err.errorMessage)
        })

        // Request for PATCH function 
        function reqPATCH( id, NewAmount, NewCategory, NewDescription){
           fetch(`https://expense-tracker-3cdd6-default-rtdb.firebaseio.com/${loggedEmail}/${id}.json`,
            {
                method:"PATCH",
                body:JSON.stringify({
                    Amount: NewAmount,
                    Category: NewCategory,
                    Description: NewDescription,
                })
            }).then(res => {
                return res.json()
            }).then(data => {
                console.log(data)
                window.location.reload(false)
            })
        }
    }

    // Delete the user/expense details on clicking delete button
    const deleteButtonHandler = (item) =>{
        // console.log(id.name)

        const filteredList = myexpenses.filter((lst) => lst.Description !== item.Description)
        console.log(filteredList)
        fetch(`https://expense-tracker-3cdd6-default-rtdb.firebaseio.com/${loggedEmail}.json`, 
        {
            method:"PUT",
            body:JSON.stringify(filteredList)
        }).then(res =>{
            return res.json()
        }).then(data =>{
            console.log(data)
            alert('Are you sure ?')
            window.location.reload(false)
        })
    }

    return (
      <>
        <li key={Math.random.toString()}>
          {item.Amount}
          {" - "}
          {item.Description}
          {" - "}
          {item.Category}

          <button onClick={()=> editButtonHandler({Amount: item.Amount, Category: item.Category, Description: item.Description})}> Edit </button>
          <button onClick={() => deleteButtonHandler({Description: item.Description})}> Delete </button> 
        </li>
      </>
    );
  });

  return <ul>{myExpenses}</ul>;
};

export default ExpensesList;
