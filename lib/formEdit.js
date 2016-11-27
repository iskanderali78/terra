/**
 * Created by MASTER on 27.11.2016.
 */
const formFields = [
    "Название","Категория","Изображение","Цена","Статус","Описание","Производитель","Размер","Вес","Страна"];

const categoryType = [
    "Фоновая плита","Керамическая плитка","Керамический гранит","Клинкер",
    "Мозаика","Теплый пол","Строительная химия","Сантехника","Мебель для ванной"];

var form = function(formData, url){
    this.formData = formData;
    this.url = "/update/" + url;
};

form.prototype.transformToHTML = function(){
    var form = "<form id='edit' action='" + this.url + "' enctype='multipart/form-data' method='GET'>\n";
    //console.log(form);
    form += "<table>";
    form += "<tr>";
    form += "<td>";
    form += "<div class='main'>";

    for(var i = 0; i < formFields.length; i++)
    {
        var id;
        var value;
        switch(i){
            case 0: id='name'; value=this.formData.name;  break;
            case 1: id='category'; value=this.formData.category;  break;
            case 2: id='image'; value=this.formData.image;  break;
            case 3: id='price'; value=this.formData.price;  break;
            case 4: id='status'; value=this.formData.status;  break;
            case 5: id='description'; value=this.formData.description;  break;
            case 6: id='producer'; value=this.formData.producer;  break;
            case 7: id='size'; value=this.formData.size;  break;
            case 8: id='weight'; value=this.formData.weight;  break;
            case 9: id='country'; value=this.formData.country;  break;
        }
        form += "<div class='field'>";
        //form += "<label>" + formFields[i] + ": </label>";
        //if(id != 'category'){
            form += "<input size='100' type='text' value='" + value + "'><br>\n";
        //}
        //else{
        //    form += "<select id='" + id + "'>\n";
        //    for(var m = 0; m < categoryType.length; m++){
        //        if(this.formData.category == categoryType[m]){
        //            console.log(categoryType[m]);
        //            form += "<option value='" + categoryType[m] + "'>";
        //            form += categoryType[m];
        //            form += "</option>\n";
        //        }
        //        else{
        //            form += "<option value='" + categoryType[m] + "' selected>";
        //            form += categoryType[m];
        //            form += "</option>\n";
        //        }
        //    }
        //    form += "</select>\n"
        //}
        form += "</div>";
    }
    form += "</div>";
    form += "</td>";
    form += "</tr>";
    form += "</tr>";
    form += "<td>";
    form += "<div>";
    form += "<input type='submit' form='edit' id='accept'></input>"
    form += "<input type='reset' form='edit' id='reject'></input>"
    form += "</div>"
    form += "</td>";
    form += "</tr>";
    form += "</table>";

    form += "</form>";

    form = form.replace(/undefined/g," ");

    return form;
}

module.exports = form;