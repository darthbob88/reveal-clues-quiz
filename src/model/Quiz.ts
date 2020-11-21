import { action, computed, observable } from "mobx";
import { defaultQuestionState, Question, QuestionEnum, QuestionState } from "./Question";
/**
 * Overarching type for a quiz.
 * @field prompt: string A prompt for each question, to be used if there is no overruling one in the individual question
 * @field questions: Question[] A set of questions for each quiz.
 * @field title: An overarching title for the quiz. 
 */
export type Quiz = {
    questions: Question[];
    title: string;
    prompt: string;
}

export const defaultQuiz: Quiz = {
    title: "States by Attraction",
    prompt: "In what state will you find...",

    questions: [{
        clues: [
            "Ernest Hemingway’s Grave",
            "The Smurf Turf",
            "The Yellowstone Zone of Death",
            "The <State> Potato Museum"
        ],
        answer: "Idaho"
    },
    {
        clues: [
            "Weeki Wachee, the city of mermaids",
            "The Ernest Hemingway Home and Museum",
            "NASA Vehicle Assembly Building, a building so large it has its own weather",
            "The Southernmost Point in the Continental US"
        ],
        answer: "Florida"
    },
    {
        clues: [
            "World's Largest Collection of Smallest Versions of Largest Things",
            "Monument Rocks",
            "The Equality House, across the street from Westboro",
            "Geographic Center of the Contiguous United States"
        ],
        answer: "Kansas"
    },
    {
        clues: [
            "Mutter Museum of medical oddities",
            "Fallingwater, designed by Frank Lloyd Wright",
            "Gobbler’s Knob, home of Punxsutawney Phil",
            "The grave of Fred McFeely Rogers"
        ],
        answer: "Pennsylvania"
    },
    {
        clues: [
            "Slocum Mechanical Puzzle Collection",
            'Mentone Egg, A giant concrete egg marks this town as the "Egg Basket of the Midwest."',
            "Kokomantis",
            "Hoosier Hill"
        ],
        answer: "Indiana",
        revealOnAnswer: "https://www.atlasobscura.com/places/slocum-mechanical-puzzle-collection  https://www.atlasobscura.com/places/mentone-egg  https://www.atlasobscura.com/places/kokomantis-scrap-art-sculpture https://www.atlasobscura.com/places/hoosier-hill"
    },
    {
        clues: [
            "USPS Remote Encoding Facility",
            "Pando, the trembling giant",
            "The Spiral Jetty, a sculpture built onto a lake which is only visible during droughts",
            "Bonneville Salt Flats/Speedway"
        ],
        answer: "Utah"
    },
    {
        clues: [
            "The Very Large Array radiotelescope, outside of Socorro.",
            "Smokey Bear’s Grave",
            "Carlsbad Caverns",
            "The International UFO Museum and Research Center"
        ],
        answer: "New Mexico"
    },
    {
        clues: [
            "Vacuum Cleaner Museum",
            "Vista House at Crown Point",
            "Evergreen Aviation Museum, home of the Spruce Goose",
            "International Rose Test Garden, in the City of Roses"
        ],
        answer: "Oregon"
    },
    {
        clues: [
            "Rhea County Courthouse, site of the Scopes monkey trial",
            "Concrete Parthenon, built for the 1897 Centennial Exposition",
            "National Civil Rights Museum, established in the hotel where Dr Martin Luther King Jr was assassinated",
            "Jack Daniels Distillery"
        ],
        answer: "Tennessee"
    },
    {
        clues: [
            "Dr. Seuss House aka The Goose Creek Tower, a 185 foot tall log cabin",
            "The giant metal chicken statue, outside the town of Chicken",
            "St Michael’s Cathedral, first Russian Orthodox Church in North America",
            "Santa Claus House, in the town of North Pole"
        ],
        answer: "Alaska"
    },
    {
        clues: [
            "Ape Cave, longest continuous lava tube in the continental US",
            "Maryhill Museum and Stonehenge",
            "Brown and Haley factory store, manufacturers of Almond Roca",
            "Beacon Rock, one of the largest monoliths in the world"
        ],
        answer: "Washington"
    }]
}
export class QuizState {
    @observable currentQuiz: Quiz;
    // TODO: It'd be neat if I could make this part of the quiz itself
    @observable quizState: QuestionState[] = [];
    @observable timeRemaining: number = 0;
    @observable startedQuiz = false;


    constructor(chosenQuiz: Quiz) {
        this.currentQuiz = chosenQuiz;
        this.quizState = chosenQuiz.questions.map(question => ({ ...defaultQuestionState }));
        this.timeRemaining = 8 * 60 * 1000;
    }

    //TODO: Three methods, all called score*, is a little confusing.
    scoreQuestion(questionIndex: number, questionState: QuestionState) {
        if (this.quizState[questionIndex].state === QuestionEnum.UNANSWERED) {
            this.quizState[questionIndex] = questionState;
        }
    }

    @computed get isComplete() {
        const allQsAnswered = this.quizState.every(question => question.state !== QuestionEnum.UNANSWERED);
        const outOfTime = this.timeRemaining <= 0;
        return allQsAnswered || outOfTime;
    }

    @computed get scorePoints() {
        return this.quizState.reduce((acc, cur) => acc + cur.score, 0);
    }

    //TODO: fix this to return a string or smth, "right / total"
    @computed get scorePercent() {
        const numCorrect = this.quizState.filter(question => question.state === QuestionEnum.CORRECTLY_ANSWERED);
        return numCorrect.length;
    }

    startQuiz = () => {
        this.startedQuiz = true;
        this.measure();
    }

    @action measure() {
        if (!this.startedQuiz) return;

        this.timeRemaining -= 50;

        if (this.isComplete) {
            alert(`Time's up. Final score is ${this.scorePoints}`);
            return;
        }
        setTimeout(() => this.measure(), 50);
    }

    @computed get display() {
        const tenMilliSeconds = parseInt((this.timeRemaining / 10).toString(), 10);

        const seconds = parseInt((tenMilliSeconds / 100).toString(), 10);
        const minutes = parseInt((seconds / 60).toString(), 10);
        // TODO: Get some good method for formatting this for display.
        return `${minutes} : ${seconds % 60} :  ${tenMilliSeconds % 100}`;
    }
} 