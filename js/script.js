// 스크롤 애니메이션
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        function isElementPartiallyInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }

        function handleScrollAnimations() {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                if (isElementPartiallyInViewport(section)) {
                    section.classList.add('visible');
                }
            });
        }

        // 스크롤 인디케이터 업데이트
        function updateScrollIndicator() {
            const sections = document.querySelectorAll('.section');
            const dots = document.querySelectorAll('.scroll-dot');
            
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const isActive = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
                
                if (isActive) {
                    dots.forEach(dot => dot.classList.remove('active'));
                    if (dots[index]) {
                        dots[index].classList.add('active');
                    }
                }
            });
        }

        // 섹션으로 스크롤
        function scrollToSection(id) {
            document.getElementById(id).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // 이벤트 리스너
        window.addEventListener('scroll', () => {
            handleScrollAnimations();
            updateScrollIndicator();
        });

        window.addEventListener('load', () => {
            handleScrollAnimations();
            updateScrollIndicator();
        });

        // 키보드 네비게이션
        let currentSection = 0;
        const sectionIds = ['intro', 'profile', 'project1', 'project2', 'contact'];

        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' || e.key === ' ') {
                e.preventDefault();
                if (currentSection < sectionIds.length - 1) {
                    currentSection++;
                    scrollToSection(sectionIds[currentSection]);
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentSection > 0) {
                    currentSection--;
                    scrollToSection(sectionIds[currentSection]);
                }
            }
        });

        // 휠 스크롤 감지로 현재 섹션 업데이트
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.section');
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    currentSection = index;
                }
            });
        });

