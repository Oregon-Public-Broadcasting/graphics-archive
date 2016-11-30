function loadElectionSnippet(apId, divId)
{
	var xhr= new XMLHttpRequest();
	xhr.open('GET', 'http://opb-data.s3.amazonaws.com/elections/' + apId + '.html', true);
	xhr.onreadystatechange= function() {
		if (this.readyState!==4) return;
		if (this.status!==200) return; // or whatever error handling you want
		document.getElementById(divId).innerHTML= this.responseText;
	};
	xhr.send();
}

