import { useState } from 'react';
import { X, BookOpen, CheckCircle, ArrowRight, Award } from 'lucide-react';
import { ModuleContent } from '../data/moduleContent';

interface ModuleViewerProps {
  content: ModuleContent;
  onClose: () => void;
  onComplete: () => void;
}

export function ModuleViewer({ content, onClose, onComplete }: ModuleViewerProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const handleSectionComplete = () => {
    if (!completedSections.includes(currentSection)) {
      setCompletedSections([...completedSections, currentSection]);
    }
    if (currentSection < content.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else if (content.quiz) {
      setCurrentSection(content.sections.length);
    }
  };

  const handleQuizSubmit = () => {
    setShowQuizResults(true);
    const allCorrect = content.quiz?.every((q, idx) => quizAnswers[idx] === q.correctAnswer);
    if (allCorrect) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const progress = ((completedSections.length / content.sections.length) * 100);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6" />
                <div>
                  <h2 className="text-2xl font-bold">{content.title}</h2>
                  <p className="text-emerald-50 text-sm mt-1">
                    {content.level.toUpperCase()} • {content.duration}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4">
              <div className="w-full bg-emerald-700 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-emerald-50 text-sm mt-2">{Math.round(progress)}% Complete</p>
            </div>
          </div>

          <div className="p-8 max-h-[70vh] overflow-y-auto">
            {currentSection < content.sections.length ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {content.sections[currentSection].heading}
                  </h3>
                  <div className="space-y-4">
                    {content.sections[currentSection].content.map((paragraph, idx) => (
                      <p key={idx} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {content.sections[currentSection].examples && (
                  <div className="bg-gray-900 rounded-lg p-6">
                    <h4 className="text-emerald-400 font-semibold mb-3">Examples:</h4>
                    <div className="space-y-2">
                      {content.sections[currentSection].examples!.map((example, idx) => (
                        <p key={idx} className="text-gray-300 font-mono text-sm">
                          {example}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {content.sections[currentSection].tips && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="text-blue-900 font-semibold mb-3">Key Tips:</h4>
                    <ul className="space-y-2">
                      {content.sections[currentSection].tips!.map((tip, idx) => (
                        <li key={idx} className="text-blue-800 flex items-start">
                          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : content.quiz && currentSection === content.sections.length ? (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Knowledge Check</h3>
                {content.quiz.map((question, qIdx) => (
                  <div key={qIdx} className="bg-gray-50 rounded-lg p-6">
                    <p className="font-semibold text-gray-900 mb-4">
                      {qIdx + 1}. {question.question}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((option, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => setQuizAnswers({ ...quizAnswers, [qIdx]: oIdx })}
                          disabled={showQuizResults}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            showQuizResults
                              ? oIdx === question.correctAnswer
                                ? 'border-green-500 bg-green-50'
                                : quizAnswers[qIdx] === oIdx
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-white'
                              : quizAnswers[qIdx] === oIdx
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 bg-white hover:border-emerald-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {!showQuizResults && (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length !== content.quiz.length}
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 transition-colors font-semibold"
                  >
                    Submit Quiz
                  </button>
                )}

                {showQuizResults && (
                  <div
                    className={`p-6 rounded-lg ${
                      content.quiz.every((q, idx) => quizAnswers[idx] === q.correctAnswer)
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-yellow-50 border border-yellow-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Award className="h-8 w-8 text-emerald-600" />
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {content.quiz.every((q, idx) => quizAnswers[idx] === q.correctAnswer)
                            ? 'Perfect! Module Completed!'
                            : 'Quiz Complete'}
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Score: {content.quiz.filter((q, idx) => quizAnswers[idx] === q.correctAnswer).length} /{' '}
                          {content.quiz.length}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <div className="border-t border-gray-200 p-6 flex items-center justify-between bg-gray-50 rounded-b-xl">
            <div className="text-sm text-gray-600">
              Section {Math.min(currentSection + 1, content.sections.length)} of {content.sections.length}
            </div>
            <div className="flex space-x-3">
              {currentSection > 0 && (
                <button
                  onClick={() => setCurrentSection(currentSection - 1)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Previous
                </button>
              )}
              {currentSection < content.sections.length && (
                <button
                  onClick={handleSectionComplete}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                >
                  <span>{currentSection === content.sections.length - 1 ? 'Take Quiz' : 'Next'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
              {content.labLink && currentSection >= content.sections.length - 1 && (
                <button
                  onClick={() => {
                    onClose();
                    window.dispatchEvent(new CustomEvent('openLab', { detail: content.labLink }));
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Lab
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
