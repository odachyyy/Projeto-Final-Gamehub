import {
  ArrowLeft,
  Eye,
  EyeOff,
  Gamepad2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  // Estados principais
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Estados do formulário
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });

  // Estados de erro
  const [errors, setErrors] = useState({});

  // Função para atualizar campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro quando user começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validação do formulário
  const validateForm = () => {
    const newErrors = {};

    // Validar email
    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Validar senha
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    // Validações específicas para cadastro
    if (!isLogin) {
      if (!formData.username) {
        newErrors.username = "Nome de usuário é obrigatório";
      } else if (formData.username.length < 3) {
        newErrors.username = "Nome deve ter pelo menos 3 caracteres";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirme sua senha";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Senhas não coincidem";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form enviado:", formData);
      alert(
        isLogin
          ? "Login realizado com sucesso!"
          : "Cadastro realizado com sucesso!"
      );

      // Aqui vai redirecionar para a página principal
      // navigate('/');
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao processar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Alternar entre login e cadastro
  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Componente do campo de input
  const InputField = ({
    name,
    type,
    placeholder,
    icon: Icon,
    value,
    error,
    showToggle = false,
    showValue = false,
    onToggle,
  }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
        {name === "confirmPassword" ? "Confirmar Senha" : name}
      </label>
      <div className="relative">
        <Icon
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type={showToggle ? (showValue ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full bg-slate-700/50 border rounded-2xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
            showToggle ? "pr-12" : ""
          } ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-600 focus:ring-purple-500"
          }`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {showValue ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header com Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <Gamepad2 size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            GameHub
          </h1>
          <p className="text-gray-400">
            {isLogin ? "Entre na sua conta" : "Crie sua conta gamer"}
          </p>
        </div>

        {/* Card do Formulário */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
          {/* Toggle entre Login/Cadastro */}
          <div className="flex bg-slate-700/30 rounded-2xl p-1 mb-8">
            <button
              onClick={() => isLogin || switchMode()}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-200 ${
                isLogin
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => !isLogin || switchMode()}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-200 ${
                !isLogin
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Cadastrar
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome de usuário (apenas no cadastro) */}
            {!isLogin && (
              <InputField
                name="username"
                type="text"
                placeholder="Seu nome gamer"
                icon={User}
                value={formData.username}
                error={errors.username}
              />
            )}

            {/* Email */}
            <InputField
              name="email"
              type="email"
              placeholder="seu@email.com"
              icon={Mail}
              value={formData.email}
              error={errors.email}
            />

            {/* Senha */}
            <InputField
              name="password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.password}
              error={errors.password}
              showToggle={true}
              showValue={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />

            {/* Confirmar senha (apenas no cadastro) */}
            {!isLogin && (
              <InputField
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={formData.confirmPassword}
                error={errors.confirmPassword}
                showToggle={true}
                showValue={showConfirmPassword}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}

            {/* Botão de Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processando...</span>
                </div>
              ) : isLogin ? (
                "🚀 Entrar"
              ) : (
                "✨ Criar Conta"
              )}
            </button>

            {/* Links adicionais */}
            <div className="text-center space-y-3">
              {isLogin && (
                <button
                  type="button"
                  className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
                >
                  Esqueceu a senha?
                </button>
              )}

              <div className="pt-4 border-t border-slate-700">
                <Link
                  to="/"
                  className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                >
                  <ArrowLeft size={16} />
                  <span>Voltar ao início</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
