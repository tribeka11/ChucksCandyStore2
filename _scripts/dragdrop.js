var theFaves = document.getElementById('faves');
//upgraded the code to store the original color from CSS so we can restore it automatically
var startingColor = $('#favorites').css('background-color');
$('.painting')
	.bind('dragstart', function (evt) {
		evt.dataTransfer.setData('text', this.id);
		$('h2').fadeIn('fast');
	})
	.hover(
		function () { $('div', this).fadeIn(); }, 
		function () { $('div', this).fadeOut(); }
	);
	
$('#favorites')
	.bind('dragover', function (evt) {
		$('#favorites').css('background-color','gray');
		evt.preventDefault();
	})
	.bind('dragleave', function (evt) {
	    $('#favorites').css('background-color', startingColor);
		evt.preventDefault();
	})
	.bind('dragenter', function (evt) {
		evt.preventDefault();
	})
	.bind('drop', function (evt) {
		var id = evt.dataTransfer.getData('text'),
			item = $('#' + id),
			favList = $("#faves"),
			prevFavItem = null;
			prevFavItem = $('<li />', {
				text : $('p:first', item).text(),
				data : { id : id }
			}).appendTo(favList);
			$('#favorites').css('background-color', startingColor);
		
		saveFaves();

		evt.stopPropagation();
		return false;
	});
	
	function saveFaves() {
		localStorage.setItem('favorites', theFaves.innerHTML);
	};
	
	loadFaves();
	
	function loadFaves() {
        // when the page loads
	  if ( localStorage.getItem('favorites') ) {
		theFaves.innerHTML = localStorage.getItem('favorites'); 
	  }
	}