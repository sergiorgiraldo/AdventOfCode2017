type SimpleHash = { [letter: string]: number; };

class Day4 {
	public helpers = require("./helpers");
	
	public solveForFirstStar(lines: string[]) {
		let validPassphrases = 0;

		lines.forEach((passphrase) => {
			let isValid = true;
			var words = passphrase.split(/\s/);

			for (var i = 0; i < words.length; i++) {
				for (var j = 0; j < words.length; j++) {
					if (i === j) continue;

					if (words[i] === words[j]){ 
						isValid = false; 
						break;
					}
				}
			}

			if (isValid) validPassphrases++;
		});

		return validPassphrases;
	}

	public solveForSecondStar(lines: string[]) {
		let validPassphrases = 0;

		lines.forEach((passphrase) => {
			let isValid = true;
			var words = passphrase.split(/\s/);

			for (var i = 0; i < words.length; i++) {
				let wordLetters: SimpleHash = {};

				for (let c of words[i]) {
					wordLetters[c] = isNaN(wordLetters[c]) ? 1 : wordLetters[c] + 1;
				}

				for (var j = 0; j < words.length; j++) {
					if (i === j) continue;

					let word2Letters: SimpleHash = {};

					for (let c of words[j]) {
						word2Letters[c] = isNaN(word2Letters[c]) ? 1 : word2Letters[c] + 1;
					}
					
					if (Object.keys(wordLetters).length == Object.keys(word2Letters).length) {
						let match = true;
						
						Object.keys(wordLetters).forEach((chr) => {
							match = wordLetters[chr] != word2Letters[chr] ? false : match;
						});

						if (match) {
							isValid = false;
							break;
						}
					}
				}
			}

			if (isValid) validPassphrases++;
		});

		return validPassphrases;
	}
}

export default Day4;
