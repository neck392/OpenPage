// 조합에 사용할 문자 집합
const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+[]{}|;:,.<>?';

// 조합을 생성하는 함수
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

        console.log('생성된 조합:', combination); // 생성된 조합 출력
        combinations.push(combination);
    }

    return combinations;
}

// 1부터 9까지의 길이로 조합 생성
for (let length = 1; length <= 9; length++) {
    console.log(`\n조합 길이: ${length}`);
    const generatedCombinations = generateCombinations(length);

    // 선택적으로 각 길이별 생성된 조합 수 출력
    console.log(`총 생성된 조합 수 (길이 ${length}):`, generatedCombinations.length);
}
