<template>
	<Layout>
		<pale-moon />

		<div class="type">
			<h1 class="greet">
				<span ref="greet">hello.</span>
			</h1>

			<p class="intro overflow">
				<span class="overflow">
					<span ref="intro1">
						my name is
						<b>Bartek</b>
					</span>
				</span>

				<br />

				<span class="overflow">
					<span ref="intro2">
						and I'm the
						<strong>frontend developer</strong>
					</span>
				</span>

				<br />

				<span class="overflow">
					<span ref="intro3">that you're looking for.</span>
				</span>
			</p>

			<div class="cta" :class="{ overflow: ctaOverflow }">
				<a ref="btn" href="/bartosz_jedrasik_cv.pdf" class="btn" @click.prevent="onBtnClick">
					<span class="overflow">
						<div ref="btnIcon" class="btn__icon">
							<img v-show="isIconPdf" src="@/assets/svg/pdf.svg" alt="" />
							<img v-show="!isIconPdf" src="@/assets/svg/arrow.svg" alt="" />
						</div>
					</span>

					<span class="overflow">
						<span ref="btnText" class="btn__text" :class="{ 'btn__text--filename': tempBtnText }">
							download cv
						</span>
					</span>
				</a>

				<p class="write">
					<span class="overflow">
						<span ref="write">
							or write to
							<a ref="mail" class="write__mail link" href="znvygb=uryyb;cnyrtybj:qri">
								uryyb;cnyrtybj:qri
							</a>
						</span>
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
import { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, ref } from '@vue/composition-api';
import { Expo, gsap, Power3, Power4 } from 'gsap/all';
import { Tween } from 'gsap/gsap-core';

import PaleMoon from '@/components/PaleMoon';
import { rot13 } from '@/helpers/rot13';
import { isIOS } from '@/tools/browsers';

export default defineComponent({
	components: { PaleMoon },
	setup() {
		const { proxy: vm } = getCurrentInstance(),
			greet = ref(),
			intro1 = ref(),
			intro2 = ref(),
			intro3 = ref(),
			btn = ref(),
			btnIcon = ref(),
			btnText = ref(),
			write = ref(),
			mail = ref(),
			github = ref(),
			linkedin = ref(),
			ctaOverflow = ref(true),
			mailOverflow = ref(true),
			socialsOverflow = ref(true),
			isIconPdf = ref(false),
			introTl = gsap.timeline({
				defaults: {
					duration: 1,
					ease: Power4.easeInOut,
				},
			}),
			filename = 'bartosz_jedrasik_cv.pdf',
			tempBtnText = ref('');

		function decodeMail() {
			if (!mail.value) return;

			mail.value.setAttribute('href', rot13(mail.value.getAttribute('href')));
			mail.value.innerText = rot13(mail.value.innerText);
		}

		function initIntro() {
			if (!vm) return;

			introTl.from(vm.greet, { yPercent: -101, duration: 2, ease: Expo.easeInOut });
			introTl.from(vm.intro1, { xPercent: -101 }, '<0.8');
			introTl.from(vm.intro2, { xPercent: -101 }, '<0.4');
			introTl.from(vm.intro3, { xPercent: -101 }, '<0.4');
			introTl.from(vm.btn, { xPercent: -101, onComplete: disableCtaOverflow }, '<0.4');
			introTl.from(vm.btnIcon, { yPercent: -101 }, '<0.4');
			introTl.from(vm.btnText, { yPercent: -101 }, '<0.4');
			introTl.from(vm.write, { xPercent: -101 }, '<0.5');
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
			introTl.to(vm.btnIcon, { yPercent: 102, ease: Power4.easeIn, duration: 0.4 }, '<0.2');
			introTl.fromTo(vm.btnIcon, { yPercent: -102 }, { yPercent: 0, ease: Power4.easeOut, duration: 0.4 }, '>');
		}

		function disableCtaOverflow() {
			ctaOverflow.value = false;
		}

		function disableSocialsOverflow() {
			socialsOverflow.value = false;
		}

		function hoverBtn(e) {
			if (!vm || ctaOverflow.value || e.sourceCapabilities?.firesTouchEvents || isIOS()) return;

			Tween.to(vm.btn, {
				scaleX: 1.15,
				scaleY: 1.15,
				boxShadow: '0 0 7rem 0 rgba(255, 255, 255, 0.1)',
				ease: Power3.easeOut,
				duration: 0.5,
				overwrite: 'auto',
			});
		}

		function unhoverBtn(e) {
			if (!vm || ctaOverflow.value || e.sourceCapabilities?.firesTouchEvents || isIOS()) return;

			Tween.to(vm.btn, {
				scaleX: 1,
				scaleY: 1,
				boxShadow: '0 0 0rem 0 rgba(255, 255, 255, 0.0)',
				ease: Power3.easeOut,
				duration: 0.5,
				overwrite: 'auto',
			});
		}

		function initHover() {
			if (!vm) return;

			vm.btn.addEventListener('mouseenter', hoverBtn);
			vm.btn.addEventListener('mouseleave', unhoverBtn);
		}

		function destroyHover() {
			if (!vm) return;

			vm.btn.removeEventListener('mouseenter', hoverBtn);
			vm.btn.removeEventListener('mouseleave', unhoverBtn);
		}

		function onBtnClick() {
			if (!vm) return;

			const iconTl = gsap.timeline({ defaults: { duration: 0.4 } });

			function download() {
				location = `/${filename}`;
			}

			function swapBtnIcon() {
				isIconPdf.value = !isIconPdf.value;
			}

			function swapBtnText() {
				if (tempBtnText.value) {
					vm.btnText.innerText = tempBtnText.value;
					tempBtnText.value = '';
				} else {
					tempBtnText.value = vm.btnText.innerText;
					vm.btnText.innerText = filename;
				}
			}

			iconTl.fromTo(
				vm.btnIcon,
				{ yPercent: 0, overwrite: 'auto' },
				{ yPercent: 102, ease: Power4.easeIn, duration: 0.3, onComplete: swapBtnIcon },
			);
			iconTl.fromTo(
				vm.btnText,
				{ yPercent: 0, overwrite: 'auto' },
				{ yPercent: 102, ease: Power4.easeIn, duration: 0.3, onComplete: swapBtnText },
				'<',
			);

			iconTl.fromTo(vm.btnIcon, { yPercent: -102 }, { yPercent: 0, ease: Power4.easeOut }, '>');
			iconTl.fromTo(vm.btnText, { yPercent: -102 }, { yPercent: 0, ease: Power4.easeOut }, '<');

			iconTl.to(
				vm.btnIcon,
				{ yPercent: 102, ease: Power4.easeIn, onStart: download, onComplete: swapBtnIcon },
				'>0.8',
			);
			iconTl.to(vm.btnText, { yPercent: 102, ease: Power4.easeIn, onComplete: swapBtnText }, '<');

			iconTl.fromTo(vm.btnIcon, { yPercent: -102 }, { yPercent: 0, ease: Power4.easeOut }, '>');
			iconTl.fromTo(vm.btnText, { yPercent: -102 }, { yPercent: 0, ease: Power4.easeOut }, '<');
		}

		onMounted(() => {
			decodeMail();
			initIntro();
			initHover();
		});

		onBeforeUnmount(() => {
			destroyHover();
		});

		return {
			greet,
			intro1,
			intro2,
			intro3,
			btn,
			btnIcon,
			btnText,
			write,
			mail,
			github,
			linkedin,
			ctaOverflow,
			mailOverflow,
			socialsOverflow,
			isIconPdf,
			tempBtnText,
			onBtnClick,
		};
	},
});
</script>

<style lang="scss">
.type {
	padding: 0 12vw 8rem;

	@include landscape {
		padding: 9rem 8rem;
		min-width: 45.1rem;
		flex-shrink: 0;
	}
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
	font-size: 3rem;
	line-height: 3.8rem;
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

		&:active {
			background-color: $color-gray-10;
		}

		&__text {
			color: $color-white;
			font-size: 4.6rem;
			font-weight: 700;
			line-height: 4.6rem;
			letter-spacing: -0.025em;
			pointer-events: none;

			&--filename {
				font-size: 2.4rem;
			}
		}

		&__icon {
			margin-right: 2.8rem;
			pointer-events: none;

			img {
				width: 3.5rem;
				height: 3.9rem;
			}
		}
	}
}

.write {
	display: flex;
	align-items: center;
	font-size: 2.4rem;
	letter-spacing: -0.01em;
	transform: translate3d(0, 0, 0); // flicker fix
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
