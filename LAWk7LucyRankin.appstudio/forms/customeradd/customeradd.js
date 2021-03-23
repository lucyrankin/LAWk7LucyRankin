/*
 Used a textArea display the customer names 
> When user clicks a button, added this customer to the database: 
       Jesse Antiques, 1113 F St, Omaha, NE, 68178
*/
btnAdd.onclick=function(){
    let name = inptName.value
    let street = inptStreet.value
    let city = inptCity.value
    let state = inptState.value
    let zip = inptZip.value
    let query = "INSERT INTO customer (name,street,city,state,zipcode) VALUES ('" + name + "', '" + street + "', '" + city + "', '" + state + "', '" + zip + "')"
    alert(query)

req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + netID + "&query=" + query)
    if (req.status == 200) { //transit worked.
        if (req.responseText == 500)    // for our server - this means the insert succeeded
            lblAdd.textContent = "You have successfully added the customer!"
        else
            lblAdd.textContent = "There was a problem with adding the customer to the database."
    } else 
        // transit error
        lblAdd.textContent = "Error: " + req.status
}
