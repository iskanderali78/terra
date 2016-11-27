/**
 * Created by ISKANDER on 24.11.16.
 */
const tableHeaders = [
"Название товара","Категория","Статус товара","Цена","Изображение"];

const categoryType = [
    "Фоновая плита","Керамическая плитка","Керамический гранит","Клинкер",
    "Мозаика","Теплый пол","Строительная химия","Сантехника","Мебель для ванной"];

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
        if(tableHeaders[i] != "Категория"){
            headersRow += "<th>";
            headersRow += tableHeaders[i];
            headersRow += "</th>\n";
        }
        else{
            headersRow += "<th id='category'>";
            headersRow += tableHeaders[i] +
                "<br><input id='checkCategory' type='checkbox' hidden='true' onclick='filterChange(this)'>";
            headersRow += "</th>\n";
        }

    }
    headersRow += "<tr>\n";
    return headersRow;
}

function makeOneRow(values, id){
    var Row = "<tr>\n";
    for(var i = 0; i < tableHeaders.length; i++){
        var uid = "r" + id + "c" + i;
        Row += "<td id='";
        Row += uid;
        Row += "' align='center'";
        if(tableHeaders[i] == "Название товара"){
            Row += " onclick='information(\"" + values._id + "\")'";
        }
        if(tableHeaders[i] == "Категория"){
            Row += " onclick='createFilter(\"" + values.category + "\")' class='category'";
        }
        Row += ">";
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