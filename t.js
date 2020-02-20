!(function() {
	const n = function(n) {
			const t = parseInt(1000 * n);
			return new Promise((n) => setTimeout(n, t));
		},
		t = function(n, t) {
			return parseFloat(Math.random() * (t - n) + n).toFixed(10);
		},
		e = function(n) {
			n.click();
		},
		o = function(n) {
			return document.getElementById(n);
		},
		a = async function(a) {
			let c = o('duck-hunt-animation');
			await n(t(1, 2)), e(c);
		},
		c = async function(a) {
			let c = o('single-choice-bonus-animation').children[0];
			await n(t(0, 2)), e(c);
		},
		i = async function(t) {
			let a = o('game-submit-button'),
				{ amount: c, new_balance: i } = t;
			c === i
				? (await n(1), e(a))
				: console.log('your balance is bigger then bonus received');
		},
		{
			echo: {
				connector: {
					socket: { connection: s }
				}
			}
		} = webpackJsonp([], [], ['yMDD']);
	s.onmessage = function(n) {
		!(function(n) {
			const t = n.payload;
			switch (t[0]) {
				case 'App\\Game\\Events\\GameStarted':
					let { type: n, hash: e } = t[2];
					console.log(`Game Started: type: ${n}, hash: ${e}`),
						'single_choice_hunt' == n ? c(e) : 'duck_hunt' == n && a(e);
					break;
				case 'App\\Events\\TransactionCreated':
					let { transaction: o } = t[2],
						{ type: s } = o;
					console.log(`Transction Created: ${JSON.stringify(o)}`),
						('faucet' != s && 'bonus_duck_hunt' != s) || i(o);
			}
		})(JSON.parse(n.data));
	};
})();
