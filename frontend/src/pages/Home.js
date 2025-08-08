// Prototipo para visualização

import {
  Bell,
  Calendar,
  Clock,
  Gamepad2,
  Heart,
  Home,
  MessageCircle,
  Plus,
  Search,
  Settings,
  Share2,
  TrendingUp,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Import dados fake
import { feedPosts, userProfile } from "../data/mockData";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [activeNav, setActiveNav] = useState("home");

  const topGames = [
    {
      name: "Cyberpunk 2077",
      players: "2.1M",
      trend: "+15%",
      color: "from-yellow-500 to-red-500",
    },
    {
      name: "The Last of Us Part II",
      players: "1.8M",
      trend: "+8%",
      color: "from-green-500 to-teal-500",
    },
    {
      name: "Stardew Valley",
      players: "1.5M",
      trend: "+22%",
      color: "from-green-400 to-lime-500",
    },
    {
      name: "Elden Ring",
      players: "1.2M",
      trend: "+5%",
      color: "from-orange-500 to-yellow-500",
    },
  ];

  const recentGames = [
    {
      name: "Cyberpunk 2077",
      lastPlayed: "Hoje",
      hours: "45h",
      completion: 78,
    },
    { name: "OneShot", lastPlayed: "Ontem", hours: "12h", completion: 100 },
    {
      name: "The Coffin of Andy and Leyley",
      lastPlayed: "3 dias",
      hours: "8h",
      completion: 45,
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

  const FeedItem = ({ item }) => (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 mb-6 border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
          <User size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-white font-bold text-lg">{item.user}</span>
            <span className="text-purple-400 text-sm">{item.username}</span>
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            <span>{item.action}</span>
            <span className="mx-2 text-purple-400">•</span>
            <span className="text-cyan-400 font-semibold">{item.game}</span>
            <span className="ml-2 px-2 py-1 bg-slate-700 rounded-full text-xs text-gray-300">
              {item.genre}
            </span>
          </div>
        </div>
        <span className="text-gray-500 text-sm">{item.time}</span>
      </div>

      {item.rating && (
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-2xl ${
                i < item.rating
                  ? "text-yellow-400 drop-shadow-lg"
                  : "text-gray-600"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      )}

      <p className="text-gray-200 mb-4 leading-relaxed">{item.comment}</p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-all duration-200 hover:scale-110">
            <Heart size={18} />
            <span className="font-medium">{item.likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-all duration-200 hover:scale-110">
            <MessageCircle size={18} />
            <span className="font-medium">{item.comments}</span>
          </button>
          <button className="text-gray-400 hover:text-green-400 transition-all duration-200 hover:scale-110">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="flex">
        {/* Sidebar Navigation */}
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

            {/* User Profile Card */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl p-4 mb-6 border border-slate-600/50">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                  <span className="text-xl">{userProfile.avatar}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold">{userProfile.name}</h3>
                  <p className="text-purple-400 text-sm">
                    {userProfile.username}
                  </p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <div className="text-center">
                  <p className="text-white font-bold">
                    {userProfile.followers}
                  </p>
                  <p className="text-gray-400">Seguidores</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold">
                    {userProfile.following}
                  </p>
                  <p className="text-gray-400">Seguindo</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold">{userProfile.level}</p>
                  <p className="text-gray-400">Nível</p>
                </div>
              </div>
            </div>

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

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              {/* Central Feed */}
              <div className="col-span-8">
                {/* Tabs */}
                <div className="flex space-x-1 mb-6 bg-slate-800/50 rounded-2xl p-2 backdrop-blur-sm border border-slate-700/50">
                  <button
                    onClick={() => setActiveTab("feed")}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-200 ${
                      activeTab === "feed"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105"
                        : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    🚀 Feed Social
                  </button>
                  <button
                    onClick={() => setActiveTab("news")}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-200 ${
                      activeTab === "news"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105"
                        : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    📰 Notícias
                  </button>
                </div>

                {/* Feed Content */}
                {activeTab === "feed" && (
                  <div>
                    {/* Nova postagem */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 mb-6 border border-slate-700/50 shadow-xl">
                      <textarea
                        placeholder="O que você está jogando? Conte para seus amigos..."
                        className="w-full bg-slate-700/50 rounded-xl p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 border border-slate-600"
                        rows="3"
                      />
                      <div className="flex justify-between items-center mt-4">
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors">
                          <Gamepad2 size={20} />
                          <span>Adicionar jogo</span>
                        </button>
                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg">
                          Publicar
                        </button>
                      </div>
                    </div>

                    {/* Feed Items */}
                    {feedPosts.map((item) => (
                      <FeedItem key={item.id} item={item} />
                    ))}
                  </div>
                )}

                {activeTab === "news" && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 shadow-xl">
                      <h3 className="text-xl font-bold text-white mb-3">
                        🔥 Cyberpunk 2077: Expansão Phantom Liberty
                      </h3>
                      <p className="text-gray-300 mb-4">
                        Nova expansão traz melhorias massivas de performance,
                        novas missões com Keanu Reeves e um sistema de escolhas
                        completamente renovado para Night City.
                      </p>
                      <span className="text-sm text-purple-400 font-medium">
                        1h atrás • Gaming News
                      </span>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 shadow-xl">
                      <h3 className="text-xl font-bold text-white mb-3">
                        🎮 The Last of Us Part III Oficialmente Confirmado
                      </h3>
                      <p className="text-gray-300 mb-4">
                        Naughty Dog anuncia oficialmente a continuação da
                        aclamada série pós-apocalíptica com Ellie retornando
                        como protagonista principal.
                      </p>
                      <span className="text-sm text-purple-400 font-medium">
                        3h atrás • PlayStation
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="col-span-4 space-y-6">
                {/* Currently Playing */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 shadow-xl">
                  <h3 className="font-bold mb-4 flex items-center text-lg">
                    <Gamepad2 size={20} className="mr-2 text-purple-400" />
                    Jogando Agora
                  </h3>
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-4 text-center">
                    <p className="text-white font-bold text-lg">
                      Cyberpunk 2077
                    </p>
                    <p className="text-cyan-100 text-sm">45.2h jogadas</p>
                  </div>
                </div>

                {/* Trending Games */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 shadow-xl">
                  <h3 className="font-bold mb-4 flex items-center text-lg">
                    <TrendingUp size={20} className="mr-2 text-green-400" />
                    🔥 Trending
                  </h3>
                  <div className="space-y-4">
                    {topGames.map((game, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full bg-gradient-to-r ${game.color}`}
                          ></div>
                          <div>
                            <p className="text-white font-medium">
                              {game.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {game.players} jogadores
                            </p>
                          </div>
                        </div>
                        <span className="text-green-400 text-sm font-bold">
                          {game.trend}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Games */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 shadow-xl">
                  <h3 className="font-bold mb-4 flex items-center text-lg">
                    <Clock size={20} className="mr-2 text-yellow-400" />
                    Recentes
                  </h3>
                  <div className="space-y-4">
                    {recentGames.map((game, index) => (
                      <div
                        key={index}
                        className="p-3 bg-slate-700/30 rounded-xl"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-white font-medium">{game.name}</p>
                          <span className="text-purple-400 text-sm font-bold">
                            {game.hours}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">
                          {game.lastPlayed}
                        </p>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ width: `${game.completion}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {game.completion}% concluído
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
