        // Theme Toggle Functionality
        const themeToggle = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement;

        // Check for saved theme preference or use preferred color scheme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            htmlElement.className = savedTheme;
            updateToggleButton(savedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                htmlElement.className = 'dark-mode';
                updateToggleButton('dark-mode');
            }
        }
        
        // Update toggle button appearance based on current theme
        function updateToggleButton(theme) {
            if (theme === 'dark-mode') {
                themeToggle.checked = true;
            } else {
                themeToggle.checked = false;
            }
        }
        
        // Handle theme toggle change
        themeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                htmlElement.className = 'dark-mode';
                localStorage.setItem('theme', 'dark-mode');
            } else {
                htmlElement.className = 'light-mode';
                localStorage.setItem('theme', 'light-mode');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });

        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  
  try {
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Send to Formspree
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      // Success message
      form.innerHTML = `
        <div class="form-success" style="text-align: center; padding: 2rem;">
          <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
          <h3>Message Sent!</h3>
          <p>I'll get back to you soon.</p>
          <button onclick="location.reload()" class="btn" style="margin-top: 1rem;">
            <i class="fas fa-undo"></i> Send Another
          </button>
        </div>
      `;
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
                alert('Failed to send message. Please try again later or email me directly.');
            }
        });
        }

        // Add this section visibility code
        // Intersection Observer for fade-in sections
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Mobile Menu Functionality
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuClose = document.getElementById('mobile-menu-close');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close mobile menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Album Carousel Scroll Functionality
        const albumCarousel = document.getElementById('album-carousel');
        const scrollLeftBtn = document.getElementById('scroll-left');
        const scrollRightBtn = document.getElementById('scroll-right');

        if (albumCarousel && scrollLeftBtn && scrollRightBtn) {
            scrollLeftBtn.addEventListener('click', () => {
                albumCarousel.scrollBy({ left: -216, behavior: 'smooth' }); // 200px width + 16px gap
            });

            scrollRightBtn.addEventListener('click', () => {
                albumCarousel.scrollBy({ left: 216, behavior: 'smooth' });
            });
        }
