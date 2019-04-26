({
	// Pega os eventos do dia atual * Carregado no inicio do componente
	getWeek : function(component, event, helper){
		var curr = new Date;
		var month;
		if(curr.getMonth().toString().length === 1){
			month = '0' + (curr.getMonth() + 1);
		}else{
			month = (curr.getMonth() + 1);
		}
		
		var data = curr.getDate() + '/' + month + '/' + curr.getFullYear();
		component.set('v.dataWeek', data);
		
		var days = [];
		var weeks = [];
		var weekday = new Array(7);
		weekday[0] =  "DOM";
		weekday[1] = "SEG";
		weekday[2] = "TER";
		weekday[3] = "QUA";
		weekday[4] = "QUI";
		weekday[5] = "SEX";
		weekday[6] = "SAB";
		for(let i = 0; i != 7; i++){
			days.push({'dia': new Date(curr.setDate(curr.getDate() - curr.getDay()+i)).getDate(), 'data': new Date(curr.setDate(curr.getDate() - curr.getDay()+i))});
			weeks.push(weekday[new Date(curr.setDate(curr.getDate() - curr.getDay()+i)).getDay()]);
		}

		component.set('v.days', days);
		component.set('v.weekdays', weeks);
		component.set('v.savedate', curr);

		helper.getEventos(component, event);


				setTimeout(function(){
		 var datahoje = new Date;
		 var elementos = document.getElementsByClassName("diasSemana");
		 for(let i = 0; i < elementos.length; i++){
			
			if(datahoje.getDate() == elementos[i].getAttribute("data-value")){
				elementos[i].classList.add("selected");
			}else{
				elementos[i].classList.remove("selected");
			}
		 }
		}, 500);

		   
	},
	
    // Avançando 7 dias na semana
	getWeekMore : function(component, event, helper){
		var curr = component.get('v.savedate');
		curr.setDate(curr.getDate() + 7);
		var days = [];
		var weeks = [];
		var weekday = new Array(7);
		weekday[0] =  "DOM";
		weekday[1] = "SEG";
		weekday[2] = "TER";
		weekday[3] = "QUA";
		weekday[4] = "QUI";
		weekday[5] = "SEX";
		weekday[6] = "SAB";
		for(let i = 0; i != 7; i++){
			days.push({'dia': new Date(curr.setDate(curr.getDate() - curr.getDay()+i)).getDate(), 'data': new Date(curr.setDate(curr.getDate() - curr.getDay()+i))});
			weeks.push(weekday[new Date(curr.setDate(curr.getDate() - curr.getDay()+i)).getDay()]);
		}

		component.set('v.days', days);
		component.set('v.weekdays', weeks);
		component.set('v.savedate', curr);
        
        setTimeout(function(){
        var dataComp = component.get('v.dataWeek');
		 var elementos = document.getElementsByClassName("diasSemana");
		 for(let i = 0; i < elementos.length; i++){
			var curr = new Date(elementos[i].getAttribute("data-item"));
            var month;
            if(curr.getMonth().toString().length === 1){
                month = '0' + (curr.getMonth() + 1);
            }else{
                month = (curr.getMonth() + 1);
            }
			if(dataComp.substring(0,2) == elementos[i].getAttribute("data-value") && dataComp.substring(3,5) == month){
				elementos[i].classList.add("selected");
			}else{
				elementos[i].classList.remove("selected");
			}
		 }
		}, 500);
	},
	
    // Voltando 7 dias na semana
	getWeekLess : function(component, event, helper){
		var curr = component.get('v.savedate');
		curr.setDate(curr.getDate() - 7);
		var days = [];
		var weeks = [];
		var weekday = new Array(7);
		weekday[0] =  "DOM";
		weekday[1] = "SEG";
		weekday[2] = "TER";
		weekday[3] = "QUA";
		weekday[4] = "QUI";
		weekday[5] = "SEX";
		weekday[6] = "SAB";
		for(let i = 0; i != 7; i++){
			days.push({'dia': new Date(curr.setDate(curr.getDate() - curr.getDay()+i)).getDate(), 'data': new Date(curr.setDate(curr.getDate() - curr.getDay()+i))});
			weeks.push(weekday[new Date(curr.setDate(curr.getDate() - curr.getDay()+i)).getDay()]);
		}

		component.set('v.days', days);
		component.set('v.weekdays', weeks);
		component.set('v.savedate', curr);
        
        setTimeout(function(){
        var dataComp = component.get('v.dataWeek');
		 var elementos = document.getElementsByClassName("diasSemana");
		 for(let i = 0; i < elementos.length; i++){
			var curr = new Date(elementos[i].getAttribute("data-item"));
            var month;
            if(curr.getMonth().toString().length === 1){
                month = '0' + (curr.getMonth() + 1);
            }else{
                month = (curr.getMonth() + 1);
            }
			if(dataComp.substring(0,2) == elementos[i].getAttribute("data-value") && dataComp.substring(3,5) == month){
				elementos[i].classList.add("selected");
			}else{
				elementos[i].classList.remove("selected");
			}
		 }
		}, 500);
	},
	
	// Selecionando um dia da semana
	focusSelected : function(component, event, helper) {
		var x = event.currentTarget;
		
		var elementos = document.getElementsByClassName("diasSemana");
		for(let i = 0; i < elementos.length; i++){
			if(elementos[i].getAttribute("id") === x.id){
				$A.util.toggleClass(x, "selected");
			}else{
				elementos[i].classList.remove("selected");
				console.log('nao tem');
			}
			
		}

		var curr = new Date(event.target.dataset.item);
				var month;
		if(curr.getMonth().toString().length === 1){
			month = '0' + (curr.getMonth() + 1);
		}else{
			month = (curr.getMonth() + 1);
		}
		
		var data = curr.getDate() + '/' + month + '/' + curr.getFullYear();
		component.set('v.dataWeek', data);
		
		helper.getEventos(component, event);
		
	},
	
    // Primeiro botão para criação de um registro de Compromisso 
	createEvent : function(component, event, helper){
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({ 
            "entityApiName": "Event"
        });
        createRecordEvent.fire();
	},
	
    // Segundo botão para voltar para o dia e semana atual + Trazendo eventos do dia
	getToday : function(component, event, helper){
		var curr = new Date;
		var month;
		if(curr.getMonth().toString().length === 1){
			month = '0' + (curr.getMonth() + 1);
		}else{
			month = (curr.getMonth() + 1);
		}
		
		var data = curr.getDate() + '/' + month + '/' + curr.getFullYear();
		component.set('v.dataWeek', data);
		
		helper.getEventos(component, event);

		var days = [];
		for(let i = 0; i != 7; i++){
			days.push({'dia': new Date(curr.setDate(curr.getDate() - curr.getDay()+i)).getDate(), 'data': new Date(curr.setDate(curr.getDate() - curr.getDay()+i))});
		}

		component.set('v.days', days);

		setTimeout(function(){
		 var datahoje = new Date;
		 var elementos = document.getElementsByClassName("diasSemana");
		 for(let i = 0; i < elementos.length; i++){
			
			if(datahoje.getDate() == elementos[i].getAttribute("data-value")){
				elementos[i].classList.add("selected");
			}else{
				elementos[i].classList.remove("selected");
			}
		 }
		}, 500);
		
	},
	
    // Indo para tela de comproimsso ao clicar em um compromisso
	goToEvent : function (component, event, helper){
		var urlEvent = $A.get("e.force:navigateToURL");
	    urlEvent.setParams({
          "url": "/lightning/r/Event/" + event.currentTarget.id + "/view"
        });
        urlEvent.fire();
	}
})