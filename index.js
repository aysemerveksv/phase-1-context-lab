/* Your Code Here */
function createEmployeeRecord(recordArray) {
    return {
      firstName: recordArray[0],
      familyName: recordArray[1],
      title: recordArray[2],
      payPerHour: recordArray[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  function createEmployeeRecords(recordsArray) {
    return recordsArray.map(record => createEmployeeRecord(record))
  }
  
  function createTimeInEvent(employeeRecord, timeStamp) {
    let [date, hour] = timeStamp.split(" ")
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    })
    return employeeRecord
  }
  
  function createTimeOutEvent(employeeRecord, timeStamp) {
    let [date, hour] = timeStamp.split(" ")
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    })
    return employeeRecord
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(e => e.date === date).hour
    let timeOut = employeeRecord.timeOutEvents.find(e => e.date === date).hour
    return (timeOut - timeIn) / 100
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    return hoursWorked * employeeRecord.payPerHour
  }
  
  function allWagesFor(employeeRecord) {
    let availableDates = employeeRecord.timeInEvents.map(e => e.date)
    let totalPay = availableDates.reduce((totalPay, date) => totalPay + wagesEarnedOnDate(employeeRecord, date), 0)
    employeeRecord.allWages = totalPay // add a new property to the employeeRecord with the total wages
    return totalPay
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0)
  }
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

