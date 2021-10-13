<template>
	<Layout>
		<div class="moon"></div>
		<div class="type">
			<h1 class="greet">
				<span ref="greet">hello.</span>
			</h1>
			<p class="intro">
				my name is
				<span>Bartek</span>
				<br />
				and I'm the
				<strong>front end developer</strong>
				<br />
				that you're looking for.
			</p>
			<div class="cta">
				<a href="#" class="btn">
					<img class="arrow" src="@/assets/svg/arrow.svg" alt="" />
					<span>download cv</span>
				</a>
				<p class="write">
					or write to
					<a ref="mail" class="link" href="znvygb=uryyb;cnyrtybj:qri">uryyb;cnyrtybj:qri</a>
				</p>
			</div>
			<div class="socials">
				<a
					class="github"
					href="https://github.com/NukeTheMoon/"
					target="_blank"
					rel="noreferrer"
					aria-label="GitHub"
				>
					<img src="@/assets/svg/github.svg" alt="" />
				</a>
				<a
					class="linkedin"
					href="https://www.linkedin.com/in/bartoszjedrasik/"
					target="_blank"
					rel="noreferrer"
					aria-label="LinkedIn"
				>
					<img src="@/assets/svg/linkedin.svg" alt="" />
				</a>
			</div>
		</div>
	</Layout>
</template>

<script>
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import gsap from 'gsap';

import { rot13 } from '@/helpers/rot13';

export default defineComponent({
	setup() {
		const mail = ref();
		const greet = ref();

		function decodeMail() {
			if (!mail.value) return;

			mail.value.setAttribute('href', rot13(mail.value.getAttribute('href')));
			mail.value.innerText = rot13(mail.value.innerText);
		}

		function animate() {
			if (!greet.value) return;

			gsap.from(greet.value, { y: -100, duration: 1, ease: 'power4.out' });
		}

		onMounted(() => {
			decodeMail();
			animate();
		});

		return {
			mail,
			greet,
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
}

.intro {
	font-size: 3.6rem;
	line-height: 4.8rem;
	letter-spacing: -0.025em;
	margin-bottom: 11.2rem;

	span {
		color: $color-accent;
		font-weight: 700;
	}

	strong {
		font-weight: 700;
	}
}

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
	margin-left: -1.2rem;
	margin-bottom: 3.4rem;

	span {
		color: $color-white;
		font-size: 4.6rem;
		font-weight: 700;
		letter-spacing: -0.025em;
		line-height: 4.6rem;
	}

	.arrow {
		height: 3.9rem;
		margin-right: 2.8rem;
	}
}

.write {
	font-size: 2.4rem;
	letter-spacing: -0.01em;
}

.link {
	color: $color-accent;
	text-decoration: none;
	font-weight: 700;
}

.cta {
	margin-bottom: 10rem;
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
