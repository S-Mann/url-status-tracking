let formObject = document.getElementById("urlToTrackForm");
let tableObject = document.getElementById("dataTable");
let urlToTrack;
let urlTrackedMap = {};

formObject.onsubmit = function submit(event) {
    event.preventDefault();
    urlToTrack = formObject.elements["urlToTrack"].value;
    if (urlTrackedMap[urlToTrack] == undefined) {
        insertTableRow(urlToTrack, false);
        urlTrackedMap[urlToTrack] = false;
    }
}

function insertTableRow(value, status) {
    let rowIndex;
    let elementExist = document.getElementById(value);
    if (elementExist) {
        rowIndex = elementExist.rowIndex;
        tableObject.deleteRow(rowIndex);
    }
    rowIndex = tableObject.rows.length;
    let row = tableObject.insertRow(rowIndex);
    row.id = value;
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = rowIndex;
    cell2.innerHTML = value;
    cell2.classList.add("text-truncate", "row-text-truncate");
    if (status) {
        let passed = document.createElement("i");
        passed.classList.add("fa", "fa-check");
        cell3.appendChild(passed);
    } else {
        let failed = document.createElement("i");
        failed.classList.add("fa", "fa-times");
        cell3.appendChild(failed);
    }
}

function updateTableRow(URL, status) {
    let rowIndex = document.getElementById(URL).rowIndex;
    tableObject.deleteRow(rowIndex);
    insertTableRow(URL, status, rowIndex);
}

async function checkstatus() {
    for (const URL in urlTrackedMap) {
        urlTrackedMap[URL] = await fetch(URL)
            .then(function (e) {
                if (e.ok || e.status <= 499) {
                    updateTableRow(URL, true);
                } else {
                    updateTableRow(URL, false);
                }
            })
            .catch(function () {
                updateTableRow(URL, false);
            });
    }
}

let timedCheckStatus = setInterval(function () {
    checkstatus();
}, 60000);
