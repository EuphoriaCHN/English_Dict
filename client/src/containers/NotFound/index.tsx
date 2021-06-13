import React from 'react';
import { useHistory } from 'umi';

import './index.scss';

function notFound() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const _history = useHistory();
    
    React.useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const el = canvasRef.current;

        const ctx = el.getContext('2d');

        let width = 0;
        let height = 0;
        let particles: Particle[] = [];

        class Particle {
            x: number = 0;
            y: number = 0;
            dx: number = 0;
            dy: number = 0;
            size: number = Math.random() * 3 + 2;

            constructor() {
                this.reset();
            }

            reset() {
                this.y = Math.random() * height;
                this.x = Math.random() * width;
                this.dx = (Math.random() * 1) - 0.5;
                this.dy = (Math.random() * 0.5) + 0.5;
            }
        }

        function createParticles(count: number) {
            if (count !== particles.length) {
                particles = [];
                for (let i = 0; i < count; i++) {
                    particles.push(new Particle());
                }
            }
        }

        function onWindowResize() {
			width = window.innerWidth;
			height = window.innerHeight;
			el.width = width;
			el.height = height;
			
			createParticles((width * height) / 16000);
        }

        function updateParticles() {
            if (!ctx) {
                return;
            }
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#f6f9fa';

            particles.forEach(particle => {
                particle.y += particle.dy;
                particle.x += particle.dx;

                if (particle.y > height) {
                    particle.y = 0;
                }

                if (particle.x > width) {
                    particle.reset();
                    particle.y = 0;
                }

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false);
                ctx.fill();
            });

            window.requestAnimationFrame(updateParticles);
        }

        onWindowResize();
        updateParticles();

        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
        };
    }, []);

    const handleOnLinkClick = React.useCallback(() => {
        _history.replace('/');
    }, []);

    const render = React.useMemo(() => (
        <div className={'notFound'}>
            <canvas className={'notFound-snow'} ref={canvasRef} />
            <div className={'notFound-label'}>
                <h2>NOT FOUND</h2>
                <a className={'notFound-label-link'} onClick={handleOnLinkClick}>Back to home</a>
            </div>
            <div className={'notFound-ground'}>
                <div className={'notFound-ground-mound'}>
                    <div className={'notFound-ground-mound-text'}>404</div>
                    <div className={'notFound-ground-mound-spade'} />
                </div>
            </div>
        </div>
    ), []);

    return render;
}

export default notFound;
