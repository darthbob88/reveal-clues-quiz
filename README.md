# Raymond's Quiz App

<!--- These are examples. See https://shields.io for others or to customize this set of shields. You might want to include dependencies, project status and licence info here --->
![GitHub repo size](https://img.shields.io/github/languages/code-size/darthbob88/reveal-clues-quiz)
![Node.js CI](https://github.com/darthbob88/reveal-clues-quiz/workflows/Node.js%20CI/badge.svg)

## ~~Cancelled due to burnout~~

There's this format for trivia that I really like, but which doesn't work well in a socially-distant or online scenario. I give you a series of 4ish clues relating to a certain thing, and when you think you know the answer, you run down and tell me,  I mark it correct or incorrect, and award you some points depending on how many clues you needed. If you only need 1 clue out of 4 to know that, eg, the USPS Remote Encoding Center is in the state of Utah, you get 4 points. If you need all 4 clues, you only get 1 point. The catch is, you only get one chance to answer each question, and if you get an answer wrong, you get 0 points for that question. So it's often better to wait for another clue than risk getting 0.

<details><summary>Example of play</summary>

Trivia Host: For 4 points, in which state will you find [Ernest Hemingway's grave](https://www.atlasobscura.com/places/ernest-hemingway-s-grave)?

Audience members 1, 2, 3: No idea.

TH: For 3 points, in which state will you find [Ernest Hemingway's grave](https://www.atlasobscura.com/places/ernest-hemingway-s-grave), and [the Smurf Turf](https://www.atlasobscura.com/places/smurf-turf), a college with blue Astroturf?

AM 1: *Runs up to the host* That's Boise State in Idaho.

TH: Correct, 3 points.

TH: Question is now worth 2 points, in which state will you find [Ernest Hemingway's grave](https://www.atlasobscura.com/places/ernest-hemingway-s-grave), [the Smurf Turf](https://www.atlasobscura.com/places/smurf-turf), and [the Yellowstone Zone of Death](https://www.atlasobscura.com/places/yellowstones-zone-of-death)?

AM 2: *Runs up to the host* Is that Wyoming?

TH: Incorrect, 0 points.

TH: For 1 point, this state also has the [(State) Potato Museum](https://www.atlasobscura.com/places/idaho-potato-museum).

AM 3: *Runs up to the host* That's Idaho.

TH: Correct, 1 point.

TH: Next question...
</details>

Anyway, since I can't do that in real life until after the Deathlung is over, I made an app to do it instead. 

## Plans:
* ~~v1.0: One hard-coded quiz, with automatic scoring, though no recording.~~ Done
* ~~v1.05: *Two* hard-coded quizzes, to make sure that we can dynamically load quizzes properly.~~ Done
* ~~v1.1: Add ability for user-generated quizzes~~ Mostly done, though I gave up on authentication because I'm burnt out.
* ~~v1.2: Add ability to save user scores and generate leaderboard for quizzes~~ Cancelled, because I'm kinda burnt out.

## Contributing to This Project

To contribute to this project, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Contact

If you want to contact me you can file an issue on this repo.
