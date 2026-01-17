import { useState } from 'react';
import { CheckCircle, Circle, Lock, BookOpen } from 'lucide-react';
import { ModuleViewer } from './ModuleViewer';
import { moduleContentData } from '../data/moduleContent';

interface Module {
  id: string;
  name: string;
  completed: boolean;
  locked: boolean;
  description: string;
  duration: string;
}

interface LearningPathProps {
  onModuleStart?: (moduleName: string, level: string) => void;
}

export function LearningPath({ onModuleStart }: LearningPathProps) {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const paths = [
    {
      level: 'Beginner',
      color: 'green',
      modules: [
        {
          id: 'intro-web-security',
          name: 'Introduction to Web Security',
          completed: completedModules.includes('intro-web-security'),
          locked: false,
          description: 'Learn the fundamentals of web security and common attack vectors.',
          duration: '30 mins',
        },
        {
          id: 'sql-injection-basics',
          name: 'SQL Injection Basics',
          completed: completedModules.includes('sql-injection-basics'),
          locked: false,
          description: 'Understand how SQL injection attacks work and how to exploit them.',
          duration: '45 mins',
        },
        {
          id: 'xss-basics',
          name: 'Cross-Site Scripting (XSS)',
          completed: completedModules.includes('xss-basics'),
          locked: false,
          description: 'Learn about reflected, stored, and DOM-based XSS vulnerabilities.',
          duration: '40 mins',
        },
        {
          id: 'html-injection',
          name: 'HTML Injection',
          completed: completedModules.includes('html-injection'),
          locked: false,
          description: 'Discover how HTML markup can be injected to manipulate pages.',
          duration: '35 mins',
        },
        {
          id: 'basic-authentication',
          name: 'Authentication Security',
          completed: completedModules.includes('basic-authentication'),
          locked: false,
          description: 'Explore common authentication vulnerabilities and bypass techniques.',
          duration: '35 mins',
        },
      ],
    },
    {
      level: 'Intermediate',
      color: 'yellow',
      modules: [
        {
          id: 'csrf-attacks',
          name: 'CSRF Attacks',
          completed: completedModules.includes('csrf-attacks'),
          locked: completedModules.length < 3,
          description: 'Understand Cross-Site Request Forgery and token validation.',
          duration: '45 mins',
        },
        {
          id: 'broken-access-control',
          name: 'Broken Access Control',
          completed: completedModules.includes('broken-access-control'),
          locked: completedModules.length < 3,
          description: 'Learn about privilege escalation and IDOR vulnerabilities.',
          duration: '50 mins',
        },
      ],
    },
  ];

  const colorClasses = {
    green: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      gradient: 'from-green-500 to-green-600',
    },
    yellow: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      gradient: 'from-yellow-500 to-yellow-600',
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200',
      gradient: 'from-red-500 to-red-600',
    },
  };

  const handleModuleStart = (moduleId: string, levelName: string) => {
    setActiveModule(moduleId);
    onModuleStart?.(moduleId, levelName);
  };

  const handleModuleComplete = () => {
    if (activeModule && !completedModules.includes(activeModule)) {
      setCompletedModules([...completedModules, activeModule]);
    }
    setActiveModule(null);
  };

  const totalModules = paths.reduce((acc, path) => acc + path.modules.length, 0);
  const completedCount = completedModules.length;
  const overallProgress = (completedCount / totalModules) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Learning Path</h1>
        <p className="text-gray-600 mt-2">
          Follow a structured path to master cybersecurity concepts
        </p>
      </div>

      {activeModule && moduleContentData[activeModule] && (
        <ModuleViewer
          content={moduleContentData[activeModule]}
          onClose={() => setActiveModule(null)}
          onComplete={handleModuleComplete}
        />
      )}

      <div className="space-y-6">
        {paths.map((path, pathIndex) => {
          const colors = colorClasses[path.color as keyof typeof colorClasses];
          return (
            <div key={pathIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${colors.gradient}`}></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{path.level} Level</h2>
                  <span className={`px-4 py-2 rounded-full font-semibold ${colors.bg} ${colors.text}`}>
                    {path.modules.filter(m => completedModules.includes(m.id)).length}/{path.modules.length} Complete
                  </span>
                </div>

                <div className="space-y-3">
                  {path.modules.map((module, moduleIndex) => (
                    <div
                      key={moduleIndex}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        module.locked
                          ? 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                          : completedModules.includes(module.id)
                          ? `${colors.bg} ${colors.border}`
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => !module.locked && handleModuleStart(module.id, path.level)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          {module.locked ? (
                            <Lock className="h-5 w-5 text-gray-400 mt-1" />
                          ) : completedModules.includes(module.id) ? (
                            <CheckCircle className={`h-5 w-5 ${colors.text} mt-1`} />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400 mt-1" />
                          )}
                          <div className="flex-1">
                            <h3 className={`font-semibold ${module.locked ? 'text-gray-500' : 'text-gray-900'}`}>
                              {module.name}
                            </h3>
                            {!module.locked && (
                              <>
                                <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                                <p className="text-xs text-gray-500 mt-2">Duration: {module.duration}</p>
                              </>
                            )}
                            {module.locked && (
                              <p className="text-sm text-gray-500 mt-1">
                                Complete 3 beginner modules to unlock
                              </p>
                            )}
                          </div>
                        </div>
                        {!module.locked && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleModuleStart(module.id, path.level);
                            }}
                            className={`ml-4 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                              completedModules.includes(module.id)
                                ? `bg-gradient-to-r ${colors.gradient} text-white hover:shadow-lg`
                                : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}
                          >
                            {completedModules.includes(module.id) ? 'Review' : 'Start'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <BookOpen className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-2">Certification Path</h3>
            <p className="text-blue-800 text-sm mb-4">
              Complete all modules to unlock the CyberSec Academy certification and demonstrate your expertise.
            </p>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-blue-700 mt-2">
              {completedCount} of {totalModules} modules complete ({Math.round(overallProgress)}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
