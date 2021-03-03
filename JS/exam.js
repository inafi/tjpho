function initialize() {
    var isMobile = false;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
    if (!isMobile) {
        "use strict"; {
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
            const canvas = {
                init() {
                    this.elem = document.createElement("canvas");
                    document.body.appendChild(this.elem);
                    this.width = this.elem.width = this.elem.offsetWidth;
                    this.height = this.elem.height = this.elem.offsetHeight;
                    return this.elem.getContext("2d");
                }
            };
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
					gl_FragColor = vec4(0.2, 0.3, .5, 1.0);
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
            const ctx = canvas.init();
            const gl = webgl.init(canvas, {
                alpha: false,
                stencil: false,
                antialias: false,
                depth: false,
            });
            perlin.init();
            const nParticles = 5000;
            const velocities = new Float32Array(nParticles * 2);
            const particles = new Float32Array(nParticles * 2);
            let frame = 0;
            for (let i = 0; i < nParticles; i++) {
                const p = i * 2;
                particles[p + 0] = Math.random() * canvas.width;
                particles[p + 1] = Math.random() * canvas.height;
            }

            var inc = 100;

            const run = () => {
                setTimeout(() => {
                    requestAnimationFrame(run);
                }, inc);
                frame++;
                gl.clear(gl.COLOR_BUFFER_BIT);
                ctx.globalCompositeOperation = "source-over";
                ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = "lighter";
                for (let i = 0; i < nParticles; i++) {
                    const p = i * 2;
                    let n = 80 * perlin.noise2d(particles[p + 0] * 0.001, particles[p + 1] * 0.001);
                    velocities[p + 0] += 0.07 * Math.cos(n);
                    velocities[p + 1] += 0.07 * Math.sin(n);
                    particles[p + 0] += (velocities[p + 0] *= 0.99);
                    particles[p + 1] += (velocities[p + 1] *= 0.99);
                    particles[p + 0] = (canvas.width + particles[p + 0]) % canvas.width;
                    particles[p + 1] = (canvas.height + particles[p + 1]) % canvas.height;
                }
                webgl.drawBuffer(particles, nParticles);
                if (frame > 5) ctx.drawImage(webgl.elem, 0, 0);
            };

            requestAnimationFrame(run);

            // ["click", "touchdown"].forEach(event => {
            //     document.addEventListener(event, e => perlin.reset(), false);
            // });

            setInterval(() => {
                perlin.reset()
                inc = 30;
                setTimeout(() => {
                    inc = 100;
                }, 7000);
            }, 35000);
        }
    } else {
        if (Math.abs(window.orientation) != 90) {
            $("body").css("background-image", 'url("Pics/exam/port.png")');
        } else {
            $("body").css("background-image", 'url("Pics/exam/land.png")');
        }

        $(window).on('orientationchange', function () {
            window.location.reload()
            if (isMobile) {
                if (Math.abs(window.orientation) != 90) {
                    $("body").css("background-image", 'url("Pics/exam/port.png")');
                } else {
                    $("body").css("background-image", 'url("Pics/exam/land.png")');
                }
            }
        });
    }
}
$(initialize);