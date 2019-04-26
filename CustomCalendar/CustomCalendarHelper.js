({
	// Pegando eventos do dia com o parametro dataWeek
	getEventos : function(component, event){
		var action = component.get('c.getCompromissos');

        action.setParams({ 
			"data" : component.get('v.dataWeek')
        }); 
		
		action.setCallback(this, function(a){ 
            var state = a.getState();  
            if(state === 'SUCCESS') { 
			var lista = a.getReturnValue();
				console.log(a.getReturnValue());
				for(let i = 0; i < lista.length; i++){
					if(lista[i].Subject === null || lista[i].Subject === undefined){
						lista[i].Subject = '[Nenhum assunto]';
					}
				}
				component.set('v.eventList', a.getReturnValue());
            } 
        }); 

		$A.enqueueAction(action);
	}
})