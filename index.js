const keyLayout = [
    "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
    "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "/", "Del",
    "Caps lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
    "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "arr-up", "Shift",
    "Ctrl", "Win", "Alt", "space", "Alt", "arr-l", "arr-d", "arr-r", "Ctrl"
];
const symbolLayout = [
  "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace",
  "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", "|", "Del",
  "Caps lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", '"', "Enter",
  "Shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "arr-up", "Shift",
  "Ctrl", "Win", "Alt", "space", "Alt", "arr-l", "arr-d", "arr-r", "Ctrl"
];
const rusLayout = [
    "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
    "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "/", "Del",
    "Caps lock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter",
    "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "arr-up", "Shift",
    "Ctrl", "Win", "Alt", "space", "Alt", "arr-l", "arr-d", "arr-r", "Ctrl"
];

const Keyboard = {
  elements: {
      main: null,
      keysContainer: null,
      keys: [],
      textAreaContainer: null
  },
  
  eventHandlers: {
      oninput: null,
  },

  properties: {
      value: "",
      capsLock: false,
      shift: false,
      alt: false,
      ctrl: false,
  },

  init() {
      
      this.elements.main = document.createElement("div");
      this.elements.keysContainer = document.createElement("div");
      this.elements.textAreaContainer = document.createElement("textarea");

      this.elements.main.classList.add("keyboard");
      this.elements.keysContainer.classList.add("keyboard__keys");
      this.elements.textAreaContainer.classList.add("keyboard-input");
      this.elements.textAreaContainer.setAttribute('id','keyboardtext');
      
      this.setLayout(keyLayout);

      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);
      document.body.appendChild(this.elements.textAreaContainer);

      
      document.querySelectorAll(".keyboard-input").forEach(element => {
                  this.open(element.value, currentValue => {
                  element.value = currentValue;
              });
     }); 
  },  
  setLayout(layout) {
    this.elements.keysContainer.innerHTML = "";
    this.elements.keysContainer.appendChild(this._createKeys(layout));
    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
  },  
  
  _createKeys(layout) {
      const fragment = document.createDocumentFragment();
      
      const createIconHTML = (icon_name) => {
          return `<i class="material-icons">${icon_name}</i>`;
      };
     

      layout.forEach(key => {
          const keyElement = document.createElement("button");
          const insertLineBreak = ["Backspace", "Tab", "Caps lock", "Enter", "Shift", "Ctr", "Win", "Alt", "arrow-up", "arrow-left", "arrow-down", "arrow-right"].indexOf(key) !== -1;

          keyElement.setAttribute("type", "button");
          keyElement.classList.add("keyboard__key", "keyboard__key--effect");

          switch (key) {
              case "Backspace":
                  keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                  keyElement.innerHTML = createIconHTML("Backspace");

                 keyElement.addEventListener("click", () => {
                      this.properties.value = this.properties.value.substring(0, keyboardtext.selectionEnd - 1) + this.properties.value.substring(keyboardtext.selectionEnd, this.properties.value.length);
                      this._triggerEvent("oninput");
                      keyboardtext.focus();    
                                     
             
                  });

                  break;

              case "Caps lock":
                  keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "keyboard__key--dark");
                  keyElement.classList.remove("keyboard__key--effect");
                  keyElement.innerHTML = createIconHTML("Caps lock");

                  keyElement.addEventListener("click", () => {
                      this._toggleCapsLock();
                      keyElement.classList.toggle("keyboard__key--actived", this.properties.capsLock);

                      
                  });

                  break;

              case "Tab":
                  keyElement.classList.add("keyboard__key-middle-wide", "keyboard__key--dark");
                  keyElement.innerHTML = createIconHTML("Tab");

                  keyElement.addEventListener("click", () => {
                    this.properties.value += "    ";
                    this._triggerEvent("oninput");
                  });

                  break;

              case "Del":
                  keyElement.classList.add("keyboard__key",  "keyboard__key--dark");
                  keyElement.innerHTML = createIconHTML("Del");
                  
                                    
                  keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, keyboardtext.selectionEnd) + this.properties.value.substring(keyboardtext.selectionEnd + 1, this.properties.value.length); 
                        this._triggerEvent("oninput");
                        keyboardtext.focus();
                    });
                                     
                  break;  
                    
              case "Ctrl":
                  keyElement.classList.add("keyboard__key--dark");
                  keyElement.innerHTML = createIconHTML("Ctrl");
                  
                
                     keyElement.addEventListener("click", () => {
                        this._toggleLang1(); 
                        });
      
                  break;  
                        
              case "Win":
                  keyElement.classList.add("keyboard__key",  "keyboard__key--dark");
                  keyElement.innerHTML = createIconHTML("Win");
                                        
            
                  break;  

              case "arr-up":
                  keyElement.classList.add("keyboard__key--dark");
                  keyElement.innerHTML = "&#9650";
              
                              
                  break;     
                  
              case "arr-d":
                    keyElement.classList.add("keyboard__key--dark");
                    keyElement.innerHTML = "&#9660";
                
                                               
                    break;   
                    
              case "arr-l":
                    keyElement.classList.add("keyboard__key--dark");
                    keyElement.innerHTML = "&#9668";
                  
                                                    
                    break;   
                    
              case "arr-r":
                    keyElement.classList.add("keyboard__key--dark");
                    keyElement.innerHTML = "&#9658";
                    
                                                      
                    break;            

              case "Alt":
                  keyElement.classList.add("keyboard__key",  "keyboard__key--dark");
                  keyElement.innerHTML = createIconHTML("Alt");
              
                 
                             keyElement.addEventListener("click", () => {
                                 this._toggleLang(); 
                                });
              
                  break;      
                        
              case "Shift":
                  keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                  keyElement.innerHTML = createIconHTML("Shift");
      
                       keyElement.addEventListener("click", () => {
                       this._toggleShift();     
                                                                          
                    });
                       
                  break;          

              case "space":
                  keyElement.classList.add("keyboard__key--extra-wide");
                  keyElement.innerHTML = createIconHTML(" ");

                  keyElement.addEventListener("click", () => {
                      this.properties.value += " ";
                      this._triggerEvent("oninput");
                  });

                  break;

              case "Enter":
                  keyElement.classList.add("keyboard__key-more-wide", "keyboard__key--dark");
                  keyElement.innerHTML = createIconHTML("Enter");
  
                  keyElement.addEventListener("click", () => {
                      this.properties.value += "\n";
                      this._triggerEvent("oninput");
                  });
  
                    break;    

              default:
                  keyElement.textContent = key.toLowerCase();

                  keyElement.addEventListener("click", () => {
                      this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                      this._triggerEvent("oninput");
                  });

                  break;
          }

          fragment.appendChild(keyElement);

          if (insertLineBreak) {
              fragment.appendChild(document.createElement("br"));
          }
      });

      return fragment;
  },

  _triggerEvent(handlerName) {
      if (typeof this.eventHandlers[handlerName] == "function") {
          this.eventHandlers[handlerName](this.properties.value);
      }
  },

  _toggleCapsLock() {
      this.properties.capsLock = !this.properties.capsLock;

      for (const key of this.elements.keys) {
          if (key.childElementCount === 0) {
              key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
          }
      }
  },
  _toggleShift() {
    this.properties.shift = !this.properties.shift;
    this.properties.shift ? this.setLayout(symbolLayout) : this.setLayout(keyLayout);
   
    for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
        key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
           
        }
    }
    
  },
  _toggleLang() {
    this.properties.alt = !this.properties.alt;
    
    this.properties.alt ? this.setLayout(rusLayout) : this.setLayout(keyLayout);
  },
  _toggleLang1() {
    this.properties.ctrl = !this.properties.ctrl;
   
    this.properties.ctrl ? this.setLayout(rusLayout) : this.setLayout(keyLayout);
  },
  open(initialValue, oninput) {
      this.properties.value = initialValue || "";
      this.eventHandlers.oninput = oninput;
      
  },
  
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();

});


document.addEventListener('keydown', function(event) {
    document.querySelector(".keyboard-input").value += event.key;
   
});

