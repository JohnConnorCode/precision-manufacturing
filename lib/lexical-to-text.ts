/**
 * Extract plain text from Lexical richtext content
 * Handles the {root: {children: [...]}} structure
 */
export function lexicalToText(lexical: any): string {
  if (!lexical || typeof lexical !== 'object') {
    return String(lexical || '');
  }

  // If it's already a string, return it
  if (typeof lexical === 'string') {
    return lexical;
  }

  // Handle Lexical structure
  if (lexical.root && lexical.root.children) {
    return extractTextFromChildren(lexical.root.children);
  }

  return '';
}

function extractTextFromChildren(children: any[]): string {
  if (!Array.isArray(children)) {
    return '';
  }

  return children.map(child => {
    // Text node
    if (child.text) {
      return child.text;
    }

    // Element node with children
    if (child.children) {
      return extractTextFromChildren(child.children);
    }

    return '';
  }).join(' ');
}
