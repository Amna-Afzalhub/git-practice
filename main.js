"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const $ = selector => document.querySelector(selector);
    const $$ = selector => document.querySelectorAll(selector);

    const state = {
        iq: 100,
        money: 100,
        dignity: 100,
        chaos: 0,
        luck: 50,
        combo: 0,
        damage: 0,
        energy: 0,
        reputation: 50,
        clicks: 0,
        moneyPrinted: 0,
        machines: 0,
        gamesPlayed: 0,
        potatoUsed: false,
        realityBroken: false,
        roastUsed: false,
        mathAnswer: null,
        targetScore: 0,
        targetActive: false,
        guessNumber: null,
        memoryFirst: null,
        memorySecond: null,
        memoryLock: false,
        memoryMatches: 0,
        memoryMoves: 0
    };

    const $iq = $("#iq");
    const $money = $("#money");
    const $dignity = $("#dignity");
    const $chaos = $("#chaos");
    const $luck = $("#luck");
    const $combo = $("#combo");

    const $damageValue = $("#damageValue");
    const $energyValue = $("#energyValue");
    const $repValue = $("#repValue");

    const $damageBar = $("#damageBar");
    const $energyBar = $("#energyBar");
    const $repBar = $("#repBar");

    const clamp = (num, min, max) => Math.max(min, Math.min(max, num));

    function updateUI() {

        state.iq = clamp(state.iq, 0, 999);
        state.money = Math.max(0, state.money);
        state.dignity = clamp(state.dignity, 0, 100);
        state.chaos = Math.max(0, state.chaos);
        state.luck = clamp(state.luck, 0, 100);
        state.combo = Math.max(0, state.combo);
        state.damage = clamp(state.damage, 0, 100);
        state.energy = clamp(state.energy, 0, 100);
        state.reputation = clamp(state.reputation, 0, 100);

        $iq.textContent = state.iq;
        $money.textContent = "$" + state.money;
        $dignity.textContent = state.dignity;
        $chaos.textContent = state.chaos;
        $luck.textContent = state.luck;
        $combo.textContent = state.combo;

        $damageValue.textContent = state.damage + "%";
        $energyValue.textContent = state.energy + "%";
        $repValue.textContent = state.reputation;

        $damageBar.style.width = state.damage + "%";
        $energyBar.style.width = state.energy + "%";
        $repBar.style.width = state.reputation + "%";

        checkAchievements();
    }

    function changeStats(values = {}) {

        Object.keys(values).forEach(key => {
            if (typeof state[key] === "number") {
                state[key] += values[key];
            }
        });

        state.machines++;

        updateUI();
    }

    function toast(message, type = "info") {

        const box = $("#toastBox");
        const item = document.createElement("div");

        item.className = `toast ${type}`;
        item.textContent = message;

        box.appendChild(item);

        setTimeout(() => {
            item.classList.add("out");
            setTimeout(() => item.remove(), 350);
        }, 2800);
    }

    function popup(title, message) {

        const box = $("#popupBox");

        box.innerHTML = `
            <div class="popup">
                <h2>${title}</h2>
                <p>${message}</p>
                <button id="closePopup">Continue Causing Problems</button>
            </div>
        `;

        box.classList.add("show");

        $("#closePopup").onclick = () => {
            box.classList.remove("show");
        };

        box.onclick = event => {
            if (event.target === box) {
                box.classList.remove("show");
            }
        };
    }

    function randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function enterChaos() {

        changeStats({
            chaos: 10,
            energy: 8,
            dignity: -3,
            combo: 1
        });

        toast("CHAOS HAS BEEN ENTERED. There is no turning back.", "danger");

        createConfetti(35);

        window.scrollTo({
            top: document.querySelector(".section").offsetTop - 50,
            behavior: "smooth"
        });
    }

    function wasteTime() {

        const messages = [
            "Congratulations. You wasted 7 seconds.",
            "Your productivity has left the building.",
            "Scientists are disappointed in you.",
            "That was absolutely pointless.",
            "You could have learned DSA instead.",
            "Your future self is judging you.",
            "Time successfully destroyed."
        ];

        changeStats({
            chaos: 3,
            dignity: -1,
            energy: 2,
            combo: 1
        });

        toast(randomItem(messages));
    }

    function randomChaos() {

        const actions = [
            clickMe,
            openDoor,
            future,
            luckGenerator,
            gift,
            potion,
            roulette,
            colorGenerator,
            doNotPress,
            fireworks,
            confetti,
            emojiRain
        ];

        const selected = randomItem(actions);

        selected();

        toast("Random Chaos selected something for you. Good luck.", "danger");
    }

    function askAI() {

        const input = $("#aiInput");
        const result = $("#aiResult");

        const question = input.value.trim();

        if (!question) {
            result.textContent = "The AI refuses to answer an empty question.";
            toast("Ask something first.", "danger");
            return;
        }

        const answers = [
            "Absolutely not.",
            "Probably. But why?",
            "The answer is hidden inside your browser.",
            "I have calculated the answer. You won't like it.",
            "42. Obviously.",
            "Ask again after touching grass.",
            "My artificial intelligence has decided: NO.",
            "Interesting question. Terrible timing.",
            "According to my highly advanced nonsense algorithm: maybe.",
            "I could answer, but that would make this website useful."
        ];

        result.textContent = randomItem(answers);

        changeStats({
            chaos: 2,
            iq: randomNumber(-2, 3),
            energy: 2,
            combo: 1
        });
    }

    function clickMe() {

        state.clicks++;

        $("#clickResult").textContent =
            `You clicked it ${state.clicks} time${state.clicks === 1 ? "" : "s"}. Still useless.`;

        changeStats({
            chaos: 1,
            dignity: -1,
            combo: 1
        });

        if (state.clicks === 5) {
            toast("5 clicks. You are getting suspicious.", "info");
        }

        if (state.clicks === 25) {
            toast("Achievement incoming: Professional Clicker.", "success");
        }
    }

    function printMoney() {

        state.money += 25;
        state.moneyPrinted++;

        $("#moneyResult").textContent =
            `Balance: $${state.money} | Printed: ${state.moneyPrinted}`;

        changeStats({
            chaos: 3,
            reputation: -1,
            combo: 1
        });

        toast("$25 materialized from absolutely nowhere.", "success");
    }

    function spendMoney() {

        const amount = randomNumber(10, 40);

        if (state.money < amount) {
            $("#moneyResult").textContent = "You are broke. Congratulations.";
            toast("Not enough money to waste.", "danger");
            return;
        }

        state.money -= amount;

        $("#moneyResult").textContent =
            `You wasted $${amount}. Balance: $${state.money}`;

        changeStats({
            dignity: -2,
            chaos: 4,
            combo: 1
        });

        toast(`$${amount} successfully wasted.`);
    }

    function openDoor() {

        const outcomes = [
            "A chicken was waiting behind the door.",
            "You found another door.",
            "Nothing happened. Somehow that's worse.",
            "A mysterious voice said: 'Leave.'",
            "The door opened into a universe where CSS works perfectly.",
            "A potato looked at you.",
            "You received +7 chaos for no reason.",
            "There was a developer behind it. He is disappointed."
        ];

        const result = $("#doorResult");
        const outcome = randomItem(outcomes);

        result.textContent = outcome;

        changeStats({
            chaos: randomNumber(3, 10),
            dignity: -randomNumber(0, 4),
            energy: 5,
            combo: 1
        });

        if (outcome.includes("potato")) {
            popup("🥔 POTATO ENCOUNTER", "The potato has noticed your existence.");
        }
    }

    function future() {

        const futures = [
            "You will become a legendary button presser.",
            "You will forget why you opened this website.",
            "You will learn JavaScript. Eventually.",
            "You will encounter a bug at 3 AM.",
            "You will become suspiciously good at clicking.",
            "You will deploy your project and immediately find 14 bugs.",
            "You will defeat the final boss: CSS."
        ];

        $("#futureResult").textContent = randomItem(futures);

        changeStats({
            chaos: 4,
            luck: randomNumber(-2, 5),
            combo: 1
        });
    }

    function speedTest() {

        const button = $("#speedBtn");
        const result = $("#speedResult");

        if (button.dataset.running === "true") {
            return;
        }

        button.dataset.running = "true";
        button.disabled = true;
        result.textContent = "WAIT FOR GREEN...";

        const delay = randomNumber(1500, 4000);

        setTimeout(() => {

            const start = performance.now();

            result.textContent = "⚡ CLICK NOW!";

            button.disabled = false;
            button.dataset.running = "ready";
            button.dataset.start = start;

        }, delay);
    }

    function handleSpeedClick() {

        const button = $("#speedBtn");
        const result = $("#speedResult");

        if (button.dataset.running !== "ready") {
            return;
        }

        const time = Math.round(performance.now() - Number(button.dataset.start));

        button.dataset.running = "false";

        result.textContent = `${time} ms reaction time.`;

        let reward = 0;

        if (time < 200) {
            reward = 10;
            result.textContent += " ⚡ INSANE!";
        } else if (time < 350) {
            reward = 7;
            result.textContent += " 🔥 Fast!";
        } else if (time < 600) {
            reward = 4;
            result.textContent += " 👍 Decent.";
        } else {
            reward = 1;
            result.textContent += " 🐌 Potato speed.";
        }

        changeStats({
            chaos: reward,
            iq: Math.round(reward / 2),
            energy: reward,
            combo: 1
        });
    }

    function luckGenerator() {

        state.luck = randomNumber(1, 100);

        $("#luckResult").textContent = `Luck: ${state.luck}`;

        changeStats({
            chaos: 2,
            combo: 1
        });

        if (state.luck >= 90) {
            toast("🍀 EXTREME LUCK!", "success");
            createConfetti(50);
        } else if (state.luck <= 10) {
            toast("Your luck has abandoned you.", "danger");
        }
    }

    function doNotPress() {

        const result = $("#dontResult");

        const messages = [
            "I TOLD YOU NOT TO.",
            "WHY WOULD YOU DO THAT?",
            "Reality has been notified.",
            "That button had one job.",
            "You have awakened the chaos.",
            "Your dignity has been deleted.",
            "The button is disappointed."
        ];

        result.textContent = randomItem(messages);

        changeStats({
            chaos: 15,
            dignity: -10,
            damage: 12,
            energy: 15,
            combo: 2
        });

        screenShake();
        createConfetti(60);

        if (state.chaos >= 50) {
            popup("💀 CHAOS LEVEL CRITICAL", "You have officially become an Agent of Chaos.");
        }
    }

    function magic8() {

        const input = $("#eightInput");
        const result = $("#eightResult");

        if (!input.value.trim()) {
            result.textContent = "The ball requires a question.";
            return;
        }

        const answers = [
            "Yes.",
            "No.",
            "Absolutely.",
            "Definitely not.",
            "Ask again later.",
            "Signs point to yes.",
            "My sources say no.",
            "The universe is confused.",
            "Very likely.",
            "Don't do it."
        ];

        result.textContent = `🎱 ${randomItem(answers)}`;

        changeStats({
            chaos: 3,
            luck: randomNumber(-3, 5),
            combo: 1
        });
    }

    function gift() {

        const gifts = [
            { text: "🎁 You got $50!", money: 50 },
            { text: "🧠 +10 IQ!", iq: 10 },
            { text: "🍀 +20 Luck!", luck: 20 },
            { text: "💀 -10 Dignity.", dignity: -10 },
            { text: "🌪️ +20 Chaos!", chaos: 20 },
            { text: "⚡ +20 Energy!", energy: 20 },
            { text: "🗑️ The box was empty." }
        ];

        const gift = randomItem(gifts);

        $("#giftResult").textContent = gift.text;

        changeStats({
            money: gift.money || 0,
            iq: gift.iq || 0,
            luck: gift.luck || 0,
            dignity: gift.dignity || 0,
            chaos: gift.chaos || 0,
            energy: gift.energy || 0,
            combo: 1
        });

        toast(gift.text);
    }

    function potion() {

        const effects = [
            { text: "🧪 Potion gave you +20 chaos!", chaos: 20 },
            { text: "🤯 Potion reduced your IQ by 15.", iq: -15 },
            { text: "⚡ You gained 30 energy!", energy: 30 },
            { text: "💀 Emotional damage +25.", damage: 25, dignity: -5 },
            { text: "🍀 Your luck increased by 25.", luck: 25 },
            { text: "🌪️ Reality got confused.", chaos: 30, reputation: -5 }
        ];

        const effect = randomItem(effects);

        $("#potionResult").textContent = effect.text;

        changeStats({
            chaos: effect.chaos || 0,
            iq: effect.iq || 0,
            energy: effect.energy || 0,
            damage: effect.damage || 0,
            dignity: effect.dignity || 0,
            luck: effect.luck || 0,
            reputation: effect.reputation || 0,
            combo: 1
        });

        toast(effect.text, "danger");
    }

    function mathChallenge() {

        const a = randomNumber(5, 30);
        const b = randomNumber(2, 20);
        const operators = ["+", "-", "*"];
        const operator = randomItem(operators);

        let answer;

        if (operator === "+") answer = a + b;
        if (operator === "-") answer = a - b;
        if (operator === "*") answer = a * b;

        state.mathAnswer = answer;

        $("#mathResult").textContent =
            `Solve: ${a} ${operator} ${b} = ?`;

        $("#mathInput").value = "";

        changeStats({
            chaos: 1
        });
    }

    function mathAnswer() {

        const input = $("#mathInput");
        const result = $("#mathResult");

        if (state.mathAnswer === null) {
            result.textContent = "Create a challenge first.";
            return;
        }

        const answer = Number(input.value);

        if (answer === state.mathAnswer) {

            result.textContent = "✅ Correct! Your brain survived.";

            changeStats({
                iq: 5,
                reputation: 3,
                chaos: 5,
                combo: 2
            });

            toast("Correct answer! Brain activated.", "success");

        } else {

            result.textContent =
                `❌ Wrong. Correct answer was ${state.mathAnswer}.`;

            changeStats({
                iq: -2,
                dignity: -2,
                damage: 5,
                chaos: 3
            });
        }

        state.mathAnswer = null;
    }

    function roulette() {

        const result = $("#rouletteResult");

        const events = [
            "Everything is now slightly purple.",
            "Gravity has been disabled for 2 seconds.",
            "Your screen is suspicious.",
            "A random chicken has entered the timeline.",
            "You gained 15 chaos.",
            "Reality rolled a critical failure.",
            "Your dignity has been reduced.",
            "The universe said 'skill issue'."
        ];

        result.textContent = randomItem(events);

        state.realityBroken = true;

        changeStats({
            chaos: randomNumber(5, 15),
            dignity: -randomNumber(1, 5),
            energy: 8,
            combo: 1
        });

        screenShake();
    }

    function colorGenerator() {

        const hex =
            "#" + Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0");

        $("#colorPreview").style.background = hex;
        $("#colorResult").textContent = `Color: ${hex}`;

        changeStats({
            chaos: 2,
            luck: randomNumber(-2, 3),
            combo: 1
        });
    }

    function startTarget() {

        const area = $("#targetArea");
        const target = $("#target");
        const result = $("#targetResult");

        if (state.targetActive) {
            return;
        }

        state.targetActive = true;
        target.style.display = "block";

        moveTarget();

        result.textContent =
            `Score: ${state.targetScore} | Catch it!`;

        setTimeout(() => {

            if (state.targetActive) {

                state.targetActive = false;
                target.style.display = "none";

                result.textContent =
                    `Too slow! Score: ${state.targetScore}`;

                changeStats({
                    dignity: -2,
                    chaos: 2
                });
            }

        }, 5000);
    }

    function moveTarget() {

        const area = $("#targetArea");
        const target = $("#target");

        const maxX = Math.max(0, area.clientWidth - 50);
        const maxY = Math.max(0, area.clientHeight - 50);

        target.style.left = randomNumber(0, maxX) + "px";
        target.style.top = randomNumber(0, maxY) + "px";
    }

    function hitTarget() {

        if (!state.targetActive) {
            return;
        }

        state.targetScore++;

        $("#targetResult").textContent =
            `Score: ${state.targetScore} 🎯`;

        changeStats({
            chaos: 3,
            energy: 2,
            combo: 1
        });

        moveTarget();

        if (state.targetScore >= 10) {
            state.targetActive = false;
            $("#target").style.display = "none";

            popup(
                "🎯 TARGET MASTER",
                "You clicked the target 10 times. This is your life now."
            );
        }
    }

    function roast() {

        const name = $("#roastInput").value.trim();
        const result = $("#roastResult");

        if (!name) {
            result.textContent = "Give me a name to roast.";
            toast("Enter a name first.", "danger");
            return;
        }

        const roasts = [
            `${name}, your Wi-Fi probably disconnects out of embarrassment.`,
            `${name}, even Google doesn't know what you're doing.`,
            `${name}, you have the confidence of someone who skipped the tutorial.`,
            `${name}, your code has more errors than your sleep schedule.`,
            `${name}, your browser has 37 tabs open and none are useful.`,
            `${name}, if procrastination were a sport, you'd be world champion.`,
            `${name}, your keyboard deserves better.`,
            `${name}, you don't need a debugger. You need emotional support.`,
            `${name}, your future is bright. Unfortunately, your code isn't.`,
            `${name}, even the potato is judging you.`
        ];

        result.textContent = randomItem(roasts);

        state.roastUsed = true;

        changeStats({
            damage: 15,
            dignity: -10,
            chaos: 8,
            combo: 1
        });

        toast("🔥 Premium emotional damage delivered.", "danger");
    }

    function hack() {

        const input = $("#hackInput");
        const terminal = $("#terminal");

        const command = input.value.trim().toLowerCase();

        if (!command) {
            terminal.textContent =
                "CHAOS OS v9.9\n\nType a command...\n\nAvailable: help, scan, hack, matrix, status, clear";
            return;
        }

        let response = "";

        if (command === "help") {
            response =
                "AVAILABLE COMMANDS\n" +
                "------------------\n" +
                "help   - show commands\n" +
                "scan   - scan the universe\n" +
                "hack   - definitely hack something\n" +
                "matrix - activate matrix mode\n" +
                "status - show system status\n" +
                "clear  - clear terminal";
        }
        else if (command === "scan") {
            response =
                "SCANNING...\n" +
                "User detected.\n" +
                "Potato detected.\n" +
                "Chicken detected.\n" +
                "Common sense: NOT FOUND.";
        }
        else if (command === "hack") {
            response =
                "ACCESSING CHAOS MAINFRAME...\n" +
                "████████████████ 100%\n" +
                "ACCESS GRANTED.\n" +
                "You hacked absolutely nothing.";

            changeStats({
                chaos: 12,
                reputation: -3,
                combo: 2
            });
        }
        else if (command === "matrix") {
            response =
                "MATRIX PROTOCOL ACTIVATED.\n" +
                "Reality is now green.";

            document.body.classList.add("matrix");

            changeStats({
                chaos: 10,
                combo: 1
            });
        }
        else if (command === "status") {
            response =
                `CHAOS OS STATUS\n\n` +
                `IQ: ${state.iq}\n` +
                `MONEY: $${state.money}\n` +
                `DIGNITY: ${state.dignity}\n` +
                `CHAOS: ${state.chaos}\n` +
                `LUCK: ${state.luck}`;
        }
        else if (command === "clear") {
            terminal.textContent = "";
            input.value = "";
            return;
        }
        else {
            response =
                `Command "${command}" not recognized.\n` +
                "Try: help";
        }

        terminal.textContent = `> ${command}\n\n${response}`;

        input.value = "";

        changeStats({
            chaos: 2,
            energy: 2
        });
    }

    const memorySymbols = ["🍕", "🍕", "🚀", "🚀", "🥔", "🥔", "🐔", "🐔", "🔥", "🔥", "💀", "💀"];

    function newMemory() {

        const grid = $("#memoryGrid");

        state.memoryFirst = null;
        state.memorySecond = null;
        state.memoryLock = false;
        state.memoryMatches = 0;
        state.memoryMoves = 0;

        grid.innerHTML = "";

        const shuffled = [...memorySymbols]
            .sort(() => Math.random() - .5);

        shuffled.forEach((symbol, index) => {

            const card = document.createElement("button");

            card.className = "memory-card";
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            card.textContent = "❓";

            card.addEventListener("click", () => flipMemory(card));

            grid.appendChild(card);
        });

        $("#memoryResult").textContent = "Find matching pairs.";
    }

    function flipMemory(card) {

        if (
            state.memoryLock ||
            card.classList.contains("flipped") ||
            card.classList.contains("matched")
        ) {
            return;
        }

        card.classList.add("flipped");
        card.textContent = card.dataset.symbol;

        if (!state.memoryFirst) {

            state.memoryFirst = card;
            return;
        }

        state.memorySecond = card;
        state.memoryLock = true;
        state.memoryMoves++;

        const first = state.memoryFirst;
        const second = state.memorySecond;

        if (first.dataset.symbol === second.dataset.symbol) {

            first.classList.add("matched");
            second.classList.add("matched");

            state.memoryMatches++;
            state.memoryFirst = null;
            state.memorySecond = null;
            state.memoryLock = false;

            $("#memoryResult").textContent =
                `Match! ${state.memoryMatches}/6 pairs found.`;

            changeStats({
                chaos: 4,
                iq: 2,
                combo: 1
            });

            if (state.memoryMatches === 6) {

                $("#memoryResult").textContent =
                    `🎉 Complete in ${state.memoryMoves} moves!`;

                state.gamesPlayed++;

                toast("Memory Game completed!", "success");
                updateUI();
            }

        } else {

            setTimeout(() => {

                first.classList.remove("flipped");
                second.classList.remove("flipped");

                first.textContent = "❓";
                second.textContent = "❓";

                state.memoryFirst = null;
                state.memorySecond = null;
                state.memoryLock = false;

            }, 800);
        }
    }

    function guessNumber() {

        const input = $("#guessInput");
        const result = $("#guessResult");

        const guess = Number(input.value);

        if (!state.guessNumber) {
            state.guessNumber = randomNumber(1, 100);
        }

        if (!guess || guess < 1 || guess > 100) {
            result.textContent = "Enter a number from 1 to 100.";
            return;
        }

        state.gamesPlayed++;

        if (guess === state.guessNumber) {

            result.textContent =
                "🎉 Correct! You defeated the number.";

            changeStats({
                iq: 10,
                luck: 10,
                chaos: 10,
                reputation: 5,
                combo: 2
            });

            state.guessNumber = null;

        } else if (guess < state.guessNumber) {

            result.textContent = "📈 Too low. Guess higher.";

            changeStats({
                chaos: 2,
                combo: 1
            });

        } else {

            result.textContent = "📉 Too high. Guess lower.";

            changeStats({
                chaos: 2,
                combo: 1
            });
        }

        if (state.gamesPlayed >= 3) {
            toast("🎮 Gamer achievement getting closer!", "info");
        }
    }

    function feedPotato() {

        const texts = [
            "The potato accepts your offering.",
            "Potato: Finally. Food.",
            "The potato is slightly less disappointed.",
            "You have gained potato approval.",
            "The potato ate it. No thanks were given."
        ];

        $("#potatoText").textContent = randomItem(texts);

        state.potatoUsed = true;

        changeStats({
            dignity: 3,
            luck: 5,
            chaos: 2,
            combo: 1
        });

        toast("🥔 Potato has been fed.", "success");
    }

    function insultPotato() {

        $("#potatoText").textContent =
            randomItem([
                "The potato is deeply offended.",
                "Potato: You dare speak to me like that?",
                "The potato remembers this.",
                "You have made an enemy of a vegetable.",
                "Potato is judging you even harder now."
            ]);

        state.potatoUsed = true;

        changeStats({
            dignity: -5,
            chaos: 6,
            damage: 5,
            combo: 1
        });

        $("#potato").style.transform = "rotate(-15deg) scale(1.1)";

        setTimeout(() => {
            $("#potato").style.transform = "";
        }, 500);
    }

    function dancePotato() {

        const potato = $("#potato");

        potato.classList.toggle("dancing");

        $("#potatoText").textContent =
            potato.classList.contains("dancing")
                ? "The potato has entered its dancing era."
                : "The potato has stopped dancing.";

        state.potatoUsed = true;

        changeStats({
            chaos: 5,
            energy: 5,
            combo: 1
        });
    }

    function chickenMode() {

        const chicken = $("#chicken");

        chicken.classList.toggle("following");

        if (chicken.classList.contains("following")) {

            toast("🐔 THE CHICKEN IS FOLLOWING YOU.", "danger");

            followChicken();

        } else {

            toast("Chicken stopped following... temporarily.");
        }

        changeStats({
            chaos: 8,
            dignity: -5,
            combo: 1
        });
    }

    function followChicken() {

        const chicken = $("#chicken");

        if (!chicken.classList.contains("following")) {
            return;
        }

        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);

        chicken.style.left = x + "px";
        chicken.style.top = y + "px";

        setTimeout(followChicken, 700);
    }

    function createConfetti(amount = 60) {

        for (let i = 0; i < amount; i++) {

            const piece = document.createElement("div");

            piece.className = "confetti";

            piece.style.left = Math.random() * 100 + "vw";
            piece.style.top = "-20px";
            piece.style.background =
                `hsl(${Math.random() * 360},100%,60%)`;
            piece.style.animationDelay =
                Math.random() * .5 + "s";

            document.body.appendChild(piece);

            setTimeout(() => piece.remove(), 3000);
        }
    }

    function emojiRain() {

        const emojis = [
            "😂", "🔥", "💀", "🥔", "🐔", "🤖",
            "💸", "🎉", "🚀", "🌈", "⚡", "😈"
        ];

        for (let i = 0; i < 45; i++) {

            const emoji = document.createElement("div");

            emoji.className = "floating-emoji";
            emoji.textContent = randomItem(emojis);
            emoji.style.left = Math.random() * 100 + "vw";
            emoji.style.top = "-40px";
            emoji.style.animationDuration =
                randomNumber(2, 5) + "s";
            emoji.style.animationDelay =
                Math.random() + "s";

            document.body.appendChild(emoji);

            setTimeout(() => emoji.remove(), 6000);
        }

        changeStats({
            chaos: 10,
            energy: 10,
            combo: 1
        });
    }

    function fireworks() {

        for (let i = 0; i < 12; i++) {

            const firework = document.createElement("div");

            firework.className = "firework";

            firework.style.left = randomNumber(10, 90) + "vw";
            firework.style.top = randomNumber(15, 65) + "vh";
            firework.style.background =
                `hsl(${Math.random() * 360},100%,65%)`;

            document.body.appendChild(firework);

            setTimeout(() => firework.remove(), 1200);
        }

        changeStats({
            chaos: 12,
            energy: 10,
            combo: 1
        });

        toast("🎆 FIREWORKS ACTIVATED!", "success");
    }

    function matrixMode() {

        document.body.classList.toggle("matrix");

        toast(
            document.body.classList.contains("matrix")
                ? "💚 Matrix Mode ON"
                : "Matrix Mode OFF"
        );

        state.realityBroken = true;

        changeStats({
            chaos: 10,
            energy: 8
        });
    }

    function disco() {

        document.body.classList.toggle("disco");

        toast(
            document.body.classList.contains("disco")
                ? "🪩 DISCO MODE ON"
                : "Disco Mode OFF"
        );

        state.realityBroken = true;

        changeStats({
            chaos: 12,
            energy: 12
        });
    }

    function glitch() {

        document.body.classList.toggle("glitch");

        toast(
            document.body.classList.contains("glitch")
                ? "👾 Reality is glitching."
                : "Reality stabilized."
        );

        state.realityBroken = true;

        changeStats({
            chaos: 10,
            damage: 5
        });
    }

    function screenShake() {

        document.body.classList.remove("shake");

        void document.body.offsetWidth;

        document.body.classList.add("shake");

        setTimeout(() => {
            document.body.classList.remove("shake");
        }, 600);

        state.realityBroken = true;
    }

    function invert() {

        document.body.classList.toggle("invert");

        toast(
            document.body.classList.contains("invert")
                ? "🔄 Reality inverted."
                : "Reality restored partially."
        );

        state.realityBroken = true;

        changeStats({
            chaos: 15,
            damage: 8
        });
    }

    function panic() {

        document.body.classList.add("panic");

        toast("🚨 PANIC MODE ACTIVATED.", "danger");

        changeStats({
            chaos: 20,
            damage: 20,
            dignity: -10,
            energy: 20
        });

        setTimeout(() => {
            document.body.classList.remove("panic");
        }, 5000);
    }

    function restore() {

        document.body.classList.remove(
            "matrix",
            "disco",
            "glitch",
            "invert",
            "panic",
            "shake"
        );

        $("#chicken").classList.remove("following");

        toast("✨ Reality has been restored.", "success");

        state.realityBroken = false;

        state.damage = Math.max(0, state.damage - 30);
        state.energy = Math.max(0, state.energy - 20);
        state.reputation = Math.min(100, state.reputation + 10);

        updateUI();
    }

    function checkAchievements() {

        const achievements = {
            first: state.machines > 0,
            money: state.moneyPrinted >= 5,
            chaos: state.chaos >= 50,
            games: state.gamesPlayed >= 3,
            potato: state.potatoUsed,
            reality: state.realityBroken,
            clicks: state.clicks >= 25,
            roast: state.roastUsed,
            features: state.machines >= 10
        };

        Object.entries(achievements).forEach(([name, unlocked]) => {

            const element =
                document.querySelector(
                    `[data-achievement="${name}"]`
                );

            if (!element) {
                return;
            }

            if (unlocked) {

                if (!element.classList.contains("unlocked")) {
                    element.classList.remove("locked");
                    element.classList.add("unlocked");

                    const strong = element.querySelector("strong");

                    if (strong) {
                        toast(`🏆 Achievement unlocked: ${strong.textContent}`, "success");
                    }
                }
            }
        });
    }

    const actions = {
        randomChaos,
        enterChaos,
        wasteTime,
        askAI,
        clickMe,
        printMoney,
        spendMoney,
        openDoor,
        future,
        speedTest,
        luck: luckGenerator,
        doNotPress,
        magic8,
        gift,
        potion,
        mathChallenge,
        mathAnswer,
        roulette,
        color: colorGenerator,
        startTarget,
        roast,
        hack,
        newMemory,
        guessNumber,
        feedPotato,
        insultPotato,
        dancePotato,
        chickenMode,
        fireworks,
        confetti: () => {
            createConfetti(100);

            changeStats({
                chaos: 10,
                energy: 8,
                combo: 1
            });

            toast("🎉 CONFETTI EVERYWHERE!", "success");
        },
        emojiRain,
        matrix: matrixMode,
        disco,
        glitch,
        shake: screenShake,
        invert,
        panic,
        restore
    };

    document.addEventListener("click", event => {

        const button = event.target.closest("[data-action]");

        if (!button) {
            return;
        }

        const action = button.dataset.action;

        if (actions[action]) {
            actions[action]();
        }
    });

    $("#speedBtn").addEventListener("click", handleSpeedClick);

    $("#target").addEventListener("click", hitTarget);

    $$("[data-rps]").forEach(button => {

        button.addEventListener("click", () => {

            const player = button.dataset.rps;

            const choices = ["rock", "paper", "scissors"];
            const computer = randomItem(choices);

            let message = "";

            if (player === computer) {
                message = `Draw! Both chose ${computer}.`;
            }
            else if (
                (player === "rock" && computer === "scissors") ||
                (player === "paper" && computer === "rock") ||
                (player === "scissors" && computer === "paper")
            ) {
                message = `🎉 You win! Computer chose ${computer}.`;

                changeStats({
                    iq: 4,
                    luck: 4,
                    chaos: 5,
                    combo: 2
                });

            } else {

                message = `💀 You lose! Computer chose ${computer}.`;

                changeStats({
                    dignity: -3,
                    chaos: 4,
                    damage: 3,
                    combo: 1
                });
            }

            $("#rpsResult").textContent = message;

            state.gamesPlayed++;

            updateUI();
        });
    });

    $("#hackInput").addEventListener("keydown", event => {

        if (event.key === "Enter") {
            hack();
        }
    });

    $("#aiInput").addEventListener("keydown", event => {

        if (event.key === "Enter") {
            askAI();
        }
    });

    $("#roastInput").addEventListener("keydown", event => {

        if (event.key === "Enter") {
            roast();
        }
    });

    $("#eightInput").addEventListener("keydown", event => {

        if (event.key === "Enter") {
            magic8();
        }
    });

    $("#mathInput").addEventListener("keydown", event => {

        if (event.key === "Enter") {
            mathAnswer();
        }
    });

    $("#guessInput").addEventListener("keydown", event => {

        if (event.key === "Enter") {
            guessNumber();
        }
    });

    window.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            $("#popupBox").classList.remove("show");
        }

        if (event.key === "r" && event.ctrlKey) {
            event.preventDefault();
            randomChaos();
        }
    });

    window.addEventListener("resize", () => {

        if (state.targetActive) {
            moveTarget();
        }
    });

    const escapeButton = $("#escapeButton");
    const escapeArea = document.querySelector(".escape-button-area");

    if (escapeButton && escapeArea) {

        function moveEscapeButton() {

            const areaWidth = escapeArea.clientWidth;
            const areaHeight = escapeArea.clientHeight;

            const buttonWidth = escapeButton.offsetWidth;
            const buttonHeight = escapeButton.offsetHeight;

            const padding = 15;

            const maxX = Math.max(
                padding,
                areaWidth - buttonWidth - padding
            );

            const maxY = Math.max(
                65,
                areaHeight - buttonHeight - padding
            );

            const x =
                padding +
                Math.random() * Math.max(0, maxX - padding);

            const y =
                65 +
                Math.random() * Math.max(0, maxY - 65);

            escapeButton.style.left = x + "px";
            escapeButton.style.top = y + "px";
            escapeButton.style.transform = "translate(0, 0)";
        }

        escapeButton.addEventListener("mouseenter", () => {
            moveEscapeButton();
        });

        escapeButton.addEventListener("touchstart", event => {
            event.preventDefault();
            moveEscapeButton();
        }, {
            passive: false
        });

        escapeButton.addEventListener("click", () => {

            $("#escapeMessage").textContent =
                "WAIT... HOW DID YOU CATCH ME?! 😱";

            toast(
                "😱 IMPOSSIBLE! You actually caught the button!",
                "success"
            );

            changeStats({
                chaos: 10,
                dignity: 5,
                luck: 5,
                combo: 3
            });

            createConfetti(40);

            setTimeout(() => {
                moveEscapeButton();
            }, 500);
        });
    }

    setTimeout(() => {

        $("#loading").classList.add("hide");

        toast(
            "⚡ FunLab online. Please make questionable decisions.",
            "success"
        );

    }, 1000);

    newMemory();
    updateUI();

});