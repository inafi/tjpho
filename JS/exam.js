"use strict"; {
    // http://mrl.nyu.edu/~perlin/noise/
    const perlin = {
        init() {
            this.p = new Uint8Array(512);
            this.reset();
        },
        reset() {
            const p = new Uint8Array(256);
            for (let i = 0; i < 256; i++) p[i] = i;
            for (let i = 255; i > 0; i--) {
                const n = Math.floor((i + 1) * Math.random());
                [p[i], p[n]] = [p[n], p[i]];
            }
            for (let i = 0; i < 512; i++) this.p[i] = p[i & 255];
        },
        lerp(t, a, b) {
            return a + t * (b - a);
        },
        grad2d(i, x, y) {
            const v = (i & 1) === 0 ? x : y;
            return (i & 2) === 0 ? -v : v;
        },
        noise2d(x2d, y2d) {
            const X = Math.floor(x2d) & 255;
            const Y = Math.floor(y2d) & 255;
            const x = x2d - Math.floor(x2d);
            const y = y2d - Math.floor(y2d);
            const fx = (3 - 2 * x) * x * x;
            const fy = (3 - 2 * y) * y * y;
            const p0 = this.p[X] + Y;
            const p1 = this.p[X + 1] + Y;
            return this.lerp(
                fy,
                this.lerp(
                    fx,
                    this.grad2d(this.p[p0], x, y),
                    this.grad2d(this.p[p1], x - 1, y)
                ),
                this.lerp(
                    fx,
                    this.grad2d(this.p[p0 + 1], x, y - 1),
                    this.grad2d(this.p[p1 + 1], x - 1, y - 1)
                )
            );
        }
    };
    /////////////////////////////////////////////////////////////////
    const canvas = {
        init() {
            this.elem = document.createElement("canvas");
            document.body.appendChild(this.elem);
            this.width = this.elem.width = this.elem.offsetWidth;
            this.height = this.elem.height = this.elem.offsetHeight;
            return this.elem.getContext("2d");
        }
    };
    /////////////////////////////////////////////////////////////////
    const webgl = {
        init(canvas, options) {
            this.elem = document.createElement("canvas");
            this.gl = (
                this.elem.getContext("webgl", options) ||
                this.elem.getContext("experimental-webgl", options)
            );
            if (!this.gl) return false;
            const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
            this.gl.shaderSource(vertexShader, `
				precision highp float;
				attribute vec3 aPosition;
				uniform vec2 uResolution;
				void main() {
					gl_PointSize = 1.0;
					gl_Position = vec4(
						( aPosition.x / uResolution.x * 2.0) - 1.0, 
						(-aPosition.y / uResolution.y * 2.0) + 1.0, 
						0.0,
						1.0
					);
				}`);
            this.gl.compileShader(vertexShader);
            const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
            this.gl.shaderSource(fragmentShader, `
				precision highp float;
				void main() {
					gl_FragColor = vec4(0.2, 0.3, 1.0, 1.0);
				}`);
            this.gl.compileShader(fragmentShader);
            const program = this.gl.createProgram();
            this.gl.attachShader(program, vertexShader);
            this.gl.attachShader(program, fragmentShader);
            this.gl.linkProgram(program);
            this.gl.useProgram(program);
            this.aPosition = this.gl.getAttribLocation(program, "aPosition");
            this.gl.enableVertexAttribArray(this.aPosition);
            this.positionBuffer = this.gl.createBuffer();
            this.elem.width = canvas.width;
            this.elem.height = canvas.height;
            const uResolution = this.gl.getUniformLocation(program, "uResolution");
            this.gl.enableVertexAttribArray(uResolution);
            this.gl.uniform2f(uResolution, canvas.width, canvas.height);
            this.gl.viewport(
                0,
                0,
                this.gl.drawingBufferWidth,
                this.gl.drawingBufferHeight
            );
            return this.gl;
        },
        drawBuffer(data, num) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
            this.gl.vertexAttribPointer(this.aPosition, 2, this.gl.FLOAT, false, 0, 0);
            this.gl.bufferData(
                this.gl.ARRAY_BUFFER,
                data,
                this.gl.DYNAMIC_DRAW
            );
            this.gl.drawArrays(this.gl.GL_POINTS, 0, num);
        }
    };
    /////////////////////////////////////////////////////////////////
    const ctx = canvas.init();
    const gl = webgl.init(canvas, {
        alpha: false,
        stencil: false,
        antialias: false,
        depth: false,
    });
    perlin.init();
    const nParticles = 10000;
    const velocities = new Float32Array(nParticles * 2);
    const particles = new Float32Array(nParticles * 2);
    let frame = 0;
    for (let i = 0; i < nParticles; i++) {
        const p = i * 2;
        particles[p + 0] = Math.random() * canvas.width;
        particles[p + 1] = Math.random() * canvas.height;
    }
    /////////////////////////////////////////////////////////////////
    const run = () => {
        requestAnimationFrame(run);
        frame++;
        gl.clear(gl.COLOR_BUFFER_BIT);
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(0, 0, 0, 0.025)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "lighter";
        for (let i = 0; i < nParticles; i++) {
            const p = i * 2;
            let n = 80 * perlin.noise2d(particles[p + 0] * 0.001, particles[p + 1] * 0.001);
            velocities[p + 0] += 0.1 * Math.cos(n);
            velocities[p + 1] += 0.1 * Math.sin(n);
            particles[p + 0] += (velocities[p + 0] *= 0.99);
            particles[p + 1] += (velocities[p + 1] *= 0.99);
            particles[p + 0] = (canvas.width + particles[p + 0]) % canvas.width;
            particles[p + 1] = (canvas.height + particles[p + 1]) % canvas.height;
        }
        webgl.drawBuffer(particles, nParticles);
        if (frame > 30) ctx.drawImage(webgl.elem, 0, 0);
    };
    requestAnimationFrame(run);
    /////////////////////////////////////////////////////////////////
    ["click", "touchdown"].forEach(event => {
        document.addEventListener(event, e => perlin.reset(), false);
    });
}