const { position } = require("promise-path");
const fs = require("fs");
const fromHere = position(__dirname);
const debugFile = fromHere("../../__tests__/debug.txt");

let which = {
	env_: "test",

	get env() {
		return `${this.env_}`;
	},

	set env(value) {
		this.env_ = value;
	}
};

function clearDebug(): void {
	if (which.env !== "test") return;

	if (fs.existsSync(debugFile)) {
		fs.truncateSync(debugFile);
	} else {
		fs.createFileSync(debugFile, "utf8");
	}
}

function dbg(): void {
	if (which.env !== "test") return;

	if (_getNumberOfDebugs() == 0) {
		fs.writeFileSync(
			debugFile,
			new Date().toLocaleString() + "\n"
		);
	}
	const caller:string = new Error().stack?.split("\n")[3].trim() ?? "";
	fs.writeFileSync(debugFile, caller + "\n" + Array.from(arguments).join(" ") + "\n", {flag: "a"});
	console.log(Array.from(arguments).join(" "));
}

function _getNumberOfDebugs(): number {
	var data:Buffer = fs.readFileSync(debugFile);
	var res:number = data.toString().split("\n").length;
	return res - 1;
}

module.exports = {
	dbg,
	clearDebug,
	which
};
