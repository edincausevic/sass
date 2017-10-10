
var DOMcontroller = (function(){
  
	// ALL SELECTION STRINGS
	var domStrings = {
			body: 'body',
			mainMenu: '#main-menu',
			mobMenu: '#mob-menu',
			mobMenuBtn: '#menu-btn',
			mobMenuIcon: '#menu-btn i',
			closeModal: '#close-modal',
			postModal: '#post-modal',
			posts: '.card-medium'
		}
	
	// CUSTOM SELECTOR - Important: all selections will be in array
	var $ = function(el) {
		return document.querySelectorAll(el);
	}
	
	return {
		domTags: {
			body: $(domStrings.body)
		},
		// {} MAIN MENU ELEMENT SELECTIONS
		mainMenuElems: {
			menu: $(domStrings.mainMenu),
			mobMenu: $(domStrings.mobMenu),
			mobMenuBtn: $(domStrings.mobMenuBtn),
			mobMenuIcon: $(domStrings.mobMenuIcon)
		},
		// {} POST - MODEL ELEMENT NAMES 
		// el is dynamically created
		postModalElms: {
			modal: domStrings.postModal,
			close: domStrings.closeModal
		},
		// all medium posts
		mediumPosts: $(domStrings.posts)
	}
})();

var DATAcontroller = function(){
  
	return {
		post: {
			image: 'img/post1.jpg',
			title: 'How to write reliable browser tests using Selenium and Node.js',
			date: '27.10.2017',
			text: "Because we all have the capacity to do justice and show mercy, to treat other with dignity and respect; and to rise above what divides us and come together to meet those challanges we can't meet alone. This is where we are right now. Because we reject the same thing that people of all faiths..."
		}
	}
}();


var UIcontroller = function(DOM, DATA){
	
	return {
		// fade in effect
		fadeIn: function(el) {
			el.style.opacity = 0;
			el.style.transition = 'opacity 0.5s ease-in-out'; 
			setTimeout(function(){el.style.opacity = 1;},100);
		},
		// SHOW/HIDE MENU ON MOB SIZE
		mobMenuControl: function(e) {
				
			if (e.target == DOM.mainMenuElems.mobMenuBtn[0] || 
				e.target == DOM.mainMenuElems.mobMenuIcon[0]) {

				DOM.mainMenuElems.mobMenu[0].classList.toggle('slideRight');
			}else {
				DOM.mainMenuElems.mobMenu[0].classList.remove('slideRight');
			}
		},
		// {} REMOVE MODAL - on Close btn and black background click
		removeModal: function(e) {
			
			if (e.target == document.querySelector(DOM.postModalElms.modal) || 
			    e.target == document.querySelector(DOM.postModalElms.close)) {
				
				document.querySelector(DOM.postModalElms.modal).remove();
			}
		},
		// CREATE POST MODAL
		createPostModal: function() {
			var modal = document.createElement('DIV');
			    modal.classList.add('modal-back', 'post-modal'); 
			    modal.id = 'post-modal';
			var innerHTML = '<div class="modal">' +
								'<img src="'+ DATA.post.image +'" alt="Post Image">' +
								'<article>' +
									'<h2>'+ DATA.post.title +'</h2>' +
									'<span class="text-muted">'+ DATA.post.date +'</span>' +
									'<p class="text-muted">'+ DATA.post.text +'</p>' +
									'<footer class="clearFix">' +
										'<a href="javascript:;" id="close-modal">Close</a>' +
										'<a href="javascript:;">Read the whole article</a>' +
									'</footer>' +
								'</article>' +
							'</div>';
			modal.innerHTML = innerHTML;
			return modal;
		}
	}
}(DOMcontroller, DATAcontroller);





var MAINcontroller = function(DOM, UI, DATA, MAIN){
  
	var runApp = function() {
		
		// DOCUMENT CLICK EVENT DELAGATION
		document.addEventListener('click', function(e){

			UI.mobMenuControl(e); // mob menu show/hide
			UI.removeModal(e); // remove post modal
		});
		
		// ADD CLICK EVENT ON POSTS
		// SHOW POST MODAL ON CLICK
		for (var i = 0; i < DOM.mediumPosts.length; i++) {
			DOM.mediumPosts[i].addEventListener('click', function() {
				DOM.domTags.body[0].appendChild(UI.createPostModal());
				UI.fadeIn(document.querySelector(DOM.postModalElms.modal))
			});
		}
	}

	return {
		init: function() {
			console.log('Application started!');
			runApp();
		}
	}
  
}(DOMcontroller, UIcontroller, DATAcontroller, MAINcontroller);

MAINcontroller.init();