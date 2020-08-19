var maxLen;

// for drop down options for max and min
generateOptions = function() {
	var select = document.getElementsByClassName("len");
	for(var j=0; j<select.length;j++){
		for(var i = 0; i <= 100; i++) {
   	 		var el = document.createElement('option');
    		el.textContent = i;
    		el.value = i;
    		el.innerHTML = i;
    		select[j].appendChild(el);
		}
	}
}

checkLogic = function() {
	max = document.querySelector("#max").value;
	easyType = document.querySelector("#easytype").checked;
	if (max < 3 && easyType) {
		alert("Please choose a longer max word length than 2 when selecting Easy Typing");
	}
}

submit = function() {
    min = document.querySelector("#min").value;
    max = document.querySelector("#max").value;
    maxLen = document.querySelector("#maxlen").value;
	easyType = document.querySelector("#easytype").checked;
	subs = document.querySelector("#subs").checked;

	// default min
    if (min == "Choose min word length") {
    	min = 0;
    }

    // default max
	if (max == "Choose max word length") {
		max = 4;
	}

	// default maxLen
	if(maxLen == '') {
		maxLen = 100;
	}

	// error alert 
	if (min>max) {
		alert("Please make sure that min is less than max!");
		var minSelect = document.getElementById("min");
		var maxSelect = document.getElementById("max");
		minSelect.selectedIndex = 0;
        maxSelect.selectedIndex = 0;
	} else if(easyType && (max < 3)) {
		alert("Please choose a longer word length than 2 when selecting Easy Typing");
	} else {
		displayPasswordOptions(min, max, easyType, subs);
	}
}

// Filters out words not conforming to min and max range 
// Filters out words that are not easyType 
// Substitues letters in words if Number Substitutions is true  
displayPasswordOptions = function(min, max, easyType, subs) {
	//var words = ["apple", "boots", "aeeb", "banana", "mango"];
	var words = ["the", "of", "to", "and", "a", "in", "is", "it", "you", "that", "he", "was", "for", "on", "are", "with", "as", "I", "his", "they", "be", "at", "one", "have", "this", "from", "or", "had", "by", "hot", "word", "but", "what", "some", "we", "can", "out", "other", "were", "all", "there", "when", "up", "use", "your", "how", "said", "an", "each", "she", "which", "do", "their", "time", "if", "will", "way", "about", "many", "then", "them", "write", "would", "like", "so", "these", "her", "long", "make", "thing", "see", "him", "two", "has", "look", "more", "day", "could", "go", "come", "did", "number", "sound", "no", "most", "people", "my", "over", "know", "water", "than", "call", "first", "who", "may", "down", "side", "been", "now", "find", "any", "new", "work", "part", "take", "get", "place", "made", "live", "where", "after", "back", "little", "only", "round", "man", "year", "came", "show", "every", "good", "me", "give", "our", "under", "name", "very", "through", "just", "form", "sentence", "great", "think", "say", "help", "low", "line", "differ", "turn", "cause", "much", "mean", "before", "move", "right", "boy", "old", "too", "same", "tell", "does", "set", "three", "want", "air", "well", "also", "play", "small", "end", "put", "home", "read", "hand", "port", "large", "spell", "add", "even", "land", "here", "must", "big", "high", "such", "follow", "act", "why", "ask", "men", "change", "went", "light", "kind", "off", "need", "house", "picture", "try", "us", "again", "animal", "point", "mother", "world", "near", "build", "self", "earth", "father", "head", "stand", "own", "page", "should", "country", "found", "answer", "school", "grow", "study", "still", "learn", "plant", "cover", "food", "sun", "four", "between", "state", "keep", "eye", "never", "last", "let", "thought", "city", "tree", "cross", "farm", "hard", "start", "might", "story", "saw", "far", "sea", "draw", "left", "late", "run", "don't", "while", "press", "close", "night", "real", "life", "few", "north", "open", "seem", "together", "next", "white", "children", "begin", "got", "walk", "example", "ease", "paper", "group", "always", "music", "those", "both", "mark", "often", "letter", "until", "mile", "river", "car", "feet", "care", "second", "book", "carry", "took", "science", "eat", "room", "friend", "began", "idea", "fish", "mountain", "stop", "once", "base", "hear", "horse", "cut", "sure", "watch", "color", "face", "wood", "main", "enough", "plain", "girl", "usual", "young", "ready", "above", "ever", "red", "list", "though", "feel", "talk", "bird", "soon", "body", "dog", "family", "direct", "pose", "leave", "song", "measure", "door", "product", "black", "short", "numeral", "class", "wind", "question", "happen", "complete", "ship", "area", "half", "rock", "order", "fire", "south", "problem", "piece", "told", "knew", "pass", "since", "top", "whole", "king", "space", "heard", "best", "hour", "better", "true", "during", "hundred", "five", "remember", "step", "early", "hold", "west", "ground", "interest", "reach", "fast", "verb", "sing", "listen", "six", "table", "travel", "less", "morning", "ten", "simple", "several", "vowel", "toward", "war", "lay", "against", "pattern", "slow", "center", "love", "person", "money", "serve", "appear", "road", "map", "rain", "rule", "govern", "pull", "cold", "notice", "voice", "unit", "power", "town", "fine", "certain", "fly", "fall", "lead", "cry", "dark", "machine", "note", "wait", "plan", "figure", "star", "box", "noun", "field", "rest", "correct", "able", "pound", "done", "beauty", "drive", "stood", "contain", "front", "teach", "week", "final", "gave", "green", "oh", "quick", "develop", "ocean", "warm", "free", "minute", "strong", "special", "mind", "behind", "clear", "tail", "produce", "fact", "street", "inch", "multiply", "nothing", "course", "stay", "wheel", "full", "force", "blue", "object", "decide", "surface", "deep", "moon", "island", "foot", "system", "busy", "test", "record", "boat", "common", "gold", "possible", "plane", "stead", "dry", "wonder", "laugh", "thousand", "ago", "ran", "check", "game", "shape", "equate", "hot", "miss", "brought", "heat", "snow", "tire", "bring", "yes", "distant", "fill", "east", "paint", "language", "among", "grand", "ball", "yet", "wave", "drop", "heart", "am", "present", "heavy", "dance", "engine", "position", "arm", "wide", "sail", "material", "size", "vary", "settle", "speak", "weight", "general", "ice", "matter", "circle", "pair", "include", "divide", "syllable", "felt", "perhaps", "pick", "sudden", "count", "square", "reason", "length", "represent", "art", "subject", "region", "energy", "hunt", "probable", "bed", "brother", "egg", "ride", "cell", "believe", "fraction", "forest", "sit", "race", "window", "store", "summer", "train", "sleep", "prove", "lone", "leg", "exercise", "wall", "catch", "mount", "wish", "sky", "board", "joy", "winter", "sat", "written", "wild", "instrument", "kept", "glass", "grass", "cow", "job", "edge", "sign", "visit", "past", "soft", "fun", "bright", "gas", "weather", "month", "million", "bear", "finish", "happy", "hope", "flower", "clothe", "strange", "gone", "jump", "baby", "eight", "village", "meet", "root", "buy", "raise", "solve", "metal", "whether", "push", "seven", "paragraph", "third", "shall", "held", "hair", "describe", "cook", "floor", "either", "result", "burn", "hill", "safe", "cat", "century", "consider", "type", "law", "bit", "coast", "copy", "phrase", "silent", "tall", "sand", "soil", "roll", "temperature", "finger", "industry", "value", "fight", "lie", "beat", "excite", "natural", "view", "sense", "ear", "else", "quite", "broke", "case", "middle", "kill", "son", "lake", "moment", "scale", "loud", "spring", "observe", "child", "straight", "consonant", "nation", "dictionary", "milk", "speed", "method", "organ", "pay", "age", "section", "dress", "cloud", "surprise", "quiet", "stone", "tiny", "climb", "cool", "design", "poor", "lot", "experiment", "bottom", "key", "iron", "single", "stick", "flat", "twenty", "skin", "smile", "crease", "hole", "trade", "melody", "trip", "office", "receive", "row", "mouth", "exact", "symbol", "die", "least", "trouble", "shout", "except", "wrote", "seed", "tone", "join", "suggest", "clean", "break", "lady", "yard", "rise", "bad", "blow", "oil", "blood", "touch", "grew", "cent", "mix", "team", "wire", "cost", "lost", "brown", "wear", "garden", "equal", "sent", "choose", "fell", "fit", "flow", "fair", "bank", "collect", "save", "control", "decimal", "gentle", "woman", "captain", "practice", "separate", "difficult", "doctor", "please", "protect", "noon", "whose", "locate", "ring", "character", "insect", "caught", "period", "indicate", "radio", "spoke", "atom", "human", "history", "effect", "electric", "expect", "crop", "modern", "element", "hit", "student", "corner", "party", "supply", "bone", "rail", "imagine", "provide", "agree", "thus", "capital", "won't", "chair", "danger", "fruit", "rich", "thick", "soldier", "process", "operate", "guess", "necessary", "sharp", "wing", "create", "neighbor", "wash", "bat", "rather", "crowd", "corn", "compare", "poem", "string", "bell", "depend", "meat", "rub", "tube", "famous", "dollar", "stream", "fear", "sight", "thin", "triangle", "planet", "hurry", "chief", "colony", "clock", "mine", "tie", "enter", "major", "fresh", "search", "send", "yellow", "gun", "allow", "print", "dead", "spot", "desert", "suit", "current", "lift", "rose", "continue", "block", "chart", "hat", "sell", "success", "company", "subtract", "event", "particular", "deal", "swim", "term", "opposite", "wife", "shoe", "shoulder", "spread", "arrange", "camp", "invent", "cotton", "born", "determine", "quart", "nine", "truck", "noise", "level", "chance", "gather", "shop", "stretch", "throw", "shine", "property", "column", "molecule", "select", "wrong", "gray", "repeat", "require", "broad", "prepare", "salt", "nose", "plural", "anger", "claim", "continent", "oxygen", "sugar", "death", "pretty", "skill", "women", "season", "solution", "magnet", "silver", "thank", "branch", "match", "suffix", "especially", "fig", "afraid", "huge", "sister", "steel", "discuss", "forward", "similar", "guide", "experience", "score", "apple", "bought", "led", "pitch", "coat", "mass", "card", "band", "rope", "slip", "win", "dream", "evening", "condition", "feed", "tool", "total", "basic", "smell", "valley", "nor", "double", "seat", "arrive", "master", "track", "parent", "shore", "division", "sheet", "substance", "favor", "connect", "post", "spend", "chord", "fat", "glad", "original", "share", "station", "dad", "bread", "charge", "proper", "bar", "offer", "segment", "slave", "duck", "instant", "market", "degree", "populate", "chick", "dear", "enemy", "reply", "drink", "occur", "support", "speech", "nature", "range", "steam", "motion", "path", "liquid", "log", "meant", "quotient", "teeth", "shell", "neck"];
	var result = [];
	var result_index = -1;

	var words = words.filter( function( element ) {
  		return element.length > min && element.length <= max;
	});

	if (!easyType && !subs) {
		result = words;
	} else {
	for(var i=0; i<words.length;i++) {
		var isEasy = false; 
		if(easyType) {
			// check for words with double letters
			var curr_word = words[i].split('');
			var j = 0;
			var k = 1; 
			var len = curr_word.length;
			
			while(j<len && k<=len) {
				if (curr_word[j]==curr_word[k]) {
					result.push(words[i]);
					result_index++;
					isEasy = true;
					break;
				}
				j++;
				k++;
			}
		}
		// Allow the user to select the option to have number 
		// substitutions added -- 1 for l, 3 for e, 0 for o, etc.
		if(subs) {
			if(!isEasy) {
				continue;
			} else if(!isEasy) {
				result.push(words[i]);
				result_index++;
			}
			result[result_index] = result[result_index].replace(/l/g, "1");
			result[result_index] = result[result_index].replace(/e/g, "3");
			result[result_index] = result[result_index].replace(/o/g, "0");
		}
	}
}
	console.log("result: ", result);
	//result = result.join("     ");
	//document.getElementById("passwordlist").innerHTML = result;
	createPasswords(result);
}

createPasswords = function(words) {
	var tenPasswords = [];
	// create 10 randomly generated passwords that adhere to max length
	for(var i=0; i<10; i++) {
		var isPasswordComplete = false;
		var password = [];
		var passwordLen = 0;
		// keep searching in words array to create password with four words
		while(!isPasswordComplete) {
		// get random word from array
		var randWord = words[Math.floor(Math.random() * words.length)];
		console.log("randWord: " + randWord);
		// check that adding rand to password doesn't exceed max length
		if ((passwordLen + randWord.length) > maxLen) {
			console.log("too big");
			continue;
		} else {
			console.log("adding word");
			// add word to the password array
			password.push(randWord);
			passwordLen = passwordLen + randWord.length;

			if(password.length == 4) {
				isPasswordComplete = true;
				password.push(passwordLen);
			}
		}
	}
	tenPasswords.push(password);
}
    //tenPasswords = tenPasswords.map(x => x.join("\xa0\xa0\xa0\xa0\xa0\xa0\xa0"));
   // var table = document.getElementById("myTable");

	// document.getElementById("password1").innerHTML = tenPasswords[0];
	// document.getElementById("password2").innerHTML = tenPasswords[1];
	// document.getElementById("password3").innerHTML = tenPasswords[2];
	// document.getElementById("password4").innerHTML = tenPasswords[3];
	// document.getElementById("password5").innerHTML = tenPasswords[4];
	// document.getElementById("password6").innerHTML = tenPasswords[5];
	// document.getElementById("password7").innerHTML = tenPasswords[6];
	// document.getElementById("password8").innerHTML = tenPasswords[7];
	// document.getElementById("password9").innerHTML = tenPasswords[8];
	// document.getElementById("password10").innerHTML = tenPasswords[9];
	createTable(tenPasswords);
	console.log(tenPasswords);
}

createTable = function(tenPasswords) {
    var body = document.body;

    var h5 = document.createElement("h1");
 	var t = document.createTextNode("Possible Passwords");
 	h5.appendChild(t);
    body.appendChild(h5);

    tbl  = document.createElement('table');
    tbl.style.width  = '500px';

    for(var i = 0; i < 10; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 5; j++){
           var td = tr.insertCell();
           td.appendChild(document.createTextNode(tenPasswords[i][j]));
        }
    }
    body.appendChild(tbl);
}

 window.onload = function() { generateOptions(); }






