
// MOB MENU CONTROL
document.addEventListener('click', function(e){
	
	if (document.getElementById('main-menu') !== null) {
		
		var mobMenu = document.getElementById('mob-menu');
	
		if (e.target == document.getElementById('menu-btn') || 
		   e.target == document.querySelector('#menu-btn i')) {
			//window.scrollTo(0, 530);
			mobMenu .classList.toggle('slideRight');
		}else {
			mobMenu .classList.remove('slideRight');
		}	
	}
});