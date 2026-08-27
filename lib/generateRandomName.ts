const NAMES = [
    "Alice",
    "Bob",
    "Carol",
    "Dave",
    "Erin",
    "Frank",
    "Grace",
    "Heidi",
    "Ivan",
    "Judy",
    "Mallory",
    "Niaj",
    "Olivia",
    "Peggy",
    "Sybil",
    "Trent",
    "Victor",
    "Walter",
    "Wendy",
    "Zara",
];

/**
 * Genera un nombre "aleatorio" a partir de un userId, pero siempre
 * devuelve el mismo nombre para el mismo userId (determinista),
 * usando el propio id como semilla en vez de Math.random().
 */
export function generateRandomName(seed: string): string {
    let hash = 0;

    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
        hash |= 0; // convertir a entero de 32 bits
    }

    const index = Math.abs(hash) % NAMES.length;
    return NAMES[index];
}
