import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // CRITICAL: The math won't style without this CSS

const ExamRenderer = ({ aiResponseString } : {aiResponseString : string}) => {
  return (
    <div className="exam-container">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {aiResponseString}
      </ReactMarkdown>
    </div>
  );
};

export default ExamRenderer;