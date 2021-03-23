/*
> Created a new form named customerUpdate.  
> Used a textArea or Dropdown to display the customer names 
> Used an input control for the user to enter a customer name. 
> When user clicks a button, the program gets the new customer name from the user. 
> The new name replaces the old name in the customer record. 
> The change is reflected in the display and the database. 
> Used a textArea to display the remaining customers. 
*/
customerdelete.onshow = function() {
  query = "UPDATE * FROM customer"
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

    let newName = inptUpdate.value
    let oldName = txtUpdate.value

    let found = false
    for (i = 0; i <= allCustomers.length - 1; i++) {
      if (oldName == allCustomers[i]) {
        found = true
        break
      }
    }
    if (found == false)
      NSB.MsgBox("That customer name is not in the database.")
    else if (found == true) {
      query = "UPDATE customer SET name =" + '"' + newName + '"' + " WHERE name = " + '"' + oldName + '"'
      
      req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + netID + "&query=" + query)
      if (req.status == 200) { 
        if (req.responseText == 500) { 
          NSB.MsgBox(`You have successfully changed the customer name!`)
          inptUpdate.value = ""
          txtUpdate.value = ""
        } else
          NSB.MsgBox(`There was a problem changing the customer name.`)
      } else

        NSB.MsgBox(`Error: ${req.status}`);
    } 
    btnNxt4.onclick = function() {
      ChangeForm(CustomerSelect)
    }