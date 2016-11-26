/**
 * Created by ISKANDER on 24.11.16.
 */
const tableHeaders = [
"Название товара","Категория","Статус товара","Цена","Изображение"];

var table = function(tableData){
    this.tableData = tableData;
};

table.prototype.transformToHTML = function(tableData){
    var table = "<table id='catalog' border='1' width='100%' rules='all'>\n";
    table += "<thead>\n";
    table += makeHeaders();
    table += "</thead>\n";
    table += "<tbody>\n";
    table += makeRows(this.tableData);
    table += "</tbody>\n";
    table += "</table>";
    return table;
}

function makeHeaders(){
    var headersRow = "<tr>\n";
    for(var i = 0; i < tableHeaders.length; i++){
        headersRow += "<th>";
        headersRow += tableHeaders[i];
        headersRow += "</th>\n";
    }
    headersRow += "<tr>\n";
    return headersRow;
}

function makeOneRow(values, id){
    var Row = "<tr>\n";
    for(var i = 0; i < tableHeaders.length; i++){
        var uid = "r" + id + "c" + i;
        Row += "<td id='" + uid + "' align='center' onclick='information(\"" + values._id + "\")'>";
        switch(i){
            case 0: Row += values.name; break;
            case 1: Row += values.category; break;
            case 2: Row += values.status; break;
            case 3: Row += values.price; break;
            case 4: Row += "<img width='100.0px' src ='/images/" + values.image + "'>"; break;
        }
        Row += "</td>\n";
    }
    Row += "<tr>\n";
    return Row;
}

function makeRows(rows){
    var Rows = "";
    for(var i = 0; i < rows.length; i++){
        Rows += makeOneRow(rows[i], i);
    }
    return Rows;
}

module.exports = table;