function transform() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const functionPattern = /function\s+(\w+)\s*\(([^)]*)\)\s*\{/g;
    const transformedText = input.value.replace(functionPattern, (match, functionName, args) => {
        return `const ${functionName} = (${args}) => {`;
    });

    output.textContent = transformedText;
}
