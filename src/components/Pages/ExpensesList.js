



const ExpensesList = (props) => {
    
  const loggedEmail = localStorage.getItem('email')

  const myExpenses = props.expenses.map((item) => {
    let dispalyAmount = item.amount;
    console.log(dispalyAmount)

    let itemName = item.name

    // Edit User/Expense details on click the edit button 
    const editButtonHandler = (item) =>{
        let NewAmount = prompt('Enter the New Amount: ',item.Amount)
        let NewDescriptioin = prompt(' Enter the New Desription: ', item.Description)
        let NewCategory = prompt(' Enter the New Category: ', item.Category)
        
        console.log(item)
        fetch(`https://expense-tracker-3cdd6-default-rtdb.firebaseio.com/${loggedEmail}/${item.name}.json`, {
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
            reqPATCH(item.name, NewAmount, NewCategory, NewDescriptioin)
            
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
    const deleteButtonHandler = (id) =>{
        console.log(id.name)
        fetch(`https://expense-tracker-3cdd6-default-rtdb.firebaseio.com/${loggedEmail}/${id.name}.json`, 
        {
            method:"DELETE",
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
          {dispalyAmount}
          {" - "}
          {item.desciption}
          {" - "}
          {item.category}

          <button onClick={()=> editButtonHandler({name: itemName, Amount: item.amount, Category: item.category, Description: item.desciption})}> Edit </button>
          <button onClick={() => deleteButtonHandler({name: itemName})}> Delete </button>
        </li>
      </>
    );
  });

  return <ul>{myExpenses}</ul>;
};

export default ExpensesList;
