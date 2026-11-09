/* ============================================================ */
/* KING'Z ARENA - MASTER JAVASCRIPT    */
/* ============================================================ */

$(document).ready(function() {
    
    // ==========================================
    // 1. ENQUIRY FORM LOGIC 
    // ==========================================
    const $enquiryForm = $('.enquiry-form');
    if ($enquiryForm.length) {
        $enquiryForm.on('submit', function(e) {
            e.preventDefault(); 
            
            if (!this.checkValidity()) {
                alert("Please fill in all required fields correctly.");
                return;
            }

            const name = $('#name').val();
            const $packageSelect = $('#package');
            const packageText = $packageSelect.find('option:selected').text();
            const date = $('#date').val();
            
            let cost = "R0";
            const val = $packageSelect.val();
            if (val === 'bruv') cost = "R120";
            if (val === 'premium') cost = "R200";
            if (val === 'throne') cost = "R450";

            alert(`Thank you, ${name}!\n\nYour enquiry for the ${packageText} on ${date} has been processed.\nEstimated Cost: ${cost}.\n\nWe will contact you shortly to confirm availability.`);
            this.reset();
        });
    }

    // ==========================================
    // 2. CONTACT FORM LOGIC
    // ==========================================
    const $contactForm = $('#contactForm, #contact-form');
    if ($contactForm.length) {
        $contactForm.on('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            $('.error-message, .field-error').text('');
            const $responseDiv = $('#contact-form-response, #contact-status');
            $responseDiv.text('').removeClass('success-msg');

            const $name = $('#contact-name, #c-name');
            if ($name.length && $name.val().trim() === '') {
                $('#contact-name-error, #c-name-error').text("Name is required.");
                isValid = false;
            }

            const $email = $('#contact-email, #c-email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if ($email.length && !emailRegex.test($email.val())) {
                $('#contact-email-error, #c-email-error').text("Please enter a valid email address.");
                isValid = false;
            }

            const $msgType = $('#message-type, #c-type');
            if ($msgType.length && $msgType.val() === '') {
                $('#message-type-error, #c-type-error').text("Please select a message type.");
                isValid = false;
            }

            const $msg = $('#contact-message, #c-message');
            if ($msg.length && $msg.val().trim().length < 10) {
                $('#contact-message-error, #c-message-error').text("Message must be at least 10 characters long.");
                isValid = false;
            }

            if (isValid) {
                const $submitBtn = $('#contact-submit-btn, #contact-submit');
                const originalText = $submitBtn.text();
                $submitBtn.text('Sending...').prop('disabled', true);

                setTimeout(() => {
                    $responseDiv.text(`Success! Your message has been compiled and sent to our team.`);
                    $responseDiv.addClass('success-msg');
                    $submitBtn.text(originalText).prop('disabled', false);
                    this.reset();
                }, 1200);
            }
        });
    }

    // ==========================================
    // 3. PRODUCTS FILTER (jQuery Search & Dropdown)
    // ==========================================
    const $searchInput = $('#package-search, #pkg-search');
    const $filterSelect = $('#package-filter, #pkg-max');
    
    if ($searchInput.length || $filterSelect.length) {
        function filterPackages() {
            const searchText = $searchInput.length ? $searchInput.val().toLowerCase() : '';
            const filterVal = $filterSelect.length ? $filterSelect.val() : 'all';
            
            $('.product-package').each(function() {
                const $pkg = $(this);
                const pkgText = $pkg.text().toLowerCase();
                const priceAttr = $pkg.attr('data-price') || $pkg.attr('data-tier');
                
                const matchesSearch = pkgText.includes(searchText);
                let matchesFilter = true;
                
                if (filterVal && filterVal !== 'all') {
                    if (!isNaN(filterVal)) {
                        matchesFilter = parseInt(priceAttr, 10) <= parseInt(filterVal, 10);
                    } else {
                        matchesFilter = (priceAttr === filterVal);
                    }
                }
                
                if (matchesSearch && matchesFilter) {
                    $pkg.css('display', 'flex');
                } else {
                    $pkg.css('display', 'none');
                }
            });
        }

        if ($searchInput.length) $searchInput.on('input keyup', filterPackages);
        if ($filterSelect.length) $filterSelect.on('change', filterPackages);
    }

    // ==========================================
    // 4. LIGHTBOX GALLERY
    // ==========================================
    const $lightboxModal = $('#lightbox-modal');
    if ($lightboxModal.length) {
        const $lightboxImg = $('#lightbox-img');
        const $closeBtn = $('.lightbox-close');

        $('.lightbox-trigger').on('click keydown', function(e) {
            if (e.type === 'click' || e.key === 'Enter') {
                $lightboxModal.addClass('active').attr('aria-hidden', 'false');
                $lightboxImg.attr('src', $(this).attr('href') || $(this).attr('src'));
                $lightboxImg.attr('alt', $(this).attr('alt') || 'Gallery Image');
                $closeBtn.focus();
            }
        });

        const closeLightbox = () => {
            $lightboxModal.removeClass('active').attr('aria-hidden', 'true');
        };

        $closeBtn.on('click keydown', (e) => {
            if (e.type === 'click' || e.key === 'Enter') closeLightbox();
        });

        $lightboxModal.on('click', (e) => {
            if ($(e.target).is($lightboxModal)) closeLightbox();
        });

        $(document).on('keydown', (e) => {
            if (e.key === 'Escape' && $lightboxModal.hasClass('active')) {
                closeLightbox();
            }
        });
    }
});

// ==========================================
// 5. INTERACTIVE MAPS 
// ==========================================
window.addEventListener('load', () => {
    const mapMainEl = document.getElementById('map-main');
    
    if (mapMainEl && typeof L !== 'undefined') {
        const mapMain = L.map('map-main').setView([-26.173, 28.040], 12);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapMain);

        const markerDowntown = L.marker([-26.2056252, 28.0440451])
            .bindPopup("<b>Downtown Hub</b><br>123 Main Street");

        const markerUptown = L.marker([-26.1408458, 28.0364962])
            .bindPopup("<b>Crazy Steve's</b><br>456 Side Street");

        const markersGroup = L.featureGroup([markerDowntown, markerUptown]).addTo(mapMain);
        mapMain.fitBounds(markersGroup.getBounds(), { padding: [50, 50] });

        const mapObserver = new ResizeObserver(() => {
            mapMain.invalidateSize();
            mapMain.fitBounds(markersGroup.getBounds(), { padding: [50, 50] });
        });

        mapObserver.observe(mapMainEl);
    }
});