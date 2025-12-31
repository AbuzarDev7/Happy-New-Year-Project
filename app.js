        const countdownEl = document.getElementById('countdown');
        const celebrationEl = document.getElementById('celebration');
        const canvas = document.getElementById('fireworks-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let count = 5;
        
   
        const countdown = setInterval(() => {
            count--;
            if (count > 0) {
                countdownEl.textContent = count;
            } else {
                clearInterval(countdown);
                countdownEl.style.display = 'none';
                celebrationEl.style.display = 'block';
                
     
                startFireworks();
                
            
                setTimeout(() => {
                    animateBalloons();
                }, 3000);
            }
        }, 1000);

        function animateBalloons() {
            const balloon5 = document.getElementById('balloon5');
            const balloon6 = document.getElementById('balloon6');
            
      
            balloon5.classList.remove('floating');
            balloon5.classList.add('animate-up');
            
      
            balloon6.classList.add('animate-come');
            
      
            setTimeout(() => {
                document.querySelector('.message').textContent = '🎉 Welcome 2026! 🎉';
            }, 2500);
        }

        
        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.velocity = {
                    x: (Math.random() - 0.5) * 8,
                    y: (Math.random() - 0.5) * 8
                };
                this.alpha = 1;
                this.decay = Math.random() * 0.02 + 0.01;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            update() {
                this.velocity.y += 0.1;
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.alpha -= this.decay;
            }
        }

        let particles = [];
        
        function createFirework() {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.6;
            const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#FF8E8E', '#A8E6CF'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(x, y, color));
            }
        }

        function animate() {
            ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();
                
                if (particle.alpha <= 0) {
                    particles.splice(index, 1);
                }
            });

            requestAnimationFrame(animate);
        }

        function startFireworks() {
            animate();
            
     
            setInterval(createFirework, 400);
        }

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });