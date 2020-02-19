(function(e) {
	const delay = function(t) {
		const time = parseInt(t * 1000);
		return new Promise((resolve) => setTimeout(resolve, time));
	};
	const rand = function(min, max) {
		return parseFloat(Math.random() * (max - min) + min).toFixed(10);
	};
	const clicker = function(e) {
		e.click();
	};
	const byid = function(element) {
		return document.getElementById(element);
	};
	const duckHunt = async function(hash) {
		let el = byid('duck-hunt-animation');
		await delay(rand(1, 2));
		clicker(el);
	};
	const bonusHunt = async function(hash) {
		let el = byid('single-choice-bonus-animation').children[0];
		await delay(rand(0, 2));
		clicker(el);
	};
	const bonusReceived = async function(input) {
		let el = byid('game-submit-button');
		let { amount, new_balance: bal } = input;
		if (amount === bal) {
			await delay(1);
			clicker(el);
		} else {
			console.log('your balance is bigger then bonus received');
		}
	};
	const {
		echo: {
			connector: {
				socket: { connection: ws }
			}
		}
	} = webpackJsonp([], [], ['yMDD']);
	ws.onmessage = function(event) {
		let pl = JSON.parse(event.data);
		handler(pl);
	};
	// const mySet = new Set();
	// const pSet2 = new Set();

	// function saveStuff({ p0, p1, p2 }) {
	// 	if (p0 && p1) mySet.add(p0, p1);
	// 	if (p2) pSet2.add(p2);
	// 	if (pSet2.size >= 1000) {
	// 		const setArray = Array.from(pSet2);
	// 		pSet2.clear();
	// 		return setArray;
	// 	}
	// 	return (e.mySet = mySet), (e.pSet2 = pSet2);
	// }
	function handler(data) {
		const [p0, p1, p2] = data.payload;
		//saveStuff({ p0, p1, p2 });
		switch (p0) {
			case 'App\\Game\\Events\\GameStarted':
				let { type: gameType, hash: gameHash } = p2;
				console.log(`Game Started: type: ${gameType}, hash: ${gameHash}`);
				if (gameType == 'single_choice_hunt') {
					bonusHunt(gameHash);
				} else if (gameType == 'duck_hunt') {
					duckHunt(gameHash);
				}
				break;
			case 'App\\Events\\TransactionCreated':
				let {
					transaction: { type: xctionType }
				} = p2;
				console.log(`Transction Created: ${transaction}`);
				if (xctionType == 'faucet' || xctionType == 'bonus_duck_hunt') {
					bonusReceived(transaction);
				}
				break;
			default:
				//console.log(mySet);
				break;
		}
	}
})(this);
