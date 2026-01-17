import { Trophy, Target, Zap, Award, Calendar, TrendingUp } from 'lucide-react';

export function Progress() {
  const achievements = [
    {
      name: 'First Steps',
      description: 'Complete your first vulnerability lab',
      icon: Target,
      earned: false,
      points: 50,
    },
    {
      name: 'SQL Master',
      description: 'Complete all SQL Injection labs',
      icon: Award,
      earned: false,
      points: 100,
    },
    {
      name: 'XSS Expert',
      description: 'Master Cross-Site Scripting vulnerabilities',
      icon: Award,
      earned: false,
      points: 100,
    },
    {
      name: 'Tool Enthusiast',
      description: 'Use all 6 security tools',
      icon: Zap,
      earned: false,
      points: 75,
    },
    {
      name: 'Week Streak',
      description: 'Practice for 7 consecutive days',
      icon: Calendar,
      earned: false,
      points: 150,
    },
    {
      name: 'Advanced Hacker',
      description: 'Complete all advanced labs',
      icon: Trophy,
      earned: false,
      points: 250,
    },
  ];

  const recentActivity = [
    {
      type: 'lab',
      name: 'SQL Injection Lab',
      date: 'Today',
      points: 100,
    },
    {
      type: 'tool',
      name: 'Used Nmap Scanner',
      date: 'Today',
      points: 10,
    },
    {
      type: 'lab',
      name: 'XSS Lab',
      date: 'Yesterday',
      points: 100,
    },
  ];

  const stats = [
    { label: 'Total Points', value: '210', icon: Trophy, color: 'text-yellow-600 bg-yellow-100' },
    { label: 'Labs Completed', value: '2/8', icon: Target, color: 'text-blue-600 bg-blue-100' },
    { label: 'Current Streak', value: '2 days', icon: Zap, color: 'text-orange-600 bg-orange-100' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
        <p className="text-gray-600 mt-2">Track your learning journey and achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Learning Progress</h2>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Beginner Level</span>
                <span className="text-sm font-semibold text-emerald-600">50%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Intermediate Level</span>
                <span className="text-sm font-semibold text-yellow-600">0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Advanced Level</span>
                <span className="text-sm font-semibold text-red-600">0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.name}</p>
                    <p className="text-sm text-gray-600">{activity.date}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                    +{activity.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
          <div className="space-y-3">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        achievement.earned ? 'bg-emerald-500' : 'bg-gray-400'
                      }`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{achievement.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{achievement.points} points</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Keep Going!</h2>
        <p className="text-emerald-50 mb-4">
          You're making great progress! Complete more labs to unlock achievements and climb the leaderboard.
        </p>
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="font-semibold">Next Goal: Complete 5 labs</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="font-semibold">3 more to go!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
