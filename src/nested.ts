import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    const published: Question[] = questions.filter(
        (question: Question): boolean => question.published,
    );
    return published;
}

/**
 * Consumes an array of questions and returns a new array of only the questions  that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    const nonEmpty = questions.filter(
        (question: Question): boolean =>
            question.expected !== "" ||
            question.body !== "" ||
            question.options.length !== 0,
    );
    return nonEmpty;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    const search = questions.find(
        (question: Question): boolean => question.id === id,
    );
    if (typeof search === "undefined") {
        return null;
    } else {
        return search;
    }
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    const newList: Question[] = questions.filter(
        (questions: Question): boolean => !(questions.id === id),
    );
    return newList;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    const names: string[] = questions.map(
        (question: Question): string => question.name,
    );
    return names;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    const points: number = questions.reduce(
        (sum: number, question: Question) => sum + question.points,
        0,
    );
    return points;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    const published: Question[] = getPublishedQuestions(questions);
    const total: number = sumPoints(published);
    return total;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    let CSV: string = "id,name,options,points,published\n";
    let qStrings: string[] = [];
    let curr: string;
    for (let question of questions) {
        const { id, name, options, points, published } = question;
        curr =
            id +
            "," +
            name +
            "," +
            options.length +
            "," +
            points +
            "," +
            published;
        qStrings = [...qStrings, curr];
    }
    CSV = CSV + qStrings.join("\n");
    return CSV;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    let answers: Answer[] = [];
    for (let question of questions) {
        let answer: Answer = {
            questionId: question.id,
            text: "",
            submitted: false,
            correct: false,
        };
        answers = [...answers, answer];
    }
    return answers;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    let allPub: Question[] = [];
    for (let question of questions) {
        let newQ: Question = { ...question, published: true };
        allPub = [...allPub, newQ];
    }
    return allPub;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    if (questions.length === 0) {
        return true;
    }
    const { type } = questions[0];
    const same: boolean = questions.every(
        (question: Question): boolean => question.type === type,
    );
    return same;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    const newQ: Question = makeBlankQuestion(id, name, type);
    const newList: Question[] = [...questions, newQ];
    return newList;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    let renamed: Question[] = [];
    for (let question of questions) {
        if (question.id === targetId) {
            let newQ: Question = { ...question, name: newName };
            renamed = [...renamed, newQ];
        } else {
            renamed = [...renamed, question];
        }
    }
    return renamed;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    let newQs: Question[] = [];
    for (let question of questions) {
        newQs = [...newQs, question];
    }
    const index: number = questions.findIndex(
        (question: Question): boolean => question.id === targetId,
    );
    if (index < 0) {
        return newQs;
    }
    let newQ: Question = { ...questions[index] };
    if (newQ.type === "multiple_choice_question") {
        newQ.options = [];
    }
    newQ.type = newQuestionType;
    newQs.splice(index, 1, newQ);
    return newQs;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */

export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    let copyOfQuestions: Question[] = [];
    for (let question of questions) {
        // deep copy
        const copyOfOptions: string[] = [...question.options];
        let newQ: Question = { ...question, options: copyOfOptions };
        copyOfQuestions = [...copyOfQuestions, newQ];
    }
    const index: number = copyOfQuestions.findIndex(
        (question: Question): boolean => question.id === targetId,
    );
    if (targetOptionIndex < 0) {
        copyOfQuestions[index].options.push(newOption);
    } else {
        copyOfQuestions[index].options.splice(targetOptionIndex, 1, newOption);
    }
    return copyOfQuestions;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    let newQs: Question[] = [];
    for (let question of questions) {
        newQs = [...newQs, question];
    }
    const index: number = questions.findIndex(
        (question: Question): boolean => question.id === targetId,
    );
    if (index >= 0) {
        newQs.splice(index + 1, 0, duplicateQuestion(newId, questions[index]));
    }
    return newQs;
}