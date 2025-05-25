const buttons = document.querySelectorAll('.filter-buttons button');
const items = document.querySelectorAll('.gallery-item');
const funnyQuoteDiv = document.getElementById('funny-quote');

// Updated funny lines for each category
const quotes = {
  all: "Can’t pick a favorite — it’s all just too awesome! 😎",
  team: "Our team’s secret? Snacks and bad jokes! 🍕😂",
  campaign: "Where ideas collide and coffee fuels the magic! ☕✨",
  fun: "Work like a boss, party like a legend! 🎉👑",
  bts: "If you think this is crazy, wait till you see the outtakes! 🎬🤣",
};

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    // Filter gallery items
    items.forEach(item => {
      if(filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });

    // Change the funny quote with fade effect
    funnyQuoteDiv.style.opacity = 0; // fade out
    setTimeout(() => {
      funnyQuoteDiv.textContent = quotes[filter] || "";
      funnyQuoteDiv.style.opacity = 1; // fade in
    }, 300);
  });
});


// Create emoji picker near selected image
function createEmojiPicker(x, y, callback) {
  // Remove existing picker if any
  const existingPicker = document.querySelector('.emoji-picker');
  if (existingPicker) existingPicker.remove();

  const picker = document.createElement('div');
  picker.classList.add('emoji-picker');
  picker.style.position = 'absolute';
  picker.style.left = `${x}px`;
  picker.style.top = `${y}px`;
  picker.style.background = '#fff';
  picker.style.border = '1px solid #ddd';
  picker.style.borderRadius = '8px';
  picker.style.padding = '5px 10px';
  picker.style.display = 'flex';
  picker.style.gap = '10px';
  picker.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  picker.style.zIndex = '1000';

  const emojis = ['👍', '❤️', '😂', '😮', '😢', '👏'];

  emojis.forEach(emoji => {
    const span = document.createElement('span');
    span.textContent = emoji;
    span.style.cursor = 'pointer';
    span.style.fontSize = '24px';
    span.title = `React with ${emoji}`;
    span.addEventListener('click', () => {
      callback(emoji);
      picker.remove();
    });
    picker.appendChild(span);
  });

  document.body.appendChild(picker);

  // Remove picker if clicked outside
  function handleClickOutside(event) {
    if (!picker.contains(event.target)) {
      picker.remove();
      document.removeEventListener('click', handleClickOutside);
    }
  }
  setTimeout(() => { // timeout to allow click event to register on emojis first
    document.addEventListener('click', handleClickOutside);
  }, 0);
}

// Add emoji reaction feature to gallery items
items.forEach(item => {
  // Create emoji reaction div below image
  const reactionDiv = document.createElement('div');
  reactionDiv.classList.add('emoji-reaction');
  reactionDiv.textContent = ''; // empty initially
  item.appendChild(reactionDiv);

  // On click on image show emoji picker
  item.querySelector('img').addEventListener('click', e => {
    const rect = e.target.getBoundingClientRect();
    // Show emoji picker just below the image
    createEmojiPicker(rect.left + rect.width / 2, rect.bottom + window.scrollY + 5, emoji => {
      reactionDiv.textContent = emoji;

      // Add sparkle animation class
      reactionDiv.classList.add('sparkle-animation');

      // Remove animation class after animation ends
      reactionDiv.addEventListener('animationend', () => {
        reactionDiv.classList.remove('sparkle-animation');
      }, { once: true });
    });
  });
});
