import React, { useState } from 'react';
import MarkdownEditor from './components/MarkdownEditor';
import { FileText } from 'lucide-react';

const initialMarkdown = `# Welcome to the Markdown Editor!

## Features
- Real-time preview
- GitHub Flavored Markdown support
- Copy to clipboard
- Download as .md file

### Try it out!
1. Write some **bold** text
2. Add some *italic* text
3. Create [links](https://example.com)

> This is a blockquote

\`\`\`javascript
// Add some code
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

Happy writing! ✨
`;

function App() {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Markdown Editor</h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border h-[calc(100vh-12rem)]">
          <MarkdownEditor 
            markdown={markdown} 
            onChange={setMarkdown} 
          />
        </div>
      </main>
    </div>
  );
}

export default App;