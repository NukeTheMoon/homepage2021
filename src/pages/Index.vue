<template>
	<Layout>
		<div class="moon"></div>

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

					&#32;

					<span class="overflow">
						<a ref="mail" class="link" href="znvygb=uryyb;cnyrtybj:qri">uryyb;cnyrtybj:qri</a>
					</span>
				</p>
			</div>

			<div class="socials">
				<a
					class="github overflow"
					href="https://github.com/NukeTheMoon/"
					target="_blank"
					rel="noreferrer"
					aria-label="GitHub"
				>
					<img ref="github" src="@/assets/svg/github.svg" alt="" />
				</a>

				<a
					class="linkedin overflow"
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
import { Expo, gsap, Linear, Power3, Power4 } from 'gsap/all';

import { rot13 } from '@/helpers/rot13';

export default defineComponent({
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

		function decodeMail() {
			if (!mail.value) return;

			mail.value.setAttribute('href', rot13(mail.value.getAttribute('href')));
			mail.value.innerText = rot13(mail.value.innerText);
		}

		function animate() {
			const { proxy: vm } = getCurrentInstance();

			if (!vm) return;

			const defaults = {
				duration: 1,
				ease: Power4.easeInOut,
			};
			const tl = gsap.timeline({ defaults });

			tl.from(vm.greet, { yPercent: -101, duration: 2, ease: Expo.easeInOut });
			tl.from(vm.intro1, { xPercent: -101 }, '<1');
			tl.from(vm.intro2, { xPercent: -103 }, '>-0.6');
			tl.from(vm.intro3, { xPercent: -101 }, '<0.5');
			tl.from(vm.intro4, { xPercent: -101 }, '>-0.6');
			tl.from(vm.intro5, { xPercent: -101 }, '<0.5');
			tl.from(vm.btn, { xPercent: -101, onComplete: disableCtaOverflow }, '<0.3');
			tl.from(vm.btnArrow, { yPercent: -101 }, '<0.3');
			tl.from(vm.btnText, { yPercent: -101 }, '<0.3');
			tl.from(vm.write, { xPercent: -101 }, '>-0.3');
			tl.from(vm.mail, { xPercent: -101 }, '>-0.6');
			tl.from(vm.github, { yPercent: -101, duration: 0.7 }, '>-0.6');
			tl.from(vm.linkedin, { yPercent: -101, duration: 0.7 }, '>-0.6');
			tl.to(
				vm.btn,
				{
					scaleX: 1.15,
					scaleY: 1.15,
					boxShadow: '0 0 7em 0 rgba(255, 255, 255, 0.1)',
					ease: Power3.easeOut,
					repeat: 1,
					yoyo: true,
				},
				'>',
			);
		}

		function disableCtaOverflow() {
			ctaOverflow.value = false;
		}

		onMounted(() => {
			decodeMail();
			animate();
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
		};
	},
});
</script>

<style lang="scss">
// .moon {
// 	height: 54.8rem;
// }

.type {
	padding: 8rem 9rem 8rem;
}

.greet {
	font-size: 9.6rem;
	font-weight: 700;
	letter-spacing: -0.05em;
	margin-bottom: 2.2rem;
	overflow: hidden;
	position: relative;
	line-height: 1;
}

.intro {
	font-size: 3.6rem;
	line-height: 4.2rem;
	letter-spacing: -0.025em;
	margin-bottom: 11.2rem;

	// b {
	// 	color: $color-accent;
	// }

	strong,
	b {
		font-weight: 700;
	}
}

.cta {
	$offset: -2.2rem;

	margin-bottom: 10rem;
	padding-left: $offset * -1;
	margin-left: $offset;

	.btn {
		$height: 13rem;

		display: flex;
		align-items: center;
		justify-content: center;
		width: 44rem;
		height: $height;
		text-decoration: none;
		border-radius: $height;
		background-color: $color-gray-5;
		margin-left: $offset;
		margin-bottom: 3.4rem;

		&__text {
			color: $color-white;
			font-size: 4.6rem;
			font-weight: 700;
			letter-spacing: -0.025em;
			line-height: 4.6rem;
		}

		&__arrow {
			height: 3.9rem;
			margin-right: 2.8rem;
		}
	}
}

.write {
	font-size: 2.4rem;
	letter-spacing: -0.01em;
}

.socials {
	display: flex;

	img {
		height: 100%;
	}
}

.github {
	height: 2.2rem;
	margin-right: 4.6rem;
	margin-top: 0.5rem;
}

.linkedin {
	height: 3em;
}
</style>
