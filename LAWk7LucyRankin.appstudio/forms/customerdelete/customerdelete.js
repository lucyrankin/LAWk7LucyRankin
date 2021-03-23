/*
 Used a textArea to show all the customer names, one per line. 
> User inputs a customer to delete.   
> Used a sql Delete query to delete the customer input by the user.  
> Used an AJAX call to the database to delete that customer
*/

customerdelete.onshow = function() {
  query = "SELECT * FROM customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + netID + "&query=" + query)
  if (req.status == 200) {
    results = JSON.parse(req.responseText)
    console.log(`The results are \n ${results}`)
    if (results.length == 0)
      lblMessage2.value = "There are no customers in the database."
    else {
      let message = ""
      for (i = 0; i < results.length; i++)
        message = message + results[i][1] + "\n"
      txtaCustomerDelete.value = message
    }
  } else
    lblMessage2.value = "Error code: " + req.status
}
btnDelete.onclick = function() {
  let customerNameDelete = inptDeleteCustomer.value
  let found = false
  for (i = 0; i <= allCustomers.length - 1; i++) {
    if (customerNameDel == allCustomers[i][1])
      found = true
  }
  if (found == false)
    lblMessage2.textContent = "That customer name is not in the database."
  else if (found == true) {
    query = "DELETE FROM customer WHERE name = " + '"' + customerNameDel + '"'
    alert(query)
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + netID + "&query=" + query)
    if (req.status == 200) 
      if (req.responseText == 500) 
        lblMessage2.textContent = `You have successfully deleted the customer ${customerNameDelete}`
    else
      lblMessage.textContent = `There was a problem deleting ${customerNameDelete} from the database.`
    else
      lblDelete.textContent = `Error: ${req.status}`
  }
}