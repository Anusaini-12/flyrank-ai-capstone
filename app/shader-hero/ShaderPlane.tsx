"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// Vertex shader controls the position of the fullscreen plane.
const vertexShader = String.raw`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Fragment shader creates the animated fullscreen gradient,
// mouse interaction, color movement, and subtle grain effect.
const fragmentShader = String.raw`
  precision mediump float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  varying vec2 vUv;

  vec3 palette(float t) {
    vec3 a = vec3(0.55, 0.55, 0.45);
    vec3 b = vec3(0.35, 0.35, 0.25);
    vec3 c = vec3(1.0, 1.0, 0.8);
    vec3 d = vec3(0.2, 0.3, 0.4);

    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv =
      (gl_FragCoord.xy - 0.5 * u_resolution.xy)
      / u_resolution.y;

    vec2 mouse =
      (u_mouse - 0.5 * u_resolution.xy)
      / u_resolution.y;

    float dist = length(uv - mouse);

    uv +=
      (mouse - uv)
      * 0.15
      * smoothstep(1.0, 0.0, dist);

    float wave1 =
      sin(uv.x * 3.0 + u_time * 0.4) * 0.5;

    float wave2 =
      sin(uv.y * 4.0 - u_time * 0.3 + wave1) * 0.5;

    float flow =
      wave1 +
      wave2 +
      length(uv);

    vec3 color =
      palette(flow * 0.5 + u_time * 0.05);

    float grain =
      fract(
        sin(
          dot(
            gl_FragCoord.xy,
            vec2(12.9898, 78.233)
          )
        ) * 43758.5453
      );

    color += (grain - 0.5) * 0.03;

    gl_FragColor = vec4(color, 1.0);
  }
`;


// Connects the shader to Three.js and updates time, mouse,
// resolution, and tab visibility for the interactive experience.
function ShaderPlaneInner() {
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const mouseRef = useRef(new THREE.Vector2(0, 0));
    const elapsedRef = useRef(0);
    const pausedRef = useRef(document.hidden);

    const { size, gl } = useThree();


    // Tracks mouse movement for shader interaction and pauses animation
    // when the browser tab becomes hidden.
    useEffect(() => {
        const handlePointerMove = (event: PointerEvent) => {
            const rect = gl.domElement.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            mouseRef.current.set(x, size.height - y);
        };

        const handleVisibilityChange = () => {
            const hidden = document.hidden;

            pausedRef.current = hidden;

            if (hidden && materialRef.current) {
                elapsedRef.current =
                    materialRef.current.uniforms.u_time.value;
            }
        };

        const canvas = gl.domElement;

        canvas.addEventListener(
            "pointermove",
            handlePointerMove
        );

        document.addEventListener(
            "visibilitychange",
            handleVisibilityChange
        );

        return () => {
            canvas.removeEventListener(
                "pointermove",
                handlePointerMove
            );

            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [gl, size.height]);

    // Updates the shader resolution whenever the canvas size changes.
    useEffect(() => {
        if (!materialRef.current) return;

        materialRef.current.uniforms.u_resolution.value.set(
            size.width,
            size.height
        );
    }, [size]);

    // Updates the shader animation every frame and sends the current
    // time, resolution, and mouse position to the GPU.
    useFrame(({ clock }) => {
        if (!materialRef.current) return;

        const material = materialRef.current;

        if (pausedRef.current || document.hidden) {
            material.uniforms.u_time.value = elapsedRef.current;

            material.uniforms.u_resolution.value.set(
                size.width,
                size.height
            );

            material.uniforms.u_mouse.value.copy(
                mouseRef.current
            );

            return;
        }

        elapsedRef.current = clock.getElapsedTime();

        material.uniforms.u_time.value =
            elapsedRef.current;

        material.uniforms.u_resolution.value.set(
            size.width,
            size.height
        );

        material.uniforms.u_mouse.value.copy(
            mouseRef.current
        );
    });

    // Renders a fullscreen plane and applies the custom shader material to it.
    return (
        <mesh>
            <planeGeometry args={[2, 2]} />

            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    u_time: {
                        value: 0,
                    },
                    u_resolution: {
                        value: new THREE.Vector2(
                            size.width,
                            size.height
                        ),
                    },
                    u_mouse: {
                        value: new THREE.Vector2(0, 0),
                    },
                }}
            />
        </mesh>
    );
}

// Creates the WebGL canvas, sets an orthographic camera,
// and limits the device pixel ratio for better performance.
export default function ShaderPlane() {
    return (
        <Canvas
            orthographic
            camera={{
                position: [0, 0, 1],
                zoom: 1,
            }}
            dpr={[1, 2]}
            gl={{
                antialias: true,
            }}
        >
            <ShaderPlaneInner />
        </Canvas>
    );
}