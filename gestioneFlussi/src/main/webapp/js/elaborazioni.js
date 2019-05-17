
import ElaborazioniService from "./elaborazioniService.js";

class PagElaborazioni {
	
	constructor() {
		this.service = new ElaborazioniService();
		this.bindingAll();
		this.getAllData();
		this.myJson = {};
		this.myArrJson = [];
		this.getCampi();
	}
	
	getCampi(){
		this.butSel = $("#selElab");
		this.butSel.click(this.getSelect);
		
		this.selElab = $(".js-example-data-array");
	}
	
	getSelect() {
		console.log(this.selElab.select2('data'));
	}
	
	correggiJson(arrJson) {
		arrJson.map((json) => {
			this.myJson = {
					id:json.id,
					text: json.dataOra + "-" + json.utente 
			}
			this.myArrJson.push(this.myJson);
		})
		return this.myArrJson;
	}
	
	getAllData() {
		this.service.all().
			then((ArrJson) => {
				this.data = this.correggiJson(ArrJson);
				this.creaSelect();
			});
	}
	
	creaSelect(){
		this.selElab.select2({
			data : this.data,
			type: "json",
			multiple: "multiple"			
		})		
	}
	
    bindingAll() {
        this.creaSelect = this.creaSelect.bind(this);
        this.getAllData = this.getAllData.bind(this);
        this.correggiJson = this.correggiJson.bind(this);
        this.getSelect = this.getSelect.bind(this);
        this.getCampi = this.getCampi.bind(this);
    }
}



$(document).ready(function() {
	new PagElaborazioni();
});