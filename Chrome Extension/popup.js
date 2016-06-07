

window.addEventListener('load', function() {
  var checkPageButton = document.getElementById('btn-runContentScript');
  checkPageButton.addEventListener('click', function() {
	  
	  chrome.tabs.getSelected(null, function(tab) {
	  	
		  console.log(tab);
		chrome.tabs.reload(tab.id);
	  });
  });
  
});