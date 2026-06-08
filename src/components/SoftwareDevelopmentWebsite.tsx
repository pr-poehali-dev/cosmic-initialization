import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Phone, MapPin, Mail, Wheat, ChevronDown, Star } from "lucide-react"

const menuItems = [
  { name: "Продукция", href: "#products" },
  { name: "О нас", href: "#about" },
  { name: "Качество", href: "#quality" },
  { name: "Контакты", href: "#contact" },
]

const products = [
  {
    name: "Хлеб пшеничный",
    description: "Классический белый хлеб из отборной пшеничной муки первого сорта. Пышный, с хрустящей корочкой.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop&q=90",
    badge: "Хит продаж",
  },
  {
    name: "Хлеб ржаной",
    description: "Тёмный ржаной хлеб по традиционному рецепту. Плотный мякиш, насыщенный вкус и долгий срок хранения.",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&h=400&fit=crop&q=90",
    badge: "Традиционный",
  },
  {
    name: "Батон нарезной",
    description: "Нежный батон с тонкой хрустящей корочкой. Идеален для бутербродов, тостов и завтрака.",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&h=400&fit=crop&q=90",
    badge: "Любимый",
  },
  {
    name: "Булочки сдобные",
    description: "Мягкие сдобные булочки из слоёного теста. Ароматные, воздушные — каждый день свежие с пекарни.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop&q=90",
    badge: "Свежие",
  },
  {
    name: "Пироги и пирожки",
    description: "Домашние пирожки с разнообразными начинками: капуста, яйцо, яблоко, мясо. По бабушкиным рецептам.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop&q=90",
    badge: "Домашний вкус",
  },
  {
    name: "Кондитерские изделия",
    description: "Торты, кексы, печенье и рулеты. Готовим из натуральных ингредиентов без искусственных добавок.",
    image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=400&fit=crop&q=90",
    badge: "Ручная работа",
  },
]

const stats = [
  { value: "1997", label: "год основания" },
  { value: "50+", label: "видов продукции" },
  { value: "200+", label: "партнёров-магазинов" },
  { value: "25 лет", label: "на рынке Ростова" },
]

export default function SoftwareDevelopmentWebsite() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#fdf8f0] text-[#2c1a0e]">

      {/* HEADER */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center">
                <Wheat className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-amber-900 leading-none">НовКолос</div>
                <div className="text-[10px] text-amber-700 tracking-widest uppercase">Пекарня · с 1997 года</div>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <a key={item.name} href={item.href} className="text-amber-900 hover:text-amber-600 font-medium transition-colors text-sm tracking-wide">
                  {item.name}
                </a>
              ))}
            </nav>

            <a href="#contact" className="hidden lg:inline-flex items-center gap-2 bg-amber-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-amber-800 transition-colors">
              <Phone className="w-4 h-4" />
              Позвонить
            </a>

            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-amber-900">
              <div className="w-6 h-0.5 bg-current mb-1.5" />
              <div className="w-6 h-0.5 bg-current mb-1.5" />
              <div className="w-6 h-0.5 bg-current" />
            </button>
          </div>

          {menuOpen && (
            <div className="lg:hidden bg-white border-t py-4 px-2">
              {menuItems.map((item) => (
                <a key={item.name} href={item.href} onClick={() => setMenuOpen(false)} className="block py-3 px-2 text-amber-900 font-medium border-b border-amber-50 last:border-0">
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=1600&h=900&fit=crop&q=90"
            alt="Свежий хлеб из пекарни НовКолос"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 bg-amber-700/90 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">
              <Star className="w-3 h-3" />
              Ростов-на-Дону · с 1997 года
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Хлеб,<br />
              <span className="text-amber-400">которому<br />доверяют</span>
            </h1>
            <p className="text-white/85 text-lg mb-8 leading-relaxed">
              ООО «Новый Колос» — ростовская пекарня с 25-летней историей. Поставляем свежую выпечку в магазины, кафе и рестораны города каждый день.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#products" className="bg-amber-600 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-amber-700 transition-colors">
                Смотреть продукцию
              </a>
              <a href="#contact" className="bg-white/15 backdrop-blur-sm text-white border border-white/30 px-8 py-3.5 rounded-full font-semibold text-base hover:bg-white/25 transition-colors">
                Стать партнёром
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-xs">прокрутите</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-amber-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-amber-300">{s.value}</div>
                <div className="text-amber-100/80 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-20 bg-[#fdf8f0]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-amber-700 text-sm font-semibold tracking-widest uppercase mb-3">Ассортимент</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-amber-900">Наша продукция</h2>
            <div className="w-16 h-1 bg-amber-600 mx-auto mt-4 rounded-full" />
            <p className="text-amber-800/70 mt-4 max-w-xl mx-auto">Производим более 50 наименований хлебобулочных и кондитерских изделий. Ежедневно — свежие, из натуральных ингредиентов.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-amber-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-amber-900 mb-2">{product.name}</h3>
                  <p className="text-amber-800/70 text-sm leading-relaxed">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-amber-300 text-sm font-semibold tracking-widest uppercase mb-3">О компании</p>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Печём с душой<br />
                <span className="text-amber-400">с 1997 года</span>
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                ООО «Новый Колос» основана в Ростове-на-Дону в 1997 году. За более чем 25 лет мы стали одной из самых узнаваемых пекарен города, снабжая свежей выпечкой сотни торговых точек.
              </p>
              <p className="text-white/80 leading-relaxed mb-8">
                Мы придерживаемся традиционных рецептов и используем только натуральные ингредиенты — без консервантов, усилителей вкуса и искусственных добавок. Каждый батон выходит из нашей пекарни тёплым и ароматным.
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 bg-amber-500 text-white px-7 py-3 rounded-full font-semibold hover:bg-amber-400 transition-colors">
                Связаться с нами
              </a>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1593339471078-eb4c66e0c7c0?w=600&h=700&fit=crop&q=90"
                alt="Пекарня НовКолос"
                className="rounded-2xl w-full object-cover h-[420px] shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-600 text-white rounded-2xl p-5 shadow-xl">
                <div className="text-4xl font-bold">25+</div>
                <div className="text-sm text-amber-100">лет в Ростове</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUALITY */}
      <section id="quality" className="py-20 bg-[#fdf8f0]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-amber-700 text-sm font-semibold tracking-widest uppercase mb-3">Наши принципы</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-amber-900">Почему выбирают НовКолос</h2>
            <div className="w-16 h-1 bg-amber-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌾",
                title: "Натуральные ингредиенты",
                text: "Только проверенное сырьё — мука, дрожжи, соль и вода. Никаких искусственных добавок и консервантов."
              },
              {
                icon: "🔥",
                title: "Свежее каждый день",
                text: "Производство работает круглосуточно. Выпечка поступает в торговые точки тёплой прямо из печи."
              },
              {
                icon: "🚚",
                title: "Надёжные поставки",
                text: "Работаем по договору с магазинами, кафе и ресторанами. Точно в срок, с полным пакетом документов."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-md text-center border border-amber-100 hover:border-amber-300 transition-colors"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">{item.title}</h3>
                <p className="text-amber-800/70 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-amber-700 text-sm font-semibold tracking-widest uppercase mb-3">Контакты</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-6">Свяжитесь с нами</h2>
              <p className="text-amber-800/70 text-lg mb-10">Если вы хотите стать нашим партнёром или сделать оптовый заказ — заполните форму, и мы перезвоним в течение рабочего дня.</p>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <div className="text-xs text-amber-700 uppercase tracking-wide mb-0.5">Телефон</div>
                    <div className="font-semibold text-amber-900 text-lg">+7 (863) 000-00-00</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <div className="text-xs text-amber-700 uppercase tracking-wide mb-0.5">Email</div>
                    <div className="font-semibold text-amber-900 text-lg">info@novkolos.ru</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <div className="text-xs text-amber-700 uppercase tracking-wide mb-0.5">Адрес</div>
                    <div className="font-semibold text-amber-900 text-lg">Ростов-на-Дону</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#fdf8f0] rounded-2xl p-8 border border-amber-100 shadow-sm">
              <h3 className="text-2xl font-bold text-amber-900 mb-6">Оставить заявку</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1.5">Ваше имя</label>
                  <input type="text" placeholder="Иван Петров" className="w-full border border-amber-200 rounded-xl px-4 py-3 text-amber-900 bg-white placeholder:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1.5">Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full border border-amber-200 rounded-xl px-4 py-3 text-amber-900 bg-white placeholder:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1.5">Сообщение</label>
                  <textarea rows={3} placeholder="Расскажите о вашем запросе..." className="w-full border border-amber-200 rounded-xl px-4 py-3 text-amber-900 bg-white placeholder:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none" />
                </div>
                <button className="w-full bg-amber-700 text-white py-3.5 rounded-xl font-semibold text-base hover:bg-amber-800 transition-colors">
                  Отправить заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-amber-950 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-600 rounded-full flex items-center justify-center">
                <Wheat className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg">НовКолос</div>
                <div className="text-amber-300/70 text-xs">ООО «Новый Колос»</div>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-amber-300/70">
              {menuItems.map((item) => (
                <a key={item.name} href={item.href} className="hover:text-amber-300 transition-colors">{item.name}</a>
              ))}
            </div>
            <p className="text-amber-300/50 text-sm">© {new Date().getFullYear()} ООО «Новый Колос»</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
