import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import Bewegungsrichtung from "@/types/enum/Bewegungsrichtung";

// Typdefinition für die Bewegungsrichtungen
type BewegungsrichtungMap = {
    [key in Bewegungsrichtung]: string;
};

// Typdefinition für einen Knotenarm
type Knotenarm = {
    [key in Himmelsrichtung]?: BewegungsrichtungMap; // Himmelsrichtungen sind optional
};

// Typdefinition für das gesamte directionObject
interface DirectionObject {
    [key: number]: Knotenarm; // Jeder Knotenarm hat nur einige Himmelsrichtungen
}

// Erstellen des verschachtelten Objekts als Konstante
export const arrowMappings: DirectionObject = {
    1: {
        [Himmelsrichtung.O]: {
            [Bewegungsrichtung.EIN]: '1RD',
            [Bewegungsrichtung.AUS]: '1RU',
        },
        [Himmelsrichtung.W]: {
            [Bewegungsrichtung.EIN]: '1LD',
            [Bewegungsrichtung.AUS]: '1LU',
        },
    },

    2: {
        [Himmelsrichtung.N]: {
            [Bewegungsrichtung.EIN]: '2LU',
            [Bewegungsrichtung.AUS]: '2LD',
        },
        [Himmelsrichtung.S]: {
            [Bewegungsrichtung.EIN]: '2RU',
            [Bewegungsrichtung.AUS]: '2RD',
        },
    },
    3: {
        [Himmelsrichtung.W]: {
            [Bewegungsrichtung.EIN]: '3RU',
            [Bewegungsrichtung.AUS]: '3RD',
        },
        [Himmelsrichtung.O]: {
            [Bewegungsrichtung.EIN]: '3LU',
            [Bewegungsrichtung.AUS]: '3LD'
        },
    },
    4: {
        [Himmelsrichtung.N]: {
            [Bewegungsrichtung.EIN]: '4RU',
            [Bewegungsrichtung.AUS]: '4RD',
        },
        [Himmelsrichtung.S]: {
            [Bewegungsrichtung.EIN]: '4LU',
            [Bewegungsrichtung.AUS]: '4LD'
        },
    },
    5: {
        [Himmelsrichtung.NW]: {
            [Bewegungsrichtung.EIN]: '5LU',
            [Bewegungsrichtung.AUS]: '5LD',
        },
        [Himmelsrichtung.SO]: {
            [Bewegungsrichtung.EIN]: '5RU',
            [Bewegungsrichtung.AUS]: '5RD'
        },
    },
    6: {
        [Himmelsrichtung.NO]: {
            [Bewegungsrichtung.EIN]: '6LU',
            [Bewegungsrichtung.AUS]: '6LD',
        },
        [Himmelsrichtung.SW]: {
            [Bewegungsrichtung.EIN]: '6RU',
            [Bewegungsrichtung.AUS]: '6RD'
        },
    },
    7: {
        [Himmelsrichtung.NW]: {
            [Bewegungsrichtung.EIN]: '7LU',
            [Bewegungsrichtung.AUS]: '7LD',
        },
        [Himmelsrichtung.SO]: {
            [Bewegungsrichtung.EIN]: '7RU',
            [Bewegungsrichtung.AUS]: '7RD'
        },
    },
    8: {
        [Himmelsrichtung.NO]: {
            [Bewegungsrichtung.EIN]: '8LU',
            [Bewegungsrichtung.AUS]: '8LD',
        },
        [Himmelsrichtung.SW]: {
            [Bewegungsrichtung.EIN]: '8RU',
            [Bewegungsrichtung.AUS]: '8RD'
        }
    },
};

export function getLaengsverkehr(arrow: string) {
    return {
        knotenarm: 1,
        richtung: Bewegungsrichtung.EIN,
        strassenseite: Himmelsrichtung.W
    }
}