import { LEVELS } from "./levels.enum";

export class TaskClass {
    id = 0;
    name = '';
    description = '';
    // creationDate = new Date();
    level = LEVELS.NORMAL;

    constructor(id, name, description, level) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.level = level;
    };
};

