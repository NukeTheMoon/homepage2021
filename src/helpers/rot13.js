export function rot13(str) {
	let input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz=;:';
	let output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm:@.';
	let index = x => input.indexOf(x);
	let translate = x => (index(x) > -1 ? output[index(x)] : x);

	return str.split('').map(translate).join('');
}
