/*
   ===================================
   = Created By: Carlos Pessoa       =
   = Date: 26/04/2019				 =
   = Email: pessoacarlos98@gmail.com = 
   ===================================
*/
public class ControllerCustomCalendar {

	@AuraEnabled
	public static List<Object> getCompromissos(String data) {
		// 00/00/2019
		Date sqlDate = Date.newInstance(Integer.valueOf(data.substring(6,10)), Integer.valueOf(data.substring(3,5)), Integer.valueOf(data.substring(0,2)));
		List<Event> events = [SELECT Id, Location, Subject, StartDateTime, EndDateTime FROM Event WHERE ActivityDate =: sqlDate AND OwnerId =: UserInfo.getUserId()];
		List<EventScreen> returnEvents = new List<EventScreen>();
		for(Event e : events){
			String evData = String.valueOf(e.StartDateTime);
			String evDataEnd = String.valueOf(e.EndDateTime);
			EventScreen eve = new EventScreen();
			eve.Location = e.Location;
			eve.Subject = e.Subject;
			eve.StartDateTime =  evData.substring(8,10) + '/' + evData.subString(5,7) + '/' + evData.substring(0,4) + ' ' + evData.substring(11,16);
			eve.EndDateTime = evDataEnd.substring(8,10) + '/' + evDataEnd.subString(5,7) + '/' + evDataEnd.substring(0,4) + ' ' + evDataEnd.substring(11,16);
			eve.EventTime = String.valueOf(e.StartDateTime).subString(11,16);
			eve.Id = e.Id;
			returnEvents.add(eve);
		}
		System.debug(returnEvents);
		return returnEvents;
	}

	public class EventScreen{
		@AuraEnabled public String Id;
		@AuraEnabled public String Location;
		@AuraEnabled public String Subject;
		@AuraEnabled public String StartDateTime;
		@AuraEnabled public String EndDateTime;
		@AuraEnabled public String EventTime;
	}
}