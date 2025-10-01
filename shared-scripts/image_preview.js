var selectedImage = null;
var animating = false;

function showImageEnlarged(elem) {
	selectedImage = elem;
	let src = selectedImage.prop('src');
	$('#hud-image').prop('src', src);
}

function disposeImageEnlarged() {
	if(animating) return;
	animating = true;
	$('.hud').animate({opacity: 0}, 500, function() {
		$('.hud').css('visibility', 'hidden');
		$('#close-hud').css('opacity', 0);
		$('#hud-image').prop('src', undefined);
		selectedImage = null;
		animating = false
	});
}


$(document).ready(function() {
	$('#hud-image').on('load', function() {
		if(animating) return;
		animating = true
		let position = $(selectedImage).offset();
		let width = $(selectedImage).outerWidth();
		let height = $(selectedImage).outerHeight();

		$('.hud').css({
			left: position['left'],
			top: position['top'],
			width: width,
			height: height,
			visibility: 'visible',
			opacity: 1
		}).animate({
			left: '1%',
			top: '1%',
			width: '98%', //'calc(100vw-30px)',
			height: '98%', //'calc(100vh-30px)'
		}, 500, function() {
			// show close button at correct position
			let fullImagePos = $('#hud-image').offset();
			let width = $('#hud-image').outerWidth();
			$('#close-hud').css({
				left: fullImagePos['left'] + width - 40,
				top: fullImagePos['top'] + 10
			}).animate({opacity: 1}, 500, function() {
				animating = false
			})
		})
	})

	$('.image-preview').each(function() {
		$(this).on('click', function() {
			showImageEnlarged($(this))
		})
	})

	$('#close-hud').on('click', function() {
		disposeImageEnlarged()
	})

	$(document).keyup(function(e) {
        if(e.key === "Escape") {
      		disposeImageEnlarged()
      	}
    })

    $(window).on('click', function(e) {
    	if($('#hud-image').css('visibility') === 'visible' && $(e.target).prop('id') !== 'hud-image') {
    		disposeImageEnlarged();
    	}   
    });
})