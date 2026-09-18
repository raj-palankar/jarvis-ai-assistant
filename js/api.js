// ============================================
// JARVIS ASSISTANT - API.JS
// Complete with 60+ Voice/Text Commands
// ============================================

// ============================================
// DATA STORAGE
// ============================================
let savedNotes = [];        // Store user notes
let reminders = [];          // Store reminders

// ============================================
// JOKES COLLECTION (10 jokes)
// ============================================
const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the scarecrow win an award? He was outstanding in his field!",
    "Why don't eggs tell jokes? They'd crack each other up!",
    "What do you call a fake noodle? An impasta!",
    "Why did the math book look so sad? Because it had too many problems!",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why couldn't the bicycle stand up by itself? It was two tired!",
    "What do you call a fish wearing a bowtie? Sofishticated!",
    "Why did the coffee file a police report? It got mugged!",
    "What do you call a sleeping dinosaur? A dino-snore!"
];

// ============================================
// MOTIVATIONAL QUOTES (10 quotes)
// ============================================
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Everything you've ever wanted is on the other side of fear. - George Addair",
    "The best way to predict the future is to create it. - Peter Drucker",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs"
];

// ============================================
// TRANSLATION DICTIONARY
// ============================================
const translations = {
    "hello": {
        "spanish": "hola",
        "french": "bonjour",
        "german": "hallo",
        "italian": "ciao",
        "japanese": "konnichiwa",
        "hindi": "namaste",
        "korean": "annyeong",
        "russian": "privet"
    },
    "good morning": {
        "spanish": "buenos días",
        "french": "bonjour",
        "german": "guten morgen",
        "italian": "buongiorno",
        "japanese": "ohayou gozaimasu",
        "hindi": "suprabhat",
        "korean": "joeun achim"
    },
    "good night": {
        "spanish": "buenas noches",
        "french": "bonne nuit",
        "german": "gute nacht",
        "italian": "buona notte",
        "japanese": "oyasuminasai",
        "hindi": "shubh ratri",
        "korean": "anni"
    },
    "thank you": {
        "spanish": "gracias",
        "french": "merci",
        "german": "danke",
        "italian": "grazie",
        "japanese": "arigatou",
        "hindi": "dhanyavad",
        "korean": "kamsahamnida"
    }
};

// ============================================
// COMMAND 1: GREETINGS & INTRODUCTION
// ============================================
function commandGreetings(lowerCommand) {
    if (lowerCommand.match(/^(hello|hi|hey|good morning|good afternoon|good evening)/)) {
        const hour = new Date().getHours();
        let greeting = "Hello";
        if (hour < 12) greeting = "Good morning";
        else if (hour < 18) greeting = "Good afternoon";
        else greeting = "Good evening";
        return `${greeting}! How can I help you today?`;
    }
    return null;
}

// ============================================
// COMMAND 2: TIME QUERY
// ============================================
function commandTime(lowerCommand) {
    if (lowerCommand.includes("time")) {
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return `The current time is ${time}`;
    }
    return null;
}

// ============================================
// COMMAND 3: DATE QUERY
// ============================================
function commandDate(lowerCommand) {
    if (lowerCommand.includes("date") || lowerCommand.includes("today")) {
        const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        return `Today is ${date}`;
    }
    return null;
}

// ============================================
// COMMAND 4: DAY QUERY
// ============================================
function commandDay(lowerCommand) {
    if (lowerCommand.includes("what day") || lowerCommand.includes("day of week")) {
        const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        return `Today is ${day}`;
    }
    return null;
}

// ============================================
// COMMAND 5: MONTH QUERY
// ============================================
function commandMonth(lowerCommand) {
    if (lowerCommand.includes("what month") || lowerCommand.includes("current month")) {
        const month = new Date().toLocaleDateString('en-US', { month: 'long' });
        return `Current month is ${month}`;
    }
    return null;
}

// ============================================
// COMMAND 6: YEAR QUERY
// ============================================
function commandYear(lowerCommand) {
    if (lowerCommand.includes("what year") || lowerCommand.includes("current year")) {
        const year = new Date().getFullYear();
        return `The current year is ${year}`;
    }
    return null;
}

// ============================================
// COMMAND 7: WHO ARE YOU / ABOUT
// ============================================
function commandWhoAreYou(lowerCommand) {
    if (lowerCommand.includes("who are you") || lowerCommand.includes("your name") || lowerCommand.includes("about you")) {
        return "I am Jarvis, your intelligent personal assistant. I can help you with time, date, calculations, web searches, weather, reminders, notes, and much more!";
    }
    return null;
}

// ============================================
// COMMAND 8: HELP / COMMANDS LIST
// ============================================
function commandHelp(lowerCommand) {
    if (lowerCommand.includes("help") || lowerCommand.includes("what can you do") || lowerCommand.includes("commands")) {
        return "I can help you with: time, date, day, month, year, calculations, jokes, motivation, weather, web search, opening websites, playing music, news, notes, reminders, coin flip, dice roll, translations, trivia game, number guessing, calculator, stopwatch, age calculator, BMI calculator, currency converter, password generator, QR code, and much more! What would you like to do?";
    }
    return null;
}

// ============================================
// COMMAND 9: CALCULATOR
// ============================================
function commandCalculator(lowerCommand, command) {
    if (lowerCommand.includes("calculate") || lowerCommand.includes("what is") || lowerCommand.includes("math") || lowerCommand.includes("equals")) {
        let calcExpression = lowerCommand.replace(/calculate|what is|math|equals|=/g, '').trim();
        calcExpression = calcExpression.replace(/[^0-9+\-*/.()%]/g, '');
        try {
            const result = eval(calcExpression);
            return `The answer is ${result}`;
        } catch (e) {
            return "Sorry, I couldn't calculate that. Please say something like 'calculate 5 plus 3'";
        }
    }
    return null;
}

// ============================================
// COMMAND 10: SIMPLE MATH (plus, minus, times, divided by)
// ============================================
function commandSimpleMath(lowerCommand) {
    if (lowerCommand.match(/\d+\s*(plus|minus|times|divided by)\s*\d+/)) {
        let match = lowerCommand.match(/(\d+)\s*(plus|minus|times|divided by)\s*(\d+)/);
        if (match) {
            let num1 = parseInt(match[1]);
            let operation = match[2];
            let num2 = parseInt(match[3]);
            let result;
            switch (operation) {
                case 'plus': result = num1 + num2; break;
                case 'minus': result = num1 - num2; break;
                case 'times': result = num1 * num2; break;
                case 'divided by': result = num1 / num2; break;
                default: result = null;
            }
            if (result !== null) {
                return `${num1} ${operation} ${num2} equals ${result}`;
            }
        }
    }
    return null;
}

// ============================================
// COMMAND 11: PERCENTAGE CALCULATOR
// ============================================
function commandPercentage(lowerCommand) {
    const percentMatch = lowerCommand.match(/(\d+)\s*percent\s*of\s*(\d+)/);
    if (percentMatch) {
        const percent = parseFloat(percentMatch[1]);
        const number = parseFloat(percentMatch[2]);
        const result = (percent / 100) * number;
        return `${percent}% of ${number} is ${result}`;
    }
    return null;
}

// ============================================
// COMMAND 12: SQUARE ROOT
// ============================================
function commandSquareRoot(lowerCommand) {
    const sqrtMatch = lowerCommand.match(/square root of (\d+)/);
    if (sqrtMatch) {
        const num = parseFloat(sqrtMatch[1]);
        const result = Math.sqrt(num);
        return `The square root of ${num} is ${result}`;
    }
    return null;
}

// ============================================
// COMMAND 13: POWER/EXPONENT
// ============================================
function commandPower(lowerCommand) {
    const powerMatch = lowerCommand.match(/(\d+)\s*(to the power of|raised to)\s*(\d+)/);
    if (powerMatch) {
        const base = parseFloat(powerMatch[1]);
        const exponent = parseFloat(powerMatch[3]);
        const result = Math.pow(base, exponent);
        return `${base} raised to power ${exponent} equals ${result}`;
    }
    return null;
}

// ============================================
// COMMAND 14: JOKE
// ============================================
function commandJoke(lowerCommand) {
    if (lowerCommand.includes("joke") || lowerCommand.includes("funny") || lowerCommand.includes("tell me a joke")) {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        return randomJoke;
    }
    return null;
}

// ============================================
// COMMAND 15: MOTIVATIONAL QUOTE
// ============================================
function commandQuote(lowerCommand) {
    if (lowerCommand.includes("motivate") || lowerCommand.includes("inspire") || lowerCommand.includes("quote") || lowerCommand.includes("motivational")) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        return randomQuote;
    }
    return null;
}

// ============================================
// COMMAND 16: WEATHER (Simulated)
// ============================================
function commandWeather(lowerCommand) {
    if (lowerCommand.includes("weather")) {
        let city = lowerCommand.replace(/weather|in|what'?s?|the|like|tell me|about/g, '').trim();
        if (city === "") city = "your location";
        const conditions = ["sunny", "cloudy", "partly cloudy", "rainy", "clear skies", "foggy", "windy", "stormy"];
        const temps = [15, 20, 22, 25, 18, 30, 12, 28];
        const humidities = [45, 55, 60, 65, 70, 50, 40, 75];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        const randomTemp = temps[Math.floor(Math.random() * temps.length)];
        const randomHumidity = humidities[Math.floor(Math.random() * humidities.length)];
        return `The weather in ${city} is currently ${randomCondition} with a temperature of ${randomTemp} degrees Celsius and ${randomHumidity} percent humidity.`;
    }
    return null;
}

// ============================================
// COMMAND 17: WEB SEARCH
// ============================================
function commandWebSearch(lowerCommand, command) {
    if (lowerCommand.includes("search for") || lowerCommand.includes("search web") || lowerCommand.includes("google")) {
        let query = lowerCommand.replace(/search for|search web|google|search/g, '').trim();
        if (query) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
            return `Searching for ${query} on Google`;
        }
        return "What would you like me to search for?";
    }
    return null;
}

// ============================================
// COMMAND 18-32: OPEN WEBSITES (200 sites, data-driven)
// ============================================
const OPEN_SITE_MAP = [
    // --- Search / general ---
    { keywords: ["google"], url: "https://google.com", label: "Google" },
    { keywords: ["bing"], url: "https://bing.com", label: "Bing" },
    { keywords: ["yahoo"], url: "https://yahoo.com", label: "Yahoo" },
    { keywords: ["duckduckgo"], url: "https://duckduckgo.com", label: "DuckDuckGo" },
    { keywords: ["wikipedia"], url: "https://wikipedia.org", label: "Wikipedia" },
    { keywords: ["yandex"], url: "https://yandex.com", label: "Yandex" },
    { keywords: ["baidu"], url: "https://baidu.com", label: "Baidu" },
    { keywords: ["ecosia"], url: "https://ecosia.org", label: "Ecosia" },
    { keywords: ["startpage"], url: "https://startpage.com", label: "Startpage" },
    { keywords: ["ask.com", "ask jeeves"], url: "https://ask.com", label: "Ask.com" },

    // --- Video / streaming ---
    { keywords: ["youtube"], url: "https://youtube.com", label: "YouTube" },
    { keywords: ["netflix"], url: "https://netflix.com", label: "Netflix" },
    { keywords: ["hulu"], url: "https://hulu.com", label: "Hulu" },
    { keywords: ["disney plus", "disney+"], url: "https://disneyplus.com", label: "Disney+" },
    { keywords: ["prime video", "amazon prime video"], url: "https://primevideo.com", label: "Prime Video" },
    { keywords: ["hbo max", "max"], url: "https://max.com", label: "Max" },
    { keywords: ["twitch"], url: "https://twitch.tv", label: "Twitch" },
    { keywords: ["vimeo"], url: "https://vimeo.com", label: "Vimeo" },
    { keywords: ["dailymotion"], url: "https://dailymotion.com", label: "Dailymotion" },
    { keywords: ["peacock"], url: "https://peacocktv.com", label: "Peacock" },
    { keywords: ["paramount plus", "paramount+"], url: "https://paramountplus.com", label: "Paramount+" },
    { keywords: ["crunchyroll"], url: "https://crunchyroll.com", label: "Crunchyroll" },
    { keywords: ["apple tv"], url: "https://tv.apple.com", label: "Apple TV" },
    { keywords: ["plex"], url: "https://plex.tv", label: "Plex" },
    { keywords: ["curiositystream"], url: "https://curiositystream.com", label: "CuriosityStream" },

    // --- Music / audio ---
    { keywords: ["spotify"], url: "https://spotify.com", label: "Spotify" },
    { keywords: ["soundcloud"], url: "https://soundcloud.com", label: "SoundCloud" },
    { keywords: ["apple music"], url: "https://music.apple.com", label: "Apple Music" },
    { keywords: ["pandora"], url: "https://pandora.com", label: "Pandora" },
    { keywords: ["tidal"], url: "https://tidal.com", label: "Tidal" },
    { keywords: ["deezer"], url: "https://deezer.com", label: "Deezer" },
    { keywords: ["shazam"], url: "https://shazam.com", label: "Shazam" },
    { keywords: ["bandcamp"], url: "https://bandcamp.com", label: "Bandcamp" },
    { keywords: ["audible"], url: "https://audible.com", label: "Audible" },
    { keywords: ["iheartradio", "iheart radio"], url: "https://iheart.com", label: "iHeartRadio" },

    // --- Social media ---
    { keywords: ["facebook"], url: "https://facebook.com", label: "Facebook" },
    { keywords: ["twitter", "x.com"], url: "https://twitter.com", label: "Twitter" },
    { keywords: ["instagram"], url: "https://instagram.com", label: "Instagram" },
    { keywords: ["reddit"], url: "https://reddit.com", label: "Reddit" },
    { keywords: ["linkedin"], url: "https://linkedin.com", label: "LinkedIn" },
    { keywords: ["pinterest"], url: "https://pinterest.com", label: "Pinterest" },
    { keywords: ["tiktok"], url: "https://tiktok.com", label: "TikTok" },
    { keywords: ["snapchat"], url: "https://snapchat.com", label: "Snapchat" },
    { keywords: ["tumblr"], url: "https://tumblr.com", label: "Tumblr" },
    { keywords: ["threads"], url: "https://threads.net", label: "Threads" },
    { keywords: ["mastodon"], url: "https://mastodon.social", label: "Mastodon" },
    { keywords: ["bluesky"], url: "https://bsky.app", label: "Bluesky" },
    { keywords: ["quora"], url: "https://quora.com", label: "Quora" },
    { keywords: ["discord"], url: "https://discord.com", label: "Discord" },
    { keywords: ["nextdoor"], url: "https://nextdoor.com", label: "Nextdoor" },
    { keywords: ["vk.com", "vkontakte"], url: "https://vk.com", label: "VK" },
    { keywords: ["myspace"], url: "https://myspace.com", label: "Myspace" },
    { keywords: ["flickr"], url: "https://flickr.com", label: "Flickr" },
    { keywords: ["meetup"], url: "https://meetup.com", label: "Meetup" },
    { keywords: ["clubhouse"], url: "https://clubhouse.com", label: "Clubhouse" },

    // --- Messaging / communication ---
    { keywords: ["whatsapp"], url: "https://web.whatsapp.com", label: "WhatsApp Web" },
    { keywords: ["telegram"], url: "https://web.telegram.org", label: "Telegram" },
    { keywords: ["messenger"], url: "https://messenger.com", label: "Messenger" },
    { keywords: ["skype"], url: "https://web.skype.com", label: "Skype" },
    { keywords: ["slack"], url: "https://slack.com", label: "Slack" },
    { keywords: ["zoom"], url: "https://zoom.us", label: "Zoom" },
    { keywords: ["microsoft teams", "teams"], url: "https://teams.microsoft.com", label: "Microsoft Teams" },
    { keywords: ["signal"], url: "https://signal.org", label: "Signal" },
    { keywords: ["gmail"], url: "https://gmail.com", label: "Gmail" },
    { keywords: ["outlook"], url: "https://outlook.com", label: "Outlook" },
    { keywords: ["yahoo mail"], url: "https://mail.yahoo.com", label: "Yahoo Mail" },
    { keywords: ["protonmail", "proton mail"], url: "https://mail.proton.me", label: "Proton Mail" },
    { keywords: ["google meet"], url: "https://meet.google.com", label: "Google Meet" },
    { keywords: ["webex"], url: "https://webex.com", label: "Webex" },
    { keywords: ["viber"], url: "https://viber.com", label: "Viber" },
    { keywords: ["line app", "line messenger"], url: "https://line.me", label: "LINE" },
    { keywords: ["wechat"], url: "https://web.wechat.com", label: "WeChat" },

    // --- Shopping ---
    { keywords: ["amazon"], url: "https://amazon.com", label: "Amazon" },
    { keywords: ["ebay"], url: "https://ebay.com", label: "eBay" },
    { keywords: ["etsy"], url: "https://etsy.com", label: "Etsy" },
    { keywords: ["walmart"], url: "https://walmart.com", label: "Walmart" },
    { keywords: ["target"], url: "https://target.com", label: "Target" },
    { keywords: ["best buy"], url: "https://bestbuy.com", label: "Best Buy" },
    { keywords: ["aliexpress"], url: "https://aliexpress.com", label: "AliExpress" },
    { keywords: ["flipkart"], url: "https://flipkart.com", label: "Flipkart" },
    { keywords: ["shopify"], url: "https://shopify.com", label: "Shopify" },
    { keywords: ["costco"], url: "https://costco.com", label: "Costco" },
    { keywords: ["ikea"], url: "https://ikea.com", label: "IKEA" },
    { keywords: ["wayfair"], url: "https://wayfair.com", label: "Wayfair" },
    { keywords: ["zara"], url: "https://zara.com", label: "Zara" },
    { keywords: ["h&m", "hennes and mauritz"], url: "https://hm.com", label: "H&M" },
    { keywords: ["nike"], url: "https://nike.com", label: "Nike" },
    { keywords: ["adidas"], url: "https://adidas.com", label: "Adidas" },
    { keywords: ["myntra"], url: "https://myntra.com", label: "Myntra" },
    { keywords: ["snapdeal"], url: "https://snapdeal.com", label: "Snapdeal" },

    // --- Dev / tech ---
    { keywords: ["github"], url: "https://github.com", label: "GitHub" },
    { keywords: ["gitlab"], url: "https://gitlab.com", label: "GitLab" },
    { keywords: ["bitbucket"], url: "https://bitbucket.org", label: "Bitbucket" },
    { keywords: ["stack overflow", "stackoverflow"], url: "https://stackoverflow.com", label: "Stack Overflow" },
    { keywords: ["npm"], url: "https://npmjs.com", label: "npm" },
    { keywords: ["pypi"], url: "https://pypi.org", label: "PyPI" },
    { keywords: ["codepen"], url: "https://codepen.io", label: "CodePen" },
    { keywords: ["replit"], url: "https://replit.com", label: "Replit" },
    { keywords: ["hacker news"], url: "https://news.ycombinator.com", label: "Hacker News" },
    { keywords: ["dev.to", "dev to"], url: "https://dev.to", label: "DEV Community" },
    { keywords: ["medium"], url: "https://medium.com", label: "Medium" },
    { keywords: ["mdn"], url: "https://developer.mozilla.org", label: "MDN Web Docs" },
    { keywords: ["w3schools"], url: "https://w3schools.com", label: "W3Schools" },
    { keywords: ["digitalocean"], url: "https://digitalocean.com", label: "DigitalOcean" },
    { keywords: ["heroku"], url: "https://heroku.com", label: "Heroku" },
    { keywords: ["vercel"], url: "https://vercel.com", label: "Vercel" },
    { keywords: ["netlify"], url: "https://netlify.com", label: "Netlify" },
    { keywords: ["aws", "amazon web services"], url: "https://aws.amazon.com", label: "AWS" },
    { keywords: ["azure"], url: "https://azure.microsoft.com", label: "Microsoft Azure" },
    { keywords: ["google cloud"], url: "https://cloud.google.com", label: "Google Cloud" },
    { keywords: ["docker hub", "docker"], url: "https://hub.docker.com", label: "Docker Hub" },
    { keywords: ["codeacademy", "codecademy"], url: "https://codecademy.com", label: "Codecademy" },
    { keywords: ["leetcode"], url: "https://leetcode.com", label: "LeetCode" },
    { keywords: ["hackerrank"], url: "https://hackerrank.com", label: "HackerRank" },
    { keywords: ["kaggle"], url: "https://kaggle.com", label: "Kaggle" },

    // --- Productivity / office ---
    { keywords: ["google drive"], url: "https://drive.google.com", label: "Google Drive" },
    { keywords: ["google docs"], url: "https://docs.google.com", label: "Google Docs" },
    { keywords: ["google sheets"], url: "https://sheets.google.com", label: "Google Sheets" },
    { keywords: ["google slides"], url: "https://slides.google.com", label: "Google Slides" },
    { keywords: ["google calendar"], url: "https://calendar.google.com", label: "Google Calendar" },
    { keywords: ["google maps"], url: "https://maps.google.com", label: "Google Maps" },
    { keywords: ["google photos"], url: "https://photos.google.com", label: "Google Photos" },
    { keywords: ["dropbox"], url: "https://dropbox.com", label: "Dropbox" },
    { keywords: ["onedrive"], url: "https://onedrive.live.com", label: "OneDrive" },
    { keywords: ["notion"], url: "https://notion.so", label: "Notion" },
    { keywords: ["evernote"], url: "https://evernote.com", label: "Evernote" },
    { keywords: ["trello"], url: "https://trello.com", label: "Trello" },
    { keywords: ["asana"], url: "https://asana.com", label: "Asana" },
    { keywords: ["monday.com", "monday"], url: "https://monday.com", label: "Monday.com" },
    { keywords: ["jira"], url: "https://atlassian.com/software/jira", label: "Jira" },
    { keywords: ["confluence"], url: "https://atlassian.com/software/confluence", label: "Confluence" },
    { keywords: ["airtable"], url: "https://airtable.com", label: "Airtable" },
    { keywords: ["canva"], url: "https://canva.com", label: "Canva" },
    { keywords: ["figma"], url: "https://figma.com", label: "Figma" },
    { keywords: ["miro"], url: "https://miro.com", label: "Miro" },
    { keywords: ["clickup"], url: "https://clickup.com", label: "ClickUp" },
    { keywords: ["basecamp"], url: "https://basecamp.com", label: "Basecamp" },
    { keywords: ["todoist"], url: "https://todoist.com", label: "Todoist" },
    { keywords: ["office 365", "microsoft office"], url: "https://office.com", label: "Microsoft Office" },

    // --- News ---
    { keywords: ["bbc"], url: "https://bbc.com", label: "BBC" },
    { keywords: ["cnn"], url: "https://cnn.com", label: "CNN" },
    { keywords: ["new york times", "nytimes"], url: "https://nytimes.com", label: "The New York Times" },
    { keywords: ["the guardian", "guardian"], url: "https://theguardian.com", label: "The Guardian" },
    { keywords: ["reuters"], url: "https://reuters.com", label: "Reuters" },
    { keywords: ["associated press", "ap news"], url: "https://apnews.com", label: "AP News" },
    { keywords: ["al jazeera"], url: "https://aljazeera.com", label: "Al Jazeera" },
    { keywords: ["forbes"], url: "https://forbes.com", label: "Forbes" },
    { keywords: ["bloomberg"], url: "https://bloomberg.com", label: "Bloomberg" },
    { keywords: ["times of india"], url: "https://timesofindia.indiatimes.com", label: "Times of India" },
    { keywords: ["ndtv"], url: "https://ndtv.com", label: "NDTV" },
    { keywords: ["hindustan times"], url: "https://hindustantimes.com", label: "Hindustan Times" },
    { keywords: ["washington post"], url: "https://washingtonpost.com", label: "The Washington Post" },
    { keywords: ["wall street journal", "wsj"], url: "https://wsj.com", label: "The Wall Street Journal" },
    { keywords: ["cnbc"], url: "https://cnbc.com", label: "CNBC" },
    { keywords: ["fox news"], url: "https://foxnews.com", label: "Fox News" },
    { keywords: ["npr"], url: "https://npr.org", label: "NPR" },

    // --- Finance ---
    { keywords: ["paypal"], url: "https://paypal.com", label: "PayPal" },
    { keywords: ["stripe"], url: "https://stripe.com", label: "Stripe" },
    { keywords: ["venmo"], url: "https://venmo.com", label: "Venmo" },
    { keywords: ["coinbase"], url: "https://coinbase.com", label: "Coinbase" },
    { keywords: ["binance"], url: "https://binance.com", label: "Binance" },
    { keywords: ["robinhood"], url: "https://robinhood.com", label: "Robinhood" },
    { keywords: ["chase"], url: "https://chase.com", label: "Chase" },
    { keywords: ["wise", "transferwise"], url: "https://wise.com", label: "Wise" },
    { keywords: ["mint"], url: "https://mint.com", label: "Mint" },
    { keywords: ["fidelity"], url: "https://fidelity.com", label: "Fidelity" },

    // --- Travel ---
    { keywords: ["airbnb"], url: "https://airbnb.com", label: "Airbnb" },
    { keywords: ["booking.com", "booking"], url: "https://booking.com", label: "Booking.com" },
    { keywords: ["expedia"], url: "https://expedia.com", label: "Expedia" },
    { keywords: ["tripadvisor"], url: "https://tripadvisor.com", label: "TripAdvisor" },
    { keywords: ["uber"], url: "https://uber.com", label: "Uber" },
    { keywords: ["lyft"], url: "https://lyft.com", label: "Lyft" },
    { keywords: ["skyscanner"], url: "https://skyscanner.com", label: "Skyscanner" },
    { keywords: ["makemytrip"], url: "https://makemytrip.com", label: "MakeMyTrip" },
    { keywords: ["irctc"], url: "https://irctc.co.in", label: "IRCTC" },
    { keywords: ["kayak"], url: "https://kayak.com", label: "Kayak" },
    { keywords: ["hotels.com"], url: "https://hotels.com", label: "Hotels.com" },
    { keywords: ["google flights"], url: "https://flights.google.com", label: "Google Flights" },

    // --- Education / reference ---
    { keywords: ["coursera"], url: "https://coursera.org", label: "Coursera" },
    { keywords: ["udemy"], url: "https://udemy.com", label: "Udemy" },
    { keywords: ["khan academy"], url: "https://khanacademy.org", label: "Khan Academy" },
    { keywords: ["edx"], url: "https://edx.org", label: "edX" },
    { keywords: ["duolingo"], url: "https://duolingo.com", label: "Duolingo" },
    { keywords: ["chegg"], url: "https://chegg.com", label: "Chegg" },
    { keywords: ["wolfram alpha", "wolframalpha"], url: "https://wolframalpha.com", label: "Wolfram Alpha" },
    { keywords: ["archive.org", "internet archive"], url: "https://archive.org", label: "Internet Archive" },
    { keywords: ["google scholar"], url: "https://scholar.google.com", label: "Google Scholar" },
    { keywords: ["udacity"], url: "https://udacity.com", label: "Udacity" },
    { keywords: ["skillshare"], url: "https://skillshare.com", label: "Skillshare" },

    // --- AI tools ---
    { keywords: ["chatgpt"], url: "https://chat.openai.com", label: "ChatGPT" },
    { keywords: ["claude"], url: "https://claude.ai", label: "Claude" },
    { keywords: ["gemini"], url: "https://gemini.google.com", label: "Gemini" },
    { keywords: ["perplexity"], url: "https://perplexity.ai", label: "Perplexity" },
    { keywords: ["midjourney"], url: "https://midjourney.com", label: "Midjourney" },
    { keywords: ["huggingface", "hugging face"], url: "https://huggingface.co", label: "Hugging Face" },

    // --- Entertainment / misc ---
    { keywords: ["imdb"], url: "https://imdb.com", label: "IMDb" },
    { keywords: ["rotten tomatoes"], url: "https://rottentomatoes.com", label: "Rotten Tomatoes" },
    { keywords: ["steam"], url: "https://store.steampowered.com", label: "Steam" },
    { keywords: ["epic games"], url: "https://epicgames.com", label: "Epic Games Store" },
    { keywords: ["xbox"], url: "https://xbox.com", label: "Xbox" },
    { keywords: ["playstation"], url: "https://playstation.com", label: "PlayStation" },
    { keywords: ["goodreads"], url: "https://goodreads.com", label: "Goodreads" },
    { keywords: ["9gag"], url: "https://9gag.com", label: "9GAG" },
    { keywords: ["imgur"], url: "https://imgur.com", label: "Imgur" },
    { keywords: ["giphy"], url: "https://giphy.com", label: "Giphy" },
    { keywords: ["weather.com", "weather"], url: "https://weather.com", label: "Weather.com" },
    { keywords: ["nintendo"], url: "https://nintendo.com", label: "Nintendo" },
    { keywords: ["roblox"], url: "https://roblox.com", label: "Roblox" },
    { keywords: ["minecraft"], url: "https://minecraft.net", label: "Minecraft" },

    // --- Job search ---
    { keywords: ["indeed"], url: "https://indeed.com", label: "Indeed" },
    { keywords: ["glassdoor"], url: "https://glassdoor.com", label: "Glassdoor" },
    { keywords: ["monster"], url: "https://monster.com", label: "Monster" },
    { keywords: ["ziprecruiter"], url: "https://ziprecruiter.com", label: "ZipRecruiter" },
    { keywords: ["naukri"], url: "https://naukri.com", label: "Naukri" },
    { keywords: ["upwork"], url: "https://upwork.com", label: "Upwork" },
    { keywords: ["fiverr"], url: "https://fiverr.com", label: "Fiverr" },
];

function commandOpenWebsite(lowerCommand) {
    if (!lowerCommand.includes("open")) return null;

    for (const site of OPEN_SITE_MAP) {
        if (site.keywords.some((kw) => lowerCommand.includes(kw))) {
            window.open(site.url, "_blank");
            return `Opening ${site.label}`;
        }
    }
    return null;
}

// ============================================
// COMMAND 33: PLAY MUSIC
// ============================================
function commandPlayMusic(lowerCommand) {
    if (lowerCommand.includes("play music") || lowerCommand.includes("play song") || lowerCommand.includes("play some music")) {
        window.open("https://music.youtube.com", "_blank");
        return "Opening music player for you";
    }
    return null;
}

// ============================================
// COMMAND 34: NEWS
// ============================================
function commandNews(lowerCommand) {
    if (lowerCommand.includes("news") || lowerCommand.includes("headlines") || lowerCommand.includes("latest news")) {
        window.open("https://news.google.com", "_blank");
        return "Opening latest news headlines";
    }
    return null;
}

// ============================================
// COMMAND 35: REMEMBER NOTE
// ============================================
function commandRememberNote(lowerCommand) {
    if (lowerCommand.includes("remember that") || (lowerCommand.includes("remember") && !lowerCommand.includes("what did i remember"))) {
        let note = lowerCommand.replace(/remember that|remember|note:/g, '').trim();
        if (note) {
            savedNotes.push({ text: note, timestamp: new Date() });
            return `I'll remember that: "${note}"`;
        }
        return "What would you like me to remember?";
    }
    return null;
}

// ============================================
// COMMAND 36: RETRIEVE NOTES
// ============================================
function commandGetNotes(lowerCommand) {
    if (lowerCommand.includes("what did i remember") || lowerCommand.includes("show my notes") || lowerCommand.includes("my notes") || lowerCommand.includes("read my notes")) {
        if (savedNotes.length > 0) {
            const noteList = savedNotes.map((note, i) => `${i + 1}. ${note.text}`).join(". ");
            return `You have ${savedNotes.length} note(s): ${noteList}`;
        }
        return "You haven't asked me to remember anything yet. Say 'remember that something' to save a note.";
    }
    return null;
}

// ============================================
// COMMAND 37: CLEAR NOTES
// ============================================
function commandClearNotes(lowerCommand) {
    if (lowerCommand.includes("clear my notes") || lowerCommand.includes("delete my notes")) {
        savedNotes = [];
        return "I've cleared all your saved notes.";
    }
    return null;
}

// ============================================
// COMMAND 38: SET REMINDER
// ============================================
function commandSetReminder(lowerCommand) {
    if (lowerCommand.includes("set reminder") || lowerCommand.includes("remind me")) {
        let timeMatch = lowerCommand.match(/(\d+)\s*(minute|minutes|hour|hours|second|seconds|day|days)/);
        if (timeMatch) {
            let amount = parseInt(timeMatch[1]);
            let unit = timeMatch[2];
            let ms = 0;
            if (unit.includes("minute")) ms = amount * 60 * 1000;
            else if (unit.includes("hour")) ms = amount * 60 * 60 * 1000;
            else if (unit.includes("second")) ms = amount * 1000;
            else if (unit.includes("day")) ms = amount * 24 * 60 * 60 * 1000;

            const reminderText = lowerCommand.replace(/set reminder|remind me|in|to|for/g, '').replace(timeMatch[0], '').trim() || "your reminder";

            setTimeout(() => {
                showToast(`⏰ Reminder: ${reminderText}`);
                if (typeof speak === 'function') speak(`Reminder: ${reminderText}`);
            }, ms);

            return `Reminder set for ${amount} ${unit} from now about ${reminderText}`;
        }
        return "Please specify the time. For example, 'set reminder in 5 minutes to call someone'";
    }
    return null;
}

// ============================================
// COMMAND 39: FLIP COIN
// ============================================
function commandFlipCoin(lowerCommand) {
    if (lowerCommand.includes("flip a coin") || lowerCommand.includes("coin flip") || lowerCommand.includes("toss a coin")) {
        const result = Math.random() < 0.5 ? "Heads" : "Tails";
        return `The coin landed on ${result}!`;
    }
    return null;
}

// ============================================
// COMMAND 40: ROLL DICE
// ============================================
function commandRollDice(lowerCommand) {
    if (lowerCommand.includes("roll a dice") || lowerCommand.includes("roll dice") || lowerCommand.includes("roll the dice")) {
        const result = Math.floor(Math.random() * 6) + 1;
        return `You rolled a ${result}!`;
    }
    return null;
}

// ============================================
// COMMAND 41: ROLL TWO DICE
// ============================================
function commandRollTwoDice(lowerCommand) {
    if (lowerCommand.includes("roll two dice") || lowerCommand.includes("roll 2 dice")) {
        const result1 = Math.floor(Math.random() * 6) + 1;
        const result2 = Math.floor(Math.random() * 6) + 1;
        return `You rolled ${result1} and ${result2}. Total is ${result1 + result2}!`;
    }
    return null;
}

// ============================================
// COMMAND 42: TRANSLATE
// ============================================
function commandTranslate(lowerCommand) {
    if (lowerCommand.includes("translate")) {
        let textMatch = lowerCommand.match(/translate\s+(.+?)\s+to\s+(\w+)/);
        if (!textMatch) {
            textMatch = lowerCommand.match(/translate\s+(.+?)\s+in\s+(\w+)/);
        }
        if (textMatch) {
            let text = textMatch[1].toLowerCase();
            let language = textMatch[2].toLowerCase();

            if (translations[text] && translations[text][language]) {
                return `The translation of "${text}" in ${language} is "${translations[text][language]}"`;
            }
            return `Sorry, I don't have translation for "${text}" in ${language} yet. Try: hello, good morning, good night, or thank you`;
        }
        return "Please say something like 'translate hello to spanish'";
    }
    return null;
}

// ============================================
// COMMAND 43: TRIVIA GAME
// ============================================
function commandTrivia(lowerCommand) {
    if (lowerCommand.includes("trivia") || lowerCommand.includes("quiz me") || lowerCommand.includes("play trivia")) {
        startTrivia();
        return null; // Return null because startTrivia handles the response
    }
    return null;
}

// ============================================
// COMMAND 44: NUMBER GUESSING GAME
// ============================================
function commandNumberGame(lowerCommand) {
    if (lowerCommand.includes("guess the number") || lowerCommand.includes("number game") || lowerCommand.includes("play number game")) {
        startNumberGame();
        return null;
    }
    return null;
}

// ============================================
// COMMAND 45: STOPWATCH / TIMER
// ============================================
let stopwatchActive = false;
let stopwatchTime = 0;
let stopwatchInterval = null;

function commandStopwatch(lowerCommand) {
    if (lowerCommand.includes("start stopwatch")) {
        if (stopwatchInterval) clearInterval(stopwatchInterval);
        stopwatchActive = true;
        stopwatchTime = 0;
        stopwatchInterval = setInterval(() => {
            if (stopwatchActive) stopwatchTime++;
        }, 1000);
        return "Stopwatch started! Say 'stop stopwatch' to stop.";
    }
    else if (lowerCommand.includes("stop stopwatch")) {
        if (stopwatchInterval) {
            clearInterval(stopwatchInterval);
            stopwatchInterval = null;
        }
        stopwatchActive = false;
        const minutes = Math.floor(stopwatchTime / 60);
        const seconds = stopwatchTime % 60;
        return `Stopwatch stopped at ${minutes} minutes and ${seconds} seconds.`;
    }
    return null;
}

// ============================================
// COMMAND 46: AGE CALCULATOR
// ============================================
function commandAgeCalculator(lowerCommand) {
    const ageMatch = lowerCommand.match(/age of (\d{4})/);
    if (ageMatch) {
        const birthYear = parseInt(ageMatch[1]);
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        return `If you were born in ${birthYear}, you are approximately ${age} years old.`;
    }
    return null;
}

// ============================================
// COMMAND 47: BMI CALCULATOR
// ============================================
function commandBMI(lowerCommand) {
    const bmiMatch = lowerCommand.match(/bmi (\d+)\s*(weight|kg)?\s*(\d+)\s*(height|cm)?/i);
    if (bmiMatch) {
        // Simple BMI calculation (weight in kg, height in cm)
        return "Please provide weight in kg and height in meters. Example: 'bmi 70 kg 1.75 m'";
    }
    return null;
}

// ============================================
// COMMAND 48: RANDOM NUMBER GENERATOR
// ============================================
function commandRandomNumber(lowerCommand) {
    const randomMatch = lowerCommand.match(/random number between (\d+) and (\d+)/);
    if (randomMatch) {
        const min = parseInt(randomMatch[1]);
        const max = parseInt(randomMatch[2]);
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        return `Random number between ${min} and ${max} is ${random}`;
    }
    return null;
}

// ============================================
// COMMAND 49: PASSWORD GENERATOR
// ============================================
function commandPasswordGenerator(lowerCommand) {
    if (lowerCommand.includes("generate password")) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let password = "";
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `Generated password: ${password}`;
    }
    return null;
}

// ============================================
// COMMAND 50: QR CODE GENERATOR
// ============================================
function commandQRCode(lowerCommand) {
    if (lowerCommand.includes("generate qr") || lowerCommand.includes("qr code")) {
        let text = lowerCommand.replace(/generate qr|qr code|for/g, '').trim();
        if (text) {
            window.open(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`, "_blank");
            return `Opening QR code generator for: ${text}`;
        }
        return "What text would you like to generate a QR code for?";
    }
    return null;
}

// ============================================
// COMMAND 51: THANK YOU
// ============================================
function commandThankYou(lowerCommand) {
    if (lowerCommand.includes("thank you") || lowerCommand.includes("thanks")) {
        return "You're welcome! I'm happy to help.";
    }
    return null;
}

// ============================================
// COMMAND 52: GOODBYE
// ============================================
function commandGoodbye(lowerCommand) {
    if (lowerCommand.includes("goodbye") || lowerCommand.includes("bye") || lowerCommand.includes("see you")) {
        return "Goodbye! Have a great day!";
    }
    return null;
}

// ============================================
// COMMAND 53: HOW ARE YOU
// ============================================
function commandHowAreYou(lowerCommand) {
    if (lowerCommand.includes("how are you") || lowerCommand.includes("how are you doing")) {
        const responses = ["I'm doing great, thank you for asking!", "I'm functioning perfectly!", "All systems operational!", "I'm ready to assist you!"];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    return null;
}

// ============================================
// COMMAND 54: WHAT'S NEW
// ============================================
function commandWhatsNew(lowerCommand) {
    if (lowerCommand.includes("what's new") || lowerCommand.includes("any updates")) {
        return "I've been updated with new features! I can now generate passwords, create QR codes, calculate your age, and much more. Try saying 'help' to see all commands!";
    }
    return null;
}

// ============================================
// COMMAND 55: TELL ME A FACT
// ============================================
function commandFact(lowerCommand) {
    if (lowerCommand.includes("tell me a fact") || lowerCommand.includes("interesting fact")) {
        const facts = [
            "Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs that was still edible!",
            "A day on Venus is longer than a year on Venus.",
            "Octopuses have three hearts.",
            "Bananas are berries, but strawberries aren't.",
            "The Eiffel Tower can grow more than 6 inches in summer due to heat expansion."
        ];
        return facts[Math.floor(Math.random() * facts.length)];
    }
    return null;
}

// ============================================
// COMMAND 56: TELL ME A RIDDLE
// ============================================
function commandRiddle(lowerCommand) {
    if (lowerCommand.includes("tell me a riddle") || lowerCommand.includes("riddle")) {
        const riddles = [
            "What has keys but can't open locks? A piano.",
            "What has a face and two hands but no arms or legs? A clock.",
            "What gets wetter as it dries? A towel.",
            "What can you catch but not throw? A cold.",
            "What has to be broken before you can use it? An egg."
        ];
        return riddles[Math.floor(Math.random() * riddles.length)];
    }
    return null;
}

// ============================================
// COMMAND 57-60: MORE UTILITIES
// ============================================
function commandEcho(lowerCommand, command) {
    if (lowerCommand.includes("say") && !lowerCommand.includes("say hello")) {
        let text = command.replace(/say/gi, '').trim();
        if (text) return text;
    }
    return null;
}

function commandCountWords(lowerCommand, command) {
    if (lowerCommand.includes("count words")) {
        let text = command.replace(/count words in|count words/gi, '').trim();
        if (text) {
            const wordCount = text.split(/\s+/).length;
            return `That sentence has ${wordCount} words.`;
        }
    }
    return null;
}

function commandCapitalize(lowerCommand, command) {
    if (lowerCommand.includes("capitalize")) {
        let text = command.replace(/capitalize/gi, '').trim();
        if (text) {
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        }
    }
    return null;
}

function commandReverse(lowerCommand, command) {
    if (lowerCommand.includes("reverse")) {
        let text = command.replace(/reverse/gi, '').trim();
        if (text) {
            return text.split('').reverse().join('');
        }
    }
    return null;
}

// ============================================
// MAIN PROCESS COMMAND FUNCTION
// ============================================
function processCommand(command) {
    let response = "";
    const lowerCommand = command.toLowerCase();

    // Execute all command checks in order
    response = commandGreetings(lowerCommand) ||
        commandTime(lowerCommand) ||
        commandDate(lowerCommand) ||
        commandDay(lowerCommand) ||
        commandMonth(lowerCommand) ||
        commandYear(lowerCommand) ||
        commandWhoAreYou(lowerCommand) ||
        commandHelp(lowerCommand) ||
        commandCalculator(lowerCommand, command) ||
        commandSimpleMath(lowerCommand) ||
        commandPercentage(lowerCommand) ||
        commandSquareRoot(lowerCommand) ||
        commandPower(lowerCommand) ||
        commandJoke(lowerCommand) ||
        commandQuote(lowerCommand) ||
        commandWeather(lowerCommand) ||
        commandWebSearch(lowerCommand, command) ||
        commandOpenWebsite(lowerCommand) ||
        commandPlayMusic(lowerCommand) ||
        commandNews(lowerCommand) ||
        commandRememberNote(lowerCommand) ||
        commandGetNotes(lowerCommand) ||
        commandClearNotes(lowerCommand) ||
        commandSetReminder(lowerCommand) ||
        commandFlipCoin(lowerCommand) ||
        commandRollDice(lowerCommand) ||
        commandRollTwoDice(lowerCommand) ||
        commandTranslate(lowerCommand) ||
        commandTrivia(lowerCommand) ||
        commandNumberGame(lowerCommand) ||
        commandStopwatch(lowerCommand) ||
        commandAgeCalculator(lowerCommand) ||
        commandBMI(lowerCommand) ||
        commandRandomNumber(lowerCommand) ||
        commandPasswordGenerator(lowerCommand) ||
        commandQRCode(lowerCommand) ||
        commandThankYou(lowerCommand) ||
        commandGoodbye(lowerCommand) ||
        commandHowAreYou(lowerCommand) ||
        commandWhatsNew(lowerCommand) ||
        commandFact(lowerCommand) ||
        commandRiddle(lowerCommand) ||
        commandEcho(lowerCommand, command) ||
        commandCountWords(lowerCommand, command) ||
        commandCapitalize(lowerCommand, command) ||
        commandReverse(lowerCommand, command);

    // Default response if no command matched
    if (!response) {
        response = "I'm not sure how to respond to that. Try saying 'help' to see what I can do, or try one of the quick action buttons below.";
    }

    // Speak and display the response
    if (typeof speak === 'function') {
        speak(response);
    }

    const jarvisTextElement = document.getElementById("jarvisText");
    if (jarvisTextElement) {
        jarvisTextElement.innerText = response;
    }
}

// ============================================
// TRIVIA GAME FUNCTION
// ============================================
let triviaActive = false;
let currentQuestion = null;
let score = 0;

function startTrivia() {
    const questions = [
        { q: "What is the capital of France?", a: "paris" },
        { q: "What is 2 + 2?", a: "4" },
        { q: "What color is the sky on a clear day?", a: "blue" },
        { q: "Who wrote Romeo and Juliet?", a: "shakespeare" },
        { q: "What is the largest ocean on Earth?", a: "pacific" },
        { q: "What is the tallest mountain in the world?", a: "everest" },
        { q: "Who painted the Mona Lisa?", a: "da vinci" },
        { q: "What is the fastest animal on land?", a: "cheetah" }
    ];

    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    triviaActive = true;
    const response = `Trivia question: ${currentQuestion.q}. Say your answer.`;
    if (typeof speak === 'function') speak(response);

    const jarvisTextElement = document.getElementById("jarvisText");
    if (jarvisTextElement) jarvisTextElement.innerText = response;

    const checkAnswer = (event) => {
        const userAnswer = event.detail ? event.detail.toLowerCase() : "";
        if (userAnswer.includes(currentQuestion.a)) {
            score++;
            const correctMsg = "Correct! Great job!";
            if (typeof speak === 'function') speak(correctMsg);
            if (jarvisTextElement) jarvisTextElement.innerText = correctMsg;
            triviaActive = false;
            window.removeEventListener('commandProcessed', checkAnswer);
        } else if (userAnswer.length > 0) {
            const wrongMsg = `Sorry, the correct answer was ${currentQuestion.a}. Your score is ${score}. Say 'trivia' to play again.`;
            if (typeof speak === 'function') speak(wrongMsg);
            if (jarvisTextElement) jarvisTextElement.innerText = wrongMsg;
            triviaActive = false;
            window.removeEventListener('commandProcessed', checkAnswer);
        }
    };

    window.removeEventListener('commandProcessed', checkAnswer);
    window.addEventListener('commandProcessed', checkAnswer);
}

// ============================================
// NUMBER GUESSING GAME
// ============================================
let numberGameActive = false;
let secretNumber = null;
let attempts = 0;

function startNumberGame() {
    secretNumber = Math.floor(Math.random() * 20) + 1;
    numberGameActive = true;
    attempts = 0;
    const msg = "I'm thinking of a number between 1 and 20. Can you guess it?";
    if (typeof speak === 'function') speak(msg);

    const jarvisTextElement = document.getElementById("jarvisText");
    if (jarvisTextElement) jarvisTextElement.innerText = msg;
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ============================================
// SPEECH FUNCTION
// ============================================
let voicesLoaded = false;

function speak(text) {
    if (!window.speechSynthesis) {
        console.warn("Speech synthesis not supported");
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    const setVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice =>
            voice.lang === 'en-US' &&
            (voice.name.includes('Google') || voice.name.includes('Samantha') || voice.name.includes('Female'))
        );
        if (preferredVoice) speech.voice = preferredVoice;
        window.speechSynthesis.speak(speech);
    };

    if (voicesLoaded || window.speechSynthesis.getVoices().length > 0) {
        setVoice();
    } else {
        window.speechSynthesis.onvoiceschanged = () => {
            voicesLoaded = true;
            setVoice();
        };
        setTimeout(() => {
            if (!voicesLoaded) {
                voicesLoaded = true;
                setVoice();
            }
        }, 500);
    }
}

// ============================================
// EXPORTS FOR GLOBAL ACCESS
// ============================================
window.processCommand = processCommand;
window.startTrivia = startTrivia;
window.startNumberGame = startNumberGame;
window.numberGameActive = numberGameActive;
window.secretNumber = secretNumber;
window.attempts = attempts;
window.speak = speak;
window.showToast = showToast;