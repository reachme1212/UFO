// import the data from data.js file
const tableData = data;

// Reference the HTML table using d3 library to select tbody tag in html file
var tbody = d3.select("tbody");

function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");

    // Next, loop through each object in the data.js
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        // Append a row to the table body
        let row = tbody.append("tr");

        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
}
// 1. Create a variable to keep track of all the filters as an object.
var filters = {};
// event listener
function updateFilters() {


    // Save the element, value, and id of the filter that was changed
    var changedElement = d3.select(this);

    var elementValue = changedElement.property("value");
    console.log(elementValue);

    var filterId = changedElement.attr("id");
    console.log(filterId);

    // If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object
    if (elementValue) {
        filters[filterId] = elementValue;
    } else {
        delete filters[filterId];
    }
    // Call function to apply all filters and rebuild the table
    filterTable();
}

function filterTable() {

    // Set the filteredData to the tableData
    let filteredData = tableData;

    // Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => row[key] === value);
    });

    // Rebuild the table using the filtered Data
    buildTable(filteredData);
}

// Attach an event to listen for the form button
d3.selectAll("input").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);