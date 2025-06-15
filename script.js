// Main JavaScript file for Samsung India website clone
document.addEventListener('DOMContentLoaded', function() {
    console.log('Samsung India Website Clone - Document ready!');
    
    // Mobile Navigation Toggle for smaller screens
    const setupMobileNavigation = () => {
        const navToggle = document.createElement('button');
        navToggle.className = 'mobile-nav-toggle';
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.querySelector('.logo').after(navToggle);
        
        navToggle.addEventListener('click', () => {
            document.querySelector('.main-nav-menu').classList.toggle('active');
            navToggle.innerHTML = document.querySelector('.main-nav-menu').classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    };
    
    // Hero Slider functionality
    const setupHeroSlider = () => {
        const indicators = document.querySelectorAll('.indicator');
        let currentSlide = 0;
        const slides = [
            { bg: 'https://images.samsung.com/is/image/samsung/assets/in/2307/home/Home_Q4_KV_Main-banner_1440x640_pc.jpg', title: 'Galaxy Z Fold5', subtitle: 'Unfold your world' },
            { bg: 'https://images.samsung.com/is/image/samsung/assets/in/2307/home/Home_Neo-QLED-8K_1440x640_pc.jpg', title: 'Neo QLED 8K', subtitle: 'Beyond the ordinary' },
            { bg: 'https://images.samsung.com/is/image/samsung/assets/in/2612/home/HOME_DM1_Main-banner_1440x640_pc.jpg', title: 'Galaxy Buds2 Pro', subtitle: 'Experience incredible sound' }
        ];
        
        // Set up initial slide
        updateHeroSlide(0);
        
        // Add click events to indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateIndicators();
                updateHeroSlide(index);
            });
        });
        
        // Auto slide change
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateIndicators();
            updateHeroSlide(currentSlide);
        }, 5000);
        
        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }
        
        function updateHeroSlide(index) {
            const heroSlide = document.getElementById('hero-slide-1');
            const slide = slides[index];
            heroSlide.style.backgroundImage = `url('${slide.bg}')`;
            
            const content = heroSlide.querySelector('.hero-content');
            content.innerHTML = `
                <h1>${slide.title}</h1>
                <p>${slide.subtitle}</p>
                <div class="cta-buttons">
                    <a href="#" class="btn btn-primary">Buy now</a>
                    <a href="#" class="btn btn-secondary">Learn more</a>
                </div>
            `;
        }
    };
    
    // Product Carousel functionality
    const setupCarousels = () => {
        const carousels = document.querySelectorAll('.carousel-wrapper');
        
        carousels.forEach(carousel => {
            const container = carousel.querySelector('.carousel');
            const items = carousel.querySelectorAll('.carousel-item');
            const prevBtn = carousel.querySelector('.carousel-prev');
            const nextBtn = carousel.querySelector('.carousel-next');
            
            if (!container || !prevBtn || !nextBtn) return;
            
            const itemWidth = items[0].offsetWidth + 20; // width + gap
            const visibleItems = Math.floor(container.offsetWidth / itemWidth);
            const scrollAmount = visibleItems * itemWidth;
            
            let currentPosition = 0;
            const maxPosition = container.scrollWidth - container.offsetWidth;
            
            // Update button states
            function updateButtonStates() {
                prevBtn.disabled = currentPosition <= 0;
                nextBtn.disabled = currentPosition >= maxPosition;
                
                prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
                nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
            }
            
            // Initial button states
            updateButtonStates();
            
            // Previous button click event
            prevBtn.addEventListener('click', () => {
                currentPosition = Math.max(0, currentPosition - scrollAmount);
                container.scrollTo({
                    left: currentPosition,
                    behavior: 'smooth'
                });
                updateButtonStates();
            });
            
            // Next button click event
            nextBtn.addEventListener('click', () => {
                currentPosition = Math.min(maxPosition, currentPosition + scrollAmount);
                container.scrollTo({
                    left: currentPosition,
                    behavior: 'smooth'
                });
                updateButtonStates();
            });
            
            // Update on window resize
            window.addEventListener('resize', () => {
                const newItemWidth = items[0].offsetWidth + 20; // width + gap
                const newVisibleItems = Math.floor(container.offsetWidth / newItemWidth);
                const newScrollAmount = newVisibleItems * newItemWidth;
                
                // Reset position and update
                currentPosition = 0;
                container.scrollTo({
                    left: 0,
                    behavior: 'auto'
                });
            });
        });
    };
    
    // Cookie Notice functionality
    const setupCookieNotice = () => {
        const cookieNotice = document.getElementById('cookie-notice');
        const acceptBtn = document.getElementById('cookie-accept');
        const settingsBtn = document.getElementById('cookie-settings');
        
        // Check if cookie notice was previously accepted
        if (localStorage.getItem('cookiesAccepted') === 'true') {
            cookieNotice.style.display = 'none';
            return;
        }
        
        // Accept cookies button click event
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieNotice.style.display = 'none';
        });
        
        // Cookie settings button click event
        settingsBtn.addEventListener('click', () => {
            // In a real site, this would open cookie settings modal
            alert('Cookie settings would open here. For this demo, we\'ll just accept all cookies.');
            localStorage.setItem('cookiesAccepted', 'true');
            cookieNotice.style.display = 'none';
        });
    };
    
    // Responsive dropdown menu for mobile
    const setupResponsiveDropdowns = () => {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        // For mobile devices, make dropdown menus toggleable on click
        if (window.innerWidth < 992) {
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('a');
                const content = dropdown.querySelector('.dropdown-content');
                
                if (!content) return;
                
                // Add click event to toggle dropdown
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    this.parentNode.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                });
            });
        }
    };
    
    // Modal functionality
    const setupModals = () => {
        const modalOverlay = document.getElementById('modal-overlay');
        const feedbackModal = document.getElementById('feedback-modal');
        const chatModal = document.getElementById('chat-modal');
        
        // Feedback modal
        const feedbackButton = document.getElementById('feedback-button');
        const closeFeedbackModal = document.getElementById('close-feedback-modal');
        
        if (feedbackButton && feedbackModal) {
            feedbackButton.addEventListener('click', () => {
                feedbackModal.style.display = 'block';
                modalOverlay.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        }
        
        if (closeFeedbackModal) {
            closeFeedbackModal.addEventListener('click', () => {
                feedbackModal.style.display = 'none';
                modalOverlay.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            });
        }
        
        // Chat modal
        const chatButton = document.getElementById('chat-with-experts-button');
        const closeChatModal = document.getElementById('close-chat-modal');
        const footerChatLink = document.getElementById('footer-chat-link');
        
        if (chatButton && chatModal) {
            chatButton.addEventListener('click', () => {
                chatModal.style.display = 'block';
                modalOverlay.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        }
        
        if (footerChatLink && chatModal) {
            footerChatLink.addEventListener('click', (e) => {
                e.preventDefault();
                chatModal.style.display = 'block';
                modalOverlay.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        }
        
        if (closeChatModal) {
            closeChatModal.addEventListener('click', () => {
                chatModal.style.display = 'none';
                modalOverlay.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            });
        }
        
        // Close modal when clicking outside
        modalOverlay.addEventListener('click', () => {
            feedbackModal.style.display = 'none';
            chatModal.style.display = 'none';
            modalOverlay.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        });
    };
    
    // Feedback Form functionality
    const setupFeedbackForm = () => {
        const feedbackForm = document.getElementById('samsung-feedback-form');
        if (!feedbackForm) return;
        
        // Form validation and submission
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('feedback-name').value.trim();
            const email = document.getElementById('feedback-email').value.trim();
            const phone = document.getElementById('feedback-phone').value.trim();
            const subject = document.getElementById('feedback-subject').value;
            const message = document.getElementById('feedback-message').value.trim();
            const termsChecked = document.getElementById('feedback-terms').checked;
            
            // Basic validation
            if (!name || !email || !subject || !message || !termsChecked) {
                alert('Please fill in all required fields and accept the terms.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation (optional)
            if (phone) {
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
                    alert('Please enter a valid 10-digit phone number.');
                    return;
                }
            }
            
            // Success message - in a real site this would send data to a server
            alert('Thank you for your feedback! We will get back to you soon.');
            
            // Reset form
            feedbackForm.reset();
            
            // Close modal
            document.getElementById('feedback-modal').style.display = 'none';
            document.getElementById('modal-overlay').style.display = 'none';
            document.body.style.overflow = '';
        });
        
        // Real-time validation
        const feedbackEmail = document.getElementById('feedback-email');
        if (feedbackEmail) {
            feedbackEmail.addEventListener('blur', function() {
                const email = this.value.trim();
                if (email) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        this.style.borderColor = '#ff3860';
                        // Add error message
                        let errorMsg = this.parentNode.querySelector('.error-message');
                        if (!errorMsg) {
                            errorMsg = document.createElement('p');
                            errorMsg.className = 'error-message';
                            errorMsg.style.color = '#ff3860';
                            errorMsg.style.fontSize = '0.85rem';
                            errorMsg.style.marginTop = '5px';
                            this.parentNode.appendChild(errorMsg);
                        }
                        errorMsg.textContent = 'Please enter a valid email address';
                    } else {
                        this.style.borderColor = '#0074DB';
                        const errorMsg = this.parentNode.querySelector('.error-message');
                        if (errorMsg) errorMsg.remove();
                    }
                }
            });
        }
    };
    
    // Chat with Experts functionality
    const setupChatWithExperts = () => {
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-message-input');
        const sendButton = document.getElementById('send-chat-message');
        const quickResponseButtons = document.querySelectorAll('.quick-response-btn');
        
        if (!chatMessages || !chatInput || !sendButton) return;
        
        // Pre-defined responses for demo
        const botResponses = {
            'mobile': [
                "What specific issue are you having with your mobile phone?",
                "Could you tell me which Samsung model you're using?"
            ],
            'tv': [
                "What model of Samsung TV do you own?",
                "Is this related to picture quality, sound, or connectivity?"
            ],
            'offers': [
                "We currently have special offers on our Galaxy S series and Neo QLED TVs.",
                "Would you like information about our trade-in program?"
            ],
            'default': [
                "Thank you for contacting Samsung Support. How can I assist you further?",
                "I'll connect you with a specialist who can help with that. Please allow me a moment."
            ]
        };
        
        // Function to add a message to chat
        const addMessage = (text, isSent = false) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
            
            const now = new Date();
            const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            if (isSent) {
                messageDiv.innerHTML = `
                    <div class="message-avatar">
                        <img src="https://ui-avatars.com/api/?name=User&background=0074db&color=fff" alt="You">
                    </div>
                    <div class="message-content">
                        <p class="message-sender">You</p>
                        <p class="message-text">${text}</p>
                        <span class="message-time">${timeStr}</span>
                    </div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <div class="message-avatar">
                        <img src="https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/gnb-desktop-120x32.png" alt="Samsung Support">
                    </div>
                    <div class="message-content">
                        <p class="message-sender">Samsung Support</p>
                        <p class="message-text">${text}</p>
                        <span class="message-time">${timeStr}</span>
                    </div>
                `;
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };
        
        // Get bot response based on message content
        const getBotResponse = (message) => {
            message = message.toLowerCase();
            
            let responseType = 'default';
            if (message.includes('mobile') || message.includes('phone') || message.includes('galaxy')) {
                responseType = 'mobile';
            } else if (message.includes('tv') || message.includes('television') || message.includes('qled')) {
                responseType = 'tv';
            } else if (message.includes('offer') || message.includes('discount') || message.includes('deal')) {
                responseType = 'offers';
            }
            
            const responses = botResponses[responseType];
            return responses[Math.floor(Math.random() * responses.length)];
        };
        
        // Send message function
        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (!message) return;
            
            // Add user message
            addMessage(message, true);
            chatInput.value = '';
            
            // Simulate typing delay before bot response
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse);
            }, 1000);
        };
        
        // Send button click event
        sendButton.addEventListener('click', sendMessage);
        
        // Enter key press event
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // Quick response buttons
        quickResponseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const responseText = button.dataset.response;
                addMessage(responseText, true);
                
                // Simulate typing delay before bot response
                setTimeout(() => {
                    const botResponse = getBotResponse(responseText);
                    addMessage(botResponse);
                }, 1000);
            });
        });
    };
    
    // Initialization
    if (window.innerWidth < 992) {
        setupMobileNavigation();
        setupResponsiveDropdowns();
    }
    
    setupHeroSlider();
    setupCarousels();
    setupCookieNotice();
    setupModals(); // New modal functionality
    setupFeedbackForm();
    setupChatWithExperts(); // New chat functionality
    
    // Add scroll event for sticky header
    window.addEventListener('scroll', () => {
        const mainNav = document.querySelector('.main-nav');
        if (window.scrollY > 100) {
            mainNav.classList.add('sticky');
        } else {
            mainNav.classList.remove('sticky');
        }
    });
    
    // Add resize event listener
    window.addEventListener('resize', () => {
        if (window.innerWidth < 992) {
            if (!document.querySelector('.mobile-nav-toggle')) {
                setupMobileNavigation();
                setupResponsiveDropdowns();
            }
        } else {
            const toggle = document.querySelector('.mobile-nav-toggle');
            if (toggle) toggle.remove();
            document.querySelector('.main-nav-menu').classList.remove('active');
        }
    });
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

