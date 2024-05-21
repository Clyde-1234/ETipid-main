

function Submit(){
  var active_days = get_n_set_active()
  var data_entered = retrieveData()
  if(Number(data_entered[1]) + Number(data_entered[2]) + Number(data_entered[3]) + Number(data_entered[4]) !== 100){
    const toastContent = document.getElementById("add_up_to")
    const toast = new  bootstrap.Toast(toastContent)
    toast.show() 
  }
  else if(handle_negative_input(data_entered) === false){
    window.alert("Negative values are not alowed")}
  else{
    var read_data = readfromLocal(data_entered)
    radio_act = radiobut()
    insert(read_data, active_days, radio_act)
    calculate_days_goal(read_data)
  }}

//handles the clear button
function clearfield(){
  document.getElementById('emergency').value = ""
  document.getElementById('savings').value = ""
  document.getElementById('wants').value = ""
  document.getElementById('needs').value = ""
}

//handling the toggles for the radio buttons
function radiobut(){
selected = document.querySelector('input[name ="options"]:checked').id
return selected

}
// retrieve from form
function retrieveData(){
  var amount = document.getElementById('amt').value
  var emergency = document.getElementById('emergency_value').value
  var savings = document.getElementById('savings_value').value
  var wants = document.getElementById('wants_value').value
  var needs = document.getElementById('needs_value').value

  arr = [amount,emergency,savings,wants,needs]
  return arr
}
// handling data in local
function readfromLocal(data_entered){
  // store data
  var a = localStorage.setItem("Amount", data_entered[0])
  var e = localStorage.setItem("Emergency", data_entered[1])
  var s = localStorage.setItem("Savings", data_entered[2])
  var w = localStorage.setItem("Wants", data_entered[3])
  var n = localStorage.setItem("Needs",data_entered[4] )

  // retrieving values
  // you should make individuals functions for each text box
  // and set value to each
  // literally the second parameter is the value to be returned
  //just edit
  var a_g = localStorage.getItem("Amount", a)
  var e_g = localStorage.getItem("Emergency",e)
  var s_g = localStorage.getItem("Savings", s)
  var w_g = localStorage.getItem("Wants", w)
  var n_g = localStorage.getItem("Needs", n)

  var def_val = [a_g, e_g, s_g, w_g, n_g]
  
  return def_val
}

// insert the data into a value
function insert(read_data, actday,toggle){
  //not actual values do the computations first and call this function so they run sucessively
  var c_s = compute_savings(read_data, actday)
  var c_e = compute_emergency(read_data, actday)
  var c_n = compute_needs(read_data, actday)
  var c_w = compute_wants(read_data, actday)

  var cnw =compute_need_per_week(read_data)
  var csw = compute_savings_per_week(read_data)
  var cww = compute_wants_per_week(read_data)
  var cew = compute_emergency_per_week(read_data)
  if (toggle == 'day'){
    if(actday < 1)
    {
      const toastContent = document.getElementById("one_act_day")
      const toast = new  bootstrap.Toast(toastContent)
      toast.show()
    }
  document.getElementById('emergency').value = c_e.toString()
  document.getElementById('savings').value = c_s.toString()
  document.getElementById('wants').value = c_w.toString()
  document.getElementById('needs').value = c_n.toString()
} else if (toggle == 'week')
{
  document.getElementById('needs').value = cnw.toString()
  document.getElementById('savings').value = csw.toString()
  document.getElementById('wants').value = cww.toString()
  document.getElementById('emergency').value = cew.toString()
}
  //call made methods here
}



//checkboxes function

let gitact_day;
// returns how many days are toggled on as well as adding the active days on the localstorage
function get_n_set_active(){
  let days = [];
  
  document.querySelectorAll('[type="checkbox"]').forEach(item => {
    if (item.checked === true) {
      days.push(item.value);
    }
  })
  var act = days.length
  var a_day = localStorage.setItem("Active_days", act)
  gitact_day = localStorage.getItem("Active_days", a_day)
  return act
}

// computation functions 

function compute_savings(read_data, actday){
  //exception handling zeroDivisionerror
  if (actday > 0){
    amt = read_data[0]
    var PSavings = parseInt(read_data[2]) / 100
    var Savings_day = (amt * PSavings) / actday
    return Savings_day.toFixed(2)
  }
  
}

function compute_needs(read_data, actday){
  amt = read_data[0]
  if (actday > 0){
  var PNeeds = parseInt(read_data[4]) / 100
  Needs_day = (amt * PNeeds)/ actday
  return Needs_day.toFixed(2)
}
  
  
}

function compute_wants(read_data, actday){
  amt = read_data[0]
  if (actday > 0){
  var PWants = parseInt(read_data[3]) / 100
  Wants_day = (amt * PWants)/ actday
  return Wants_day.toFixed(2)
}
  
}

function compute_emergency(read_data, actday){
  amt = read_data[0]
  if (actday > 0){
  var PEmergency = parseInt(read_data[1]) / 100
  Emergency_day = (amt * PEmergency)/ actday
  return Emergency_day.toFixed(2)
}


  
}






function compute_need_per_week(read_data){

  amt = read_data[0]
  var PNeeds = parseInt(read_data[4]) / 100
  Needs_week = (amt * PNeeds)

  console.log(Needs_week)
  return Needs_week.toFixed(2)
}


function compute_savings_per_week(read_data){
 
    amt = read_data[0]
    var PSavings = parseInt(read_data[2]) / 100
    var Savings_week = (amt * PSavings) 
  
    return Savings_week.toFixed(2)
}

function compute_wants_per_week(read_data){
   amt = read_data[0]
  var PWants = parseInt(read_data[3]) / 100
  Wants_week = (amt * PWants)

  return Wants_week.toFixed(2)
}

function compute_emergency_per_week(read_data){
   amt = read_data[0]
 
  var PEmergency = parseInt(read_data[1]) / 100
  Emergency_week = (amt * PEmergency)


return Emergency_week.toFixed(2)
}

function handle_negative_input(arraguy){
  var is_all_number_positive = true
  for(i = 0; i <= 4; i++){
    if (Number(arraguy[i]) < 0){
      is_all_number_positive = false
  return is_all_number_positive
    }}}




function calculate_days_goal(read_data){
 
  var savingsweek = parseInt(compute_need_per_week(read_data))
  
  var goal_amount = parseInt(document.getElementById('goals_num').value)
  if (savingsweek != 0){

  var days_left = (goal_amount / savingsweek) * 7
  var min_left = (goal_amount /savingsweek) * 10080
  var sec_left = (goal_amount / savingsweek) * 604800
 

  document.getElementById('modal_days').value = days_left.toString()
  document.getElementById('modal_min').value = min_left.toString()
  document.getElementById('modal_sec').value = sec_left.toString()
} else{

  const toastContent = document.getElementById("savings_not_zero")
      const toast = new  bootstrap.Toast(toastContent)
      toast.show()

}

}
/*

function calculate_weeks_goal(){
  var week_left = goal_amount / Savings_week
  return week_left
}
*/