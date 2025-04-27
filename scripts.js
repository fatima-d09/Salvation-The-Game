const scenes = [
      {
        text: "You awaken in a dim sanctuary. Candles flicker. Chants echo.\nA voice whispers: 'Welcome, Seeker. Do you long for salvation?'",
        choices: [
          { text: "Yes, I seek salvation.", next: 1 },
          { text: "What is this place?", next: 2 },
          { text: "...", next: 3 }
        ]
      },
      {
        text: "Faith is noted. But your soul flickers. It must be cleansed.",
        choices: [
          { text: "Cleanse me.", next: 4 },
          { text: "I'm ready.", next: 5 },
          { text: "Why me?", next: 6 }
        ]
      },
      {
        text: "Curiosity. A dangerous trait. Here, inquiry is defiance.",
        choices: [
          { text: "I'll obey.", next: 5 },
          { text: "But I need to understand.", next: 6 },
          { text: "This feels wrong.", next: 7 }
        ]
      },
      {
        text: "Silence. The system favors submission.",
        choices: [
          { text: "Bow.", next: 5 },
          { text: "Kneel.", next: 5 },
          { text: "Weep.", next: 4 }
        ]
      },
      {
        text: "You cry, you chant, you sacrifice. But the gates stay shut.",
        choices: [
          { text: "Keep trying.", next: 0 },
          { text: "Cry louder.", next: 1 },
          { text: "Collapse.", next: 8 }
        ]
      },
      {
        text: "You obey. You suffer. The voice repeats: 'Not enough.'",
        choices: [
          { text: "What more must I give?", next: 6 },
          { text: "Take everything.", next: 4 },
          { text: "There must be more.", next: 1 }
        ]
      },
      {
        text: "Your doubt corrupts the code. But the system heals. You remain.",
        choices: [
          { text: "Restart.", next: 0 },
          { text: "Refuse.", next: 8 },
          { text: "Break the loop.", next: 7 }
        ]
      },
      {
        text: "You scream. No one answers. The darkness absorbs your voice.",
        choices: [
          { text: "Return.", next: 0 },
          { text: "Submit.", next: 5 },
          { text: "Fade away.", next: 8 }
        ]
      },
      {
        text: "[ FATAL ERROR ]\nFaith Level: 0%\nSalvation Unreachable\nRebooting doctrine...",
        choices: [
          { text: "[Re-enter System]", next: 0 }
        ],
        onEnter: () => {
          const glitchAudio = document.getElementById('glitchSound');
          glitchAudio.currentTime = 0;
          glitchAudio.play();
          const screen = document.getElementById('glitchScreen');
          screen.style.display = 'block';
          setTimeout(() => {
            screen.style.display = 'none';
          }, 2000);
        }
      }
    ];

    let currentScene = 0;

    function typeText(text, elementId, callback) {
      const el = document.getElementById(elementId);
      el.innerHTML = '';
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          el.innerHTML += text[i] === '\n' ? '<br>' : text[i];
          i++;
        } else {
          clearInterval(interval);
          if (callback) callback();
        }
      }, 30);
    }

    function renderScene() {
      const scene = scenes[currentScene];
      const choicesDiv = document.getElementById("choices");
      choicesDiv.innerHTML = '';
      if (scene.onEnter) scene.onEnter();
      typeText(scene.text, "text", () => {
        scene.choices.forEach(choice => {
          const btn = document.createElement("button");
          btn.textContent = choice.text;
          btn.onclick = () => {
            currentScene = choice.next;
            document.body.addEventListener('click', () => {
            const chant = document.getElementById('chantSound');
            if (chant && chant.paused) chant.play();
          }, { once: true });

          renderScene();
                    };
                    choicesDiv.appendChild(btn);
                  });
                });
              }

              renderScene();
