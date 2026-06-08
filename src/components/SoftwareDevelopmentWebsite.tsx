import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, MapPin, Mail, ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react"

// ─── ТИПЫ ───────────────────────────────────────────────────────────────────
interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

interface CartItem extends Product {
  qty: number
}

// ─── ДАННЫЕ ─────────────────────────────────────────────────────────────────
const menuItems = [
  { name: "Главная", href: "#home" },
  { name: "О нас", href: "#about" },
  { name: "Каталог продукции", href: "#catalog" },
  { name: "Вакансии", href: "#jobs" },
  { name: "Контакты", href: "#contact" },
]

const categories = ["Все", "Сдобная продукция", "Хлебная продукция", "Слоёная продукция", "Пирожки", "Печенье", "Торты, пирожные"]

const products: Product[] = [
  { id: 1, name: "Хлеб пшеничный", price: 42, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop&q=85", category: "Хлебная продукция" },
  { id: 2, name: "Хлеб ржаной", price: 38, image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=200&fit=crop&q=85", category: "Хлебная продукция" },
  { id: 3, name: "Батон нарезной", price: 35, image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&h=200&fit=crop&q=85", category: "Хлебная продукция" },
  { id: 4, name: "Булочка с маком", price: 18, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=200&fit=crop&q=85", category: "Сдобная продукция" },
  { id: 5, name: "Булочка с повидлом", price: 18, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=200&fit=crop&q=85", category: "Сдобная продукция" },
  { id: 6, name: "Рогалик сдобный", price: 16, image: "https://images.unsplash.com/photo-1568471173242-461f0a730452?w=300&h=200&fit=crop&q=85", category: "Сдобная продукция" },
  { id: 7, name: "Слойка с творогом", price: 24, image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=300&h=200&fit=crop&q=85", category: "Слоёная продукция" },
  { id: 8, name: "Пирожок с яблоком", price: 20, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=200&fit=crop&q=85", category: "Пирожки" },
  { id: 9, name: "Пирожок с капустой", price: 20, image: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=300&h=200&fit=crop&q=85", category: "Пирожки" },
  { id: 10, name: "Печенье «Домашнее»", price: 120, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop&q=85", category: "Печенье" },
  { id: 11, name: "Торт «Прага»", price: 680, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop&q=85", category: "Торты, пирожные" },
  { id: 12, name: "Пирожное «Эклер»", price: 55, image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=300&h=200&fit=crop&q=85", category: "Торты, пирожные" },
]

// ─── КОРЗИНА ────────────────────────────────────────────────────────────────
function CartPanel({ cart, onClose, onAdd, onRemove, onDelete }: {
  cart: CartItem[]
  onClose: () => void
  onAdd: (id: number) => void
  onRemove: (id: number) => void
  onDelete: (id: number) => void
}) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="relative w-full max-w-sm bg-[#fdf6ec] h-full shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between px-5 py-4 bg-[#3d2108] text-white">
          <span className="font-bold text-lg">Корзина</span>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {cart.length === 0 && (
            <p className="text-center text-[#7a5c3a] mt-10 text-sm">Корзина пуста</p>
          )}
          {cart.map(item => (
            <div key={item.id} className="flex gap-3 bg-white rounded-xl p-3 shadow-sm">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#3d2108] truncate">{item.name}</p>
                <p className="text-xs text-[#c0392b] font-bold mt-0.5">{item.price} ₽</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => onRemove(item.id)} className="w-6 h-6 rounded-full bg-[#f0e6d6] flex items-center justify-center hover:bg-[#e8d5be]">
                    <Minus className="w-3 h-3 text-[#3d2108]" />
                  </button>
                  <span className="text-sm font-bold text-[#3d2108] w-4 text-center">{item.qty}</span>
                  <button onClick={() => onAdd(item.id)} className="w-6 h-6 rounded-full bg-[#c0392b] flex items-center justify-center hover:bg-[#a93226]">
                    <Plus className="w-3 h-3 text-white" />
                  </button>
                  <button onClick={() => onDelete(item.id)} className="ml-auto text-[#bbb] hover:text-[#c0392b]">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="px-4 py-4 border-t border-[#e8d5be]">
            <div className="flex justify-between mb-3">
              <span className="text-[#3d2108] font-semibold">Итого:</span>
              <span className="text-[#c0392b] font-bold text-lg">{total} ₽</span>
            </div>
            <button className="w-full bg-[#c0392b] text-white py-3 rounded-full font-bold hover:bg-[#a93226] transition-colors">
              Оформить заказ
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

// ─── МИНИ-ИГРА «ПОЙМАЙ ХЛЕБУШЕК» ────────────────────────────────────────────
function BreadGame({ onClose }: { onClose: () => void }) {
  const [basket, setBasket] = React.useState(50)
  const [breads, setBreads] = React.useState<{ id: number; x: number; y: number }[]>([])
  const [score, setScore] = React.useState(0)
  const [lives, setLives] = React.useState(3)
  const [running, setRunning] = React.useState(true)
  const nextId = React.useRef(0)
  const gameRef = React.useRef<HTMLDivElement>(null)

  // Спавн хлеба
  React.useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setBreads(b => [...b, { id: nextId.current++, x: Math.random() * 80 + 5, y: 0 }])
    }, 1200)
    return () => clearInterval(interval)
  }, [running])

  // Падение хлеба
  React.useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setBreads(prev => {
        const updated: typeof prev = []
        let missed = 0
        for (const b of prev) {
          const newY = b.y + 3
          if (newY >= 85) {
            const caught = Math.abs(b.x - basket) < 12
            if (caught) setScore(s => s + 1)
            else missed++
          } else {
            updated.push({ ...b, y: newY })
          }
        }
        if (missed > 0) setLives(l => l - missed)
        return updated
      })
    }, 50)
    return () => clearInterval(interval)
  }, [running, basket])

  React.useEffect(() => {
    if (lives <= 0) setRunning(false)
  }, [lives])

  // Управление мышью/пальцем
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!gameRef.current) return
    const rect = gameRef.current.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const pct = ((clientX - rect.left) / rect.width) * 100
    setBasket(Math.max(8, Math.min(92, pct)))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#fdf6ec] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 bg-[#3d2108] text-white">
          <span className="font-bold">🍞 Поймай хлебушек!</span>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <div className="flex justify-between px-5 py-2 bg-[#f0e6d6] text-sm">
          <span className="text-[#3d2108] font-semibold">Счёт: <b className="text-[#c0392b]">{score}</b></span>
          <span className="text-[#3d2108] font-semibold">Жизни: {"❤️".repeat(Math.max(0, lives))}</span>
        </div>
        <div
          ref={gameRef}
          className="relative bg-[#fff9f0] overflow-hidden cursor-none select-none"
          style={{ height: 320 }}
          onMouseMove={handleMove}
          onTouchMove={handleMove}
        >
          {/* фон-полоски */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(0deg, #c0392b 0px, #c0392b 1px, transparent 1px, transparent 40px)" }} />

          {!running && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 gap-3">
              <p className="text-3xl">🍞</p>
              <p className="text-xl font-bold text-[#3d2108]">Игра окончена!</p>
              <p className="text-[#c0392b] font-semibold">Поймано: {score} хлебушков</p>
              <button
                onClick={() => { setScore(0); setLives(3); setBreads([]); setRunning(true) }}
                className="bg-[#c0392b] text-white px-6 py-2 rounded-full font-bold hover:bg-[#a93226]"
              >
                Ещё раз
              </button>
            </div>
          )}

          {/* хлебушки */}
          {breads.map(b => (
            <div
              key={b.id}
              className="absolute text-2xl transition-none"
              style={{ left: `${b.x}%`, top: `${b.y}%`, transform: "translate(-50%, -50%)" }}
            >
              🍞
            </div>
          ))}

          {/* корзина */}
          <div
            className="absolute bottom-2 text-3xl transition-none"
            style={{ left: `${basket}%`, transform: "translateX(-50%)" }}
          >
            🧺
          </div>
        </div>
        <p className="text-center text-xs text-[#7a5c3a] py-2">Двигай мышью или пальцем чтобы ловить хлеб</p>
      </div>
    </div>
  )
}

// ─── ГЛАВНЫЙ КОМПОНЕНТ ───────────────────────────────────────────────────────
export default function SoftwareDevelopmentWebsite() {
  const [cart, setCart] = React.useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = React.useState(false)
  const [gameOpen, setGameOpen] = React.useState(false)
  const [activeCategory, setActiveCategory] = React.useState("Все")
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileMenu, setMobileMenu] = React.useState(false)

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id)
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
  }

  const addQty = (id: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i))
  }

  const deleteFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)

  const filtered = activeCategory === "Все" ? products : products.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen font-sans" style={{ background: "#f5ede0", color: "#2c1a0e" }}>

      {/* ── HEADER ── */}
      <header style={{ background: "#3d2108" }} className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${scrolled ? "shadow-lg" : ""}`}>
        {/* Логотип-строка */}
        <div className="flex items-center justify-between max-w-6xl mx-auto px-4 py-2">
          <a href="#home" className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#c0392b] flex-shrink-0 bg-[#5a3010] flex items-center justify-center">
              <span className="text-3xl">🌾</span>
            </div>
            <div>
              <div className="text-white font-bold text-xl leading-tight">Новый Колос</div>
              <div className="text-[#d4a96a] text-[10px] tracking-widest uppercase">Пекарня · Ростов-на-Дону</div>
            </div>
          </a>

          <div className="flex items-center gap-3">
            {/* Корзина */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-1.5 bg-[#c0392b] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#a93226] transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Корзина
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#f39c12] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            {/* Бургер */}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden text-white p-1">
              <div className="w-6 h-0.5 bg-white mb-1" />
              <div className="w-6 h-0.5 bg-white mb-1" />
              <div className="w-6 h-0.5 bg-white" />
            </button>
          </div>
        </div>

        {/* Навигация */}
        <nav style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} className="hidden lg:block">
          <ul className="flex justify-center gap-0 max-w-6xl mx-auto">
            {menuItems.map(item => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="block px-5 py-2.5 text-sm text-white/80 hover:text-white hover:bg-[#c0392b] transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Мобильное меню */}
        {mobileMenu && (
          <div className="lg:hidden border-t border-white/10">
            {menuItems.map(item => (
              <a key={item.name} href={item.href} onClick={() => setMobileMenu(false)}
                className="block px-5 py-3 text-sm text-white/80 hover:bg-[#c0392b] hover:text-white">
                {item.name}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="home" className="relative pt-24 lg:pt-28">
        <div className="relative h-72 lg:h-96 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1400&h=500&fit=crop&q=90"
            alt="Свежий хлеб"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(61,33,8,0.75) 0%, rgba(61,33,8,0.3) 60%, transparent 100%)" }} />

          {/* Плашка как на оригинале */}
          <div className="absolute inset-0 flex items-center justify-start px-8 lg:px-20">
            <div className="text-center" style={{ background: "rgba(61,33,8,0.85)", padding: "20px 28px", borderRadius: 4, maxWidth: 320 }}>
              <div className="text-2xl mb-1">🌾</div>
              <div className="text-[#d4a96a] text-xl font-bold italic mb-1">свежая выпечка каждый день</div>
              <div className="text-white/80 text-xs leading-relaxed">
                Продукция нашей пекарни предлагается<br />на многих базах Ростова-на-Дону<br />и прилегающих районов
              </div>
            </div>
          </div>
        </div>

        {/* Волнистый разделитель */}
        <div style={{ background: "#3d2108", height: 12 }} />
      </section>

      {/* ── О НАС (блок 1) ── */}
      <section id="about" style={{ background: "#f5ede0" }} className="py-14">
        <div className="max-w-5xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#3d2108" }}>
              Высокое качество.<br />Широкий ассортимент.
            </h2>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#5a3010" }}>
              Давайте познакомимся и вы сами убедитесь, что работать с нами приятно и легко.
              Свяжитесь с нами! Мы находимся в городе Ростов-на-Дону.
            </p>
            <p className="text-sm mb-4" style={{ color: "#5a3010" }}>
              Наш основной телефон: <strong>+7 909 789 93 99</strong>
            </p>
            <a href="#contact" className="inline-block text-sm font-semibold text-white px-6 py-2.5 rounded-sm hover:opacity-90 transition-opacity" style={{ background: "#c0392b" }}>
              Больше информации о нас
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=500&h=380&fit=crop&q=85"
              alt="Продукция НовКолос"
              className="rounded-lg shadow-xl w-full max-w-sm object-cover"
              style={{ maxHeight: 280 }}
            />
          </div>
        </div>
      </section>

      {/* ── ПРОДУКЦИЯ (тёмный блок) ── */}
      <section style={{ background: "#2c1a0e" }} className="py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Наша продукция</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {[
              { icon: "🥐", name: "Сдобная продукция", desc: "Сдобные изделия при изготовлении которых применяется разнообразный ассортимент по размерам и форме." },
              { icon: "🍞", name: "Хлебная продукция", desc: "Продукты ежедневного потребления высокого хлебопекарного производства." },
              { icon: "🥐", name: "Слоёная продукция", desc: "Воздушные изделия из теста различных форм и с разнообразными дополнениями." },
              { icon: "🍪", name: "Печенье", desc: "Самое разное печенье и вкусы всего любимого лакомства на каждый день!" },
              { icon: "🎂", name: "Торты, пирожные", desc: "Рецептуры тортов в разнообразных стилях, в точно рассчитанных формах и весах." },
              { icon: "🥗", name: "Готовые закуски", desc: "Разнообразные хлебные закусочные сэндвичи и аппетитные закуски на каждый день." },
            ].map((cat, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  {cat.icon}
                </div>
                <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>

          {/* Печенье-картинка снизу */}
          <div className="mt-10 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=200&fit=crop&q=85"
              alt="Ассортимент"
              className="rounded-xl w-full max-w-lg object-cover shadow-lg"
              style={{ maxHeight: 160 }}
            />
          </div>
        </div>
      </section>

      {/* ── КАЧЕСТВО + СЕТКА ФОТО ── */}
      <section style={{ background: "#f5ede0" }} className="py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-start mb-10">
            <div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: "#3d2108" }}>
                Высокое качество<br />и удобства для<br />партнеров — наш приоритет.
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#5a3010" }}>
                Именно потому мы знаем производство отлично сами, и наши партнёры знают насколько надежна и удобна работа с нами. Мы стараемся предложить максимально возможные удобные условия для наших партнеров. Мы часто адаем себе вопрос: "что еще мы можем улучшить, как стать еще лучше?" и отвечаем делом, стараясь и поставляя партнерам еще более свежий хлеб!
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&h=160&fit=crop&q=80",
                "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=160&fit=crop&q=80",
                "https://images.unsplash.com/photo-1568471173242-461f0a730452?w=200&h=160&fit=crop&q=80",
                "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200&h=160&fit=crop&q=80",
              ].map((src, i) => (
                <img key={i} src={src} alt="Продукция" className="rounded-lg object-cover w-full shadow-md" style={{ height: 120 }} />
              ))}
            </div>
          </div>

          {/* Мини-игра CTA */}
          <div className="text-center mt-4">
            <button
              onClick={() => setGameOpen(true)}
              className="inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg"
              style={{ background: "#c0392b" }}
            >
              🎮 Поиграть: Поймай хлебушек!
            </button>
            <p className="text-xs mt-2" style={{ color: "#7a5c3a" }}>Весёлая мини-игра прямо на сайте</p>
          </div>
        </div>
      </section>

      {/* ── КАТАЛОГ ── */}
      <section id="catalog" style={{ background: "#ede0cc" }} className="py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "#3d2108" }}>Каталог продукции</h2>

          {/* Категории */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-xs px-4 py-1.5 rounded-sm font-semibold transition-colors"
                style={{
                  background: activeCategory === cat ? "#c0392b" : "#3d2108",
                  color: "white",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Товары */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="relative overflow-hidden" style={{ height: 140 }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold leading-tight mb-2" style={{ color: "#3d2108" }}>{product.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold" style={{ color: "#c0392b" }}>{product.price} ₽</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="text-[10px] font-bold text-white px-2.5 py-1 rounded-sm hover:opacity-90 transition-opacity"
                      style={{ background: "#3d2108" }}
                    >
                      + В корзину
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ВАКАНСИИ ── */}
      <section id="jobs" style={{ background: "#f5ede0" }} className="py-14">
        <div className="max-w-5xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#3d2108" }}>Открытые вакансии</h2>
            <p className="text-sm mb-4" style={{ color: "#5a3010" }}>Требуются на постоянное место работы:</p>
            <ul className="space-y-2 mb-6">
              {["Технолог хлебопекарного производства", "Торговый представитель", "Водитель-экспедитор"].map((job, i) => (
                <li key={i} className="flex items-center gap-2 text-sm" style={{ color: "#3d2108" }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#c0392b" }} />
                  {job}
                </li>
              ))}
            </ul>
            <p className="text-sm" style={{ color: "#5a3010" }}>
              Подробности по телефону: <strong>+7 909 789 93 99</strong>, <strong>+7 863 232 09 09</strong>
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&h=300&fit=crop&q=85"
              alt="Пекарня"
              className="rounded-lg shadow-xl w-full object-cover"
              style={{ maxHeight: 240 }}
            />
          </div>
        </div>
      </section>

      {/* ── КОНТАКТЫ ── */}
      <section id="contact" style={{ background: "#ede0cc" }} className="py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: "#3d2108" }}>Наши контакты</h2>
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h3 className="font-bold mb-3" style={{ color: "#c0392b" }}>ООО Новый Колос</h3>
              <div className="space-y-2 text-sm mb-6" style={{ color: "#5a3010" }}>
                <p>Юридический адрес: 344018, г. Ростов-на-Дону, ул. Металлургическая, 8</p>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" style={{ color: "#c0392b" }} /> +7 909 789 93 99</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" style={{ color: "#c0392b" }} /> +7 863 232 09 09</div>
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" style={{ color: "#c0392b" }} /> novkolos@mail.ru</div>
              </div>

              {/* Форма */}
              <h3 className="font-bold mb-3" style={{ color: "#3d2108" }}>Здесь Вы можете оставить свои отзывы, идеи и предложения</h3>
              <div className="space-y-3">
                <input type="text" placeholder="Ваше имя (необязательно)" className="w-full border text-sm px-3 py-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#c0392b]" style={{ borderColor: "#c8a87a", background: "white" }} />
                <input type="text" placeholder="Контакты: телефон, e-mail (обязательно)" className="w-full border text-sm px-3 py-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#c0392b]" style={{ borderColor: "#c8a87a", background: "white" }} />
                <textarea rows={4} placeholder="Сообщение" className="w-full border text-sm px-3 py-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#c0392b] resize-none" style={{ borderColor: "#c8a87a", background: "white" }} />
                <button className="text-sm font-bold text-white px-6 py-2 rounded-sm hover:opacity-90 transition-opacity" style={{ background: "#c0392b" }}>
                  Отправить
                </button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md" style={{ height: 320 }}>
              <iframe
                src="https://maps.google.com/maps?q=Ростов-на-Дону,ул.Металлургическая,8&output=embed&hl=ru"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Карта"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#2c1a0e", color: "white" }} className="py-10">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-3" style={{ color: "#d4a96a" }}>О Нас</h4>
            <p className="text-white/60 text-xs leading-relaxed">
              ООО «Новый Колос» — пекарня в Ростове-на-Дону. Успешно работаем с 1997 года, радуя своих партнёров свежими хлебом и выпечкой каждый день.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3" style={{ color: "#d4a96a" }}>Как нас найти</h4>
            <div className="text-white/60 text-xs space-y-1">
              <p>Россия, 344018</p>
              <p>г. Ростов-на-Дону</p>
              <p>ул. Металлургическая, 8</p>
              <p className="mt-2">т. <strong className="text-white/80">+7 909 789 93 99</strong></p>
              <p>т. <strong className="text-white/80">+7 863 232 09 09</strong></p>
              <p>novkolos@mail.ru</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-3" style={{ color: "#d4a96a" }}>Меню</h4>
            <ul className="space-y-1.5">
              {menuItems.map(item => (
                <li key={item.name}>
                  <a href={item.href} className="text-xs hover:text-[#d4a96a] transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center text-xs mt-8" style={{ color: "rgba(255,255,255,0.3)" }}>
          © 2025 ООО «Новый Колос». Все права защищены.
        </div>
      </footer>

      {/* ── КОРЗИНА (слайдер) ── */}
      <AnimatePresence>
        {cartOpen && (
          <CartPanel
            cart={cart}
            onClose={() => setCartOpen(false)}
            onAdd={addQty}
            onRemove={removeFromCart}
            onDelete={deleteFromCart}
          />
        )}
      </AnimatePresence>

      {/* ── МИНИ-ИГРА ── */}
      {gameOpen && <BreadGame onClose={() => setGameOpen(false)} />}
    </div>
  )
}
