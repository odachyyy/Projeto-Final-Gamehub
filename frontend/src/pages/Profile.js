import {
  Award,
  Bell,
  Calendar,
  Clock,
  Edit3,
  Home,
  MapPin,
  Monitor,
  Plus,
  Search,
  Settings,
  Share2,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Import dados fake
import { userProfile } from "../data/mockData";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeNav, setActiveNav] = useState("profile");

  // Dados expandidos do perfil
  const expandedProfile = {
    ...userProfile,
    totalHours: 2847,
    completedGames: 89,
    achievements: 342,
    currentStreak: 15,
    location: "São Paulo, BR",
    joinDate: "Março 2021",
    steamConnected: true,
    favoriteGenres: ["RPG", "Indie", "Action", "Horror"],
  };

  // Dados dos jogos recentes
  const recentGames = [
    {
      name: "Cyberpunk 2077",
      hours: 45.2,
      lastPlayed: "Hoje",
      completion: 78,
      screenshot: "🌃",
      achievement: "Completou 'The Heist'",
    },
    {
      name: "OneShot",
      hours: 12.0,
      lastPlayed: "2 dias atrás",
      completion: 100,
      screenshot: "💡",
      achievement: "True Ending Achieved",
    },
    {
      name: "The Coffin of Andy and Leyley",
      hours: 8.5,
      lastPlayed: "1 semana atrás",
      completion: 45,
      screenshot: "🏠",
      achievement: "Chapter 2 Complete",
    },
  ];

  // Top jogos favoritos
  const topGames = [
    {
      name: "The Last of Us Part 1",
      hours: 234,
      rating: 5,
      status: "Platinado",
    },
    { name: "Cyberpunk 2077", hours: 156, rating: 4, status: "Jogando" },
    { name: "OneShot", hours: 87, rating: 5, status: "Completado" },
    { name: "Stardew Valley", hours: 145, rating: 4, status: "Pausado" },
  ];

  // Conquistas recentes
  const achievements = [
    {
      name: "Completionist",
      description: "Complete 50 jogos",
      icon: "🏆",
      rarity: "Épico",
      date: "15 Nov 2024",
    },
    {
      name: "Speed Runner",
      description: "Complete um jogo em menos de 4h",
      icon: "⚡",
      rarity: "Raro",
      date: "3 Nov 2024",
    },
    {
      name: "Social Butterfly",
      description: "Tenha 1000+ seguidores",
      icon: "🦋",
      rarity: "Raro",
      date: "28 Out 2024",
    },
    {
      name: "Night Owl",
      description: "Jogue por 6h seguidas após meia-noite",
      icon: "🦉",
      rarity: "Comum",
      date: "20 Out 2024",
    },
  ];

  // Estatísticas principais
  const stats = [
    {
      label: "Total de Horas",
      value: expandedProfile.totalHours.toLocaleString(),
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Jogos Completados",
      value: expandedProfile.completedGames,
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
    },
    {
      label: "Conquistas",
      value: expandedProfile.achievements,
      icon: Award,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Streak Atual",
      value: `${expandedProfile.currentStreak} dias`,
      icon: Zap,
      color: "from-green-500 to-teal-500",
    },
  ];

  const navItems = [
    { id: "home", icon: Home, label: "Início", path: "/" },
    { id: "profile", icon: Users, label: "Perfil", path: "/profile" },
    {
      id: "achievements",
      icon: Trophy,
      label: "Conquistas",
      path: "/achievements",
    },
    { id: "calendar", icon: Calendar, label: "Eventos", path: "/calendar" },
  ];

  // Componente de Estatística
  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            <p className="text-white text-2xl font-bold">{stat.value}</p>
          </div>
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}
          >
            <Icon size={24} className="text-white" />
          </div>
        </div>
      </div>
    );
  };

  // Componente de Jogo
  const GameCard = ({ game }) => (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white font-semibold">{game.name}</h4>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            game.status === "Platinado"
              ? "bg-yellow-500/20 text-yellow-400"
              : game.status === "Completado"
              ? "bg-green-500/20 text-green-400"
              : game.status === "Jogando"
              ? "bg-blue-500/20 text-blue-400"
              : "bg-gray-500/20 text-gray-400"
          }`}
        >
          {game.status}
        </span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400 text-sm">{game.hours}h jogadas</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`${
                i < game.rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Componente de Conquista
  const AchievementCard = ({ achievement }) => (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 border border-slate-700/50 shadow-xl">
      <div className="flex items-center space-x-3 mb-2">
        <span className="text-2xl">{achievement.icon}</span>
        <div className="flex-1">
          <h4 className="text-white font-semibold">{achievement.name}</h4>
          <p className="text-gray-400 text-sm">{achievement.description}</p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            achievement.rarity === "Épico"
              ? "bg-purple-500/20 text-purple-400"
              : achievement.rarity === "Raro"
              ? "bg-blue-500/20 text-blue-400"
              : "bg-gray-500/20 text-gray-400"
          }`}
        >
          {achievement.rarity}
        </span>
      </div>
      <p className="text-gray-500 text-xs">{achievement.date}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="flex">
        {/* Sidebar Navigation - Igual às outras páginas */}
        <div className="w-80 bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700/50 shadow-2xl min-h-screen">
          <div className="p-6">
            {/* Logo */}
            <div className="mb-8">
              <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                GameHub
              </h1>
              <p className="text-gray-400 text-sm font-medium">
                Conecte. Jogue. Compartilhe.
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-8">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar jogos, amigos..."
                className="w-full bg-slate-700/50 border border-slate-600 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Navigation */}
            <nav className="mb-8">
              <div className="space-y-2">
                {navItems.map(({ id, icon: Icon, label, path }) => (
                  <Link
                    key={id}
                    to={path}
                    onClick={() => setActiveNav(id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      activeNav === id
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105"
                        : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg">
                <Plus size={16} />
                <span>Nova Postagem</span>
              </button>
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center p-2 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors">
                  <Bell size={16} />
                </button>
                <button className="flex-1 flex items-center justify-center p-2 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors">
                  <Settings size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Profile */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-3xl p-8 mb-8 border border-slate-600/50 shadow-2xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                      <span className="text-4xl">{expandedProfile.avatar}</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-800 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold text-white">
                        {expandedProfile.name}
                      </h1>
                      <span className="text-purple-400 text-lg">
                        {expandedProfile.username}
                      </span>
                      {expandedProfile.steamConnected && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-blue-600/20 rounded-full">
                          <Monitor size={14} className="text-blue-400" />
                          <span className="text-blue-400 text-xs font-medium">
                            Steam
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-300 mb-3 max-w-md">
                      {expandedProfile.bio}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{expandedProfile.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>Membro desde {expandedProfile.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors">
                    <Edit3 size={16} />
                    <span>Editar Perfil</span>
                  </button>
                  <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Profile Stats */}
              <div className="flex items-center space-x-8 mt-6 pt-6 border-t border-slate-600">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {expandedProfile.followers.toLocaleString()}
                  </p>
                  <p className="text-gray-400 text-sm">Seguidores</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {expandedProfile.following}
                  </p>
                  <p className="text-gray-400 text-sm">Seguindo</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">
                    {expandedProfile.level}
                  </p>
                  <p className="text-gray-400 text-sm">Nível</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {expandedProfile.totalGames}
                  </p>
                  <p className="text-gray-400 text-sm">Jogos</p>
                </div>
              </div>
            </div>

            {/* Profile Tabs */}
            <div className="flex space-x-1 mb-8 bg-slate-800/50 rounded-2xl p-2 backdrop-blur-sm border border-slate-700/50">
              {["overview", "games", "achievements", "activity"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-200 capitalize ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105"
                      : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  {tab === "overview"
                    ? "📊 Visão Geral"
                    : tab === "games"
                    ? "🎮 Jogos"
                    : tab === "achievements"
                    ? "🏆 Conquistas"
                    : "📈 Atividade"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <StatCard key={index} stat={stat} />
                  ))}
                </div>

                {/* Recent Activity & Top Games */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Clock size={20} className="mr-2 text-blue-400" />
                      Atividade Recente
                    </h3>
                    <div className="space-y-4">
                      {recentGames.map((game, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 border border-slate-700/50 shadow-xl"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="text-3xl">{game.screenshot}</div>
                            <div className="flex-1">
                              <h4 className="text-white font-semibold">
                                {game.name}
                              </h4>
                              <p className="text-purple-400 text-sm">
                                {game.achievement}
                              </p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                                <span>{game.hours}h jogadas</span>
                                <span>{game.lastPlayed}</span>
                                <span>{game.completion}% completo</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Star size={20} className="mr-2 text-yellow-400" />
                      Top Jogos
                    </h3>
                    <div className="space-y-4">
                      {topGames.map((game, index) => (
                        <GameCard key={index} game={game} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "achievements" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    Conquistas Recentes
                  </h3>
                  <span className="text-gray-400">
                    {achievements.length} de 500+ conquistas
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <AchievementCard key={index} achievement={achievement} />
                  ))}
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {(activeTab === "games" || activeTab === "activity") && (
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-12 border border-slate-700/50 shadow-xl text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {activeTab === "games"
                    ? "🎮 Biblioteca de Jogos"
                    : "📈 Histórico de Atividade"}
                </h3>
                <p className="text-gray-400">
                  {activeTab === "games"
                    ? "Aqui ficaria a biblioteca completa com filtros, busca e organização por categorias."
                    : "Gráficos e estatísticas detalhadas da atividade de gaming ao longo do tempo."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
