const spreadSheetContainer = document.querySelector("#spreadsheet-container");
const exportBtn = document.querySelector("#export-btn");
const excelFileInput = document.querySelector("#excel-file-input");

const ROWS = 10;
const COLS = 10;
const spreadsheet = [];
const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// 클래스 정의
class Cell {
    constructor(isHeader, disabled, data, row, column, rowName, columnName, active = false) {
        this.isHeader = isHeader
        this.disabled = disabled
        this.data = data
        this.row = row
        this.column = column
        this.rowName = rowName
        this.columnName = columnName
        this.active = active
    }
}

exportBtn.onclick = function (e) {
    exportExcel();
}

// Function to export spreadsheet data as Excel
// Using XLSX library to create and download an Excel file
function exportExcel() {
    // Implement Excel export functionality here
    if (spreadsheet.length === 0) {
        alert("내보낼 데이터가 없습니다.");
        return;
    }

    const dataToExport = [];
    for (let i = 1; i < spreadsheet.length; i++) { // 첫 번째 행(헤더) 제외
        dataToExport.push(
            spreadsheet[i]
                .filter(item => !item.isHeader) // 헤더 열 제외
                .map(item => item.data)
        );
    }

    const worksheet = XLSX.utils.aoa_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Spreadsheet File Name.xlsx");
}

// Function to export spreadsheet data as CSV
function exportCSV() {
    
    let csv = ""
    for (let i = 0; i < spreadsheet.length; i++){
        if (i === 0) {
            continue
        }
        csv += 
            spreadsheet[i]
            .filter((item) => !item.isHeader)
            .map((item) => item.data)
            .join(",") + "\r\n"
    }

    const csvObj = new Blob([csv])
    const csvUrl = URL.createObjectURL(csvObj)
    console.log("csv", csvUrl)

    const a = document.createElement("a")
    a.href = csvUrl
    a.download = "Spreadsheet File Name.csv"
    a.click()
}

excelFileInput.onclick = function (e) {

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        console.log("jsonData: ", jsonData);

        createCellFromJson(jsonData);

        drawSheet();
    };
    reader.onerror = function (error) {
        console.error("Error reading file:", error);
        alert("Failed to read the file. Please try again.");
    };

    reader.readAsBinaryString(file);
    // console.log("csv: ", csv);



}


initSpreadSheet();
function initSpreadSheet() {
    createCell();

    drawSheet();
}

function createCell() {
    spreadsheet.length = 0; // 초기화 시 항상 비워줍니다.
    for (let i = 0; i < ROWS; i++) {
        let spreadsheetRow = [];
        for (let j = 0; j < COLS; j++) {
            let cellData = "";
            let isHeader = false;
            let disabled = false;

            if (i === 0 && j === 0) { // 좌측 상단 빈 셀
                cellData = "";
                isHeader = true;
                disabled = true;
            } else if (j === 0) { // 행 헤더 (숫자)
                cellData = i;
                isHeader = true;
                disabled = true;
            } else if (i === 0) { // 열 헤더 (알파벳)
                cellData = alphabets[j - 1];
                isHeader = true;
                disabled = true;
            } else { // 일반 데이터 셀
                cellData = ""; // 초기 값은 빈 문자열
                isHeader = false;
                disabled = false;
            }

            const rowName = i;
            const columnName = alphabets[j]; // 이 부분은 실제 데이터 열 이름과 다를 수 있으니 유의

            const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, columnName, false);
            spreadsheetRow.push(cell);
        }
        spreadsheet.push(spreadsheetRow);
    }
}

function createCellFromJson(data) {
    console.log('createCellFromJson()');

    if (!data) {
        alert('데이터가 존재하지 않습니다!');
        return;
    }

    spreadsheet.length = 0; // 기존 스프레드시트 데이터 초기화

    // ROWS와 COLS를 jsonData의 실제 크기에 맞게 동적으로 조절하는 것도 고려해볼 수 있습니다.
    // 여기서는 일단 기존 상수로 유지하겠습니다.
    const actualRows = Math.max(ROWS, data.length || 0); // jsonData가 비어있을 경우 대비
    const actualCols = Math.max(COLS, (data[0] ? data[0].length : 0) + 1); // 첫 행의 길이에 기반 (A열 헤더 고려)

    for (let i = 0; i < actualRows; i++) {
        let spreadsheetRow = [];
        for (let j = 0; j < actualCols; j++) { // `j`를 `actualCols`까지 반복
            let cellData = "";
            let isHeader = false;
            let disabled = false;

            if (i === 0 && j === 0) { // 좌측 상단 빈 셀
                cellData = "";
                isHeader = true;
                disabled = true;
            } else if (j === 0) { // 행 헤더 (숫자)
                cellData = i;
                isHeader = true;
                disabled = true;
            } else if (i === 0) { // 열 헤더 (알파벳)
                cellData = alphabets[j - 1];
                isHeader = true;
                disabled = true;
            } else { // 일반 데이터 셀 - jsonData에서 데이터 가져오기
                // jsonData의 인덱스는 헤더를 포함하지 않으므로, i-1, j-1로 접근해야 할 수 있습니다.
                // sheet_to_json({header: 1})은 첫 행을 데이터로 포함하므로, 인덱스 i, j 그대로 사용합니다.
                if (data[i] && data[i][j]) { // 데이터 존재 여부 확인
                    cellData = data[i][j];
                } else {
                    cellData = "";
                }
                isHeader = false;
                disabled = false;
            }

            const rowName = i;
            const columnName = alphabets[j];

            const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, columnName, false);
            spreadsheetRow.push(cell);
        }
        spreadsheet.push(spreadsheetRow);
    }
}

function createCellEl(cell) {
    const cellEl = document.createElement("input");
    cellEl.className = "cell"
    cellEl.id = "cell_" + cell.row + cell.column
    cellEl.value = cell.data
    cellEl.disabled = cell.disabled

    if(cell.isHeader){
        cellEl.classList.add("header");
    }

    cellEl.onclick = () => handleCellClick(cell);
    cellEl.onchange = (e) => handleOnChange(e.target.value, cell);
    return cellEl
}

function handleOnChange(data, cell) {
    cell.data = data;
}

function handleCellClick(cell) {
    clearHeaderActiveStates();
    const columnHeader = spreadsheet[0][cell.column]
    const rowHeader = spreadsheet[cell.row][0]
    const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column)
    const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column)

    columnHeaderEl.classList.add("active");
    rowHeaderEl.classList.add("active");

    document.querySelector("#cell-status").innerHTML = cell.columnName + "" + cell.rowName;

}

function getElFromRowCol(row, col) {
    return document.querySelector("#cell_" + row + col);
}

function clearHeaderActiveStates() {
    const headers = document.querySelectorAll(".header");

    headers.forEach((header) => {
        header.classList.remove("active");
    })
}

function drawSheet() {
    // 기존 스프레드시트 UI를 비웁니다.
    spreadSheetContainer.innerHTML = "";

    for (let i = 0; i < spreadsheet.length; i++){
        const rowContainerEl = document.createElement("div");
        rowContainerEl.className = "cell-row";
        for (let j = 0; j < spreadsheet[i].length; j++){
            const cell = spreadsheet[i][j];
            rowContainerEl.append(createCellEl(cell));
        }
        spreadSheetContainer.append(rowContainerEl);
    }
    
}