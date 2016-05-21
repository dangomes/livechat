if (Meteor.isClient) 
{
	Template.messages.helpers({
		
		messages: function() {
			return Messages.find( {}, { 
			
				sort: {times: -1}
			});
		}
	});
	
	Template.input.events = {
		
		'click #reset' : function (event) {
			
			var obj = Messages.find({}).collection._docs._map;
			
			//alert(obj.toSource());
			
			for (var elemment in obj) 
			{
				Messages.remove(elemment);
			}
						
		}, // 'keydown input#user'
		
		'keydown input#message' : function (event) {
		  
			if ( event.which == 13 )
			{
				var user 	= document.getElementById('user');				
				var name 	= user.value != '' ? user.value : 'Anônimo';
				var message = document.getElementById('message');
				
				if ( message.value != '' )
				{
					var currentDate = new Date();
					var hours 		= currentDate.getHours();
					var minutes 	= currentDate.getMinutes();
					var seconds 	= currentDate.getSeconds();
					var time 		= hours + ':' + minutes + ':' + seconds;
										
					Messages.insert({
						
					  name		: name,
					  message	: message.value,
					  time		: time,
					  times 	: currentDate,
					  
					});
		
					document.getElementById('message').value = '';
					message.value = '';
				}
			}
		  
		}, // 'keydown input#message'
		
		'focus input#message, click #lbl-message' : function (event) {
			
			scrollTo(0.0, 230);
			
		}, // 'focus input#message'
			
	}
}

