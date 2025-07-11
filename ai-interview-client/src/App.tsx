import React, { useState } from 'react';

const App: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobDescription,
          resume
        })
      });

      const data = await response.json();
      setResult(data.questions || 'No questions returned');
    } catch (error) {
      console.error('Error:', error);
      setResult('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Interview Coach</h1>

      {/* Job Description */}
      <textarea
        className="w-full max-w-2xl h-40 p-4 mb-4 border border-gray-300 rounded"
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      {/* Resume */}
      <textarea
        className="w-full max-w-2xl h-40 p-4 mb-4 border border-gray-300 rounded"
        placeholder="Paste your resume here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Questions'}
      </button>

      {/* Result Display */}
      {result && (
        <div className="mt-6 w-full max-w-2xl bg-white p-4 rounded shadow whitespace-pre-wrap text-sm">
          {result}
        </div>
      )}
    </div>
  );
};

export default App;
