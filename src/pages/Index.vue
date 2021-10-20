<template>
	<Layout>
		<pale-noise />

		<pale-moon />

		<div class="type">
			<h1 class="greet">
				<span ref="greet">hello.</span>
			</h1>

			<p class="intro overflow">
				<span class="overflow">
					<span ref="intro1">my name is</span>
				</span>

				&#32;

				<span class="overflow">
					<b ref="intro2">Bartek</b>
				</span>

				<br />

				<span class="overflow">
					<span ref="intro3">and I'm the</span>
				</span>

				&#32;

				<span class="overflow">
					<strong ref="intro4">frontend developer</strong>
				</span>

				<br />

				<span class="overflow">
					<span ref="intro5">that you're looking for.</span>
				</span>
			</p>

			<div class="cta" :class="{ overflow: ctaOverflow }">
				<a ref="btn" href="#" class="btn">
					<span class="overflow">
						<img ref="btnArrow" class="btn__arrow" src="@/assets/svg/arrow.svg" alt="" />
					</span>

					<span class="overflow">
						<span ref="btnText" class="btn__text">download cv</span>
					</span>
				</a>

				<p class="write">
					<span class="overflow">
						<span ref="write">or write to</span>
					</span>

					<span :class="{ overflow: mailOverflow }">
						<a ref="mail" class="write__mail link" href="znvygb=uryyb;cnyrtybj:qri">uryyb;cnyrtybj:qri</a>
					</span>
				</p>
			</div>

			<div class="socials">
				<a
					class="github"
					:class="{ overflow: socialsOverflow }"
					href="https://github.com/NukeTheMoon/homepage2021/"
					target="_blank"
					rel="noreferrer"
					aria-label="GitHub"
				>
					<img ref="github" src="@/assets/svg/github.svg" alt="" />
				</a>

				<a
					class="linkedin"
					:class="{ overflow: socialsOverflow }"
					href="https://www.linkedin.com/in/bartoszjedrasik/"
					target="_blank"
					rel="noreferrer"
					aria-label="LinkedIn"
				>
					<img ref="linkedin" src="@/assets/svg/linkedin.svg" alt="" />
				</a>
			</div>
		</div>
	</Layout>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from '@vue/composition-api';
import { Expo, gsap, Linear, Power2, Power3, Power4, TimelineMax, TweenLite } from 'gsap/all';
import { TweenMax } from 'gsap/gsap-core';

import PaleMoon from '@/components/PaleMoon';
import PaleNoise from '@/components/PaleNoise';
import { rot13 } from '@/helpers/rot13';

export default defineComponent({
	components: { PaleMoon, PaleNoise },
	setup() {
		const greet = ref(),
			intro1 = ref(),
			intro2 = ref(),
			intro3 = ref(),
			intro4 = ref(),
			intro5 = ref(),
			btn = ref(),
			btnArrow = ref(),
			btnText = ref(),
			write = ref(),
			mail = ref(),
			github = ref(),
			linkedin = ref();
		const ctaOverflow = ref(true);
		const mailOverflow = ref(true);
		const socialsOverflow = ref(true);
		const arrowTl = gsap.timeline({ paused: true });
		const introTl = gsap.timeline({
			defaults: {
				duration: 1,
				ease: Power4.easeInOut,
			},
		});

		function decodeMail() {
			if (!mail.value) return;

			mail.value.setAttribute('href', rot13(mail.value.getAttribute('href')));
			mail.value.innerText = rot13(mail.value.innerText);
		}

		function initIntro() {
			const { proxy: vm } = getCurrentInstance();

			if (!vm) return;

			introTl.from(vm.greet, { yPercent: -101, duration: 2, ease: Expo.easeInOut });
			introTl.from(vm.intro1, { xPercent: -101 }, '<0.8');
			introTl.from(vm.intro2, { xPercent: -103 }, '>-0.6');
			introTl.from(vm.intro3, { xPercent: -101 }, '<0.2');
			introTl.from(vm.intro4, { xPercent: -101 }, '>-0.6');
			introTl.from(vm.intro5, { xPercent: -101 }, '<0.2');
			introTl.from(vm.btn, { xPercent: -101, onComplete: disableCtaOverflow }, '<0.2');
			introTl.from(vm.btnArrow, { yPercent: -101 }, '<0.2');
			introTl.from(vm.btnText, { yPercent: -101 }, '<0.2');
			introTl.from(vm.write, { xPercent: -101 }, '<0.3');
			introTl.from(vm.mail, { xPercent: -101, onComplete: disableMailOverflow }, '>-0.6');
			introTl.from(vm.github, { yPercent: -102, duration: 0.7 }, '>-0.6');
			introTl.from(vm.linkedin, { yPercent: -102, duration: 0.7, onComplete: disableSocialsOverflow }, '>-0.6');
			introTl.to(
				vm.btn,
				{
					scaleX: 1.15,
					scaleY: 1.15,
					boxShadow: '0 0 7rem 0 rgba(255, 255, 255, 0.1)',
					ease: Power3.easeOut,
					repeat: 1,
					yoyo: true,
				},
				'>',
			);
			introTl.to(vm.btnArrow, { yPercent: 102, ease: Power4.easeIn, duration: 0.4 }, '<0.2');
			introTl.fromTo(vm.btnArrow, { yPercent: -102 }, { yPercent: 0, ease: Power4.easeOut, duration: 0.4 }, '>');
		}

		function disableCtaOverflow() {
			ctaOverflow.value = false;
		}

		function disableMailOverflow() {
			mailOverflow.value = false;
		}

		function disableSocialsOverflow() {
			socialsOverflow.value = false;
		}

		function initHover() {
			const { proxy: vm } = getCurrentInstance();

			if (!vm) return;

			arrowTl.to(vm.btnArrow, { yPercent: 102, ease: Power4.easeIn, duration: 0.4 });
			arrowTl.fromTo(vm.btnArrow, { yPercent: -102 }, { yPercent: 0, ease: Power4.easeOut, duration: 0.4 }, '>');

			vm.btn.addEventListener('mouseenter', () => {
				if (!gsap.isTweening(vm.btnArrow)) {
					arrowTl.play(0);
				}

				if (!ctaOverflow.value) {
					TweenMax.to(vm.btn, {
						scaleX: 1.15,
						scaleY: 1.15,
						boxShadow: '0 0 7rem 0 rgba(255, 255, 255, 0.1)',
						ease: Power3.easeOut,
						duration: 0.5,
						overwrite: 'auto',
					});
				}
			});

			vm.btn.addEventListener('mouseleave', () => {
				if (!ctaOverflow.value) {
					TweenMax.to(vm.btn, {
						scaleX: 1,
						scaleY: 1,
						boxShadow: '0 0 0rem 0 rgba(255, 255, 255, 0.0)',
						ease: Power3.easeOut,
						duration: 0.5,
						overwrite: 'auto',
					});
				}
			});
		}

		onMounted(() => {
			decodeMail();
			initIntro();
			initHover();
		});

		return {
			greet,
			intro1,
			intro2,
			intro3,
			intro4,
			intro5,
			btn,
			btnArrow,
			btnText,
			write,
			mail,
			github,
			linkedin,
			ctaOverflow,
			mailOverflow,
			socialsOverflow,
		};
	},
});
</script>

<style lang="scss">
.type {
	@include landscape {
		padding: 9rem 8rem;
	}

	padding: 0 12vw 8rem;
}

.greet {
	margin-bottom: 2.2rem;
	position: relative;
	font-size: 9.6rem;
	font-weight: 700;
	line-height: 1;
	letter-spacing: -0.05em;
	overflow: hidden;
}

.intro {
	margin-bottom: 7rem;
	font-size: 3.6rem;
	line-height: 4.2rem;
	letter-spacing: -0.025em;

	strong,
	b {
		font-weight: 700;
	}
}

.cta {
	$offset: -2.2rem;

	margin-bottom: 8rem;
	margin-left: $offset;
	padding-left: $offset * -1;

	.btn {
		$height: 13rem;

		display: flex;
		align-items: center;
		justify-content: center;
		width: 44rem;
		height: $height;
		margin-bottom: 3.4rem;
		margin-left: $offset;
		text-decoration: none;
		border-radius: $height;
		background-color: $color-gray-5;

		&__text {
			color: $color-white;
			font-size: 4.6rem;
			font-weight: 700;
			line-height: 4.6rem;
			letter-spacing: -0.025em;
			pointer-events: none;
		}

		&__arrow {
			height: 3.9rem;
			margin-right: 2.8rem;
			pointer-events: none;
		}
	}
}

.write {
	font-size: 2.4rem;
	letter-spacing: -0.01em;
	transform: translate3d(0, 0, 0); // flicker fix
	display: flex;
	align-items: center;
	gap: 0.8rem;
}

.socials {
	display: flex;

	img {
		height: 100%;
	}
}

.github {
	height: 2.2rem;
	margin-top: 0.5rem;
	margin-right: 4.6rem;
}

.linkedin {
	height: 3em;
}
</style>
