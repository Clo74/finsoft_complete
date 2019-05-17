/**
 * 
 */
import VersioniService from "./versioniService.js";
import FlussiService from "./flussiService.js";

class PagVersioni {
	
	constructor() {
		this.service = new VersioniService();
		this.serviceFlussi = new FlussiService();
		
		this.bindingAll();
		this.ArrCol = [];
		this.myJson = {};
		this.newData = [];
		this.arrOpt = [];
		
		this.getAllData();
	}
	
	getAllData() {
		this.service.all().
			then((ArrJson) => {
				this.data = this.ricreaArrJson(ArrJson);
				this.creaTabella();
			});
	}
	/**
	 * sistema il json in modo da visualizzarlo a video
	 */
	ricreaJson(json){
		return {
			id: json.id,
			data: json.data,
			versione: json.versione,
			flusso: json.flusso.tabella,
		}
	}
	/**
	 * crea un array di json risistemati
	 */
	ricreaArrJson(arrJson){
		arrJson.map(json => {
			this.newData.push(this.ricreaJson(json));
		});
		return this.newData;
	}
	/**
	 * legge i flussi da servizio rest e crea un array per la select
	 */
	caricaFlussi() {
		this.serviceFlussi.all().
		then((ArrJson) => {
			ArrJson.map((f) => {
				this.arrOpt.push(f.id);
			})
		});
		
	}
	
	createColumn() {
        const first = this.data[0];
        this.fields = Reflect.ownKeys(first);
        this.caricaFlussi();
        
        this.fields.map((col) => {
        	switch (col) {
        	case "id":
	        	this.myJson = {
	        		    data: col,
	        		    title: col,
	        		    type: "readonly"	        		    
	        	};
	        	break;
        	case "flusso":
	        	this.myJson = {
        		    data: col,
        		    title: col,
        		    type: "select",
        		    options: this.arrOpt	        		    
        	};
	        	break;
        	default:
	        	this.myJson = {
	        		    data: col,
	        		    title: col        			
	        	};
        	}
        	this.ArrCol.push(this.myJson);
        } );
	}
	
	creaTabella(){
		this.createColumn();
		this.myTable = $('#flussi').DataTable({
		    "sPaginationType": "full_numbers",
		    data: this.data,
		    columns: this.ArrCol,
			dom: 'Bfrtip',        // Needs button container
		    select: 'single',
		    responsive: true,
		    altEditor: true,     // Enable altEditor
		    onDeleteRow:this.deleteRow,
		    onEditRow: this.editRow,
		    onAddRow: this.addRow,
		    buttons: [{
		            text: 'Add',
		            name: 'add'        // do not change name
		          },

		          {
		            extend: 'selected', // Bind to Selected row
		            text: 'Edit',
		            name: 'edit'        // do not change name
		          },

		          {
		            extend: 'selected', // Bind to Selected row
		            text: 'Delete',
		            name: 'delete'      // do not change name
		         }]
		  });
	}
	
	
	deleteRow(datatable, rowdata, success, error) {
		this.service.delete(rowdata.id)
		.then(response => {
			if (response.ok) {
				success();
			}	else {
				error();
			}
		});
	}
	
	creaJsonRes(json) {
		 return {
			flusso: {
				id:json.flusso
			},
			data: json.data,
			versione: json.versione
		};
		
	}
	
	addRow(datatable, rowdata, success, error) {
		this.service.add(this.creaJsonRes(rowdata))
		.then((JsonRes) => {
			success(JSON.stringify(this.ricreaJson(JsonRes)))
		});
	}
	
	editRow(datatable, rowdata, success, error) {
		this.service.update(rowdata.id, this.creaJsonRes(rowdata))
		.then((JsonRes) => {
			success(JSON.stringify(this.ricreaJson(JsonRes)))
		});
	}	
	
    bindingAll() {
        this.getAllData = this.getAllData.bind(this);
        this.creaTabella = this.creaTabella.bind(this);
        this.deleteRow = this.deleteRow .bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);        
        this.ricreaJson = this.ricreaJson.bind(this);        
        this.ricreaArrJson = this.ricreaArrJson.bind(this);        
        this.creaJsonRes = this.creaJsonRes.bind(this);        
    }
}

$(document).ready(function() {
	new PagVersioni();
});