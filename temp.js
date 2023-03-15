const welcome = [
  "What does this app do?",
  "What can I do here?",
  "What is cinemeow?",
  "What is this app about?",
  "what does this do?",
  "why am I here",
  "what is this",
  "hello",
  "hi",
  "hi there",
];
const welcomeResponse = `Welcome to Cinemeow - where the clawsome world of movies meets the cuteness of cats.
    Try Saying: Search for a purrfect movie, Go to comedy, Search for puss in boots, make it dark, Login for some catventure`;

const login = [
  "Log in",
  "Login",
  "Log me in",
  "unlock perks login",
  "unlock purrks login",
  "okay login",
  "log in now",
];

const logout = [
  "Log out",
  "Logout",
  "bye",
  "goodbye",
  "sayonara",
  "bye for now",
  "see you later",
  "bye for meow",
];
const darkMode = [
  "make it dark",
  "switch to dark mode",
  "black cat",
  "I like black cats",
  "dim the lights",
];

const lightMode = [
  "make it light",
  "switch to light mode",
  "white cat",
  "I like white cats",
  "turn on the lights",
];

const categories = `popular|top rated|upcoming`;
const goto = `$(GENRE ${stringifiedGenres}|${categories})`;

const selectedCategory = genres[Math.floor(Math.random * genres.length)];
