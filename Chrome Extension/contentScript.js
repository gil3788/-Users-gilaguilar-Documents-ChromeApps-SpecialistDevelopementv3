//Chrome Extension :Content Script that will extract Implementation Category from Adelphi Page//

var category = "";
var implementation = "";
var implementationCounter = 0;
var saveButton = "";


//Listen for when Window is fully loaded//
window.addEventListener("load", function () {
	setTimeout(myFunction, 2000);
});


//function to eliminate click listener from Save Button//
function once()
{
	setTimeout(getImplementation, 5000);
	
	
}

//function that extracts implementation category fromm Adelphi control panel// 
function getImplementation (category)
{
  indicator = document.getElementById("ts-sto-category-readonly").textContent;
  
  if(indicator!= null)
  {//if indicator//////////////
	  
  //obtains category element and stores it in "category" variable//
	  category = document.getElementById("ts-sto-category-readonly").textContent;
  
   //Checks if "category" variable is not empty ("null")//
   if(category != null)
   {//if category//////////////	
	//splits "category" variable into an array called "implementationArray"//
	implementationArray = category.split(">");
	implementationPlatform = implementationArray[3];

	//obtains final element from "implementationArray" and stores it in "implementation" variable//
	implementation = implementationArray[implementationArray.length-1];
	
	
	//Have to send "implementation" variable to background.js Chrome App to find implementation category//
	//chrome.runtime.sendMessage(appId=eekljohmmenijpclojmcmccnibfhcggg, message=implementation, options, responseCallback)
	
		
	chrome.runtime.sendMessage("ofmabpabdodeghmebjgoegkiekjhihhk",implementation,{}, function (response) {
		console.log("Message Sent to App");
        if (chrome.runtime.lastError)
		 {
			console.log('chrome.runtime.sendMessage error',chrome.runtime.lastError);
		 }
        else
		 {
            console.log(response);
		 }
		
	   });

    }//if category/////////////
  }//if indicator//////////////
}
//////////////////////////////////////////////////////////

function myFunction ()
{
console.log("Running myFunction");
	//if domain of browser is in "adelphi.corp.google.com"; script obtains "save" button element from control panel (line 26)//
  if(document.domain == "adelphi.corp.google.com")
  {
	  console.log("site domain equals adelphi.corp.google.com");
	  
	  //"save" button element from control panel in adelphi//
	  saveButton = document.getElementById("ts-save");
	  
	  console.log(saveButton);
	  category = document.getElementById("ts-sto-category-readonly").textContent;
	  console.log(category);
	// if saveButton variable is not "null", then script will listen if a click is done on the "save" button //
	 if(saveButton != null)
	 {
		 //If saveButton is clicked, then getImplementation function is activated //
		saveButton.addEventListener("click", function() {
		  setTimeout(getImplementation, 7000);	
		});
	 }
   }
}

///////////////////////////////////////-------------------------------------------------------------->