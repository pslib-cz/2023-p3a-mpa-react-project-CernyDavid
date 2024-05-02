export function formatNumber(value: number): string {
    if (value >= 1_000_000_000_000_000_000_000_000_000_000_000) { // Decillion
      return (value / 1_000_000_000_000_000_000_000_000_000_000_000_000).toFixed(1) + 'Dc';
    } else if (value >= 1_000_000_000_000_000_000_000_000_000_000) { // Nonillion
      return (value / 1_000_000_000_000_000_000_000_000_000_000_000).toFixed(1) + 'N';
    } else if (value >= 1_000_000_000_000_000_000_000_000_000) { // Octillion
      return (value / 1_000_000_000_000_000_000_000_000_000).toFixed(1) + 'O';
    } else if (value >= 1_000_000_000_000_000_000_000_000) { // Septillion
      return (value / 1_000_000_000_000_000_000_000_000).toFixed(1) + 'Spt';
    } else if (value >= 1_000_000_000_000_000_000_000) { // Sextillion
      return (value / 1_000_000_000_000_000_000_000).toFixed(1) + 'Sex';
    } else if (value >= 1_000_000_000_000_000_000) { // Quintillion
      return (value / 1_000_000_000_000_000_000).toFixed(1) + 'Qn';
    } else if (value >= 1_000_000_000_000_000) { // Quadrillion
      return (value / 1_000_000_000_000_000).toFixed(1) + 'Qd';
    } else if (value >= 1_000_000_000_000) { // Trillion
      return (value / 1_000_000_000_000).toFixed(1) + 'T';
    } else if (value >= 1_000_000_000) { // Billion
      return (value / 1_000_000_000).toFixed(1) + 'B';
    } else if (value >= 1_000_000) { // Million
      return (value / 1_000_000).toFixed(1) + 'M';
    } else if (value >= 1_000) { // Thousand
      return (value / 1_000).toFixed(1) + 'K';
    } else {
      return value.toString();
    }
}

function formatNumbersInText(text : string | null) {
    const numberPattern = /\b\d+(\.\d+)?\b/g;
    if (!text) {
        return '';
    }
    return text.replace(numberPattern, (match) => {
    const number = parseFloat(match);
    return formatNumber(number);
    });
}

function applyNumberFormatting() {
    function traverseNodes(node : Node) {
    if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = formatNumbersInText(node.textContent);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(traverseNodes);
    }
    }

    traverseNodes(document.body);
}

export default applyNumberFormatting;