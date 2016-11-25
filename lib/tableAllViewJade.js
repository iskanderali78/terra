/**
 * Created by ISKANDER on 24.11.16.
 */
const tableHeaders = [
"Название товара","Категория","Статус товара","Цена","Изображение"];

var table = function(tableData){
    this.tableData = tableData;
};

table.prototype.transformToJade = function(tableData){
    var table = "table\n";
    table += "thead\n";
    table += makeHeaders();
    table += "tbody\n";
    table += makeRows(this.tableData);
    return table;
};

function makeHeaders(){
    var headersRow = "tr: ";
    for(var i = 0; i < tableHeaders.length; i++){
        headersRow += "td ";
        headersRow += tableHeaders[i];
        headersRow += "\n";
    }
    //headersRow += " \n";
    return headersRow;
};

function makeOneRow(values){
    var Row = "tr: ";
    for(var i = 0; i < tableHeaders.length; i++){
        Row += "td ";
        switch(i){
            case 0: Row += values.name; break;
            case 1: Row += values.category; break;
            case 2: Row += values.status; break;
            case 3: Row += values.price; break;
            case 4: Row += values.image; break;
        }
        Row += "\n";
    }
    return Row;
};

function makeRows(rows){
    var Rows = "";
    for(var i = 0; i < rows.length; i++){
        Rows += makeOneRow(rows[i]);
    }
    return Rows;
};

module.exports = table;