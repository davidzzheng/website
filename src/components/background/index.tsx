// @ts-nocheck
'use client'

import * as THREE from 'three'
import { useState, useEffect, useMemo, useRef } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useControls, Leva } from 'leva'
import { fragmentShader } from './shaders/fragmentShader'
import { vertexShader } from './shaders/vertexShader'

function Scene() {
	const [isMounted, setIsMounted] = useState(false)
	const mesh = useRef(null)
	const { colorA, colorB, background, size, spacing, speed } = useControls({
		colorA: '#111',
		colorB: '#888',
		background: '#000',
		speed: {
			value: 0.02,
			min: 0.0,
			max: 2.0,
			step: 0.01,
		},
		size: {
			value: 25.0,
			min: 1.0,
			max: 50.0,
			step: 1.0,
		},
		spacing: {
			value: 30.0,
			min: 1.0,
			max: 100.0,
			step: 1.0,
		},
	})

	const uniforms = useMemo(() => {
		return {
			u_time: {
				value: 0.0,
			},
			u_speed: {
				value: speed,
			},
			u_size: {
				value: size,
			},
			u_spacing: {
				value: spacing,
			},
			u_background: {
				value: new THREE.Color(background),
			},
			u_color_a: {
				value: new THREE.Color(colorA),
			},
			u_color_b: {
				value: new THREE.Color(colorB),
			},
		}
	}, [])

	useFrame((state) => {
		const { clock } = state
		if (!isMounted) return
		mesh.current.material.uniforms.u_time.value = clock.getElapsedTime()
		mesh.current.material.uniforms.u_speed.value = speed
		mesh.current.material.uniforms.u_size.value = size
		mesh.current.material.uniforms.u_spacing.value = spacing
		mesh.current.material.uniforms.u_color_a.value = new THREE.Color(colorA)
		mesh.current.material.uniforms.u_color_b.value = new THREE.Color(colorB)
		mesh.current.material.uniforms.u_background.value = new THREE.Color(
			background,
		)
	})

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

	return (
		<>
			<color args={['#000000']} attach="background" />
			<Leva hidden />

			<PerspectiveCamera makeDefault position={[0, 0, 8]} fov={100} />
			<mesh scale={1.5} ref={mesh}>
				<planeGeometry args={[30, 30, 1, 1]} />
				<shaderMaterial
					uniforms={uniforms}
					fragmentShader={fragmentShader}
					vertexShader={vertexShader}
					blending={THREE.AdditiveBlending}
					depthWrite={false}
				/>
			</mesh>
		</>
	)
}

export const Background = () => {
	return (
		<Canvas>
			<Scene />
		</Canvas>
	)
}
