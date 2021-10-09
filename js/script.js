'use strict';
window.onload = function () {
	const parallax = document.querySelector('.parallax');

	if (parallax) {
		const content = document.querySelector('.parallax__container');
		const clouds = document.querySelector('.images-parallax__clouds');
		const mountains = document.querySelector('.images-parallax__mountains');
		const human = document.querySelector('.images-parallax__human');

		// Coefficients
		const forClouds = 40;
		const forMountains = 20;
		const forHuman = 10;

		// Animation speed
		const speed = 0.05;

		// mouse position coordinates
		let positionX = 0,
			positionY = 0;
		let coordXPercent = 0,
			coordYPercent = 0;

		function setMouseParallaxStyle() {
			const distX = coordXPercent - positionX;
			const distY = coordYPercent - positionY;

			positionX = positionX + distX * speed;
			positionY = positionY + distY * speed;

			// Set transform translate styles
			clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${
				positionY / forClouds
			}%);`;
			mountains.style.cssText = `transform: translate(${
				positionX / forMountains
			}%,${positionY / forMountains}%);`;
			human.style.cssText = `transform: translate(${positionX / forHuman}%,${
				positionY / forHuman
			}%);`;

			requestAnimationFrame(setMouseParallaxStyle);
		}
		setMouseParallaxStyle();
		parallax.addEventListener('mousemove', function (e) {
			// Get block height and width
			const parallaxWidth = parallax.offsetWidth;
			const parallaxHeight = parallax.offsetHeight;

			// (0,0) position is in center of window
			const coordX = e.pageX - parallaxWidth / 2;
			const coordY = e.pageY - parallaxHeight / 2;

			// Get position in percent
			coordXPercent = (coordX / parallaxWidth) * 100;
			coordYPercent = (coordY / parallaxHeight) * 100;
		});

		// ParaLLax on scroll
		let thresholdSets = [];
		for (let i = 0; i <= 1.0; i += 0.005) {
			thresholdSets.push(i);
		}
		const callback = function (entries, observer) {
			const scrollTopPercent =
				(window.pageYOffset / parallax.offsetHeight) * 100;
			setParallaxItemsStyle(scrollTopPercent);
		};
		const observer = new IntersectionObserver(callback, {
			threshold: thresholdSets,
		});

		observer.observe(document.querySelector('.content'));

		function setParallaxItemsStyle(scrollTopPercent) {
			content.style.cssText = `transform: translate(0%,-${
				scrollTopPercent / 9
			}%);`;
			mountains.parentElement.style.cssText = `transform: translate(0%,-${
				scrollTopPercent / 6
			}%);`;
			human.parentElement.style.cssText = `transform: translate(0%,-${
				scrollTopPercent / 3
			}%);`;
		}
	}
};
