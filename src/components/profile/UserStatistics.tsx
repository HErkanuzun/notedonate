import React from 'react';
import { Clock, BookOpen, GraduationCap, Trophy, Heart, Download, Flame } from 'lucide-react';
import { UserStats } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface UserStatisticsProps {
  stats: UserStats;
  isDark: boolean;
}

function UserStatistics({ stats, isDark }: UserStatisticsProps) {
  const chartData = [
    { name: 'Notlar', value: stats.notesAdded },
    { name: 'Sınavlar', value: stats.examsCreated },
    { name: 'Tamamlanan', value: stats.examsCompleted }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl`}>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-blue-500" size={20} />
            <span className="font-medium">Aktif Süre</span>
          </div>
          <p className="text-2xl font-bold">
            {Math.floor(stats.activeTime / 60)}s {stats.activeTime % 60}d
          </p>
        </div>

        <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl`}>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="text-green-500" size={20} />
            <span className="font-medium">Notlar</span>
          </div>
          <p className="text-2xl font-bold">{stats.notesAdded}</p>
        </div>

        <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl`}>
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="text-purple-500" size={20} />
            <span className="font-medium">Sınavlar</span>
          </div>
          <p className="text-2xl font-bold">{stats.examsCreated}</p>
        </div>

        <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl`}>
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="text-yellow-500" size={20} />
            <span className="font-medium">Tamamlanan</span>
          </div>
          <p className="text-2xl font-bold">{stats.examsCompleted}</p>
        </div>
      </div>

      {/* Activity Chart */}
      <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl`}>
        <h3 className="font-medium mb-4">Aktivite Özeti</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke={isDark ? '#9CA3AF' : '#4B5563'} />
              <YAxis stroke={isDark ? '#9CA3AF' : '#4B5563'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  border: 'none',
                  borderRadius: '0.5rem'
                }}
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Stats */}
      <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl col-span-full`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Heart className="text-red-500" size={16} />
              <span className="text-sm">Toplam Beğeni</span>
            </div>
            <p className="text-xl font-bold">{stats.totalLikes}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Download className="text-blue-500" size={16} />
              <span className="text-sm">Toplam İndirme</span>
            </div>
            <p className="text-xl font-bold">{stats.totalDownloads}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="text-orange-500" size={16} />
              <span className="text-sm">Seri</span>
            </div>
            <p className="text-xl font-bold">{stats.streak} gün</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="text-green-500" size={16} />
              <span className="text-sm">Son Aktif</span>
            </div>
            <p className="text-sm">
              {formatDistanceToNow(new Date(stats.lastActive), {
                addSuffix: true,
                locale: tr
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStatistics;