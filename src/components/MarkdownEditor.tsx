import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileEdit, Eye, Copy, Download } from 'lucide-react';

interface MarkdownEditorProps {
  markdown: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ markdown, onChange }: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex space-x-2">
          <button
            onClick={() => setIsPreview(false)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              !isPreview ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
            }`}
          >
            <FileEdit size={18} /> Edit
          </button>
          <button
            onClick={() => setIsPreview(true)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              isPreview ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
            }`}
          >
            <Eye size={18} /> Preview
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
          >
            <Copy size={18} /> Copy
          </button>
          <button
            onClick={downloadMarkdown}
            className="px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
          >
            <Download size={18} /> Download
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {!isPreview ? (
          <textarea
            value={markdown}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 p-4 resize-none focus:outline-none font-mono text-gray-800"
            placeholder="Write your Markdown here..."
          />
        ) : (
          <div className="flex-1 p-8 overflow-auto bg-white">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              className="prose max-w-none"
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold mb-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-4" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-4" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-4" {...props} />,
                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
                ),
                code: ({node, inline, ...props}) => 
                  inline ? (
                    <code className="bg-gray-100 rounded px-1" {...props} />
                  ) : (
                    <code className="block bg-gray-100 p-4 rounded-lg my-4" {...props} />
                  ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}