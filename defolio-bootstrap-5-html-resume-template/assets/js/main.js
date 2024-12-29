jQuery(document).ready(function($) {

	// Mobile menu toggle
	$('.ds-nav-link').on('click', function(e) {
		if ($(window).width() <= 768) {
			e.preventDefault();
			$(this).parent().toggleClass('active');
			$(this).next('.ds-dropdown').slideToggle();
		}
	});

	// Add mobile menu toggle button
	$('.ds-header-top').append('<button class="ds-mobile-menu-toggle"><i class="ri-menu-line"></i></button>');

	// Mobile menu toggle button click
	$('.ds-mobile-menu-toggle').on('click', function() {
		$('.ds-header').toggleClass('active');
		$('.ds-header-nav').slideToggle();
	});

	// Close mobile menu when clicking outside
	$(document).on('click', function(e) {
		if ($(window).width() <= 768) {
			if (!$(e.target).closest('.ds-navigation').length) {
				$('.ds-navigation').removeClass('active');
				$('.ds-dropdown').slideUp();
				$('.ds-nav-item').removeClass('active');
			}
		}
	});

	var mastheadheight = $('.ds-header').outerHeight();
	//console.log(mastheadheight);
	$(".ds-banner,.ds-main-section").css("margin-top" , mastheadheight);

	$(window).scroll(function(){
	    if ($(window).scrollTop() >= 10) {
	        $('.ds-header').addClass('ds-fixed-header');
	    }
	    else {
	        $('.ds-header').removeClass('ds-fixed-header');
	    }
	}).scroll();


});

// Contact form handling
const contactForm = document.querySelector('.ds-contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                // Success message
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            } else {
                // Error message
                alert('Oops! There was a problem sending your message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Oops! There was a problem sending your message. Please try again.');
        })
        .finally(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    });
}
