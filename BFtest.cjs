const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+[]{}|;:,.<>?';

function generateCombinations(length) {
    const combinations = [];
    const maxCombinations = Math.pow(chars.length, length);

    for (let i = 0; i < maxCombinations; i++) {
        let combination = '';
        let num = i;

        for (let j = 0; j < length; j++) {
            combination = chars[num % chars.length] + combination;
            num = Math.floor(num / chars.length);
        }

        console.log('Generated combination:', combination);
        combinations.push(combination);
    }

    return combinations;
}

for (let length = 1; length <= 9; length++) {
    console.log(`\nCombination length: ${length}`);
    const generatedCombinations = generateCombinations(length);

    console.log(`Total combinations generated (length ${length}):`, generatedCombinations.length);
}
