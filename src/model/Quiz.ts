import { Question } from "./Question";
/**
 * Overarching type for a quiz.
 * @field prompt: string A prompt for each question, used if there is no overruling one in the individual question
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
        clues: ["Ernest Hemingway’s Grave",
            "The Smurf Turf",
            "The Yellowstone Zone of Death",
            "The <State> Potato Museum"
        ],
        answer: "Idaho"
    },
    {
        clues: ["Weeki Wachee, the city of mermaids",
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
        clues: ["Slocum Mechanical Puzzle Collection",
            'Mentone Egg, A giant concrete egg marks this town as the "Egg Basket of the Midwest."',
            "Kokomantis",
            "Hoosier Hill"
        ],
        answer: "Indiana",
        revealOnAnswer: "https://www.atlasobscura.com/places/slocum-mechanical-puzzle-collection  https://www.atlasobscura.com/places/mentone-egg  https://www.atlasobscura.com/places/kokomantis-scrap-art-sculpture https://www.atlasobscura.com/places/hoosier-hill"
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